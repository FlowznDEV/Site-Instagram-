import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lead, Diagnostic } from "../types";
import { 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Briefcase, 
  Instagram, 
  Phone, 
  ChevronRight, 
  Terminal, 
  FileText, 
  AlertCircle 
} from "lucide-react";

interface LeadFormProps {
  onComplete: (diagnostic: Diagnostic) => void;
}

const SEGMENTS = [
  "Serviços Locais / Profissional Liberal",
  "Clínicas & Área da Saúde",
  "E-commerce / Vendas Online",
  "Infoprodutos / Educação / Consultoria",
  "B2B / Vendas Corporativas",
  "Varejo Físico / Comércio Geral",
  "Outro Segmento"
];

const CHALLENGES = [
  { id: "followers", label: "Poucos seguidores ou engajamento baixo" },
  { id: "content", label: "Dificuldade de produzir conteúdo consistente" },
  { id: "automation", label: "Atendimento lento ou falta de automações" },
  { id: "ads", label: "Anúncios caros ou sem retorno no Meta Ads" },
  { id: "leads", label: "Dificuldade em atrair leads realmente qualificados" },
  { id: "manual", label: "Processo comercial manual e tarefas repetitivas" }
];

export default function LeadForm({ onComplete }: LeadFormProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingLogs, setLoadingLogs] = useState<string[]>([]);
  
  // Form State
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [instagram, setInstagram] = useState("");
  const [segment, setSegment] = useState("");
  const [challenges, setChallenges] = useState<string[]>([]);

  // Simulation log strings for loading animation
  const LOG_PHASES = [
    "🚀 Iniciando conexão segura com a inteligência artificial BackStage...",
    "📥 Recebendo dados cadastrais da empresa " + company + "...",
    "🔍 Cruzando desafios indicados com estratégias de escala previsível...",
    "🤖 Mapeando funil ideal para o nicho de " + segment + "...",
    "🎯 Modelando recomendações de Tráfego Pago e automações no Direct...",
    "⚡ Otimizando processo comercial e gerando relatório executivo...",
    "✨ Diagnóstico estratégico concluído com sucesso!"
  ];

  useEffect(() => {
    if (!loading) return;

    let index = 0;
    setLoadingLogs([LOG_PHASES[0]]);
    
    const interval = setInterval(() => {
      index++;
      if (index < LOG_PHASES.length) {
        setLoadingLogs(prev => [...prev, LOG_PHASES[index]]);
      } else {
        clearInterval(interval);
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [loading, company, segment]);

  const handleChallengeToggle = (id: string) => {
    setChallenges(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    setError(null);
    if (step === 1) {
      if (!name.trim()) return setError("Por favor, informe seu nome.");
      if (!company.trim()) return setError("Por favor, informe o nome da sua empresa.");
      if (!segment) return setError("Por favor, selecione seu segmento de atuação.");
      setStep(2);
    } else if (step === 2) {
      if (!whatsapp.trim()) return setError("Por favor, informe seu número de WhatsApp.");
      setStep(3);
    }
  };

  const handlePrev = () => {
    setError(null);
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (challenges.length === 0) {
      return setError("Por favor, selecione pelo menos um desafio para personalizar sua análise.");
    }

    setLoading(true);

    // Save lead details
    try {
      const selectedChallengeLabels = CHALLENGES
        .filter(c => challenges.includes(c.id))
        .map(c => c.label);

      // 1. Submit to leads collection
      const leadResponse = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          company,
          whatsapp,
          instagram,
          segment,
          challenges: selectedChallengeLabels
        })
      });

      const leadContentType = leadResponse.headers.get("content-type");
      if (!leadContentType || !leadContentType.includes("application/json")) {
        throw new Error("O servidor retornou uma resposta inválida. Por favor, tente novamente mais tarde.");
      }

      const leadData = await leadResponse.json();
      if (!leadResponse.ok) {
        throw new Error(leadData.error || "Erro ao registrar lead.");
      }

      // 2. Query Gemini strategic analysis (gives a beautiful real-time feel)
      // We wait at least 7.5 seconds to let user read the futuristic loading logs before showing results
      const [diagData] = await Promise.all([
        (async () => {
          const diagResponse = await fetch("/api/diagnostico", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              leadId: leadData.leadId,
              name,
              company,
              whatsapp,
              instagram,
              segment,
              challenges: selectedChallengeLabels
            })
          });
          const diagContentType = diagResponse.headers.get("content-type");
          if (!diagContentType || !diagContentType.includes("application/json")) {
            throw new Error("O servidor retornou uma resposta inválida ao gerar o diagnóstico.");
          }
          const parsed = await diagResponse.json();
          if (!diagResponse.ok) {
            throw new Error(parsed.error || "Erro ao gerar diagnóstico.");
          }
          return parsed;
        })(),
        new Promise(resolve => setTimeout(resolve, 8500)) // Ensure logs complete
      ]);

      onComplete(diagData);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Infelizmente ocorreu um erro ao gerar seu diagnóstico estratégico. Tente novamente.");
      setLoading(false);
    }
  };

  return (
    <motion.div 
      id="lead-form-container"
      animate={{
        borderColor: [
          "rgba(39, 39, 42, 0.4)",      // zinc border base
          "rgba(255, 255, 255, 0.15)",   // subtle white glow
          "rgba(39, 39, 42, 0.4)"       // zinc border base
        ]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="bg-black rounded-none border border-zinc-900 p-8 md:p-10 relative overflow-visible max-w-xl mx-auto"
    >
      {/* Editorial aesthetic monochrome rotation badge */}
      <div className="absolute -top-4 -right-4 bg-white text-black border border-zinc-200 w-24 h-24 rounded-none flex flex-col items-center justify-center text-center p-2 text-[10px] font-mono font-bold leading-none -rotate-6 uppercase select-none tracking-tighter shadow-xl z-20 hover:scale-105 transition-all">
        <span>ESTRATÉGIA</span>
        <span className="text-[8px] tracking-widest mt-1 opacity-90">SOB MEDIDA</span>
      </div>

      {/* Background subtle accent */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-zinc-800/10 blur-2xl rounded-none pointer-events-none"></div>
      
      <AnimatePresence mode="wait">
        {!loading ? (
          <motion.div
            key="form-steps"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Form Header */}
            <div className="mb-8 flex justify-between items-center border-b border-zinc-900 pb-4">
              <div>
                <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.2em]">Etapa {step} de 3</span>
                <h3 className="text-xl font-display font-black text-white uppercase mt-1 tracking-tight">Diagnóstico</h3>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3].map(i => (
                  <div 
                    key={i} 
                    className={`h-1 transition-all duration-300 ${
                      i === step ? "w-8 bg-white" : i < step ? "w-2 bg-zinc-700" : "w-2 bg-zinc-900"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-none bg-zinc-950/40 border border-zinc-800 text-zinc-350 text-xs flex items-start gap-2.5 font-sans"
              >
                <AlertCircle size={16} className="text-zinc-500 flex-shrink-0 mt-0.5" />
                <p>{error}</p>
              </motion.div>
            )}

            {/* Step 1: Company Profile */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
                id="form-step-1"
              >
                <div>
                  <label className="block text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-mono mb-1.5">Qual seu nome?</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Ex: Pedro Moraes"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-transparent border-b border-zinc-800 focus:border-white text-white placeholder-zinc-800 py-2.5 text-sm transition-all focus:outline-none rounded-none px-0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-mono mb-1.5">Qual o nome da sua empresa?</label>
                  <input 
                    type="text" 
                    placeholder="Ex: BackStage Tech"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full bg-transparent border-b border-zinc-800 focus:border-white text-white placeholder-zinc-800 py-2.5 text-sm transition-all focus:outline-none rounded-none px-0"
                  />
                </div>

                <div>
                  <label className="block text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-mono mb-3">Segmento do seu negócio:</label>
                  <div className="grid grid-cols-1 gap-2">
                    {SEGMENTS.map((seg, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSegment(seg)}
                        className={`w-full text-left px-4 py-3 rounded-none border text-xs tracking-wider uppercase transition-all flex justify-between items-center ${
                          segment === seg 
                            ? "bg-zinc-900 border-white text-white font-bold" 
                            : "bg-black border-zinc-900 hover:border-zinc-750 text-zinc-400 hover:text-white"
                        }`}
                      >
                        {seg}
                        {segment === seg && <div className="w-1.5 h-1.5 bg-white animate-pulse"></div>}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    type="button"
                    onClick={handleNext}
                    className="w-full bg-white text-black font-bold uppercase text-xs py-4 tracking-[0.2em] hover:bg-zinc-200 transition-all rounded-none flex items-center justify-center gap-2 group"
                  >
                    Prosseguir
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Digital Channels */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
                id="form-step-2"
              >
                <div>
                  <label className="block text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-mono mb-1.5">Seu WhatsApp de contato comercial:</label>
                  <div className="relative">
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-600 text-sm font-mono flex items-center gap-1.5">
                      <Phone size={12} />
                    </span>
                    <input 
                      type="tel" 
                      placeholder="DDD + Número (Ex: 11 99999-9999)"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full bg-transparent border-b border-zinc-800 focus:border-white text-white placeholder-zinc-700 pl-6 py-2.5 text-sm transition-all focus:outline-none rounded-none"
                    />
                  </div>
                  <p className="text-[10px] text-zinc-600 font-mono mt-2">
                    Utilizado para enviar seu relatório formatado e agendar sua sessão gratuita.
                  </p>
                </div>

                <div>
                  <label className="block text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-mono mb-1.5">Seu Instagram profissional (opcional):</label>
                  <div className="relative">
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-600 text-sm font-mono flex items-center gap-1.5">
                      <Instagram size={12} />
                      @
                    </span>
                    <input 
                      type="text" 
                      placeholder="Ex: backstage.mkt"
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                      className="w-full bg-transparent border-b border-zinc-800 focus:border-white text-white placeholder-zinc-700 pl-8 py-2.5 text-sm transition-all focus:outline-none rounded-none"
                    />
                  </div>
                  <p className="text-[10px] text-zinc-600 font-mono mt-2">
                    Nossa inteligência analisará o feed do seu Instagram em busca de erros graves de posicionamento.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4">
                  <button 
                    type="button"
                    onClick={handlePrev}
                    className="bg-transparent border border-zinc-800 text-zinc-400 hover:text-white font-mono uppercase text-xs py-4 tracking-wider hover:bg-zinc-950 transition-all rounded-none flex items-center justify-center gap-2"
                  >
                    <ArrowLeft size={14} />
                    Voltar
                  </button>
                  <button 
                    type="button"
                    onClick={handleNext}
                    className="bg-white text-black font-bold uppercase text-xs py-4 tracking-[0.2em] hover:bg-zinc-200 transition-all rounded-none flex items-center justify-center gap-2 group"
                  >
                    Prosseguir
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Main Challenges */}
            {step === 3 && (
              <form onSubmit={handleSubmit}>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                  id="form-step-3"
                >
                  <div>
                    <label className="block text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-mono mb-1.5">Qual o seu maior obstáculo?</label>
                    <p className="text-xs text-zinc-400 leading-normal mb-4 font-sans font-light">
                      Selecione um ou mais desafios para calibrar o algoritmo de análise da IA.
                    </p>
                    
                    <div className="grid grid-cols-1 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
                      {CHALLENGES.map((ch) => {
                        const isSelected = challenges.includes(ch.id);
                        return (
                          <button
                            key={ch.id}
                            type="button"
                            onClick={() => handleChallengeToggle(ch.id)}
                            className={`w-full text-left px-4 py-3 rounded-none border text-xs leading-normal transition-all flex items-start gap-3 ${
                              isSelected 
                                ? "bg-zinc-900 border-white text-white font-bold" 
                                : "bg-black border-zinc-900 hover:border-zinc-800 text-zinc-400 hover:text-white"
                            }`}
                          >
                            <span className={`w-4 h-4 rounded-none border flex-shrink-0 flex items-center justify-center font-mono text-[10px] ${
                              isSelected ? "bg-white border-white text-black font-bold" : "border-zinc-800 bg-black"
                            }`}>
                              {isSelected && "✓"}
                            </span>
                            <span className="font-sans font-light">{ch.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-4">
                    <button 
                      type="button"
                      onClick={handlePrev}
                      className="bg-transparent border border-zinc-800 text-zinc-400 hover:text-white font-mono uppercase text-xs py-4 tracking-wider hover:bg-zinc-950 transition-all rounded-none flex items-center justify-center gap-2"
                    >
                      <ArrowLeft size={14} />
                      Voltar
                    </button>
                    <button 
                      type="submit"
                      className="bg-white hover:bg-zinc-200 text-black font-bold uppercase text-xs py-4 tracking-[0.2em] transition-all rounded-none flex items-center justify-center gap-2 shadow-xl group"
                    >
                      Gerar Relatório
                      <Sparkles size={14} className="text-black group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              </form>
            )}
          </motion.div>
        ) : (
          /* Staggered Scanning Log Loader Console */
          <motion.div
            key="loading-screen"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col min-h-[320px] justify-between"
            id="loading-panel"
          >
            <div>
              {/* Header */}
              <div className="flex items-center gap-2 text-white border-b border-zinc-900 pb-4 mb-6 animate-pulse">
                <Terminal size={14} />
                <span className="font-mono text-[10px] tracking-widest uppercase">ENGRENAGEM DE ANÁLISE BACKSTAGE</span>
              </div>

              {/* Console Output Area */}
              <div className="bg-[#000000] border border-zinc-900 rounded-none p-5 font-mono text-[11px] text-zinc-400 space-y-3 h-[240px] overflow-y-auto">
                <AnimatePresence>
                  {loadingLogs.map((log, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4 }}
                      className={`${index === loadingLogs.length - 1 ? "text-white font-bold" : "text-zinc-500"}`}
                    >
                      <span className="text-zinc-800 select-none mr-2">&gt;&gt;</span>
                      {log}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Micro loading bar */}
            <div className="mt-6">
              <div className="w-full bg-zinc-950 border border-zinc-900 h-1.5 rounded-none overflow-hidden">
                <div className="bg-white h-full animate-[loading-bar_8.5s_ease-in-out_forwards]"></div>
              </div>
              <p className="text-center font-mono text-[9px] text-zinc-500 mt-2.5 uppercase tracking-widest animate-pulse">
                Processamento Inteligente em Andamento...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
