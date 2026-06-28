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

                <motion.button
                  onClick={() => document.getElementById('how-i-help')?.scrollIntoView({ behavior: 'smooth' })}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-none bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 text-zinc-300 hover:text-white transition-all text-center text-[11px] font-mono uppercase tracking-[0.18em] flex items-center justify-center cursor-pointer"
                >
                  Conhecer Serviços
                </motion.button>
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
                  Aos 17 anos, iniciei minha jornada no mercado digital, focado em mudar a forma como o marketing é visto e aplicado atualmente.
                </p>
                <p>
                  Também sempre fui um entusiasta da tecnologia e da cultura digital, criando processos lógicos e escaláveis sempre que possível.
                </p>
                <p>
                  Em 2026, consolidei tudo o que aprendi ao longo dos anos em minha consultoria pessoal, atuando de forma 100% remota para transformar negócios e atender os mais diversos setores do Brasil!
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
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
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
                    
                    <p className="text-zinc-500 group-hover:text-zinc-300 text-[11px] lg:text-[10px] xl:text-[11px] leading-relaxed font-sans font-light relative z-10 transition-colors duration-300">
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
                  "Construo processos previsíveis de aquisição de clientes, unindo redes sociais qualificadas, anúncios otimizados e automação inteligente para gerar receita real.",
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
                Marketing Digital, Consultoria de Marketing, Especialista em Vendas, Estrategista de Vendas, Gestor de Tráfego, Pedro Teixeira, Gestão de Redes Sociais, Social Media, Automação Comercial, Automação para WhatsApp, Automação para Instagram, Tráfego Pago, Meta Ads, Captação de Leads, Geração de Leads, Funil de Vendas, Marketing para Empresas, Estrategista Digital, Crescimento Empresarial, Vendas Online.
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


