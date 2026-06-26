import React, { useState, useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { 
  Instagram, 
  MessageSquare, 
  Layers, 
  TrendingUp, 
  Sparkles, 
  Target, 
  ShieldCheck, 
  ArrowRight,
  Eye,
  Info,
  ChevronDown,
  Plus,
  Lock,
  Activity,
  Terminal
} from "lucide-react";
import LeadForm from "./components/LeadForm";
import DiagnosticView from "./components/DiagnosticView";
import LeadManager from "./components/LeadManager";
import { Diagnostic } from "./types";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [diagnostic, setDiagnostic] = useState<Diagnostic | null>(null);
  const [isAdminView, setIsAdminView] = useState(false);
  const [showSEOCloud, setShowSEOCloud] = useState(false);

  const diagnosticFormRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    diagnosticFormRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDiagnosticComplete = (data: Diagnostic) => {
    setDiagnostic(data);
    scrollToForm();
  };

  const handleReset = () => {
    setDiagnostic(null);
  };

  // Strategic authority words highlighted as requested
  const renderHighlightedText = (text: string, highlights: string[]) => {
    let result = text;
    // Simple but robust highlight parser
    highlights.forEach(h => {
      const regex = new RegExp(`(${h})`, "gi");
      result = result.replace(regex, `<span class="text-red-500 font-semibold border-b border-red-600/20">$1</span>`);
    });
    return <span dangerouslySetInnerHTML={{ __html: result }} />;
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-red-600 selection:text-white ambient-bg relative overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[3px] bg-red-600 origin-left z-[100] print:hidden" 
        style={{ scaleX }} 
      />

      {/* Decorative Editorial Grid Lines */}
      <div className="absolute inset-y-0 left-4 sm:left-6 lg:left-12 w-[1px] bg-zinc-900/40 pointer-events-none z-0"></div>
      <div className="absolute inset-y-0 right-4 sm:right-6 lg:right-12 w-[1px] bg-zinc-900/40 pointer-events-none z-0"></div>

      {/* Background Animated Glows - premium and immersive */}
      <div className="absolute top-0 inset-x-0 h-[1000px] overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.25, 0.15],
            x: [0, 40, 0],
            y: [0, -30, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[-5%] left-[10%] w-[500px] h-[500px] rounded-full bg-red-600/10 blur-[130px]"
        />
        <motion.div 
          animate={{
            scale: [1, 1.18, 1],
            opacity: [0.08, 0.16, 0.08],
            x: [0, -50, 0],
            y: [0, 40, 0]
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[20%] right-[8%] w-[550px] h-[550px] rounded-full bg-red-950/25 blur-[150px]"
        />
      </div>

      {/* 20% Promo Banner */}
      <div className="w-full bg-red-600 text-white py-2.5 px-4 text-center text-xs font-mono uppercase tracking-[0.18em] flex items-center justify-center gap-2.5 relative z-50 shadow-[0_2px_20px_rgba(220,38,38,0.3)] print:hidden">
        <span className="inline-flex h-2 w-2 rounded-none bg-white animate-pulse"></span>
        <span>🎉 20% OFF EM MARKETING E AUTOMAÇÕES ATÉ 10/08</span>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Navigation Bar / Minimal Header */}
        <header className="py-8 flex justify-between items-center border-b border-zinc-900 mb-12 md:mb-16 print:hidden relative">
          {/* Intersection crosses for Swiss look */}
          <span className="absolute -bottom-1.5 -left-1.5 text-zinc-800 font-mono text-[10px] pointer-events-none select-none">+</span>
          <span className="absolute -bottom-1.5 -right-1.5 text-zinc-800 font-mono text-[10px] pointer-events-none select-none">+</span>

          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setIsAdminView(false)}>
            <div className="w-8 h-8 bg-red-600 text-white font-display font-black text-lg flex items-center justify-center tracking-tighter rounded-none group-hover:scale-105 transition-transform duration-300">
              B
            </div>
            <span className="text-xl font-display font-black tracking-[0.22em] text-white uppercase">
              BACK<span className="text-red-600 font-light tracking-[0.12em]">STAGE</span><span className="text-red-600">.</span>
            </span>
          </div>

          <div className="flex items-center gap-6">
            {/* System Status Tracker Indicator */}
            <div className="hidden md:flex items-center gap-2 bg-zinc-950 border border-zinc-900 px-3 py-1.5 rounded-none text-[9px] font-mono tracking-widest text-zinc-500">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              SISTEMA ONLINE / CRONOGRAMA INTEGRADO
            </div>

            <button
              onClick={() => setIsAdminView(!isAdminView)}
              className="text-[10px] font-mono text-zinc-400 hover:text-red-500 transition-colors uppercase tracking-[0.2em] flex items-center gap-1.5 border border-zinc-900 hover:border-red-900/50 px-3.5 py-1.5 bg-zinc-950/40"
              id="admin-toggle-nav"
            >
              <Eye size={11} />
              {isAdminView ? "Voltar ao Site" : "Gestão privada"}
            </button>
          </div>
        </header>

        {isAdminView ? (
          /* Admin / Leads Dashboard */
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="min-h-[70vh] pb-24"
          >
            <LeadManager />
          </motion.div>
        ) : (
          /* Landing Page Content */
          <main className="pb-24">
            {/* Split Screen Hero Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-28">
              {/* Left Column: Copy & Messaging with staggered animations */}
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="lg:col-span-7 space-y-6 md:space-y-7 max-w-2xl relative"
              >
                {/* Structural Corner Marks for high design aesthetics */}
                <div className="absolute -top-3 -left-3 w-4 h-4 border-t border-l border-zinc-850 pointer-events-none"></div>
                <div className="absolute -bottom-3 -right-3 w-4 h-4 border-b border-r border-zinc-850 pointer-events-none"></div>

                <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-none bg-zinc-950/80 border border-zinc-900 text-zinc-400 text-[9px] font-mono uppercase tracking-[0.22em] w-fit">
                  <span className="w-1.5 h-1.5 bg-red-600 animate-pulse"></span>
                  MARKETING EXECUTIVO & ESCALA COMERCIAL
                </motion.div>

                <motion.h1 
                  variants={itemVariants} 
                  className="text-4xl sm:text-5xl lg:text-[52px] xl:text-[58px] font-display font-black tracking-tight text-white uppercase leading-[1.05] md:leading-[1.01]"
                >
                  Nós construímos o seu <br />
                  <span className="font-serif italic font-light text-red-600 normal-case block mt-1.5 select-none tracking-normal">
                    sistema de vendas
                  </span>
                </motion.h1>

                <motion.div variants={itemVariants} className="space-y-5 text-zinc-400 text-sm md:text-base leading-relaxed font-sans font-light max-w-xl">
                  <p className="font-medium text-white text-base md:text-lg leading-snug">
                    {renderHighlightedText(
                      "Se você busca atrair leads qualificados, consolidar sua marca e estruturar um processo comercial eficiente, essa é a engrenagem perfeita.",
                      ["processo comercial eficiente", "leads qualificados"]
                    )}
                  </p>
                  
                  <p className="text-zinc-400 text-justify">
                    Na <span className="text-white font-semibold font-display">BackStage</span>, eu desenvolvo estratégias completas para que sua marca domine o mercado digital através de posicionamento estratégico, automações completas e tráfego altamente qualificado.
                  </p>
                  
                  <p className="border-l-2 border-red-600 pl-4 py-2 italic text-zinc-400 font-serif leading-relaxed bg-zinc-950/40 pr-3">
                    {renderHighlightedText(
                      "Enquanto você lidera sua operação interna, eu estruturo e otimizo todo o ecossistema estratégico de atração e vendas nas suas redes sociais.",
                      ["ecossistema estratégico", "atração e vendas"]
                    )}
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3.5 pt-4">
                  <button
                    onClick={scrollToForm}
                    className="bg-red-600 hover:bg-white hover:text-black text-white font-mono uppercase text-[11px] py-4.5 px-8 tracking-[0.2em] font-bold transition-all rounded-none flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(220,38,38,0.25)] hover:shadow-[0_0_35px_rgba(220,38,38,0.45)] active:scale-98 group"
                    id="hero-cta-btn"
                  >
                    👉 QUERO MEU DIAGNÓSTICO GRATUITO
                    <ArrowRight size={13} className="group-hover:translate-x-1.5 transition-transform" />
                  </button>

                  <a
                    href="#how-i-help"
                    className="px-8 py-4.5 rounded-none bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 text-zinc-300 hover:text-white transition-all text-center text-[11px] font-mono uppercase tracking-[0.18em] flex items-center justify-center"
                  >
                    Conhecer Serviços
                  </a>
                </motion.div>
              </motion.div>

              {/* Right Column: Lead Form & Diagnostic Display */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                ref={diagnosticFormRef} 
                className="lg:col-span-5 scroll-mt-6 w-full"
              >
                {!diagnostic ? (
                  <LeadForm onComplete={handleDiagnosticComplete} />
                ) : (
                  <DiagnosticView diagnostic={diagnostic} onReset={handleReset} />
                )}
              </motion.div>
            </div>

            {/* Services Section: "Como posso ajudar sua empresa" */}
            <section id="how-i-help" className="mb-32 scroll-mt-16">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="text-center mb-20 relative"
              >
                <span className="text-red-500 font-mono text-[10px] uppercase tracking-[0.25em] block mb-2">Nosso Ecossistema</span>
                <h2 className="text-3xl md:text-4xl lg:text-[40px] font-display font-black text-white uppercase mt-1 tracking-tight">
                  Como posso alavancar sua <span className="font-serif italic font-light text-red-600 normal-case">operação</span>
                </h2>
                <div className="w-16 h-0.5 bg-red-600 mx-auto mt-5"></div>
              </motion.div>

              {/* Bento Grid Services with redesigned premium hover micro-interactions */}
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {/* 1. Redes Sociais */}
                <motion.div 
                  variants={itemVariants}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="bg-[#08080a] border border-zinc-900 hover:border-red-600/50 p-8 rounded-none transition-colors duration-350 group relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                  <div className="w-11 h-11 rounded-none bg-red-950/20 border border-red-900/30 text-red-500 flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                    <Instagram size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  <h3 className="text-lg font-display font-extrabold text-white uppercase mb-3.5 tracking-tight flex items-center gap-2">
                    Gestão de Redes Sociais
                    <span className="text-[10px] text-zinc-700 font-mono font-normal">/01</span>
                  </h3>
                  <p className="text-zinc-400 text-xs leading-relaxed font-sans font-light text-justify">
                    Desenvolvo planejamento estratégico direcionado, produzo conteúdo original, edito vídeos de alta retenção, consolido sua identidade visual e gerencio seu Instagram para maximizar alcance e converter visitantes em leads qualificados.
                  </p>
                </motion.div>

                {/* 2. Automação Comercial */}
                <motion.div 
                  variants={itemVariants}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="bg-[#08080a] border border-zinc-900 hover:border-red-600/50 p-8 rounded-none transition-colors duration-350 group relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                  <div className="w-11 h-11 rounded-none bg-red-950/20 border border-red-900/30 text-red-500 flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                    <MessageSquare size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  <h3 className="text-lg font-display font-extrabold text-white uppercase mb-3.5 tracking-tight flex items-center gap-2">
                    Automação Comercial
                    <span className="text-[10px] text-zinc-700 font-mono font-normal">/02</span>
                  </h3>
                  <p className="text-zinc-400 text-xs leading-relaxed font-sans font-light text-justify">
                    Implemento fluxos automatizados de atendimento para WhatsApp e Direct do Instagram. Filtre curiosos, qualifique leads, dispare mensagens automáticas e execute follow-ups precisos sem precisar de horas extras manuais.
                  </p>
                </motion.div>

                {/* 3. Tráfego Pago */}
                <motion.div 
                  variants={itemVariants}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="bg-[#08080a] border border-zinc-900 hover:border-red-600/50 p-8 rounded-none transition-colors duration-350 group relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                  <div className="w-11 h-11 rounded-none bg-red-950/20 border border-red-900/30 text-red-500 flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                    <TrendingUp size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  <h3 className="text-lg font-display font-extrabold text-white uppercase mb-3.5 tracking-tight flex items-center gap-2">
                    Tráfego Pago
                    <span className="text-[10px] text-zinc-700 font-mono font-normal">/03</span>
                  </h3>
                  <p className="text-zinc-400 text-xs leading-relaxed font-sans font-light text-justify">
                    Crio e otimizo campanhas profissionais no Meta Ads (Facebook e Instagram) com foco direto em vendas. Atraia um público altamente propenso à compra, minimize custos por lead e expanda suas vendas de forma inteligente.
                  </p>
                </motion.div>

                {/* 4. Captação de Leads */}
                <motion.div 
                  variants={itemVariants}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="bg-[#08080a] border border-zinc-900 hover:border-red-600/50 p-8 rounded-none transition-colors duration-350 group md:col-span-1 lg:col-span-1 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                  <div className="w-11 h-11 rounded-none bg-red-950/20 border border-red-900/30 text-red-500 flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                    <Target size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  <h3 className="text-lg font-display font-extrabold text-white uppercase mb-3.5 tracking-tight flex items-center gap-2">
                    Captação de Leads
                    <span className="text-[10px] text-zinc-700 font-mono font-normal">/04</span>
                  </h3>
                  <p className="text-zinc-400 text-xs leading-relaxed font-sans font-light text-justify">
                    Estruturo funis de captura completos com landing pages velozes e integradas. Converta tráfego disperso em contatos quentes e prontos para contato do seu time de vendas de forma totalmente automática.
                  </p>
                </motion.div>

                {/* 5. Planos Personalizados */}
                <motion.div 
                  variants={itemVariants}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="bg-[#08080a] border border-zinc-900 hover:border-red-600/50 p-8 rounded-none transition-colors duration-350 group md:col-span-2 lg:col-span-2 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                  <div className="w-11 h-11 rounded-none bg-red-950/20 border border-red-900/30 text-red-500 flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                    <ShieldCheck size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  <h3 className="text-lg font-display font-extrabold text-white uppercase mb-3.5 tracking-tight flex items-center gap-2">
                    Planos Personalizados sob Demanda
                    <span className="text-[10px] text-zinc-700 font-mono font-normal">/05</span>
                  </h3>
                  <p className="text-zinc-400 text-xs leading-relaxed font-sans font-light text-justify">
                    Nenhum negócio de sucesso cresce com fórmulas genéricas. Eu analiso o cenário real da sua empresa e configuro um pacote customizado combinando exatamente as soluções que você precisa para bater suas metas.
                  </p>
                </motion.div>
              </motion.div>
            </section>

            {/* Growth System Section - Highly formatted and luxury feel */}
            <motion.section 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-32 py-16 px-8 md:px-16 bg-[#08080a] border border-zinc-900 rounded-none relative overflow-hidden group"
            >
              {/* Intersection marks inside the box */}
              <span className="absolute top-2 left-2 text-zinc-800 font-mono text-[9px] pointer-events-none">+</span>
              <span className="absolute top-2 right-2 text-zinc-800 font-mono text-[9px] pointer-events-none">+</span>
              <span className="absolute bottom-2 left-2 text-zinc-800 font-mono text-[9px] pointer-events-none">+</span>
              <span className="absolute bottom-2 right-2 text-zinc-800 font-mono text-[9px] pointer-events-none">+</span>

              <div className="absolute top-0 right-0 w-72 h-72 bg-red-950/5 blur-3xl rounded-full pointer-events-none"></div>
              
              <div className="max-w-3xl mx-auto space-y-6 text-center">
                <span className="text-red-500 font-mono text-[10px] uppercase tracking-[0.25em] block">Sua Alavanca de Negócios</span>
                <h2 className="text-3xl md:text-4xl font-display font-black text-white uppercase tracking-tight leading-none">
                  Mais do que marketing. Um <span className="font-serif italic font-light text-red-600 normal-case">sistema de crescimento</span>.
                </h2>
                
                <p className="text-zinc-500 text-xs font-mono uppercase tracking-[0.2em]">
                  CONEXÃO INTEGRADA DA SUA MARCA AO CONSUMIDOR FINAL.
                </p>

                <p className="text-white text-base md:text-lg leading-relaxed font-sans font-light">
                  {renderHighlightedText(
                    "Construímos processos previsíveis de aquisição de clientes, unindo redes sociais qualificadas, anúncios otimizados e automação inteligente para gerar receita real.",
                    ["processos previsíveis", "automação inteligente", "receita real"]
                  )}
                </p>

                <p className="text-zinc-500 text-xs md:text-sm leading-relaxed pt-2 font-light max-w-2xl mx-auto">
                  A estratégia ideal elimina o trabalho manual cansativo e foca diretamente naquilo que traz retorno sustentável. É exatamente esse ecossistema sólido que vou desenhar para sua marca.
                </p>

                <div className="pt-8">
                  <button
                    onClick={scrollToForm}
                    className="inline-flex items-center gap-2.5 px-8 py-4.5 rounded-none bg-white hover:bg-red-600 hover:text-white text-black font-mono uppercase text-xs tracking-[0.22em] font-black transition-all"
                  >
                    AGENDAR DIAGNÓSTICO AGORA
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.section>

            {/* CTA Final Block - Perfectly aligned */}
            <motion.section 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center space-y-5 max-w-2xl mx-auto mb-20 relative px-4"
            >
              <h2 className="text-2xl md:text-3xl font-display font-black text-white uppercase tracking-tight">
                Agende um diagnóstico estratégico <span className="font-serif italic font-light text-red-600 normal-case">gratuito</span>
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed font-light max-w-lg mx-auto">
                Analiso pessoalmente o posicionamento do seu negócio no digital para mapear pontos de melhoria, automações viáveis e o caminho ideal para aumentar seu faturamento.
              </p>
              <div className="pt-6">
                <button
                  onClick={scrollToForm}
                  className="inline-flex items-center gap-2.5 bg-red-600 hover:bg-white hover:text-black text-white font-mono uppercase text-[11px] py-4.5 px-8 tracking-[0.2em] font-black transition-all rounded-none shadow-[0_0_25px_rgba(220,38,38,0.25)]"
                >
                  👉 Quero meu diagnóstico gratuito
                </button>
              </div>
            </motion.section>
          </main>
        )}

        {/* Footer Area */}
        <footer className="border-t border-zinc-900 py-16 text-center text-xs text-zinc-600 print:hidden space-y-8 relative">
          <span className="absolute -top-1.5 left-0 text-zinc-800 font-mono text-[10px] pointer-events-none">+</span>
          <span className="absolute -top-1.5 right-0 text-zinc-800 font-mono text-[10px] pointer-events-none">+</span>

          <p className="font-mono uppercase tracking-[0.15em] text-[9px]">© {new Date().getFullYear()} BACKSTAGE. Todos os direitos reservados. Focados no crescimento exponencial de negócios.</p>
          
          {/* SEO Keywords Collapse Panel */}
          <div className="max-w-3xl mx-auto">
            <button
              onClick={() => setShowSEOCloud(!showSEOCloud)}
              className="inline-flex items-center gap-1.5 text-[9px] uppercase font-mono tracking-[0.25em] text-zinc-500 hover:text-red-500 transition-all border border-zinc-900 rounded-none px-4 py-2 bg-zinc-950/40"
            >
              <Info size={10} />
              Termos de SEO & Indexação
              <ChevronDown size={10} className={`transition-transform duration-300 ${showSEOCloud ? "rotate-180" : ""}`} />
            </button>

            {showSEOCloud && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-6 p-6 rounded-none bg-[#0c0c0e] border border-zinc-900 text-[10px] leading-relaxed text-zinc-500 font-mono uppercase tracking-wider text-justify"
              >
                Marketing Digital, Agência de Marketing Digital, Gestão de Redes Sociais, Gestão de Instagram, Social Media, Automação Comercial, Automação para WhatsApp, Automação para Instagram, Tráfego Pago, Meta Ads, Captação de Leads, Geração de Leads, Funil de Vendas, Marketing para Empresas, Marketing para Pequenas Empresas, Marketing de Performance, Consultoria de Marketing, Crescimento Empresarial, Estratégia Digital, Presença Digital, Vendas Online, Gestão de Conteúdo.
              </motion.div>
            )}
          </div>
        </footer>
      </div>
    </div>
  );
}

