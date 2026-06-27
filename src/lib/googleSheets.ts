import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User, signOut } from "firebase/auth";
import { AdminLead } from "../types";
import firebaseConfig from "../../firebase-applet-config.json";

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Configure Google Auth Provider with Sheets and Drive Scopes
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("https://www.googleapis.com/auth/spreadsheets");
googleProvider.addScope("https://www.googleapis.com/auth/drive.file");

let isSigningIn = false;
let cachedAccessToken: string | null = null;

// Initialize Firebase Auth state listener and load cached token if available
export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else {
        // Clear if we don't have a token cached yet
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

// Sign in with Google Popup and capture the OAuth Access Token
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error("Falha ao obter token de acesso do Google OAuth.");
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error("Erro no login com Google:", error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

// Get the current token
export const getAccessToken = (): string | null => {
  return cachedAccessToken;
};

// Log out
export const googleSignOut = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};

/**
 * Creates a brand new Google Spreadsheet and returns its details.
 */
export const createSpreadsheet = async (accessToken: string, title: string) => {
  const response = await fetch("https://sheets.googleapis.com/v4/spreadsheets", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      properties: {
        title: title
      }
    })
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error?.message || "Erro ao criar planilha no Google Sheets.");
  }

  return await response.json();
};

/**
 * Overwrites the spreadsheet content with headers and all current leads.
 */
export const syncAllLeadsToSpreadsheet = async (
  accessToken: string,
  spreadsheetId: string,
  leads: AdminLead[]
) => {
  const values = [
    [
      "ID do Lead", 
      "Nome", 
      "Empresa", 
      "WhatsApp", 
      "Instagram", 
      "Segmento", 
      "Desafios do Lead", 
      "Origem", 
      "Data de Captação", 
      "Maturidade Digital (Score)", 
      "Status"
    ],
    ...leads.map(lead => [
      lead.id,
      lead.name,
      lead.company,
      lead.whatsapp,
      lead.instagram ? `@${lead.instagram.replace("@", "")}` : "Não informado",
      lead.segment,
      Array.isArray(lead.challenges) ? lead.challenges.join(", ") : "",
      lead.source || "Geral",
      lead.createdAt ? new Date(lead.createdAt).toLocaleString("pt-BR") : "",
      lead.diagnostic?.authorityScore !== undefined ? `${lead.diagnostic.authorityScore}/100` : "Não gerado",
      lead.diagnostic ? "Diagnóstico Gerado" : "Pendente"
    ])
  ];

  // Write sheet values
  const writeResponse = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A1:K?valueInputOption=USER_ENTERED`,
    {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ values })
    }
  );

  if (!writeResponse.ok) {
    const errData = await writeResponse.json().catch(() => ({}));
    throw new Error(errData.error?.message || "Erro ao escrever dados na planilha.");
  }

  // Format spreadsheet headers and layout beautifully
  try {
    const metaResponse = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}`, {
      headers: { "Authorization": `Bearer ${accessToken}` }
    });
    const metaData = await metaResponse.json();
    const sheetId = metaData.sheets?.[0]?.properties?.sheetId ?? 0;

    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        requests: [
          // Bold headers and dark theme background
          {
            repeatCell: {
              range: {
                sheetId: sheetId,
                startRowIndex: 0,
                endRowIndex: 1
              },
              cell: {
                userEnteredFormat: {
                  backgroundColor: { red: 0.08, green: 0.08, blue: 0.1 },
                  textFormat: {
                    bold: true,
                    foregroundColor: { red: 1.0, green: 1.0, blue: 1.0 },
                    fontSize: 10,
                    fontFamily: "Inter"
                  },
                  horizontalAlignment: "CENTER"
                }
              },
              fields: "userEnteredFormat(backgroundColor,textFormat,horizontalAlignment)"
            }
          },
          // Freeze first row
          {
            updateSheetProperties: {
              properties: {
                sheetId: sheetId,
                gridProperties: {
                  frozenRowCount: 1
                }
              },
              fields: "gridProperties.frozenRowCount"
            }
          },
          // Auto-resize columns to fit data
          {
            autoResizeDimensions: {
              dimensions: {
                sheetId: sheetId,
                dimension: "COLUMNS",
                startIndex: 0,
                endIndex: 11
              }
            }
          }
        ]
      })
    });
  } catch (fmtError) {
    console.warn("Could not apply formatting to sheet:", fmtError);
    // Silent fail on styling - data is already written anyway
  }

  return true;
};
