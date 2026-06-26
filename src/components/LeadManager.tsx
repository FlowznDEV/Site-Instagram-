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
  Eye
} from "lucide-react";

export default function LeadManager() {
  const [pin, setPin] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [leads, setLeads] = useState<AdminLead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selectedLead, setSelectedLead] = useState<AdminLead | null>(null);

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

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "PIN de acesso incorreto.");
      }

      setLeads(data.leads || []);
      setIsAuthenticated(true);
      // Save authenticated state locally for session convenience
      sessionStorage.setItem("backstage_admin_pin", pin);
    } catch (err: any) {
      setError(err.message || "Erro ao efetuar login.");
    } finally {
      setLoading(false);
    }
  };

  const fetchLeads = async () => {
    setError(null);
    setLoading(true);
    const activePin = pin || sessionStorage.getItem("backstage_admin_pin");
    if (!activePin) return;

    try {
      const response = await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: activePin })
      });

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

    const activePin = pin || sessionStorage.getItem("backstage_admin_pin");
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
    const savedPin = sessionStorage.getItem("backstage_admin_pin");
    if (savedPin) {
      setPin(savedPin);
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchLeads();
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    sessionStorage.removeItem("backstage_admin_pin");
    setPin("");
    setIsAuthenticated(false);
    setLeads([]);
    setSelectedLead(null);
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
          <div className="absolute top-0 left-0 w-full h-1 bg-red-600"></div>
          
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-12 h-12 rounded-none bg-black border border-zinc-900 text-red-500 flex items-center justify-center mb-4">
              <Lock size={20} />
            </div>
            <h1 className="text-lg font-display font-black text-white uppercase tracking-[0.18em]">
              BACK<span className="text-red-500 font-light">STAGE</span> LEADS
            </h1>
            <p className="text-zinc-500 text-xs font-sans mt-1 font-light">Insira seu PIN de acesso para visualizar e exportar os leads captados.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4" id="admin-login-form">
            {error && (
              <div className="p-4 rounded-none bg-red-950/20 border border-red-900/40 text-red-400 text-xs flex items-center gap-2 font-mono uppercase tracking-wider">
                <AlertCircle size={14} />
                <span>{error}</span>
              </div>
            )}
            
            <div>
              <label className="block text-zinc-500 text-[10px] font-mono uppercase tracking-[0.2em] mb-2">Código PIN Administrativo</label>
              <input 
                type="password" 
                placeholder="Insira o PIN (padrão: 1234)"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full bg-black border border-zinc-900 focus:border-red-600 text-white rounded-none px-4 py-3 text-sm focus:outline-none focus:ring-0 text-center tracking-[0.25em] font-mono"
                required
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-white hover:text-black text-white font-mono uppercase text-xs py-4 px-8 tracking-[0.2em] transition-all rounded-none font-black disabled:opacity-50"
            >
              {loading ? "Autenticando..." : "Acessar Dashboard"}
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
            <span className="w-2 h-2 rounded-none bg-red-600 animate-pulse"></span>
            <span className="font-mono text-[9px] text-red-500 uppercase tracking-[0.2em]">Gestão privada ativa</span>
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
            className="flex-1 md:flex-none px-4 py-2.5 rounded-none bg-black border border-red-950/40 text-red-500 hover:text-red-300 hover:bg-red-950/10 transition-all text-xs font-mono uppercase tracking-wider"
            id="btn-admin-logout"
          >
            Sair
          </button>
        </div>
      </div>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#0c0c0e] border border-zinc-900 rounded-none p-6 flex items-center gap-4">
          <div className="w-10 h-10 rounded-none bg-red-950/20 border border-red-900/30 text-red-500 flex items-center justify-center">
            <Users size={16} />
          </div>
          <div>
            <p className="text-zinc-500 text-[9px] font-mono uppercase tracking-[0.2em]">Total de Leads</p>
            <h3 className="text-2xl font-display font-black text-white">{leads.length}</h3>
          </div>
        </div>

        <div className="bg-[#0c0c0e] border border-zinc-900 rounded-none p-6 flex items-center gap-4">
          <div className="w-10 h-10 rounded-none bg-red-950/20 border border-red-900/30 text-red-500 flex items-center justify-center">
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
          <div className="w-10 h-10 rounded-none bg-red-950/20 border border-red-900/30 text-red-500 flex items-center justify-center">
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
          <div className="w-10 h-10 rounded-none bg-red-950/20 border border-red-900/30 text-red-500 flex items-center justify-center">
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
                className="w-full bg-black border border-zinc-900 focus:border-red-600 text-white rounded-none pl-9 pr-4 py-2 text-xs focus:outline-none"
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
                            <span className="text-red-500 font-mono">@{lead.instagram}</span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-zinc-400 truncate max-w-[150px] font-light">{lead.segment}</td>
                      <td className="py-4 px-4">
                        <a 
                          href={`https://wa.me/${lead.whatsapp.replace(/\D/g, "")}`}
                          target="_blank"
                          referrerPolicy="no-referrer"
                          className="hover:text-red-400 transition-colors inline-flex items-center gap-1 font-mono text-zinc-400"
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
                    className="text-red-400 hover:underline font-mono"
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
                      <span className="text-[10px] font-mono text-red-500 uppercase tracking-widest font-black">Maturidade Digital: {selectedLead.diagnostic.authorityScore}/100</span>
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
