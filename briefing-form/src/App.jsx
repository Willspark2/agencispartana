import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Check, MessageSquare, Target, Briefcase, Star, Trophy, Users, HelpCircle, Newspaper, MapPin, Smartphone, Hash, Info, Laptop, Sparkles, Layout, ArrowRight, Lock, ShieldCheck } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const WHATSAPP_NUMBER = "551998058602";

// ═══════════════════════════════════════════════════════════════
// LANDING PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════

const LandingPage = ({ onStart }) => {
  const plans = [
    {
      name: "Website Premium",
      price: "R$ 297 - 397",
      features: ["Design Exclusivo", "Otimizado para Mobile", "Entrega em 24h", "Confiabilidade para sua Marca"],
      highlight: false,
    },
    {
      name: "Combo Elite",
      price: "R$ 597",
      features: ["Tudo do Website Premium", "Perfil Google Meu Negócio", "Otimização de SEO Local", "Estratégia de Avaliações"],
      highlight: true,
    },
    {
      name: "Suporte Mensal",
      price: "R$ 50/mês",
      features: ["Hospedagem Inclusa", "Pequenas Alterações", "Monitoramento 24/7", "Relatório de Visitas"],
      highlight: false,
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 dots-pattern">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-violet-600/10 blur-[120px] rounded-full -z-10" />
      
      <nav className="container mx-auto px-6 py-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Layout className="text-violet-500" />
          <span className="text-xl font-bold tracking-tighter uppercase italic">Spartana</span>
        </div>
      </nav>

      <section className="container mx-auto px-6 pt-20 pb-32 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 mb-8">
            <Sparkles size={14} className="text-violet-400" />
            <span className="text-xs font-semibold text-violet-100 uppercase tracking-widest">Presença Digital de Elite</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-bold mb-8 leading-[1.1] tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-zinc-500 text-center">
            Seu Negócio com <br /> Credibilidade em 24h
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-12">
            Design Premium, Google Meu Negócio Otimizado e Confiabilidade por um valor que cabe no seu bolso. Não perca mais clientes por falta de um site profissional.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <button onClick={onStart} className="px-8 h-14 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl font-bold text-white flex items-center gap-2 hover:shadow-[0_0_40px_rgba(139,92,246,0.4)] transition-all active:scale-95">
              Preencher Briefing Agora
              <ArrowRight size={20} />
            </button>
            <div className="flex items-center gap-2 text-zinc-500 text-sm">
              <ShieldCheck size={16} />
              Garantia de Entrega Spartana
            </div>
          </div>
        </motion.div>
      </section>

      <section className="container mx-auto px-6 pb-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {plans.map((plan, idx) => (
            <motion.div key={plan.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} viewport={{ once: true }}
              className={`p-8 rounded-[2rem] border bg-zinc-900/50 backdrop-blur-xl relative flex flex-col ${plan.highlight ? 'border-fuchsia-500/50 ring-1 ring-fuchsia-500/20 md:scale-105 z-10' : 'border-zinc-800'}`}>
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  Mais Popular
                </div>
              )}
              <h3 className="text-zinc-400 font-semibold mb-2 uppercase tracking-widest text-sm">{plan.name}</h3>
              <div className="text-4xl font-bold mb-8 text-white">{plan.price}</div>
              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map(feature => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-zinc-300">
                    <div className="mt-1 w-4 h-4 rounded-full bg-violet-500/10 flex items-center justify-center text-violet-400">
                      <Check size={10} />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
              <button onClick={onStart} className={`w-full h-12 rounded-xl font-bold text-sm transition-all ${plan.highlight ? 'bg-white text-black hover:bg-zinc-200' : 'bg-zinc-800 text-white hover:bg-zinc-700'}`}>
                Começar Agora
              </button>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// BRIEFING FORM COMPONENT
// ═══════════════════════════════════════════════════════════════

const BriefingForm = () => {
  const [formData, setFormData] = useState({
    empresa: '', slogan: '', nicho: '', objetivo: '', objetivoOutro: '',
    publico: '', servicos: '', diferenciais: '', tom: '', cores: '',
    logo: '', secoes: [], secaoOutra: '', ctaAcao: '', ctaLink: '',
    nome: '', email: '', whatsapp: '',
  });

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fields = ['empresa', 'nicho', 'objetivo', 'publico', 'servicos', 'diferenciais', 'tom', 'cores', 'ctaAcao', 'nome'];
    let filled = 0;
    fields.forEach(f => { if(formData[f]) filled++; });
    if (formData.secoes.length > 0) filled++;
    setProgress(Math.min(filled, 10));
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (value) => {
    setFormData(prev => {
      const secoes = prev.secoes.includes(value) ? prev.secoes.filter(s => s !== value) : [...prev.secoes, value];
      return { ...prev, secoes };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `━━━━━━━━━━━━━━━━━━━━━\n🎨 *NOVO BRIEFING DE SITE*\n━━━━━━━━━━━━━━━━━━━━━\n\n*📋 CONTATO*\nNome: ${formData.nome}\nEmail: ${formData.email}\nWhatsApp: ${formData.whatsapp}\n\n*1️⃣ IDENTIDADE DA MARCA*\nEmpresa: ${formData.empresa}\nSlogan: ${formData.slogan || "Não definido"}\n\n*2️⃣ NICHO*\n${formData.nicho}\n\n*3️⃣ OBJETIVO*\n${formData.objetivo === 'Outro' ? formData.objetivoOutro : formData.objetivo}\n\n*4️⃣ PÚBLICO-ALVO*\n${formData.publico}\n\n*5️⃣ SERVIÇOS/PRODUTOS*\n${formData.servicos}\n\n*6️⃣ DIFERENCIAIS*\n${formData.diferenciais}\n\n*7️⃣ TOM DE COMUNICAÇÃO*\n${formData.tom}\n\n*8️⃣ IDENTIDADE VISUAL*\nCores: ${formData.cores}\nLogo: ${formData.logo}\n\n*9️⃣ SEÇÕES DO SITE*\n${formData.secoes.join(', ')}\nOutras: ${formData.secaoOutra || "Nenhuma"}\n\n*🔟 CTA PRINCIPAL*\nAção: ${formData.ctaAcao}\nLink: ${formData.ctaLink}\n\n━━━━━━━━━━━━━━━━━━━━━`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-gradient">Briefing do Projeto</h1>
        <p className="text-zinc-400 text-lg">Responda as perguntas abaixo para criarmos seu site profissional</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card rounded-[2rem] p-8 md:p-12 glow-violet relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-zinc-800">
          <motion.div className="h-full accent-gradient shadow-[0_0_10px_rgba(168,85,247,0.5)]" animate={{ width: `${(progress / 10) * 100}%` }} />
        </div>
        <div className="flex justify-between items-center mb-12 mt-2">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest text-left text-left">Progresso</span>
          <span className="text-sm font-medium text-zinc-400 text-right">{progress} de 10 respondidas</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-16">
          <QuestionBlock number="1" title="IDENTIDADE DA MARCA">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input name="empresa" placeholder="Ex: Studio Bella Estética" label="Nome da empresa *" value={formData.empresa} onChange={handleInputChange} required />
              <Input name="slogan" placeholder="Ex: Sua beleza, nossa paixão" label="Slogan ou tagline" value={formData.slogan} onChange={handleInputChange} />
            </div>
          </QuestionBlock>

          <QuestionBlock number="2" title="NICHO E SEGMENTO">
            <Textarea name="nicho" placeholder="Ex: Clínica de estética facial..." value={formData.nicho} onChange={handleInputChange} rows={3} required />
          </QuestionBlock>

          <QuestionBlock number="3" title="OBJETIVO PRINCIPAL">
            <Select name="objetivo" value={formData.objetivo} onChange={handleInputChange} options={['Capturar leads/contatos', 'Vender produtos diretamente', 'Institucional', 'Portfólio', 'Agendar reuniões', 'Outro']} required />
            {formData.objetivo === 'Outro' && <Input name="objetivoOutro" placeholder="Descreva o objetivo" value={formData.objetivoOutro} onChange={handleInputChange} className="mt-4" />}
          </QuestionBlock>

          <QuestionBlock number="4" title="PÚBLICO-ALVO">
            <Textarea name="publico" placeholder="Quem é seu cliente ideal?" value={formData.publico} onChange={handleInputChange} rows={4} />
          </QuestionBlock>

          <QuestionBlock number="5" title="PRODUTOS/SERVIÇOS">
            <Textarea name="servicos" placeholder="Liste seus principais produtos..." value={formData.servicos} onChange={handleInputChange} rows={4} />
          </QuestionBlock>

          <QuestionBlock number="6" title="DIFERENCIAIS">
            <Textarea name="diferenciais" placeholder="O que faz você ser melhor que a concorrência?" value={formData.diferenciais} onChange={handleInputChange} rows={3} />
          </QuestionBlock>

          <QuestionBlock number="7" title="TOM DE VOZ">
            <div className="grid grid-cols-1 gap-3">
              {['Formal e corporativo', 'Profissional mas acessível', 'Descontraído e amigável', 'Luxuoso e exclusivo', 'Técnico e especializado'].map((t) => (
                <button key={t} type="button" onClick={() => setFormData(p => ({ ...p, tom: t }))} className={cn("p-4 rounded-xl border text-left transition-all", formData.tom === t ? "border-violet-500 bg-violet-500/10 ring-1 ring-violet-500/50" : "border-zinc-800 bg-zinc-800/50 hover:bg-zinc-800")}>
                  <h4 className="font-semibold text-white">{t}</h4>
                </button>
              ))}
            </div>
          </QuestionBlock>

          <QuestionBlock number="8" title="IDENTIDADE VISUAL">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input name="cores" placeholder="Ex: Azul marinho, dourado" label="Cores principais *" value={formData.cores} onChange={handleInputChange} required />
              <Select name="logo" value={formData.logo} onChange={handleInputChange} options={['Sim', 'Não', 'Vou criar']} label="Tem logo?" />
            </div>
          </QuestionBlock>

          <QuestionBlock number="9" title="ESTRUTURA">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {['Hero', 'Sobre', 'Serviços', 'Depoimentos', 'Cases', 'FAQ', 'Blog', 'Contato', 'WhatsApp'].map(s => (
                <button key={s} type="button" onClick={() => handleCheckboxChange(s)} className={cn("px-3 py-2 rounded-lg border text-[10px] transition-all", formData.secoes.includes(s) ? "accent-gradient text-white border-transparent" : "bg-zinc-800 border-zinc-700 text-zinc-300")}>{s}</button>
              ))}
            </div>
          </QuestionBlock>

          <QuestionBlock number="10" title="AÇÃO (CTA)">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input name="ctaAcao" placeholder="Ex: Chamar no WhatsApp" label="Ação *" value={formData.ctaAcao} onChange={handleInputChange} required />
              <Input name="ctaLink" placeholder="Link ou número" label="Link/Número *" value={formData.ctaLink} onChange={handleInputChange} required />
            </div>
          </QuestionBlock>

          <div className="pt-8 border-t border-zinc-800/50">
            <div className="bg-zinc-800/30 rounded-2xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input name="nome" placeholder="Seu nome" label="Nome *" value={formData.nome} onChange={handleInputChange} required />
              <Input name="email" type="email" placeholder="seu@email.com" label="Email *" value={formData.email} onChange={handleInputChange} required />
              <Input name="whatsapp" placeholder="(00) 00000-0000" label="WhatsApp *" value={formData.whatsapp} onChange={handleInputChange} required />
            </div>
          </div>

          <div className="max-w-sm mx-auto pt-8">
            <button type="submit" className="w-full h-14 accent-gradient rounded-xl font-semibold text-white flex items-center justify-center gap-3 transition-all btn-glow hover:brightness-110">
              Enviar Briefing <Send size={18} />
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// MAIN APP COMPONENT
// ═══════════════════════════════════════════════════════════════

const App = () => {
  const [view, setView] = useState('lp'); // 'lp' or 'form'

  return (
    <div className="min-h-screen relative selection:bg-violet-500/30">
      <AnimatePresence mode="wait">
        {view === 'lp' ? (
          <motion.div key="lp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LandingPage onStart={() => setView('form')} />
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <BriefingForm />
          </motion.div>
        )}
      </AnimatePresence>
      <footer className="py-12 text-center opacity-30">
        <span className="font-bold tracking-tighter text-xl italic uppercase">Spartana</span>
      </footer>
    </div>
  );
};

const QuestionBlock = ({ number, title, children }) => (
  <div className="relative">
    <div className="flex items-center gap-4 mb-6">
      <div className="w-8 h-8 rounded-lg accent-gradient flex items-center justify-center text-white font-bold text-sm shadow-[0_0_15px_rgba(139,92,246,0.3)]">{number}</div>
      <h3 className="text-xl font-bold text-white uppercase text-left">{title}</h3>
      <div className="h-[1px] flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
    </div>
    <div className="pl-0 md:pl-12 text-left">{children}</div>
  </div>
);

const Input = ({ label, className, ...props }) => (
  <div className={cn("space-y-1.5 text-left", className)}>
    {label && <label className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">{label}</label>}
    <input className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-violet-500/50 outline-none transition-all" {...props} />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div className="space-y-1.5 text-left">
    {label && <label className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">{label}</label>}
    <textarea className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-violet-500/50 outline-none transition-all resize-none" {...props} />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div className="space-y-1.5 text-left">
    {label && <label className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">{label}</label>}
    <select className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-violet-500/50 outline-none transition-all cursor-pointer" {...props}>
      <option value="" disabled>Selecione...</option>
      {options.map(o => <option key={o} value={o} className="bg-zinc-900">{o}</option>)}
    </select>
  </div>
);

export default App;
