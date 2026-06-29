import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { 
  Network, 
  Cpu, 
  LineChart, 
  Magnet, 
  Landmark, 
  ArrowRight,
  Info,
  ChevronDown,
  Hexagon,
  GraduationCap
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
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
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
      result = result.replace(regex, `<span class="highlighted-keyword">$1</span>`);
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

      {/* Dragon Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30 mix-blend-screen flex justify-center items-center">
        <img 
          src="/dragao.png" 
          alt="Marketing Digital e Crescimento Empresarial - Background" 
          className="w-full h-full object-cover md:object-contain object-top"
          fetchPriority="high"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>

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
            <div className="relative w-9 h-9 flex items-center justify-center border border-[#b89047]/60 group-hover:border-[#b89047] bg-black transition-colors duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#b89047]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-[#b89047]" />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-[#b89047]" />
              <Hexagon className="text-[#b89047] w-5 h-5 relative z-10 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-base font-display font-bold tracking-[0.25em] text-white uppercase leading-none">
                PEDRO<span className="text-[#b89047] font-light">TEIXEIRA</span>
              </span>
              <span className="text-[7px] font-mono tracking-[0.3em] text-[#b89047]/85 uppercase mt-1 leading-none">
                ESTRATEGISTA COMERCIAL
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
                className="text-4xl sm:text-5xl lg:text-[56px] font-display font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-500 uppercase leading-[1.2]"
              >
                Eu construo o seu{" "}
                <span className="font-serif italic font-light text-[#e2c28a] normal-case inline-block select-none tracking-normal drop-shadow-md">
                  {typedText}
                  <span className="animate-[pulse_1s_infinite] ml-1 text-[#b89047] font-sans font-extralight drop-shadow-none">|</span>
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
                  Sou <span className="text-white font-semibold font-display">Pedro Teixeira</span>, especialista em desenvolver estratégias completas para que sua marca domine o mercado digital através de posicionamento estratégico, automações de vendas e tráfego altamente qualificado.
                </p>
                
                <p className="border-l-2 border-[#b89047] pl-4 py-2 italic text-zinc-400 font-serif leading-relaxed bg-zinc-950/40 pr-3 text-left md:text-center">
                  {renderHighlightedText(
                    "Enquanto você lidera sua operação interna, eu estruturo e otimizo todo o ecossistema estratégico de atração e vendas nas suas redes sociais.",
                    ["ecossistema estratégico", "atração e vendas"]
                  )}
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-col gap-3.5 pt-4 items-center w-full">
                <div className="flex flex-col sm:flex-row gap-3.5 justify-center w-full sm:w-auto">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#b89047] hover:bg-white text-black font-mono uppercase text-[11px] py-4 px-8 tracking-[0.2em] font-black transition-all rounded-none flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(184,144,71,0.25)] hover:shadow-[0_0_35px_rgba(184,144,71,0.45)] active:scale-98 group animate-bounce-subtle w-full sm:w-auto"
                  >
                    🎯 SOLICITAR DIAGNÓSTICO NO WHATSAPP
                    <ArrowRight size={13} className="group-hover:translate-x-1.5 transition-transform" />
                  </a>

                  <motion.button
                    onClick={() => document.getElementById('how-i-help')?.scrollIntoView({ behavior: 'smooth' })}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-none bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 text-zinc-300 hover:text-white transition-all text-center text-[11px] font-mono uppercase tracking-[0.18em] flex items-center justify-center cursor-pointer w-full sm:w-auto"
                  >
                    Conhecer Serviços
                  </motion.button>
                </div>
                
                <motion.button
                  onClick={() => document.getElementById('curso')?.scrollIntoView({ behavior: 'smooth' })}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-none bg-transparent hover:bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-all text-center text-[10px] font-mono uppercase tracking-[0.2em] flex items-center justify-center cursor-pointer group w-full sm:w-auto"
                >
                  Conheça o Método Ready2Work
                  <ArrowRight size={12} className="ml-2 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </motion.button>
              </motion.div>
            </motion.div>
          </div>

          {/* Services Section */}
          <section id="how-i-help" className="mb-32 scroll-mt-16">
            <motion.div 
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-center mb-20 relative"
            >
              <span className="text-[#b89047] font-mono text-[10px] uppercase tracking-[0.25em] block mb-2">Minha Metodologia</span>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-white uppercase mt-1 tracking-tight">
                Como posso alavancar sua <span className="font-serif italic font-light text-[#e2c28a] normal-case">operação</span>
              </h2>
              <div className="w-16 h-0.5 bg-[#b89047] mx-auto mt-5"></div>
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-6 lg:gap-3 items-stretch justify-center min-h-[500px]">
              {/* Service Cards (5 Pilastras) */}
              {[
                {
                  icon: Network,
                  title: "Gestão de Redes Sociais",
                  num: "/01",
                  desc: "Desenvolvo planejamento estratégico direcionado, produzo conteúdo original, edito vídeos de alta retenção, consolido sua identidade visual e gerencio seu Instagram para maximizar alcance e converter visitantes em leads qualificados."
                },
                {
                  icon: Cpu,
                  title: "Automação Comercial",
                  num: "/02",
                  desc: "Implemento fluxos automatizados de atendimento para WhatsApp e Direct. Filtre curiosos, qualifique leads, dispare mensagens automáticas e execute follow-ups precisos sem precisar de horas manuais."
                },
                {
                  icon: LineChart,
                  title: "Tráfego Pago",
                  num: "/03",
                  desc: "Crio e otimizo campanhas profissionais no Meta Ads com foco direto em vendas. Atraia um público altamente propenso à compra, minimize custos por lead e expanda suas vendas de forma inteligente."
                },
                {
                  icon: Magnet,
                  title: "Captação de Leads",
                  num: "/04",
                  desc: "Estruturo funis de captura completos com landing pages velozes e integradas. Converta tráfego disperso em contatos quentes e prontos para contato do seu time de vendas de forma totalmente automática."
                },
                {
                  icon: Landmark,
                  title: "Planos Personalizados",
                  num: "/05",
                  desc: "Nenhum negócio de sucesso cresce com fórmulas genéricas. Analiso o cenário real da sua empresa e configuro um pacote customizado combinando exatamente as soluções que você precisa para bater metas."
                }
              ].map((service, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: idx * 0.15 }}
                  whileHover={{ y: -4 }}
                  className="flex-1 flex flex-col group relative overflow-hidden"
                >
                  {/* Capitel (Topo da pilastra) */}
                  <div className="h-20 w-full border-b-4 border-double border-zinc-800 bg-zinc-950 flex items-center justify-center relative transition-colors duration-500 group-hover:border-[#b89047]/50 group-hover:bg-zinc-900 z-10">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#b89047]/30 to-transparent"></div>
                    <div className="w-12 h-12 rounded-full border border-zinc-800/50 flex items-center justify-center text-zinc-400 group-hover:text-[#e2c28a] group-hover:shadow-[0_0_15px_rgba(184,144,71,0.3)] transition-all duration-500">
                      <service.icon size={20} strokeWidth={1.5} />
                    </div>
                  </div>
                  
                  {/* Fuste (Corpo da pilastra com frisos) */}
                  <div className="flex-1 bg-black border-x border-zinc-900/50 p-6 lg:p-4 xl:p-6 relative flex flex-col justify-center items-center text-center overflow-hidden transition-colors duration-500 group-hover:border-zinc-700/50 group-hover:bg-[#030303]">
                    {/* Linhas verticais simulando os frisos da coluna */}
                    <div className="absolute inset-0 flex justify-evenly pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                      <div className="w-[1px] h-full bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900"></div>
                      <div className="w-[1px] h-full bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900"></div>
                      <div className="w-[1px] h-full bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900"></div>
                      <div className="w-[1px] h-full bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900"></div>
                    </div>
                    
                    <h3 className="text-[13px] lg:text-xs xl:text-[13px] font-display font-bold text-white uppercase mb-4 tracking-tight relative z-10 group-hover:text-[#e2c28a] transition-colors duration-300">
                      {service.title}
                      <span className="block text-[9px] text-zinc-600 font-mono font-normal mt-2">{service.num}</span>
                    </h3>
                    
                    <p className="text-zinc-400 group-hover:text-zinc-200 text-xs lg:text-[11px] xl:text-xs leading-relaxed font-sans font-normal relative z-10 transition-colors duration-300">
                      {service.desc}
                    </p>
                  </div>

                  {/* Base (Fundo da pilastra) */}
                  <div className="h-12 w-full border-t-4 border-double border-zinc-800 bg-zinc-950 relative transition-colors duration-500 group-hover:border-[#b89047]/50 group-hover:bg-zinc-900 z-10">
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#b89047]/30 to-transparent"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Ready2Work Course Section */}
          <section id="curso" className="mb-32 scroll-mt-16">
            <motion.div 
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-center mb-16 relative flex flex-col items-center animate-pulse-subtle"
            >
              <div className="w-12 h-12 rounded-full border border-[#b89047]/40 flex items-center justify-center text-[#e2c28a] mb-4 shadow-[0_0_15px_rgba(184,144,71,0.25)] bg-zinc-950/80">
                <GraduationCap size={22} strokeWidth={1.5} />
              </div>
              <span className="text-[#b89047] font-mono text-[10px] uppercase tracking-[0.25em] block mb-2">Treinamento Exclusivo</span>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-white uppercase mt-1 tracking-tight">
                Método <span className="font-serif italic font-light text-[#e2c28a] normal-case drop-shadow-md">Ready2Work</span>
              </h2>
              <div className="w-16 h-0.5 bg-[#b89047] mx-auto mt-5 shadow-[0_0_10px_rgba(184,144,71,0.5)]"></div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl mx-auto bg-gradient-to-br from-[#0c0c0e] to-black border border-[#b89047]/30 p-8 md:p-12 relative flex flex-col md:flex-row items-center gap-10 overflow-hidden group"
            >
              {/* Highlight effects */}
              <div className="absolute inset-0 bg-[#b89047]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              <div className="absolute -inset-x-full top-0 h-[1px] bg-gradient-to-r from-transparent via-[#b89047] to-transparent group-hover:animate-shimmer pointer-events-none opacity-50"></div>
              <div className="absolute -inset-x-full bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#b89047] to-transparent group-hover:animate-shimmer pointer-events-none opacity-50" style={{ animationDelay: '1s' }}></div>
              
              <span className="absolute top-2 left-2 text-[#b89047] font-mono text-[9px] pointer-events-none">+</span>
              <span className="absolute top-2 right-2 text-[#b89047] font-mono text-[9px] pointer-events-none">+</span>
              <span className="absolute bottom-2 left-2 text-[#b89047] font-mono text-[9px] pointer-events-none">+</span>
              <span className="absolute bottom-2 right-2 text-[#b89047] font-mono text-[9px] pointer-events-none">+</span>

              <div className="flex-1 space-y-6 text-left relative z-10">
                <h3 className="text-xl md:text-2xl font-display font-bold text-white uppercase tracking-tight">
                  Do Zero à <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e2c28a] to-[#b89047] drop-shadow-[0_0_15px_rgba(226,194,138,0.5)]">Autoridade Digital</span>
                </h3>
                <p className="text-zinc-300 font-sans font-light leading-relaxed text-base">
                  Aprenda o passo a passo definitivo para <strong className="font-medium text-white">monetizar suas habilidades</strong> prestando serviços e criando conteúdo altamente lucrativo na internet.
                </p>
                <p className="text-zinc-400 font-sans font-light leading-relaxed text-sm">
                  Mais do que técnicas de vendas isoladas, o <strong>Ready2Work</strong> te prepara para construir um caráter profissional inabalável. Entregue um trabalho de excelência e torne-se uma referência reconhecida e muito bem paga no mercado digital.
                </p>
                
                <ul className="space-y-3 pt-2">
                  {[
                    "Vendas online do absoluto zero",
                    "Criação de autoridade magnética",
                    "Prestação de serviços de alto valor",
                    "Mentalidade e caráter profissional"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs text-zinc-300 font-mono tracking-wide">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#b89047] shadow-[0_0_5px_#b89047]"></div>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="pt-6">
                  <a
                    href="https://pay.kiwify.com.br/iGpBGGA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 w-full md:w-auto bg-gradient-to-r from-[#b89047] to-[#e2c28a] hover:from-[#cda256] hover:to-[#f3d39b] text-black font-mono font-bold uppercase text-[11px] tracking-[0.2em] transition-all duration-300 relative overflow-hidden group/btn shadow-[0_0_20px_rgba(184,144,71,0.3)] hover:shadow-[0_0_30px_rgba(226,194,138,0.5)] transform hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:animate-shimmer pointer-events-none"></div>
                    INSCREVA-SE NO READY2WORK
                    <ArrowRight size={15} className="group-hover/btn:translate-x-1.5 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          </section>
        </main>

        <footer className="border-t border-zinc-900 py-16 text-center text-xs text-zinc-600 print:hidden space-y-8 relative">
          <span className="absolute -top-1.5 left-0 text-zinc-800 font-mono text-[10px] pointer-events-none">+</span>
          <span className="absolute -top-1.5 right-0 text-zinc-800 font-mono text-[10px] pointer-events-none">+</span>

          <p className="font-mono uppercase tracking-[0.15em] text-[9px]">© {new Date().getFullYear()} PEDRO TEIXEIRA. Todos os direitos reservados. Focado no crescimento exponencial de negócios.</p>
          
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

        <div className="fixed bottom-6 right-6 z-50 print:hidden pointer-events-none select-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="relative w-12 h-12 flex items-center justify-center mix-blend-screen"
          >
            <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#b89047]/40 to-transparent"></div>
            <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-[#b89047]/40 to-transparent"></div>
            <div className="w-2 h-2 border border-[#b89047] rotate-45 bg-[#0c0c0e]"></div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}


