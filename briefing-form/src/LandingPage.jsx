import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Check, ArrowRight, Layout, ShieldCheck, Zap, Star } from 'lucide-react';

const LandingPage = () => {
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
      {/* Glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-violet-600/10 blur-[120px] rounded-full -z-10" />
      
      {/* Header */}
      <nav className="container mx-auto px-6 py-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Layout className="text-violet-500" />
          <span className="text-xl font-bold tracking-tighter uppercase italic">Spartana</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-20 pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 mb-8">
            <Sparkles size={14} className="text-violet-400" />
            <span className="text-xs font-semibold text-violet-100 uppercase tracking-widest">Presença Digital de Elite</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-bold mb-8 leading-[1.1] tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-zinc-500">
            Seu Negócio com <br /> Credibilidade em 24h
          </h1>
          
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-12">
            Design Premium, Google Meu Negócio Otimizado e Confiabilidade por um valor que cabe no seu bolso. Não perca mais clientes por falta de um site profissional.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <button className="px-8 h-14 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl font-bold text-white flex items-center gap-2 hover:shadow-[0_0_40px_rgba(139,92,246,0.4)] transition-all active:scale-95">
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

      {/* Pricing Section */}
      <section className="container mx-auto px-6 pb-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`p-8 rounded-[2rem] border bg-zinc-900/50 backdrop-blur-xl relative flex flex-col ${
                plan.highlight ? 'border-fuchsia-500/50 ring-1 ring-fuchsia-500/20 scale-105 z-10' : 'border-zinc-800'
              }`}
            >
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

              <button className={`w-full h-12 rounded-xl font-bold text-sm transition-all ${
                plan.highlight 
                  ? 'bg-white text-black hover:bg-zinc-200' 
                  : 'bg-zinc-800 text-white hover:bg-zinc-700'
              }`}>
                Começar Agora
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-20 text-center">
        <div className="opacity-30 flex items-center justify-center gap-2 mb-4">
          <Layout size={18} />
          <span className="font-bold uppercase tracking-tighter">Agência Spartana</span>
        </div>
        <p className="text-zinc-600 text-xs uppercase tracking-[0.2em]">Design de Elite para Negócios Reais</p>
      </footer>
    </div>
  );
};

export default LandingPage;
