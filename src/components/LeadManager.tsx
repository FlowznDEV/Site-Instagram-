import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { AdminLead, Diagnostic } from "../types";
import { 
  Lock, 
  Users, 
  Trash2, 
  Download, 
  ExternalLink, 
  MessageSquare, 
  Smartphone, 
  Layers, 
  Calendar, 
  Search, 
  RefreshCw,
  AlertCircle,
  FileSpreadsheet,
  X,
  Eye,
  EyeOff,
  CheckCircle,
  Sparkles,
  Shield,
  TrendingUp,
  Settings
} from "lucide-react";
import { 
  BarChart, Bar, Cell, 
  LineChart, Line, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, AreaChart, Area
} from "recharts";
import { 
  initAuth, 
  googleSignIn, 
  googleSignOut, 
  createSpreadsheet, 
  syncAllLeadsToSpreadsheet 
} from "../lib/googleSheets";
import { User } from "firebase/auth";

// Safe session storage fallback to prevent "the string did not match the expected pattern" or other Security/Quota errors on mobile/incognito
const inMemoryStorage: Record<string, string> = {};
const safeSessionStorage = {
  getItem: (key: string): string | null => {
    try {
      return window.sessionStorage ? window.sessionStorage.getItem(key) : inMemoryStorage[key] || null;
    } catch (e) {
      return inMemoryStorage[key] || null;
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      if (window.sessionStorage) {
        window.sessionStorage.setItem(key, value);
      } else {
        inMemoryStorage[key] = value;
      }
    } catch (e) {
      inMemoryStorage[key] = value;
    }
  },
  removeItem: (key: string): void => {
    try {
      if (window.sessionStorage) {
        window.sessionStorage.removeItem(key);
      } else {
        delete inMemoryStorage[key];
      }
    } catch (e) {
      delete inMemoryStorage[key];
    }
  }
};

export default function LeadManager() {
  const [pin, setPin] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [leads, setLeads] = useState<AdminLead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selectedLead, setSelectedLead] = useState<AdminLead | null>(null);

  // Google Sheets Integration State
  const [googleUser, setGoogleUser] = useState<User | null>(null);
  const [googleToken, setGoogleToken] = useState<string | null>(null);
  const [linkedSpreadsheetId, setLinkedSpreadsheetId] = useState<string>("");
  const [linkedSpreadsheetUrl, setLinkedSpreadsheetUrl] = useState<string>("");
  const [syncingSheets, setSyncingSheets] = useState(false);
  const [sheetsMessage, setSheetsMessage] = useState<{ text: string; type: "success" | "error" | "info" } | null>(null);
  const [manualSheetId, setManualSheetId] = useState("");

  // UI, Security & Chart states
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(true);
  const [showSecurityConfig, setShowSecurityConfig] = useState(false);

  // Password Modification state
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmNewPin, setConfirmNewPin] = useState("");
  const [passwordMessage, setPasswordMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMessage(null);
    
    if (newPin !== confirmNewPin) {
      setPasswordMessage({ text: "A nova senha e a confirmação não coincidem.", type: "error" });
      return;
    }
    
    if (newPin.trim().length < 4) {
      setPasswordMessage({ text: "A nova senha deve possuir pelo menos 4 caracteres.", type: "error" });
      return;
    }
    
    setIsChangingPassword(true);
    try {
      const response = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPin, newPin: newPin.trim() })
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Erro ao alterar senha.");
      }
      
      setPasswordMessage({ text: "Senha de acesso alterada com sucesso! Use a nova senha nos próximos acessos.", type: "success" });
      setPin(newPin.trim());
      safeSessionStorage.setItem("backstage_admin_pin", newPin.trim());
      
      // Clear fields
      setCurrentPin("");
      setNewPin("");
      setConfirmNewPin("");
    } catch (err: any) {
      setPasswordMessage({ text: err.message || "Erro de conexão.", type: "error" });
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin })
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("O servidor retornou uma resposta inválida (HTML em vez de JSON). O servidor pode estar reiniciando ou fora do ar.");
      }

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "PIN de acesso incorreto.");
      }

      setLeads(data.leads || []);
      setIsAuthenticated(true);
      // Save authenticated state locally for session convenience
      safeSessionStorage.setItem("backstage_admin_pin", pin);
    } catch (err: any) {
      setError(err.message || "Erro ao efetuar login.");
    } finally {
      setLoading(false);
    }
  };

  const fetchLeads = async () => {
    setError(null);
    setLoading(true);
    const activePin = pin || safeSessionStorage.getItem("backstage_admin_pin");
    if (!activePin) return;

    try {
      const response = await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: activePin })
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Resposta inválida do servidor.");
      }

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Sessão expirada.");
      }

      setLeads(data.leads || []);
    } catch (err: any) {
      setError(err.message || "Erro ao atualizar lista.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    if (!window.confirm("Deseja realmente remover este lead permanentemente?")) return;

    const activePin = pin || safeSessionStorage.getItem("backstage_admin_pin");
    try {
      const response = await fetch("/api/admin/leads/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: activePin, leadId })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erro ao remover lead.");
      }

      setLeads(prev => prev.filter(l => l.id !== leadId));
      if (selectedLead?.id === leadId) setSelectedLead(null);
    } catch (err: any) {
      alert(err.message || "Não foi possível excluir.");
    }
  };

  // Check existing session on mount
  useEffect(() => {
    const savedPin = safeSessionStorage.getItem("backstage_admin_pin");
    if (savedPin) {
      setPin(savedPin);
      setIsAuthenticated(true);
    }

    // Load saved Spreadsheet Config
    const savedSheetId = safeSessionStorage.getItem("backstage_sheets_id") || localStorage.getItem("backstage_sheets_id") || "";
    const savedSheetUrl = safeSessionStorage.getItem("backstage_sheets_url") || localStorage.getItem("backstage_sheets_url") || "";
    if (savedSheetId) {
      setLinkedSpreadsheetId(savedSheetId);
      setLinkedSpreadsheetUrl(savedSheetUrl);
    }

    // Listen to Google Auth
    const unsubscribe = initAuth(
      (user, token) => {
        setGoogleUser(user);
        setGoogleToken(token);
      },
      () => {
        setGoogleUser(null);
        setGoogleToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchLeads();
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    safeSessionStorage.removeItem("backstage_admin_pin");
    setPin("");
    setIsAuthenticated(false);
    setLeads([]);
    setSelectedLead(null);
  };

  // Google Auth & Sheets Handlers
  const handleGoogleLogin = async () => {
    setSheetsMessage(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setGoogleUser(result.user);
        setGoogleToken(result.accessToken);
        setSheetsMessage({ text: "Conectado ao Google com sucesso!", type: "success" });
      }
    } catch (err: any) {
      setSheetsMessage({ text: err.message || "Erro ao conectar com o Google.", type: "error" });
    }
  };

  const handleGoogleLogout = async () => {
    try {
      await googleSignOut();
      setGoogleUser(null);
      setGoogleToken(null);
      setSheetsMessage({ text: "Sessão do Google encerrada.", type: "info" });
    } catch (err: any) {
      console.error("Erro ao deslogar do Google:", err);
    }
  };

  const handleCreateSheet = async () => {
    if (!googleToken) {
      setSheetsMessage({ text: "Por favor, conecte sua conta do Google primeiro.", type: "error" });
      return;
    }
    setSyncingSheets(true);
    setSheetsMessage(null);
    try {
      const data = await createSpreadsheet(googleToken, `Leads BackStage - Diagnósticos`);
      const id = data.spreadsheetId;
      const url = data.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${id}/edit`;
      
      setLinkedSpreadsheetId(id);
      setLinkedSpreadsheetUrl(url);
      safeSessionStorage.setItem("backstage_sheets_id", id);
      safeSessionStorage.setItem("backstage_sheets_url", url);
      localStorage.setItem("backstage_sheets_id", id);
      localStorage.setItem("backstage_sheets_url", url);
      
      setSheetsMessage({ text: "Planilha 'Leads BackStage - Diagnósticos' criada com sucesso!", type: "success" });
      
      // Auto-sync leads
      if (leads.length > 0) {
        await syncAllLeadsToSpreadsheet(googleToken, id, leads);
      }
    } catch (err: any) {
      setSheetsMessage({ text: err.message || "Erro ao criar planilha.", type: "error" });
    } finally {
      setSyncingSheets(false);
    }
  };

  const handleLinkExistingSheet = () => {
    setSheetsMessage(null);
    let id = manualSheetId.trim();
    if (!id) {
      setSheetsMessage({ text: "Insira um ID ou URL de planilha válido.", type: "error" });
      return;
    }
    
    // Extract ID if a full URL was provided
    const urlMatch = id.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    if (urlMatch && urlMatch[1]) {
      id = urlMatch[1];
    }
    
    const url = `https://docs.google.com/spreadsheets/d/${id}/edit`;
    setLinkedSpreadsheetId(id);
    setLinkedSpreadsheetUrl(url);
    safeSessionStorage.setItem("backstage_sheets_id", id);
    safeSessionStorage.setItem("backstage_sheets_url", url);
    localStorage.setItem("backstage_sheets_id", id);
    localStorage.setItem("backstage_sheets_url", url);
    
    setSheetsMessage({ text: "Planilha vinculada com sucesso!", type: "success" });
    setManualSheetId("");
  };

  const handleUnlinkSheet = () => {
    setLinkedSpreadsheetId("");
    setLinkedSpreadsheetUrl("");
    safeSessionStorage.removeItem("backstage_sheets_id");
    safeSessionStorage.removeItem("backstage_sheets_url");
    localStorage.removeItem("backstage_sheets_id");
    localStorage.removeItem("backstage_sheets_url");
    setSheetsMessage({ text: "Planilha desvinculada.", type: "info" });
  };

  const handleSyncLeads = async () => {
    if (!googleToken) {
      setSheetsMessage({ text: "Sua sessão do Google expirou ou não está ativa. Conecte-se novamente.", type: "error" });
      return;
    }
    if (!linkedSpreadsheetId) {
      setSheetsMessage({ text: "Nenhuma planilha vinculada.", type: "error" });
      return;
    }
    setSyncingSheets(true);
    setSheetsMessage(null);
    try {
      await syncAllLeadsToSpreadsheet(googleToken, linkedSpreadsheetId, leads);
      setSheetsMessage({ text: `Sincronização concluída! ${leads.length} leads enviados para o Google Sheets.`, type: "success" });
    } catch (err: any) {
      setSheetsMessage({ text: err.message || "Erro ao sincronizar dados.", type: "error" });
    } finally {
      setSyncingSheets(false);
    }
  };

  // Download all leads as structured CSV spreadsheet
  const handleExportCSV = () => {
    if (leads.length === 0) return;

    const headers = ["ID", "Data", "Nome", "Empresa", "Segmento", "WhatsApp", "Instagram", "Desafios", "Maturidade IA"];
    const rows = leads.map(l => [
      l.id,
      new Date(l.createdAt).toLocaleDateString("pt-BR"),
      l.name,
      l.company,
      l.segment,
      l.whatsapp,
      l.instagram ? `@${l.instagram}` : "N/A",
      l.challenges.join(" | "),
      l.diagnostic?.authorityScore || "N/A"
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(","))
    ].join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `leads_backstage_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filters leads
  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.company.toLowerCase().includes(search.toLowerCase()) ||
    l.segment.toLowerCase().includes(search.toLowerCase()) ||
    l.whatsapp.includes(search)
  );

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-[#0c0c0e] border border-zinc-900 rounded-none p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#b89047]"></div>
          
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-12 h-12 rounded-none bg-black border border-zinc-900 text-[#b89047] flex items-center justify-center mb-4">
              <Lock size={20} />
            </div>
            <h1 className="text-lg font-display font-black text-white uppercase tracking-[0.18em]">
              BACK<span className="text-[#b89047] font-light">STAGE</span> GESTÃO
            </h1>
            <p className="text-zinc-500 text-xs font-sans mt-1 font-light">Insira sua senha de acesso privada para gerenciar os leads e visualizar gráficos de performance.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4" id="admin-login-form">
            {error && (
              <div className="p-4 rounded-none bg-zinc-950 border border-[#b89047]/20 text-[#e2c28a] text-xs flex items-center gap-2 font-mono uppercase tracking-wider">
                <AlertCircle size={14} />
                <span>{error}</span>
              </div>
            )}
            
            <div>
              <label className="block text-zinc-500 text-[10px] font-mono uppercase tracking-[0.2em] mb-2">Senha de Acesso Privado</label>
              <div className="relative">
                <input 
                  type={showLoginPassword ? "text" : "password"} 
                  name="pin"
                  id="admin-pin-input"
                  autoComplete="current-password"
                  placeholder="Insira a senha (padrão: 1234)"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full bg-black border border-zinc-900 focus:border-[#b89047] text-white rounded-none px-4 py-3 text-sm focus:outline-none focus:ring-0 text-center tracking-widest font-mono"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-3 top-3.5 text-zinc-500 hover:text-white transition-all cursor-pointer"
                  id="btn-toggle-login-password"
                >
                  {showLoginPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-[#b89047] hover:bg-white hover:text-black text-black font-mono uppercase text-xs py-4 px-8 tracking-[0.2em] transition-all rounded-none font-black disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Autenticando..." : "Acessar Painel Privado"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Admin */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 pb-6 border-b border-zinc-900">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-none bg-[#b89047] animate-pulse"></span>
            <span className="font-mono text-[9px] text-[#b89047] uppercase tracking-[0.2em]">Gestão privada ativa</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-display font-black text-white uppercase mt-1">Gerenciador de Leads</h1>
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <button 
            onClick={fetchLeads}
            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-none bg-[#0c0c0e] border border-zinc-900 text-zinc-300 hover:text-white transition-all text-xs font-mono uppercase tracking-wider"
            id="btn-admin-refresh"
          >
            <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
            Atualizar
          </button>

          <button 
            onClick={handleExportCSV}
            disabled={leads.length === 0}
            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-none bg-emerald-700 hover:bg-emerald-600 text-white transition-all text-xs font-mono uppercase tracking-wider disabled:opacity-40"
            id="btn-admin-export"
          >
            <FileSpreadsheet size={12} />
            Exportar Excel
          </button>

          <button 
            onClick={handleLogout}
            className="flex-1 md:flex-none px-4 py-2.5 rounded-none bg-black border border-[#b89047]/30 text-[#b89047] hover:text-[#e2c28a] hover:bg-[#b89047]/10 transition-all text-xs font-mono uppercase tracking-wider"
            id="btn-admin-logout"
          >
            Sair
          </button>
        </div>
      </div>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#0c0c0e] border border-zinc-900 rounded-none p-6 flex items-center gap-4">
          <div className="w-10 h-10 rounded-none bg-[#1c170d]/20 border border-[#b89047]/20 text-[#b89047] flex items-center justify-center">
            <Users size={16} />
          </div>
          <div>
            <p className="text-zinc-500 text-[9px] font-mono uppercase tracking-[0.2em]">Total de Leads</p>
            <h3 className="text-2xl font-display font-black text-white">{leads.length}</h3>
          </div>
        </div>

        <div className="bg-[#0c0c0e] border border-zinc-900 rounded-none p-6 flex items-center gap-4">
          <div className="w-10 h-10 rounded-none bg-[#1c170d]/20 border border-[#b89047]/20 text-[#b89047] flex items-center justify-center">
            <Smartphone size={16} />
          </div>
          <div>
            <p className="text-zinc-500 text-[9px] font-mono uppercase tracking-[0.2em]">Com Instagram</p>
            <h3 className="text-2xl font-display font-black text-white">
              {leads.filter(l => l.instagram).length}
            </h3>
          </div>
        </div>

        <div className="bg-[#0c0c0e] border border-zinc-900 rounded-none p-6 flex items-center gap-4">
          <div className="w-10 h-10 rounded-none bg-[#1c170d]/20 border border-[#b89047]/20 text-[#b89047] flex items-center justify-center">
            <Layers size={16} />
          </div>
          <div>
            <p className="text-zinc-500 text-[9px] font-mono uppercase tracking-[0.2em]">Principais Desafios</p>
            <h3 className="text-sm font-display font-bold text-white mt-0.5 truncate max-w-[180px] uppercase">
              {leads.length > 0 ? "Conversão & Tráfego" : "Sem registros"}
            </h3>
          </div>
        </div>

        <div className="bg-[#0c0c0e] border border-zinc-900 rounded-none p-6 flex items-center gap-4">
          <div className="w-10 h-10 rounded-none bg-[#1c170d]/20 border border-[#b89047]/20 text-[#b89047] flex items-center justify-center">
            <Calendar size={16} />
          </div>
          <div>
            <p className="text-zinc-500 text-[9px] font-mono uppercase tracking-[0.2em]">Últimos 7 dias</p>
            <h3 className="text-2xl font-display font-black text-white">
              {leads.filter(l => {
                const diffTime = Math.abs(Date.now() - new Date(l.createdAt).getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays <= 7;
              }).length}
            </h3>
          </div>
        </div>
      </div>

      {/* Google Sheets Integration Panel */}
      <div className="bg-[#0c0c0e] border border-zinc-900 rounded-none p-6 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-950/5 blur-3xl rounded-full pointer-events-none"></div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1 max-w-xl">
            <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-none bg-emerald-950/30 border border-emerald-900/30 text-emerald-400 text-[9px] font-mono uppercase tracking-[0.2em] mb-2">
              <Sparkles size={10} className="animate-pulse" />
              Sincronização Google Sheets Ativa
            </div>
            <h2 className="text-lg font-display font-black text-white uppercase tracking-tight">Integração com Google Sheets</h2>
            <p className="text-zinc-400 text-xs font-light leading-relaxed">
              Vincule sua planilha do Google Sheets para que todos os leads e seus diagnósticos da BackStage sejam consolidados e atualizados de forma extremamente ágil.
            </p>
          </div>

          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
            {!googleUser ? (
              <button
                onClick={handleGoogleLogin}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#0f0f12] text-white border border-zinc-800 hover:border-zinc-600 font-mono uppercase text-xs tracking-[0.15em] font-black px-6 py-4 rounded-none transition-all hover:bg-zinc-900 cursor-pointer"
                id="btn-google-connect"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5.04c1.62 0 3.08.56 4.22 1.65l3.16-3.16C17.47 1.7 14.93 1 12 1 7.35 1 3.39 3.67 1.44 7.57l3.86 3C6.22 7.57 8.87 5.04 12 5.04z"></path>
                  <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.34H12v4.44h6.44c-.28 1.48-1.11 2.73-2.37 3.58l3.69 2.87c2.16-1.99 3.73-4.92 3.73-8.55z"></path>
                  <path fill="#FBBC05" d="M5.3 14.73c-.24-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29L1.44 7.57C.52 9.4 0 11.4 0 13.5s.52 4.1 1.44 5.93l3.86-3z"></path>
                  <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.92l-3.69-2.87c-1.02.68-2.33 1.09-3.96 1.09-3.13 0-5.78-2.53-6.73-5.53l-3.86 3C3.39 20.33 7.35 23 12 23z"></path>
                </svg>
                Conectar Conta Google
              </button>
            ) : (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 bg-black/40 border border-zinc-900 p-3 w-full sm:w-auto">
                <div className="flex items-center gap-3">
                  {googleUser.photoURL ? (
                    <img src={googleUser.photoURL} alt="Google Avatar" className="w-8 h-8 rounded-full border border-zinc-800" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#1c170d]/20 border border-[#b89047]/20 text-[#b89047] flex items-center justify-center font-mono text-xs font-bold">
                      {googleUser.displayName?.[0] || googleUser.email?.[0] || "G"}
                    </div>
                  )}
                  <div className="text-left">
                    <p className="text-white text-xs font-semibold uppercase font-display truncate max-w-[140px]">{googleUser.displayName || "Google User"}</p>
                    <p className="text-zinc-500 text-[10px] font-mono truncate max-w-[140px]">{googleUser.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleGoogleLogout}
                  className="px-3 py-1.5 border border-zinc-900 hover:border-red-900/40 text-zinc-500 hover:text-red-400 text-[9px] font-mono uppercase tracking-wider transition-all cursor-pointer"
                  id="btn-google-disconnect"
                >
                  Sair do Google
                </button>
              </div>
            )}
          </div>
        </div>

        {/* If connected, show spreadsheet linkage controls */}
        {googleUser && (
          <div className="mt-6 pt-6 border-t border-zinc-900/60">
            {sheetsMessage && (
              <div className={`p-3.5 mb-4 text-xs font-mono uppercase tracking-wider border flex items-center gap-2.5 ${
                sheetsMessage.type === "success" 
                  ? "bg-emerald-950/20 border-emerald-900/40 text-emerald-400" 
                  : sheetsMessage.type === "error" 
                    ? "bg-red-950/20 border-red-900/40 text-red-400" 
                    : "bg-zinc-950/20 border-zinc-900/40 text-zinc-400"
              }`}>
                {sheetsMessage.type === "success" ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                <span>{sheetsMessage.text}</span>
              </div>
            )}

            {!linkedSpreadsheetId ? (
              <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
                <div className="space-y-1">
                  <p className="text-white text-xs font-semibold font-display uppercase tracking-wider">Ação requerida: Nenhuma planilha vinculada</p>
                  <p className="text-zinc-500 text-[11px] font-light font-sans">Escolha se deseja criar uma nova planilha ou vincular uma que você já possui.</p>
                </div>
                
                <div className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch gap-3">
                  <button
                    onClick={handleCreateSheet}
                    disabled={syncingSheets}
                    className="inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-600 disabled:bg-zinc-900 text-white font-mono uppercase text-xs tracking-wider font-bold px-5 py-3 rounded-none transition-all cursor-pointer"
                    id="btn-sheets-create"
                  >
                    <FileSpreadsheet size={14} />
                    {syncingSheets ? "Criando..." : "Criar Nova Planilha"}
                  </button>

                  <div className="flex items-stretch border border-zinc-900 bg-black">
                    <input
                      type="text"
                      placeholder="ID ou link da Planilha"
                      value={manualSheetId}
                      onChange={(e) => setManualSheetId(e.target.value)}
                      className="bg-transparent text-white px-3 py-2 text-xs focus:outline-none w-full sm:w-48 placeholder-zinc-700"
                    />
                    <button
                      onClick={handleLinkExistingSheet}
                      className="bg-zinc-900 hover:bg-white hover:text-black text-white px-4 py-2 text-xs font-mono uppercase tracking-wider font-black border-l border-zinc-800 transition-all cursor-pointer"
                      id="btn-sheets-link"
                    >
                      Vincular
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center p-4 bg-emerald-950/5 border border-emerald-900/20 rounded-none">
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 bg-emerald-950/30 border border-emerald-900/30 text-emerald-400 flex items-center justify-center">
                    <FileSpreadsheet size={16} />
                  </div>
                  <div className="text-left">
                    <p className="text-emerald-400 text-xs font-mono uppercase tracking-wider font-bold">Planilha Ativa & Sincronizada</p>
                    <p className="text-zinc-400 text-[10px] font-mono truncate max-w-[280px] sm:max-w-md">ID: {linkedSpreadsheetId}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 w-full md:w-auto">
                  <a
                    href={linkedSpreadsheetUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-black border border-zinc-800 hover:border-zinc-600 text-white text-[11px] font-mono uppercase tracking-wider transition-all"
                    id="btn-sheets-open"
                  >
                    <ExternalLink size={12} />
                    Abrir Planilha
                  </a>
                  
                  <button
                    onClick={handleSyncLeads}
                    disabled={syncingSheets || leads.length === 0}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-600 disabled:bg-zinc-900 text-white text-[11px] font-mono uppercase tracking-wider font-bold transition-all cursor-pointer"
                    id="btn-sheets-sync"
                  >
                    <RefreshCw size={12} className={syncingSheets ? "animate-spin" : ""} />
                    {syncingSheets ? "Sincronizando..." : "Sincronizar Leads"}
                  </button>

                  <button
                    onClick={handleUnlinkSheet}
                    className="flex-1 sm:flex-none px-3 py-2.5 border border-zinc-900 hover:border-red-900/40 text-zinc-500 hover:text-red-400 text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer"
                    id="btn-sheets-unlink"
                  >
                    Desvincular
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Process Analytics Data with Recharts */}
      {(() => {
        // 1. Process sources data
        const sourceMap: Record<string, number> = {};
        leads.forEach((l) => {
          const src = l.source || "Instagram Bio";
          sourceMap[src] = (sourceMap[src] || 0) + 1;
        });
        const sourceChartData = Object.entries(sourceMap).map(([name, count]) => ({
          name,
          leads: count,
        })).sort((a, b) => b.leads - a.leads);

        // 2. Process daily growth / capture data
        const rawDataMap: Record<string, { count: number; dateLabel: string }> = {};
        leads.forEach((lead) => {
          if (!lead.createdAt) return;
          try {
            const d = new Date(lead.createdAt);
            const key = d.toISOString().split("T")[0]; // Chronological sorting
            const label = d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
            if (!rawDataMap[key]) {
              rawDataMap[key] = { count: 0, dateLabel: label };
            }
            rawDataMap[key].count += 1;
          } catch (e) {
            console.error(e);
          }
        });

        const sortedDates = Object.keys(rawDataMap).sort();
        let cumulative = 0;
        let prevCount = 0;

        const analyticsData = sortedDates.map((key) => {
          const item = rawDataMap[key];
          cumulative += item.count;
          
          // Growth rate relative to previous day
          let dailyGrowthPercent = 0;
          if (prevCount > 0) {
            dailyGrowthPercent = Math.round(((item.count - prevCount) / prevCount) * 100);
          } else if (cumulative - item.count > 0) {
            dailyGrowthPercent = 100;
          }
          prevCount = item.count;

          return {
            rawDate: key,
            date: item.dateLabel,
            capturas: item.count,
            acumulado: cumulative,
            crescimento: dailyGrowthPercent,
          };
        });

        const CustomTooltip = ({ active, payload, label }: any) => {
          if (active && payload && payload.length) {
            return (
              <div className="bg-black border border-zinc-900 p-3 text-left">
                <p className="text-zinc-500 font-mono text-[9px] uppercase mb-1.5">{label}</p>
                {payload.map((entry: any, index: number) => (
                  <p key={index} className="text-xs font-mono font-bold" style={{ color: entry.color || entry.fill || "#8b5cf6" }}>
                    {entry.name.toUpperCase()}: {entry.value} {entry.name.includes("crescimento") || entry.name.includes("Crescimento") ? "%" : " leads"}
                  </p>
                ))}
              </div>
            );
          }
          return null;
        };

        return (
          <>
            {/* Visual Toggles Bar */}
            <div className="flex flex-wrap gap-3 mb-8 bg-[#0c0c0e]/40 border border-zinc-900 p-3">
              <button
                onClick={() => setShowAnalytics(!showAnalytics)}
                className={`inline-flex items-center gap-2 px-4 py-2 text-[10px] font-mono uppercase tracking-wider transition-all border cursor-pointer ${
                  showAnalytics 
                    ? "bg-[#1c170d]/20 border-[#b89047] text-[#b89047] font-bold" 
                    : "bg-black border-zinc-900 text-zinc-400 hover:text-white hover:border-zinc-800"
                }`}
                id="btn-toggle-analytics"
              >
                <TrendingUp size={13} />
                {showAnalytics ? "Ocultar Painel Visual" : "Visualizar Painel de Métricas"}
              </button>

              <button
                onClick={() => setShowSecurityConfig(!showSecurityConfig)}
                className={`inline-flex items-center gap-2 px-4 py-2 text-[10px] font-mono uppercase tracking-wider transition-all border cursor-pointer ${
                  showSecurityConfig 
                    ? "bg-[#1c170d]/20 border-[#b89047] text-[#b89047] font-bold" 
                    : "bg-black border-zinc-900 text-zinc-400 hover:text-white hover:border-zinc-800"
                }`}
                id="btn-toggle-security"
              >
                <Shield size={13} />
                {showSecurityConfig ? "Ocultar Configurações" : "Segurança (Alterar Senha)"}
              </button>
            </div>

            {/* Security Config Drawer/Section */}
            {showSecurityConfig && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#0c0c0e] border border-zinc-900 p-6 mb-8 relative"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#b89047]/5 blur-3xl pointer-events-none"></div>
                <h2 className="text-sm font-display font-black text-white uppercase tracking-wider mb-2 inline-flex items-center gap-2">
                  <Shield size={15} className="text-[#b89047]" />
                  Configurações de Segurança e Acesso Privado
                </h2>
                <p className="text-zinc-500 text-xs font-light mb-6">
                  Altere a senha de acesso padrão da BackStage para evitar que qualquer usuário desconhecido acesse as estatísticas e os dados sensíveis dos seus leads.
                </p>

                <form onSubmit={handleChangePassword} className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
                  <div>
                    <label className="block text-zinc-500 text-[9px] font-mono uppercase tracking-wider mb-2">Senha Atual</label>
                    <input
                      type="password"
                      placeholder="Senha atual (padrão: 1234)"
                      value={currentPin}
                      onChange={(e) => setCurrentPin(e.target.value)}
                      className="w-full bg-black border border-zinc-900 focus:border-[#b89047] text-white rounded-none px-4 py-2.5 text-xs font-mono"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-500 text-[9px] font-mono uppercase tracking-wider mb-2">Nova Senha</label>
                    <input
                      type="password"
                      placeholder="No mínimo 4 dígitos"
                      value={newPin}
                      onChange={(e) => setNewPin(e.target.value)}
                      className="w-full bg-black border border-zinc-900 focus:border-[#b89047] text-white rounded-none px-4 py-2.5 text-xs font-mono"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-500 text-[9px] font-mono uppercase tracking-wider mb-2">Confirmar Nova Senha</label>
                    <div className="flex gap-2">
                      <input
                        type="password"
                        placeholder="Repita a nova senha"
                        value={confirmNewPin}
                        onChange={(e) => setConfirmNewPin(e.target.value)}
                        className="w-full bg-black border border-zinc-900 focus:border-[#b89047] text-white rounded-none px-4 py-2.5 text-xs font-mono"
                        required
                      />
                      <button
                        type="submit"
                        disabled={isChangingPassword}
                        className="bg-[#b89047] hover:bg-white hover:text-black text-black px-5 text-xs font-mono uppercase tracking-wider font-bold transition-all disabled:opacity-50 cursor-pointer"
                        id="btn-save-new-password"
                      >
                        {isChangingPassword ? "Salvando..." : "Salvar"}
                      </button>
                    </div>
                  </div>
                </form>

                {passwordMessage && (
                  <div className={`p-3.5 mt-4 text-xs font-mono uppercase tracking-wider border max-w-4xl flex items-center gap-2.5 ${
                    passwordMessage.type === "success" 
                      ? "bg-emerald-950/20 border-emerald-900/40 text-emerald-400" 
                      : "bg-red-950/20 border-red-900/40 text-red-400"
                  }`}>
                    {passwordMessage.type === "success" ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                    <span>{passwordMessage.text}</span>
                  </div>
                )}
              </motion.div>
            )}

            {/* Visual Analytics Charts Section */}
            {showAnalytics && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
              >
                {/* Chart 1: Volume of Leads by Origin */}
                <div className="bg-[#0c0c0e] border border-zinc-900 rounded-none p-6 flex flex-col">
                  <div className="flex justify-between items-start border-b border-zinc-900/60 pb-4 mb-6">
                    <div>
                      <span className="font-mono text-[9px] text-[#b89047] uppercase tracking-[0.2em]">Origens de Captura</span>
                      <h3 className="text-sm font-display font-black text-white uppercase tracking-wider mt-0.5">Volume de Leads por Origem</h3>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-[9px] text-zinc-500 uppercase">Sincronização Ativa</span>
                      <p className="text-[10px] text-emerald-400 font-mono mt-0.5">Google Sheets Live</p>
                    </div>
                  </div>

                  <div className="h-64 w-full">
                    {sourceChartData.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center p-4">
                        <p className="text-zinc-500 text-xs font-mono">Sem dados de origem disponíveis.</p>
                      </div>
                    ) : (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={sourceChartData}
                          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#18181b" vertical={false} />
                          <XAxis 
                            dataKey="name" 
                            stroke="#52525b" 
                            fontSize={10} 
                            fontFamily="monospace"
                            tickLine={false}
                          />
                          <YAxis 
                            stroke="#52525b" 
                            fontSize={10} 
                            fontFamily="monospace"
                            tickLine={false}
                            allowDecimals={false}
                          />
                          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.02)" }} />
                          <Bar dataKey="leads" fill="#b89047" radius={[0, 0, 0, 0]}>
                            {sourceChartData.map((entry, index) => {
                              const colors = ["#b89047", "#e2c28a", "#d4af37", "#a67c1e", "#8c620d"];
                              return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                            })}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </div>

                {/* Chart 2: Daily capture growth trend */}
                <div className="bg-[#0c0c0e] border border-zinc-900 rounded-none p-6 flex flex-col">
                  <div className="flex justify-between items-start border-b border-zinc-900/60 pb-4 mb-6">
                    <div>
                      <span className="font-mono text-[9px] text-emerald-400 uppercase tracking-[0.2em]">Evolução de Performance</span>
                      <h3 className="text-sm font-display font-black text-white uppercase tracking-wider mt-0.5">Crescimento Diário de Capturas</h3>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-[9px] text-zinc-500 uppercase">Período Ativo</span>
                      <p className="text-[10px] text-[#b89047] font-mono mt-0.5">Evolução Temporal</p>
                    </div>
                  </div>

                  <div className="h-64 w-full">
                    {analyticsData.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center p-4">
                        <p className="text-zinc-500 text-xs font-mono">Cadastre leads para visualizar o gráfico de crescimento.</p>
                      </div>
                    ) : (
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={analyticsData}
                          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient id="colorCapturas" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#18181b" vertical={false} />
                          <XAxis 
                            dataKey="date" 
                            stroke="#52525b" 
                            fontSize={10} 
                            fontFamily="monospace"
                            tickLine={false}
                          />
                          <YAxis 
                            stroke="#52525b" 
                            fontSize={10} 
                            fontFamily="monospace"
                            tickLine={false}
                            allowDecimals={false}
                          />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend 
                            verticalAlign="top" 
                            height={36} 
                            iconType="circle"
                            wrapperStyle={{ fontSize: '10px', fontFamily: 'monospace', textTransform: 'uppercase' }}
                          />
                          <Area 
                            type="monotone" 
                            name="Capturas Diárias" 
                            dataKey="capturas" 
                            stroke="#10b981" 
                            strokeWidth={2}
                            fillOpacity={1} 
                            fill="url(#colorCapturas)" 
                          />
                          <Line 
                            type="monotone" 
                            name="Acumulado" 
                            dataKey="acumulado" 
                            stroke="#b89047" 
                            strokeWidth={2}
                            dot={{ r: 3 }}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </>
        );
      })()}

      {/* Main Container Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leads Table */}
        <div className="lg:col-span-2 bg-[#0c0c0e] border border-zinc-900 rounded-none p-6 overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
            <h3 className="text-base font-display font-bold text-white uppercase tracking-tight">Lista de Leads Ativos</h3>
            
            <div className="relative w-full sm:w-64">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600">
                <Search size={12} />
              </span>
              <input 
                type="text" 
                placeholder="Filtrar por nome, empresa..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-black border border-zinc-900 focus:border-[#b89047] text-white rounded-none pl-9 pr-4 py-2 text-xs focus:outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            {filteredLeads.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-zinc-900 rounded-none">
                <Users className="mx-auto text-zinc-700 mb-2" size={32} />
                <p className="text-zinc-500 text-xs font-sans font-light">Nenhum lead encontrado.</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse" id="admin-leads-table">
                <thead>
                  <tr className="border-b border-zinc-900 font-mono text-[9px] text-zinc-500 uppercase tracking-[0.2em]">
                    <th className="py-3 px-4 font-normal">Empresa / Contato</th>
                    <th className="py-3 px-4 font-normal">Segmento</th>
                    <th className="py-3 px-4 font-normal">WhatsApp</th>
                    <th className="py-3 px-4 font-normal">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900/40 text-xs text-zinc-300 font-sans">
                  {filteredLeads.map((lead) => (
                    <tr 
                      key={lead.id} 
                      className={`hover:bg-zinc-900/20 transition-colors ${
                        selectedLead?.id === lead.id ? "bg-zinc-900/30" : ""
                      }`}
                    >
                      <td className="py-4 px-4">
                        <div className="font-bold text-white font-display uppercase tracking-tight text-sm truncate max-w-[180px]">{lead.company}</div>
                        <div className="text-zinc-500 text-[10px] flex items-center gap-1.5 mt-0.5">
                          <span>{lead.name}</span>
                          {lead.instagram && (
                            <span className="text-[#e2c28a] font-mono">@{lead.instagram}</span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-zinc-400 truncate max-w-[150px] font-light">{lead.segment}</td>
                      <td className="py-4 px-4">
                        <a 
                          href={`https://wa.me/${lead.whatsapp.replace(/\D/g, "")}`}
                          target="_blank"
                          referrerPolicy="no-referrer"
                          className="hover:text-[#e2c28a] transition-colors inline-flex items-center gap-1 font-mono text-zinc-400"
                        >
                          {lead.whatsapp}
                          <ExternalLink size={10} className="opacity-60" />
                        </a>
                      </td>
                      <td className="py-4 px-4 flex items-center gap-2">
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="p-2 rounded-none bg-black hover:bg-zinc-900 text-zinc-300 hover:text-white transition-all border border-zinc-900"
                          title="Ver Diagnóstico"
                        >
                          <Eye size={12} />
                        </button>
                        <button
                          onClick={() => handleDeleteLead(lead.id)}
                          className="p-2 rounded-none bg-black hover:bg-red-950/20 text-zinc-600 hover:text-red-400 transition-all border border-zinc-900"
                          title="Excluir Lead"
                        >
                          <Trash2 size={12} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Lead Details Inspect */}
        <div className="bg-[#0c0c0e] border border-zinc-900 rounded-none p-6">
          {selectedLead ? (
            <div className="space-y-6">
              <div className="flex justify-between items-start border-b border-zinc-900 pb-4">
                <div>
                  <span className="text-zinc-500 font-mono text-[9px] uppercase tracking-[0.2em]">Detalhes do Lead</span>
                  <h4 className="text-base font-display font-bold text-white uppercase mt-0.5">{selectedLead.company}</h4>
                </div>
                <button 
                  onClick={() => setSelectedLead(null)}
                  className="p-1 text-zinc-500 hover:text-white rounded-none bg-black border border-zinc-900"
                >
                  <X size={12} />
                </button>
              </div>

              {/* Quick Info Grid */}
              <div className="space-y-4 text-xs font-light">
                <div>
                  <span className="text-zinc-500 font-mono text-[9px] uppercase tracking-[0.15em] block">Contato</span>
                  <span className="text-white font-semibold font-display uppercase tracking-tight text-sm">{selectedLead.name}</span>
                </div>
                <div>
                  <span className="text-zinc-500 font-mono text-[9px] uppercase tracking-[0.15em] block">WhatsApp</span>
                  <a 
                    href={`https://wa.me/${selectedLead.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    className="text-[#e2c28a] hover:underline font-mono"
                  >
                    {selectedLead.whatsapp}
                  </a>
                </div>
                {selectedLead.instagram && (
                  <div>
                    <span className="text-zinc-500 font-mono text-[9px] uppercase tracking-[0.15em] block">Instagram</span>
                    <a 
                      href={`https://instagram.com/${selectedLead.instagram}`}
                      target="_blank"
                      className="text-zinc-400 hover:underline font-mono"
                    >
                      @{selectedLead.instagram}
                    </a>
                  </div>
                )}
                <div>
                  <span className="text-zinc-500 font-mono text-[9px] uppercase tracking-[0.15em] block">Segmento</span>
                  <span className="text-white font-mono uppercase tracking-wider">{selectedLead.segment}</span>
                </div>
                <div>
                  <span className="text-zinc-500 font-mono text-[9px] uppercase tracking-[0.15em] block mb-2">Obstáculos Cadastrados</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedLead.challenges.map((c, i) => (
                      <span key={i} className="px-2.5 py-1 bg-black border border-zinc-900 text-zinc-400 text-[10px] font-mono uppercase tracking-wider">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-zinc-500 font-mono text-[9px] uppercase tracking-[0.15em] block">Registrado em</span>
                  <span className="text-zinc-400 font-mono">{new Date(selectedLead.createdAt).toLocaleString("pt-BR")}</span>
                </div>
              </div>

              {/* Generated AI Diagnostic */}
              <div className="pt-4 border-t border-zinc-900">
                <span className="text-zinc-500 font-mono text-[9px] uppercase tracking-[0.2em] block mb-3">Diagnóstico Gerado pela IA</span>
                {selectedLead.diagnostic ? (
                  <div className="p-4 rounded-none bg-black border border-zinc-900 space-y-4 max-h-[220px] overflow-y-auto">
                    <div>
                      <span className="text-[10px] font-mono text-[#b89047] uppercase tracking-widest font-black">Maturidade Digital: {selectedLead.diagnostic.authorityScore}/100</span>
                      <p className="text-zinc-300 text-xs mt-2 leading-relaxed font-sans font-light">{selectedLead.diagnostic.marketPositioning}</p>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">Ações sugeridas:</span>
                      <ul className="list-decimal list-inside text-xs text-zinc-400 mt-1 space-y-1.5 font-light">
                        {selectedLead.diagnostic.actionPlan.map((p, i) => (
                          <li key={i} className="truncate">{p}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-zinc-600 italic">Nenhum diagnóstico gerado para este lead.</p>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-20 text-zinc-600 font-sans">
              <Users size={32} className="mx-auto mb-3 opacity-30 text-zinc-400" />
              <p className="text-xs font-mono uppercase tracking-widest">Selecione um lead para ver o raio-x</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
