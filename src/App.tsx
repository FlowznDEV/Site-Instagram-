import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { 
  Instagram, 
  MessageSquare, 
  TrendingUp, 
  Target, 
  ShieldCheck, 
  ArrowRight,
  Info,
  ChevronDown
} from "lucide-react";

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

  const [showSEOCloud, setShowSEOCloud] = useState(false);
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    const fullText = "sistema de vendas";
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(interval);
      }
    }, 120);
    return () => clearInterval(interval);
  }, []);

  const WHATSAPP_URL = "https://wa.me/message/4575TYEYPEQLK1";

  const renderHighlightedText = (text: string, highlights: string[]) => {
    let result = text;
    highlights.forEach(h => {
      const regex = new RegExp(`(${h})`, "gi");
      result = result.replace(regex, `<span class="circled-keyword">$1</span>`);
    });
    return <span dangerouslySetInnerHTML={{ __html: result }} />;
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-[#b89047] selection:text-black ambient-bg relative overflow-x-hidden">
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#b89047] via-[#e2c28a] to-[#b89047] origin-left z-[100] print:hidden" 
        style={{ scaleX }} 
      />

      <div className="absolute inset-y-0 left-4 sm:left-6 lg:left-12 w-[1px] bg-zinc-900/40 pointer-events-none z-0"></div>
      <div className="absolute inset-y-0 right-4 sm:right-6 lg:left-12 w-[1px] bg-zinc-900/40 pointer-events-none z-0"></div>

      <div className="absolute top-0 inset-x-0 h-[1000px] overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.12, 0.2, 0.12],
            x: [0, 40, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-5%] left-[10%] w-[500px] h-[500px] rounded-full bg-[#b89047]/5 blur-[130px]"
        />
        <motion.div 
          animate={{
            scale: [1, 1.18, 1],
            opacity: [0.08, 0.16, 0.08],
            x: [0, -50, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] right-[8%] w-[550px] h-[550px] rounded-full bg-zinc-800/10 blur-[150px]"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 text-white py-3.5 px-4 text-center text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] flex items-center justify-center gap-3 relative z-50 border-b border-[#b89047]/25 shadow-[0_2px_30px_rgba(184,144,71,0.05)] print:hidden"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b89047] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#b89047]"></span>
        </span>
        <span className="font-bold text-white">
          🎉 <span className="text-[#e2c28a]">20% OFF</span> EM MARKETING E AUTOMAÇÕES INTELIGENTES ATÉ <span className="text-[#b89047]">10/08</span>
        </span>
        <span className="hidden md:inline-block h-4 w-[1px] bg-zinc-800"></span>
        <span className="hidden md:inline-block text-[9px] text-zinc-500 lowercase tracking-normal font-sans italic">últimas 3 vagas disponíveis para este ciclo trimestral</span>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        <header className="py-8 flex justify-between items-center border-b border-zinc-900 mb-12 md:mb-16 print:hidden relative">
          <span className="absolute -bottom-1.5 -left-1.5 text-zinc-800 font-mono text-[10px] pointer-events-none select-none">+</span>
          <span className="absolute -bottom-1.5 -right-1.5 text-zinc-800 font-mono text-[10px] pointer-events-none select-none">+</span>

          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="relative w-9 h-9 flex items-center justify-center border border-[#b89047]/60 group-hover:border-[#b89047] bg-black transition-colors duration-300">
              <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-[#b89047]" />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-[#b89047]" />
              <span className="text-[#b89047] font-display font-bold text-lg tracking-tight">B</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-base font-display font-bold tracking-[0.25em] text-white uppercase leading-none">
                BACK<span className="text-[#b89047] font-light">STAGE</span>
              </span>
              <span className="text-[7px] font-mono tracking-[0.3em] text-[#b89047]/85 uppercase mt-1 leading-none">
                COMERCIAL INTELIGENTE
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 bg-zinc-950 border border-zinc-900 px-3 py-1.5 rounded-none text-[9px] font-mono tracking-widest text-zinc-500">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#b89047] animate-pulse"></span>
              SISTEMA ONLINE / CRONOGRAMA INTEGRADO
            </div>
          </div>
        </header>

        <main className="pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-28">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-12 space-y-6 md:space-y-7 max-w-4xl mx-auto text-center relative"
            >
              <div className="absolute -top-3 -left-3 w-4 h-4 border-t border-l border-zinc-850 pointer-events-none"></div>
              <div className="absolute -bottom-3 -right-3 w-4 h-4 border-b border-r border-zinc-850 pointer-events-none"></div>

              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-none bg-zinc-950/80 border border-zinc-900 text-zinc-400 text-[9px] font-mono uppercase tracking-[0.22em] w-fit mx-auto">
                <span className="w-1.5 h-1.5 bg-[#b89047] animate-pulse"></span>
                MARKETING EXECUTIVO & ESCALA COMERCIAL
              </motion.div>

              <motion.h1 
                variants={itemVariants} 
                className="text-4xl sm:text-5xl lg:text-[56px] font-display font-bold tracking-tight text-white uppercase leading-[1.2]"
              >
                Nós construímos o seu{" "}
                <span className="font-serif italic font-light text-[#e2c28a] normal-case inline-block select-none tracking-normal">
                  {typedText}
                  <span className="animate-[pulse_1s_infinite] ml-1 text-[#b89047] font-sans font-extralight">|</span>
                </span>
              </motion.h1>

              <motion.div variants={itemVariants} className="space-y-5 text-zinc-400 text-sm md:text-base leading-relaxed font-sans font-light max-w-2xl mx-auto">
                <p className="font-medium text-white text-base md:text-lg leading-snug">
                  {renderHighlightedText(
                    "Se você busca atrair leads qualificados, consolidar sua marca e estruturar um processo comercial eficiente, essa é a engrenagem perfeita.",
                    ["processo comercial eficiente", "leads qualificados"]
                  )}
                </p>
                
                <p className="text-zinc-400">
                  Na <span className="text-white font-semibold font-display">BackStage</span>, eu desenvolvo estratégias completas para que sua marca domine o mercado digital através de posicionamento estratégico, automações completas e tráfego altamente qualificado.
                </p>
                
                <p className="border-l-2 border-[#b89047] pl-4 py-2 italic text-zinc-400 font-serif leading-relaxed bg-zinc-950/40 pr-3 text-left md:text-center">
                  {renderHighlightedText(
                    "Enquanto você lidera sua operação interna, eu estruturo e otimizo todo o ecossistema estratégico de atração e vendas nas suas redes sociais.",
                    ["ecossistema estratégico", "atração e vendas"]
                  )}
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3.5 pt-4 justify-center">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#b89047] hover:bg-white text-black font-mono uppercase text-[11px] py-4 px-8 tracking-[0.2em] font-black transition-all rounded-none flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(184,144,71,0.25)] hover:shadow-[0_0_35px_rgba(184,144,71,0.45)] active:scale-98 group animate-bounce-subtle"
                >
                  🎯 SOLICITAR DIAGNÓSTICO NO WHATSAPP
                  <ArrowRight size={13} className="group-hover:translate-x-1.5 transition-transform" />
                </a>

                <a
                  href="#how-i-help"
                  className="px-8 py-4 rounded-none bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 text-zinc-300 hover:text-white transition-all text-center text-[11px] font-mono uppercase tracking-[0.18em] flex items-center justify-center"
                >
                  Conhecer Serviços
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Quem é Pedro Teixeira? Section */}
          <section id="about" className="mb-32 scroll-mt-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-16 relative"
            >
              <span className="text-[#b89047] font-mono text-[10px] uppercase tracking-[0.25em] block mb-2">Fundador</span>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-white uppercase mt-1 tracking-tight">
                Quem é <span className="font-serif italic font-light text-[#e2c28a] normal-case">Pedro Teixeira?</span>
              </h2>
              <div className="w-16 h-0.5 bg-[#b89047] mx-auto mt-5"></div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl mx-auto bg-black border border-zinc-900 p-8 md:p-12 text-zinc-400 leading-relaxed font-sans font-light relative flex flex-col md:flex-row items-center gap-10"
            >
              <span className="absolute top-2 left-2 text-zinc-800 font-mono text-[9px] pointer-events-none">+</span>
              <span className="absolute top-2 right-2 text-zinc-800 font-mono text-[9px] pointer-events-none">+</span>
              <span className="absolute bottom-2 left-2 text-zinc-800 font-mono text-[9px] pointer-events-none">+</span>
              <span className="absolute bottom-2 right-2 text-zinc-800 font-mono text-[9px] pointer-events-none">+</span>

              <div className="w-48 h-48 md:w-64 md:h-64 shrink-0 relative group">
                <div className="absolute inset-0 border border-zinc-800 bg-zinc-950 flex items-center justify-center overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                  {/* The image should be named pedro.png and placed in the public folder */}
                  <img 
                    src="/pedro.png" 
                    alt="Pedro Teixeira" 
                    className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                    onError={(e) => {
                      // Fallback if image not uploaded yet
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&auto=format&fit=crop";
                    }}
                  />
                </div>
                <div className="absolute -top-3 -left-3 w-6 h-6 border-t border-l border-[#b89047] pointer-events-none"></div>
                <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b border-r border-[#b89047] pointer-events-none"></div>
              </div>

              <div className="space-y-6 text-left">
                <p>
                  Aos 17 anos, fundou a Backstage, uma agência que visa promover a mudança da forma como o marketing está sendo visto atualmente.
                </p>
                <p>
                  Também sempre foi entusiasta da tecnologia e da cultura digital, fazendo vídeos dinâmicos sobre seus jogos favoritos sempre que podia.
                </p>
                <p>
                  Em 2026, decidiu pôr em prática tudo o que havia acumulado sobre marketing, abrindo uma agência 100% remota para atender os mais diversos setores do Brasil!
                </p>
              </div>
            </motion.div>
          </section>

          {/* Services Section */}
          <section id="how-i-help" className="mb-32 scroll-mt-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-20 relative"
            >
              <span className="text-[#b89047] font-mono text-[10px] uppercase tracking-[0.25em] block mb-2">Nosso Ecossistema</span>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-white uppercase mt-1 tracking-tight">
                Como posso alavancar sua <span className="font-serif italic font-light text-[#e2c28a] normal-case">operação</span>
              </h2>
              <div className="w-16 h-0.5 bg-[#b89047] mx-auto mt-5"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Service Cards (Same content) */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, borderColor: "rgba(255, 255, 255, 0.4)" }}
                className="bg-black border border-zinc-900 p-8 rounded-none transition-colors duration-300 group relative overflow-hidden"
              >
                <div className="w-10 h-10 rounded-none bg-zinc-950 border border-zinc-800 text-zinc-300 flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <Instagram size={16} />
                </div>
                <h3 className="text-base font-display font-bold text-white uppercase mb-3 tracking-tight flex items-center gap-2">
                  Gestão de Redes Sociais
                  <span className="text-[9px] text-zinc-700 font-mono font-normal">/01</span>
                </h3>
                <p className="text-zinc-400 text-xs leading-relaxed font-sans font-light">
                  Desenvolvo planejamento estratégico direcionado, produzo conteúdo original, edito vídeos de alta retenção, consolido sua identidade visual e gerencio seu Instagram para maximizar alcance e converter visitantes em leads qualificados.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                whileHover={{ y: -4, borderColor: "rgba(255, 255, 255, 0.4)" }}
                className="bg-black border border-zinc-900 p-8 rounded-none transition-colors duration-300 group relative overflow-hidden"
              >
                <div className="w-10 h-10 rounded-none bg-zinc-950 border border-zinc-800 text-zinc-300 flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <MessageSquare size={16} />
                </div>
                <h3 className="text-base font-display font-bold text-white uppercase mb-3 tracking-tight flex items-center gap-2">
                  Automação Comercial
                  <span className="text-[9px] text-zinc-700 font-mono font-normal">/02</span>
                </h3>
                <p className="text-zinc-400 text-xs leading-relaxed font-sans font-light">
                  Implemento fluxos automatizados de atendimento para WhatsApp e Direct do Instagram. Filtre curiosos, qualifique leads, dispare mensagens automáticas e execute follow-ups precisos sem precisar de horas extras manuais.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                whileHover={{ y: -4, borderColor: "rgba(255, 255, 255, 0.4)" }}
                className="bg-black border border-zinc-900 p-8 rounded-none transition-colors duration-300 group relative overflow-hidden"
              >
                <div className="w-10 h-10 rounded-none bg-zinc-950 border border-zinc-800 text-zinc-300 flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <TrendingUp size={16} />
                </div>
                <h3 className="text-base font-display font-bold text-white uppercase mb-3 tracking-tight flex items-center gap-2">
                  Tráfego Pago
                  <span className="text-[9px] text-zinc-700 font-mono font-normal">/03</span>
                </h3>
                <p className="text-zinc-400 text-xs leading-relaxed font-sans font-light">
                  Crio e otimizo campanhas profissionais no Meta Ads (Facebook e Instagram) com foco direto em vendas. Atraia um público altamente propenso à compra, minimize custos por lead e expanda suas vendas de forma inteligente.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, borderColor: "rgba(255, 255, 255, 0.4)" }}
                className="bg-black border border-zinc-900 p-8 rounded-none transition-colors duration-300 group md:col-span-1 lg:col-span-1 relative overflow-hidden"
              >
                <div className="w-10 h-10 rounded-none bg-zinc-950 border border-zinc-800 text-zinc-300 flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <Target size={16} />
                </div>
                <h3 className="text-base font-display font-bold text-white uppercase mb-3 tracking-tight flex items-center gap-2">
                  Captação de Leads
                  <span className="text-[9px] text-zinc-700 font-mono font-normal">/04</span>
                </h3>
                <p className="text-zinc-400 text-xs leading-relaxed font-sans font-light">
                  Estruturo funis de captura completos com landing pages velozes e integradas. Converta tráfego disperso em contatos quentes e prontos para contato do seu time de vendas de forma totalmente automática.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                whileHover={{ y: -4, borderColor: "rgba(255, 255, 255, 0.4)" }}
                className="bg-black border border-zinc-900 p-8 rounded-none transition-colors duration-300 group md:col-span-2 lg:col-span-2 relative overflow-hidden"
              >
                <div className="w-10 h-10 rounded-none bg-zinc-950 border border-zinc-800 text-zinc-300 flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <ShieldCheck size={16} />
                </div>
                <h3 className="text-base font-display font-bold text-white uppercase mb-3 tracking-tight flex items-center gap-2">
                  Planos Personalizados sob Demanda
                  <span className="text-[9px] text-zinc-700 font-mono font-normal">/05</span>
                </h3>
                <p className="text-zinc-400 text-xs leading-relaxed font-sans font-light">
                  Nenhum negócio de sucesso cresce com fórmulas genéricas. Eu analiso o cenário real da sua empresa e configuro um pacote customizado combinando exatamente as soluções que você precisa para bater suas metas.
                </p>
              </motion.div>
            </div>
          </section>

          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-32 py-16 px-8 md:px-16 bg-black border border-zinc-900 rounded-none relative overflow-hidden group"
          >
            <span className="absolute top-2 left-2 text-zinc-800 font-mono text-[9px] pointer-events-none">+</span>
            <span className="absolute top-2 right-2 text-zinc-800 font-mono text-[9px] pointer-events-none">+</span>
            <span className="absolute bottom-2 left-2 text-zinc-800 font-mono text-[9px] pointer-events-none">+</span>
            <span className="absolute bottom-2 right-2 text-zinc-800 font-mono text-[9px] pointer-events-none">+</span>
            
            <div className="max-w-3xl mx-auto space-y-6 text-center">
              <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.25em] block">Sua Alavanca de Negócios</span>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-white uppercase tracking-tight leading-tight">
                Estratégia de Performance & <span className="font-serif italic font-light text-zinc-300 normal-case">Escala Comercial</span>
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
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-none bg-white hover:bg-zinc-200 text-black font-mono uppercase text-xs tracking-[0.22em] font-bold transition-all duration-300"
                >
                  AGENDAR DIAGNÓSTICO AGORA
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center space-y-5 max-w-2xl mx-auto mb-20 relative px-4"
          >
            <h2 className="text-xl md:text-2xl font-display font-medium text-white uppercase tracking-tight">
              Agende um diagnóstico estratégico <span className="font-serif italic font-light text-zinc-300 normal-case">gratuito</span>
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed font-light max-w-lg mx-auto">
              Analiso pessoalmente o posicionamento do seu negócio no digital para mapear pontos de melhoria, automações viáveis e o caminho ideal para aumentar seu faturamento.
            </p>
            <div className="pt-6">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-white hover:bg-zinc-200 text-black font-mono uppercase text-[11px] py-4.5 px-8 tracking-[0.2em] font-bold transition-all rounded-none group"
              >
                🚀 ACELERAR MEU CRESCIMENTO DIGITAL
                <ArrowRight size={13} className="group-hover:translate-x-1.5 transition-transform" />
              </a>
            </div>
          </motion.section>
        </main>

        <footer className="border-t border-zinc-900 py-16 text-center text-xs text-zinc-600 print:hidden space-y-8 relative">
          <span className="absolute -top-1.5 left-0 text-zinc-800 font-mono text-[10px] pointer-events-none">+</span>
          <span className="absolute -top-1.5 right-0 text-zinc-800 font-mono text-[10px] pointer-events-none">+</span>

          <p className="font-mono uppercase tracking-[0.15em] text-[9px]">© {new Date().getFullYear()} BACKSTAGE. Todos os direitos reservados. Focados no crescimento exponencial de negócios.</p>
          
          <div className="max-w-3xl mx-auto">
            <button
              onClick={() => setShowSEOCloud(!showSEOCloud)}
              className="inline-flex items-center gap-1.5 text-[9px] uppercase font-mono tracking-[0.25em] text-zinc-500 hover:text-white transition-all border border-zinc-900 rounded-none px-4 py-2 bg-zinc-950/40"
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

        <div className="fixed bottom-6 right-6 z-50 print:hidden">
          <motion.div
            animate={{ y: [0, -8, 0], scale: [1, 1.05, 1], rotate: [0, -1, 1, -1, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="flex items-center gap-3 bg-[#25D366] hover:bg-[#22c35e] text-black px-5 py-3.5 rounded-full font-bold shadow-lg transition-all duration-300 group cursor-pointer border border-emerald-400/20 relative overflow-hidden"
              id="whatsapp-floating-button"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />

              <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold max-w-0 overflow-hidden group-hover:max-w-[140px] md:group-hover:max-w-[140px] transition-all duration-500 whitespace-nowrap text-black">
                Falar no WhatsApp
              </span>
              <div className="relative flex h-5 w-5 items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black/20 opacity-75"></span>
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-black group-hover:scale-110 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.863-9.83.001-2.624-1.023-5.09-2.885-6.954C16.591 1.956 14.1 1.05 11.999 1.05c-5.444 0-9.868 4.413-9.871 9.83-.001 1.777.476 3.512 1.383 5.04l-.999 3.647 3.73-.978c1.512.825 3.02 1.229 4.305 1.229zM18.06 14.8c-.33-.165-1.956-.967-2.257-1.077-.302-.11-.522-.165-.742.165-.22.33-.853 1.077-1.046 1.3-.193.22-.386.247-.716.082-1.362-.68-2.316-1.185-3.238-2.768-.243-.417.243-.387.697-1.293.082-.165.041-.308-.02-.44-.06-.13-.522-1.258-.716-1.72-.188-.454-.378-.39-.522-.397h-.44c-.165 0-.44.06-.67.313-.23.253-.88 1.077-.88 2.632s1.127 3.052 1.282 3.26c.154.209 2.219 3.39 5.375 4.75 1.054.45 1.861.614 2.478.705.805.12 1.543.084 2.125-.002.648-.096 1.956-.8 2.231-1.57.275-.77.275-1.43.193-1.57-.083-.14-.303-.223-.633-.39z" />
                </svg>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}


