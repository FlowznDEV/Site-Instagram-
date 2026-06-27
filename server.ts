import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import { initializeApp, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

dotenv.config();

const app = express();
const PORT = 3000;
const LEADS_FILE = path.join(process.cwd(), "leads.json");
const CONFIG_FILE = path.join(process.cwd(), "config.json");

// Read Firebase Config safely
const firebaseConfigPath = path.join(process.cwd(), "firebase-applet-config.json");
let firebaseConfig: any = null;
try {
  if (fs.existsSync(firebaseConfigPath)) {
    firebaseConfig = JSON.parse(fs.readFileSync(firebaseConfigPath, "utf-8"));
  }
} catch (err) {
  console.error("Error reading firebase-applet-config.json:", err);
}

let firestoreDb: any = null;

function getFirestoreDB() {
  if (!firestoreDb && firebaseConfig) {
    try {
      let firebaseApp;
      if (getApps().length === 0) {
        firebaseApp = initializeApp({
          projectId: firebaseConfig.projectId,
        });
      } else {
        firebaseApp = getApps()[0];
      }
      firestoreDb = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);
    } catch (error) {
      console.error("Failed to initialize firebase-admin:", error);
    }
  }
  return firestoreDb;
}

// Async helpers for JSON Database persistence (bypassing Firestore as requested to avoid credential and connection errors)

async function getAdminPasswordAsync(): Promise<string> {
  return getAdminPassword();
}

async function setAdminPasswordAsync(password: string): Promise<boolean> {
  return setAdminPassword(password);
}

async function getAllLeadsAsync(): Promise<any[]> {
  return readLeads();
}

async function saveLeadAsync(lead: any): Promise<boolean> {
  const leads = readLeads();
  leads.push(lead);
  return writeLeads(leads);
}

async function updateLeadDiagnosticAsync(leadId: string, diagnostic: any): Promise<boolean> {
  const leads = readLeads();
  const leadIndex = leads.findIndex((l) => l.id === leadId);
  if (leadIndex !== -1) {
    leads[leadIndex].diagnostic = diagnostic;
    return writeLeads(leads);
  }
  return false;
}

async function deleteLeadAsync(leadId: string): Promise<boolean> {
  let leads = readLeads();
  leads = leads.filter((l) => l.id !== leadId);
  return writeLeads(leads);
}

function getAdminPassword(): string {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const config = JSON.parse(fs.readFileSync(CONFIG_FILE, "utf-8"));
      if (config.adminPassword) {
        return config.adminPassword;
      }
    }
  } catch (e) {
    console.error("Error reading config file:", e);
  }
  return process.env.ADMIN_PIN || "1234";
}

function setAdminPassword(password: string): boolean {
  try {
    let config: any = {};
    if (fs.existsSync(CONFIG_FILE)) {
      config = JSON.parse(fs.readFileSync(CONFIG_FILE, "utf-8"));
    }
    config.adminPassword = password;
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), "utf-8");
    return true;
  } catch (e) {
    console.error("Error writing config file:", e);
    return false;
  }
}

// Parse JSON bodies
app.use(express.json());

// Initialize Gemini SDK with User-Agent telemetry
const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    })
  : null;

// Helper to read leads safely
function readLeads(): any[] {
  try {
    if (!fs.existsSync(LEADS_FILE)) {
      return [];
    }
    const data = fs.readFileSync(LEADS_FILE, "utf-8");
    return JSON.parse(data || "[]");
  } catch (error) {
    console.error("Error reading leads file:", error);
    return [];
  }
}

// Helper to write leads safely
function writeLeads(leads: any[]): boolean {
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error writing leads file:", error);
    return false;
  }
}

// API: Register Lead
app.post("/api/leads", async (req, res) => {
  try {
    const { name, company, whatsapp, instagram, segment, challenges, source } = req.body;

    if (!name || !whatsapp || !company) {
      return res.status(400).json({ error: "Nome, Empresa e WhatsApp são obrigatórios." });
    }

    const newLead = {
      id: "lead_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9),
      name,
      company,
      whatsapp,
      instagram: instagram || "",
      segment: segment || "Outro",
      challenges: challenges || [],
      source: source || "Instagram Bio",
      createdAt: new Date().toISOString(),
      diagnostic: null
    };

    await saveLeadAsync(newLead);

    res.status(201).json({ success: true, leadId: newLead.id, message: "Lead registrado com sucesso!" });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Erro ao salvar lead." });
  }
});

// API: Generate Intelligent Strategic Diagnostic
app.post("/api/diagnostico", async (req, res) => {
  try {
    const { leadId, name, company, whatsapp, instagram, segment, challenges } = req.body;

    if (!name || !company || !segment) {
      return res.status(400).json({ error: "Nome, empresa e segmento são necessários para o diagnóstico." });
    }

    if (!ai) {
      // Return a simulated high-quality mock diagnostic if GEMINI_API_KEY is not set yet
      return res.json({
        companyName: company,
        instagram: instagram || "@instagram",
        authorityScore: 78,
        marketPositioning: "Sua marca possui enorme potencial de diferenciação. Atualmente, o mercado de " + segment + " demanda maior consistência visual e provas sociais claras no feed para quebrar objeções de novos visitantes.",
        socialMediaAdvice: [
          "Defina um tom de voz de autoridade: mostre os bastidores do seu serviço e os problemas que você resolve, em vez de focar apenas em preços.",
          "Invista em vídeos curtos (Reels) com ganchos fortes de até 3 segundos explorando a dor exata do seu cliente ideal.",
          "Arrume sua Bio do Instagram utilizando o método de Proposta Única de Valor (PUV): Quem você ajuda, como você ajuda e um link direto para ação."
        ],
        automationAdvice: [
          "Configure um funil de boas-vindas no Direct do Instagram: quando um usuário interagir ou seguir, envie uma mensagem automática acolhedora e qualifique o interesse.",
          "Implemente triagem de leads no WhatsApp: use fluxos automáticos para classificar o lead por orçamento ou urgência antes de passar para o atendimento humano.",
          "Automatize follow-ups automáticos de 24h e 72h após o primeiro contato para resgatar vendas perdidas."
        ],
        trafficAdvice: [
          "Campanha de Atração Local/Segmentada: utilize anúncios direcionados a pessoas interessadas em soluções do segmento de " + segment + " em um raio estratégico.",
          "Remarketing no Instagram: anuncie depoimentos de clientes e garantias para quem visitou seu perfil ou interagiu com seus posts nos últimos 30 dias.",
          "Anúncios diretos para o WhatsApp focados em 'Diagnóstico Gratuito' para atrair leads de alta intenção."
        ],
        actionPlan: [
          "Otimização da Bio e Feed do seu Instagram para transformá-lo em uma máquina de vendas.",
          "Ativação de automação simples no Direct do Instagram utilizando palavras-chave (ex: 'QUERO').",
          "Lançamento de uma campanha teste de tráfego pago direcionando para conversa direta no WhatsApp comercial."
        ],
        estimatedGrowthPotential: "+40% de novos contatos qualificados em 45 dias com funil integrado"
      });
    }

    // Call actual Gemini model for structured output
    const prompt = `
    Você é o estrategista chefe da BackStage, uma agência de elite em Marketing Digital, Automação Comercial e Tráfego Pago.
    Você precisa gerar um DIAGNÓSTICO ESTRATÉGICO e altamente persuasivo para um lead em potencial que veio pelo Instagram.
    Seja realista, encorajador, use termos sofisticados de negócios e mostre autoridade intelectual inquestionável.
    O diagnóstico deve ser totalmente personalizado para a realidade desta empresa.

    INFORMAÇÕES DO LEAD:
    - Nome do Contato: ${name}
    - Nome da Empresa: ${company}
    - Segmento de Atuação: ${segment}
    - Canal Digital (Instagram ou Site): ${instagram || "Não fornecido"}
    - Desafios Indicados pelo Lead: ${Array.isArray(challenges) ? challenges.join(", ") : "Não fornecido"}

    INSTRUÇÕES DE RESPOSTA:
    Gere uma resposta JSON estruturada estritamente seguindo o formato solicitado, sem textos adicionais, em português do Brasil.
    Destaque palavras que definem autoridade de mercado (ex: "escala previsível", "funil de alta conversão", "autoridade de nicho", "processo otimizado") de forma sutil.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "Você é um consultor de marketing digital focado em conversão e automações de vendas. Retorne sempre o JSON válido conforme a estrutura de dados solicitada.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: [
            "companyName",
            "instagram",
            "authorityScore",
            "marketPositioning",
            "socialMediaAdvice",
            "automationAdvice",
            "trafficAdvice",
            "actionPlan",
            "estimatedGrowthPotential"
          ],
          properties: {
            companyName: { type: Type.STRING },
            instagram: { type: Type.STRING },
            authorityScore: { type: Type.INTEGER, description: "Pontuação de maturidade digital de 50 a 98" },
            marketPositioning: { type: Type.STRING, description: "Uma análise em texto parágrafo elegante sobre o posicionamento atual da empresa" },
            socialMediaAdvice: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Três recomendações de alto nível para Redes Sociais"
            },
            automationAdvice: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Três fluxos ou automações práticas de WhatsApp/Instagram recomendadas"
            },
            trafficAdvice: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Três estratégias de tráfego pago (Meta Ads) recomendadas"
            },
            actionPlan: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Plano de ação imediato com exatamente 3 passos em ordem"
            },
            estimatedGrowthPotential: { type: Type.STRING, description: "Uma frase marcante estimando o percentual de crescimento realista" }
          }
        }
      }
    });

    const resultText = response.text || "{}";
    const diagnosticData = JSON.parse(resultText);

    // Update lead record with diagnostic if leadId is provided
    if (leadId) {
      await updateLeadDiagnosticAsync(leadId, diagnosticData);
    }

    res.json(diagnosticData);
  } catch (error: any) {
    console.error("Gemini Diagnostic Error:", error);
    res.status(500).json({ error: error.message || "Erro ao processar diagnóstico estratégico." });
  }
});

// API: Get All Leads for Admin
app.post("/api/admin/leads", async (req, res) => {
  try {
    const { pin } = req.body;
    // Check against dynamically saved password (defaults to ADMIN_PIN or "1234")
    const currentPassword = await getAdminPasswordAsync();
    if (pin !== currentPassword) {
      return res.status(401).json({ error: "Acesso não autorizado. Senha de acesso inválida." });
    }

    const leads = await getAllLeadsAsync();
    res.json({ success: true, leads });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Erro ao listar leads." });
  }
});

// API: Delete Lead for Admin
app.post("/api/admin/leads/delete", async (req, res) => {
  try {
    const { pin, leadId } = req.body;
    const currentPassword = await getAdminPasswordAsync();
    if (pin !== currentPassword) {
      return res.status(401).json({ error: "Acesso não autorizado." });
    }

    await deleteLeadAsync(leadId);

    res.json({ success: true, message: "Lead excluído com sucesso." });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Erro ao excluir lead." });
  }
});

// API: Change Admin Password
app.post("/api/admin/change-password", async (req, res) => {
  try {
    const { currentPin, newPin } = req.body;
    const currentPassword = await getAdminPasswordAsync();
    if (currentPin !== currentPassword) {
      return res.status(401).json({ error: "Senha de acesso atual incorreta." });
    }
    if (!newPin || newPin.trim().length < 4) {
      return res.status(400).json({ error: "A nova senha deve possuir pelo menos 4 caracteres." });
    }

    await setAdminPasswordAsync(newPin.trim());
    res.json({ success: true, message: "Senha de acesso alterada com sucesso!" });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Erro ao alterar senha." });
  }
});

// Mount Vite middleware or static serving
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }
}

setupVite().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
});
