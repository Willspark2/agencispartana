import React, { useState, useEffect } from 'react';
import { 
  Users, Target, Activity, ChevronRight, Clock, BarChart3, MessageSquare, Briefcase, User, 
  TrendingUp, Wallet, BookOpen, Layout, Plus, Database, X, Calendar, Trash2, Edit2, 
  CheckCircle2, ListTodo, HelpCircle, Zap, Menu, ChevronLeft, Settings, CreditCard, 
  Repeat, ArrowRight, FolderKanban, Check, DollarSign, PieChart, Star, Search, Bell,
  ArrowUpRight, ArrowDownRight, MoreHorizontal, Send, Rocket, Shield, MapPin, MousePointer2
} from 'lucide-react';

// --- COMPONENTES AUXILIARES ---
const Badge = ({ children, variant = 'default' }) => {
  const variants = {
    default: 'bg-zinc-800/50 text-zinc-400 border-zinc-700/50',
    critical: 'bg-red-500/10 text-red-500 border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.15)]',
    high: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    success: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]',
    purple: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  };
  return (
    <span className={`px-3 py-1 rounded-md text-[10px] font-black border ${variants[variant]} uppercase tracking-widest leading-none`}>
      {children}
    </span>
  );
};

const Card = ({ children, className = '', onClick }) => (
  <div 
    onClick={onClick} 
    className={`bg-zinc-900/20 border border-zinc-800/50 rounded-[2rem] overflow-hidden backdrop-blur-xl transition-all duration-500 hover:border-zinc-700 hover:bg-zinc-900/40 ${className}`}
  >
    {children}
  </div>
);

const SectionHeader = ({ title, icon: Icon, color }) => (
  <div className="flex items-center gap-6 mb-10">
    <div className={`p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 shadow-xl ${color}`}>
      <Icon size={24} />
    </div>
    <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-none">{title}</h3>
  </div>
);

// --- COMPONENTE PRINCIPAL ---
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('prospec');
  const [activeWorkspace, setActiveWorkspace] = useState('agency');
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // Leads para Prospecção (Mapeados pelo Ícaro)
  const [leads, setLeads] = useState([
    { id: 1, name: 'Restaurante Sabor Mineiro', niche: 'Alimentação', status: 'Novo', gmn: 'Ruim', contact: '(31) 98888-0001' },
    { id: 2, name: 'Clínica Sorriso VIP', niche: 'Saúde', status: 'Pitch Enviado', gmn: 'Sem Site', contact: '(31) 98888-0002' },
    { id: 3, name: 'Estética Bella Donna', niche: 'Beleza', status: 'Reunião Marcada', gmn: 'Ruim', contact: '(31) 98888-0003' },
  ]);

  return (
    <div className="min-h-screen bg-[#020202] text-zinc-400 font-sans flex overflow-hidden">
      <style>{`::-webkit-scrollbar { display: none; } * { scrollbar-width: none; }`}</style>
      
      {/* SIDEBAR SIMPLIFICADA PARA O CONTEXTO */}
      <aside className={`${isSidebarOpen ? 'w-80' : 'w-24'} bg-[#080808] border-r border-zinc-900 transition-all duration-500 flex flex-col z-50`}>
        <div className="p-10 flex flex-col gap-10">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center font-black text-white">S</div>
              {isSidebarOpen && <span className="font-black text-white text-2xl uppercase tracking-tighter italic">Spartana</span>}
           </div>
           <nav className="space-y-4">
              <button onClick={() => setActiveTab('prospec')} className={`w-full flex items-center gap-6 p-5 rounded-3xl transition-all ${activeTab === 'prospec' ? 'bg-zinc-900 text-white border border-zinc-800' : 'text-zinc-600 hover:text-zinc-300'}`}>
                <Target size={22} /> {isSidebarOpen && <span className="text-[12px] font-black uppercase tracking-widest">Operação Hunter</span>}
              </button>
              <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-6 p-5 rounded-3xl transition-all ${activeTab === 'dashboard' ? 'bg-zinc-900 text-white border border-zinc-800' : 'text-zinc-600 hover:text-zinc-300'}`}>
                <Activity size={22} /> {isSidebarOpen && <span className="text-[12px] font-black uppercase tracking-widest">Comando</span>}
              </button>
           </nav>
        </div>
      </aside>

      {/* MAIN AREA */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-black">
        <header className="h-32 border-b border-zinc-900/50 flex items-center justify-between px-16 bg-black/60 backdrop-blur-3xl z-40">
          <h2 className="text-5xl font-black text-white uppercase italic tracking-tighter">
            <span className="text-red-600">MODO GUERRA</span> / CAIXA RÁPIDO
          </h2>
          <div className="flex gap-6">
             <div className="bg-red-500/10 border border-red-500/20 px-8 py-4 rounded-2xl flex items-center gap-4">
                <Rocket size={20} className="text-red-500" />
                <span className="text-[11px] font-black text-red-500 uppercase tracking-widest italic">Prioridade Máxima</span>
             </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-16 z-30">
          {activeTab === 'prospec' && (
            <div className="space-y-20 animate-in fade-in duration-700 max-w-7xl mx-auto">
               <div className="flex flex-col gap-6 border-b border-zinc-900 pb-12">
                 <h3 className="text-8xl font-black text-white uppercase italic tracking-tighter leading-[0.8]">Operação <br /><span className="text-red-600 text-[100px]">HUNTER</span></h3>
                 <p className="text-zinc-600 uppercase tracking-[0.6em] font-black text-sm ml-3 italic">Mapeamento de Oportunidades GMN (Google Invisível)</p>
               </div>

               <div className="grid grid-cols-1 gap-10">
                  {leads.map(lead => (
                    <Card key={lead.id} className="p-12 border-zinc-800 bg-zinc-950/40 group relative">
                       <div className="flex justify-between items-center">
                          <div className="space-y-4">
                             <div className="flex items-center gap-6">
                                <h4 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none">{lead.name}</h4>
                                <Badge variant={lead.gmn === 'Sem Site' ? 'critical' : 'high'}>GMN: {lead.gmn}</Badge>
                             </div>
                             <div className="flex items-center gap-8 text-zinc-600 text-sm font-black uppercase tracking-widest">
                                <span className="flex items-center gap-2"><MapPin size={16} /> {lead.niche}</span>
                                <span className="flex items-center gap-2"><Database size={16} /> {lead.contact}</span>
                             </div>
                          </div>
                          
                          <div className="flex gap-4">
                             <a href={`https://wa.me/${lead.contact.replace(/\D/g, '')}?text=Olá, notei que sua empresa não aparece bem no Google...`} target="_blank" className="bg-emerald-600 hover:bg-emerald-500 text-black px-10 py-5 rounded-3xl text-[14px] font-black uppercase tracking-widest flex items-center gap-3 transition-all shadow-xl">
                               <MessageSquare size={20} /> Atacar (WhatsApp)
                             </a>
                             <button className="bg-zinc-900 text-zinc-500 p-5 rounded-3xl border border-zinc-800 hover:text-white transition-all"><ChevronRight size={24} /></button>
                          </div>
                       </div>
                       
                       {/* BARRA DE STATUS DO LEAD */}
                       <div className="mt-10 pt-8 border-t border-zinc-900 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                             <div className={`w-2 h-2 rounded-full ${lead.status === 'Novo' ? 'bg-blue-500' : 'bg-orange-500'} animate-pulse`} />
                             <span className="text-[10px] font-black text-zinc-700 uppercase tracking-widest">Status: {lead.status}</span>
                          </div>
                          <div className="flex -space-x-2">
                             <div className="w-8 h-8 rounded-full bg-purple-600 border-2 border-zinc-950 flex items-center justify-center text-[10px] font-black text-white uppercase shadow-xl" title="Maya">M</div>
                             <div className="w-8 h-8 rounded-full bg-blue-600 border-2 border-zinc-950 flex items-center justify-center text-[10px] font-black text-white uppercase shadow-xl" title="Ícaro">I</div>
                          </div>
                       </div>
                    </Card>
                  ))}
               </div>

               {/* FRAMEWORK DE PITCH RÁPIDO */}
               <Card className="p-16 border-red-500/20 bg-red-500/5 shadow-2xl mt-20">
                  <SectionHeader title="O Script de Ego (Maya Copy)" icon={Zap} color="text-red-500" />
                  <div className="bg-black/40 p-10 rounded-[2rem] border border-zinc-900 italic text-2xl font-medium text-zinc-300 leading-relaxed">
                    "Olá, sou o Will da Spartana. Vi que sua clínica é excelente, mas o Google está 'escondendo' você de pelo menos 10 novos clientes por semana. Eu já resolvi isso para outras empresas aqui e posso te mostrar em 5 minutos como recuperar esses clientes. Podemos falar?"
                  </div>
                  <p className="mt-8 text-zinc-600 font-black uppercase tracking-widest text-xs flex items-center gap-3">
                    <MousePointer2 size={16} /> Dica da Maya: Foque na perda de dinheiro, não na venda do serviço.
                  </p>
               </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
