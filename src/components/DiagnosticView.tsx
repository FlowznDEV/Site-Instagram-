import React, { useState } from "react";
import { motion } from "motion/react";
import { Diagnostic } from "../types";
import { 
  Sparkles, 
  TrendingUp, 
  MessageSquare, 
  Layers, 
  Smartphone, 
  CheckCircle, 
  ArrowRight, 
  Copy, 
  Check, 
  Download, 
  Zap,
  ArrowLeft
} from "lucide-react";

interface DiagnosticViewProps {
  diagnostic: Diagnostic;
  onReset: () => void;
}

export default function DiagnosticView({ diagnostic, onReset }: DiagnosticViewProps) {
  const [activeTab, setActiveTab] = useState<"social" | "automation" | "traffic">("social");
  const [copied, setCopied] = useState(false);

  const scoreColor = (score: number) => {
    if (score > 85) return "text-white border-white/40";
    if (score > 70) return "text-zinc-300 border-zinc-300/30";
    return "text-zinc-400 border-zinc-400/20";
  };

  const getScoreLabel = (score: number) => {
    if (score > 85) return "Alta Maturidade (Escala Próxima)";
    if (score > 70) return "Maturidade Intermediária (Gargalos de Conversão)";
    return "Maturidade Inicial (Ação Urgente Necessária)";
  };

  const copyToClipboard = () => {
    const text = `
🏆 DIAGNÓSTICO ESTRATÉGICO - BACKSTAGE
Empresa: ${diagnostic.companyName}
Maturação Digital: ${diagnostic.authorityScore}/100

📍 Posicionamento de Mercado:
${diagnostic.marketPositioning}

📱 Gestão de Redes Sociais:
${diagnostic.socialMediaAdvice.map((a, i) => `${i + 1}. ${a}`).join("\n")}

🤖 Automação Comercial:
${diagnostic.automationAdvice.map((a, i) => `${i + 1}. ${a}`).join("\n")}

🎯 Tráfego Pago (Meta Ads):
${diagnostic.trafficAdvice.map((a, i) => `${i + 1}. ${a}`).join("\n")}

🚀 Plano de Ação Imediato:
${diagnostic.actionPlan.map((a, i) => `[ ] ${a}`).join("\n")}

📈 Potencial Estimado: ${diagnostic.estimatedGrowthPotential}
    `;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const triggerPrint = () => {
    window.print();
  };

  // Build custom WhatsApp Link
  const waPhone = "5511999999999"; // Replaced with actual or dynamic if needed, default is a placeholder WhatsApp
  const waText = encodeURIComponent(
    `Olá BackStage! Acabei de gerar o Diagnóstico Estratégico da minha empresa (${diagnostic.companyName}) com Score de ${diagnostic.authorityScore}/100 e gostaria de agendar meu diagnóstico gratuito de 30 minutos.`
  );
  const waLink = `https://wa.me/${waPhone}?text=${waText}`;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto px-4 py-8 print:p-0"
      id="diagnostic-container"
    >
      {/* Header Buttons */}
      <div className="flex justify-between items-center mb-10 print:hidden">
        <button 
          onClick={onReset}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-xs font-mono uppercase tracking-wider group"
          id="btn-back-to-form"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Fazer Nova Análise
        </button>

        <div className="flex gap-2">
          <button 
            onClick={copyToClipboard}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-none bg-[#0c0c0e] border border-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-900 transition-all text-xs font-mono uppercase tracking-wider"
            id="btn-copy-diagnostic"
          >
            {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
            {copied ? "Copiado!" : "Copiar Diagnóstico"}
          </button>
          <button 
            onClick={triggerPrint}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-none bg-[#0c0c0e] border border-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-900 transition-all text-xs font-mono uppercase tracking-wider"
            id="btn-print-diagnostic"
          >
            <Download size={14} />
            Imprimir PDF
          </button>
        </div>
      </div>

      {/* Hero Header */}
      <div className="text-center mb-12 print:mt-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-zinc-950 border border-zinc-800 text-zinc-400 text-[10px] font-mono uppercase tracking-[0.2em] mb-4">
          <Sparkles size={11} />
          Análise de Inteligência Artificial Realizada
        </div>
        <h1 className="text-3xl md:text-5xl font-display font-black tracking-tight text-white mb-2 uppercase">
          Diagnóstico <span className="font-serif italic font-light text-zinc-300 normal-case">Estratégico</span>
        </h1>
        <p className="text-zinc-400 font-sans font-light text-sm md:text-base max-w-xl mx-auto">
          Preparado especificamente para a empresa <span className="text-white font-semibold font-display">{diagnostic.companyName}</span> para acelerar captação de clientes.
        </p>
      </div>

      {/* Main Stats Block */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Score Card */}
        <div className="md:col-span-1 bg-[#0c0c0e] rounded-none border border-zinc-900 p-6 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 text-zinc-500">
            <Zap size={100} />
          </div>
          <div>
            <h3 className="text-zinc-400 text-[10px] font-mono tracking-[0.2em] uppercase mb-1">Maturidade Digital</h3>
            <p className="text-xs text-zinc-500 leading-relaxed font-sans mb-4">Seu índice de prontidão para escala de vendas.</p>
          </div>
          <div className="my-2 flex flex-col items-center justify-center">
            <div className={`w-32 h-32 rounded-full border-2 flex flex-col items-center justify-center relative ${scoreColor(diagnostic.authorityScore)}`}>
              <span className="text-4xl font-display font-black">{diagnostic.authorityScore}</span>
              <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest mt-0.5">/ 100</span>
            </div>
            <p className="text-[10px] text-center font-mono mt-4 text-zinc-300 uppercase tracking-wider">
              {getScoreLabel(diagnostic.authorityScore)}
            </p>
          </div>
        </div>

        {/* Positioning Card */}
        <div className="md:col-span-2 bg-[#0c0c0e] rounded-none border border-zinc-900 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={14} className="text-zinc-400" />
              <h3 className="text-zinc-400 text-[10px] font-mono tracking-[0.2em] uppercase">Posicionamento & Otimização</h3>
            </div>
            <h4 className="text-base font-display font-bold text-white uppercase mb-3">Perspectiva de Marca</h4>
            <p className="text-zinc-300 text-sm leading-relaxed font-sans font-light">
              {diagnostic.marketPositioning}
            </p>
          </div>
          <div className="pt-6 border-t border-zinc-900 flex items-center justify-between">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Potencial Estimado de Escala:</span>
            <span className="text-xs font-mono font-black text-white uppercase tracking-wider px-3 py-1.5 rounded-none bg-black border border-zinc-900">
              {diagnostic.estimatedGrowthPotential}
            </span>
          </div>
        </div>
      </div>

      {/* Tabbed Recommendations */}
      <div className="bg-[#0c0c0e] rounded-none border border-zinc-900 overflow-hidden mb-8">
        {/* Tab triggers */}
        <div className="flex border-b border-zinc-900 overflow-x-auto">
          <button
            onClick={() => setActiveTab("social")}
            className={`flex-1 py-4.5 px-6 text-xs font-mono uppercase tracking-[0.15em] border-b-2 transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
              activeTab === "social" 
                ? "border-white text-white bg-zinc-900/10" 
                : "border-transparent text-zinc-500 hover:text-zinc-200"
            }`}
            id="tab-social"
          >
            <Smartphone size={14} className={activeTab === "social" ? "text-white" : "text-zinc-500"} />
            Redes Sociais
          </button>
          <button
            onClick={() => setActiveTab("automation")}
            className={`flex-1 py-4.5 px-6 text-xs font-mono uppercase tracking-[0.15em] border-b-2 transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
              activeTab === "automation" 
                ? "border-white text-white bg-zinc-900/10" 
                : "border-transparent text-zinc-500 hover:text-zinc-200"
            }`}
            id="tab-automation"
          >
            <MessageSquare size={14} className={activeTab === "automation" ? "text-white" : "text-zinc-500"} />
            Automação Comercial
          </button>
          <button
            onClick={() => setActiveTab("traffic")}
            className={`flex-1 py-4.5 px-6 text-xs font-mono uppercase tracking-[0.15em] border-b-2 transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
              activeTab === "traffic" 
                ? "border-white text-white bg-zinc-900/10" 
                : "border-transparent text-zinc-500 hover:text-zinc-200"
            }`}
            id="tab-traffic"
          >
            <Layers size={14} className={activeTab === "traffic" ? "text-white" : "text-zinc-500"} />
            Tráfego Pago
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 md:p-8">
          {activeTab === "social" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4" id="content-social">
              <p className="text-zinc-500 text-[9px] font-mono uppercase tracking-[0.2em] mb-4">Estratégias de Posicionamento, Alcance e Engajamento:</p>
              {diagnostic.socialMediaAdvice.map((advice, idx) => (
                <div key={idx} className="flex gap-4 p-5 rounded-none bg-black/20 border border-zinc-900/80 hover:border-zinc-800 transition-all">
                  <span className="flex-shrink-0 w-6 h-6 rounded-none bg-zinc-950 border border-zinc-850 text-white font-mono text-xs flex items-center justify-center font-bold">
                    0{idx + 1}
                  </span>
                  <p className="text-zinc-300 text-xs leading-relaxed font-sans font-light">{advice}</p>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "automation" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4" id="content-automation">
              <p className="text-zinc-500 text-[9px] font-mono uppercase tracking-[0.2em] mb-4">Engrenagens de Atendimento e Nutrição de Leads:</p>
              {diagnostic.automationAdvice.map((advice, idx) => (
                <div key={idx} className="flex gap-4 p-5 rounded-none bg-black/20 border border-zinc-900/80 hover:border-zinc-800 transition-all">
                  <span className="flex-shrink-0 w-6 h-6 rounded-none bg-zinc-950 border border-zinc-850 text-white font-mono text-xs flex items-center justify-center font-bold">
                    0{idx + 1}
                  </span>
                  <p className="text-zinc-300 text-xs leading-relaxed font-sans font-light">{advice}</p>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "traffic" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4" id="content-traffic">
              <p className="text-zinc-500 text-[9px] font-mono uppercase tracking-[0.2em] mb-4">Alavancagem Comercial no Meta Ads (Instagram/Facebook):</p>
              {diagnostic.trafficAdvice.map((advice, idx) => (
                <div key={idx} className="flex gap-4 p-5 rounded-none bg-black/20 border border-zinc-900/80 hover:border-zinc-800 transition-all">
                  <span className="flex-shrink-0 w-6 h-6 rounded-none bg-zinc-950 border border-zinc-850 text-white font-mono text-xs flex items-center justify-center font-bold">
                    0{idx + 1}
                  </span>
                  <p className="text-zinc-300 text-xs leading-relaxed font-sans font-light">{advice}</p>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Action Plan */}
      <div className="bg-[#0c0c0e] rounded-none border border-zinc-900 p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-white"></div>
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle size={16} className="text-zinc-400" />
          <h3 className="text-zinc-400 text-[10px] font-mono tracking-[0.2em] uppercase">Próximos Passos recomendados pela BackStage</h3>
        </div>
        <h4 className="text-lg font-display font-black text-white mb-6 uppercase tracking-tight">Cronograma de Ação de Alto Impacto</h4>
        
        <div className="space-y-4">
          {diagnostic.actionPlan.map((step, idx) => (
            <div key={idx} className="flex items-start gap-4 p-4 rounded-none bg-black/10 border border-zinc-900">
              <div className="w-5 h-5 rounded-none border border-zinc-800 text-white text-xs font-bold flex items-center justify-center bg-zinc-950 mt-0.5">
                {idx + 1}
              </div>
              <div className="flex-1">
                <p className="text-white text-xs font-sans leading-relaxed font-light">{step}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Box - High Converting Consultation */}
      <div className="bg-black border border-zinc-900 p-8 md:p-12 text-center relative overflow-hidden print:hidden rounded-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-zinc-950 blur-3xl rounded-none pointer-events-none"></div>
        
        <h3 className="text-zinc-500 text-[10px] font-mono tracking-[0.2em] uppercase mb-3">Dê o próximo passo em direção à escala</h3>
        <h2 className="text-2xl md:text-3xl font-display font-black text-white uppercase tracking-tight mb-4">
          Sua Estratégia Está Pronta. <br />
          <span className="font-serif italic font-light text-zinc-300 normal-case">Vamos ativar esse sistema juntos?</span>
        </h2>
        <p className="text-zinc-400 text-xs max-w-lg mx-auto leading-relaxed mb-8 font-sans font-light">
          Esse diagnóstico gerado pela IA é o primeiro passo. No entanto, o verdadeiro diferencial está na execução cirúrgica. Agende um <span className="text-white font-medium">diagnóstico estratégico individual gratuito</span> comigo para traçarmos o plano perfeito para sua marca.
        </p>

        <a 
          href={waLink}
          target="_blank"
          referrerPolicy="no-referrer"
          className="inline-flex items-center gap-3 bg-white text-black font-mono uppercase text-xs tracking-[0.2em] font-bold px-8 py-4.5 rounded-none hover:bg-zinc-200 transition-all shadow-xl active:scale-98 group"
          id="btn-whatsapp-cta"
        >
          Confirmar Diagnóstico no WhatsApp
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </a>

        <p className="text-[10px] font-mono text-zinc-500 mt-6 tracking-wide">
          🎉 Campanha 20% OFF válida por tempo limitado até 10/08 em planos fechados pós-reunião.
        </p>
      </div>
    </motion.div>
  );
}
