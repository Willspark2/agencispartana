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
const Dashboard = ({ initialTab = 'dashboard' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [activeWorkspace, setActiveWorkspace] = useState('agency');
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // Leads para Prospecção (Mapeados pelo Ícaro)
  const [leads, setLeads] = useState([
    { id: 1, name: 'Restaurante Sabor Mineiro', niche: 'Alimentação', status: 'Novo', gmn: 'Ruim', contact: '(31) 98888-0001' },
    { id: 2, name: 'Clínica Sorriso VIP', niche: 'Saúde', status: 'Pitch Enviado', gmn: 'Sem Site', contact: '(31) 98888-0002' },
    { id: 3, name: 'Estética Bella Donna', niche: 'Beleza', status: 'Reunião Marcada', gmn: 'Ruim', contact: '(31) 98888-0003' },
  ]);

  const sidebarLinks = [
    { id: 'prospec', label: 'Operação Hunter', icon: Target },
    { id: 'dashboard', label: 'Comando', icon: Activity },
    { id: 'kanban', label: 'CRM / Kanban', icon: FolderKanban },
    { id: 'projects', label: 'Projetos Ativos', icon: Layout },
    { id: 'finance', label: 'Dívidas & Contas', icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-[#020202] text-zinc-400 font-sans flex overflow-hidden">
      <style>{`::-webkit-scrollbar { display: none; } * { scrollbar-width: none; }`}</style>
      
      {/* SIDEBAR */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-[#080808] border-r border-zinc-900 transition-all duration-500 flex flex-col z-50`}>
        <div className="p-6 flex flex-col gap-8">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center font-black text-white text-lg shadow-lg">S</div>
              {isSidebarOpen && <span className="font-black text-white text-xl uppercase tracking-tighter italic">Spartana</span>}
           </div>
           <nav className="space-y-2">
              {sidebarLinks.map(link => (
                <button 
                  key={link.id}
                  onClick={() => setActiveTab(link.id)} 
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeTab === link.id ? 'bg-zinc-900 text-white border border-zinc-800 shadow-lg shadow-black/40' : 'text-zinc-600 hover:text-zinc-300'}`}
                >
                  <link.icon size={18} /> {isSidebarOpen && <span className="text-[11px] font-black uppercase tracking-widest">{link.label}</span>}
                </button>
              ))}
           </nav>
        </div>
      </aside>

      {/* MAIN AREA */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-black">
        <header className="h-20 border-b border-zinc-900/50 flex items-center justify-between px-10 bg-black/60 backdrop-blur-3xl z-40">
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">
            <span className="text-red-600">MODO GUERRA</span> / <span className="text-zinc-500">CAIXA RÁPIDO</span>
          </h2>
          <div className="flex gap-4">
             <div className="bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-xl flex items-center gap-3">
                <Rocket size={16} className="text-red-500" />
                <span className="text-[9px] font-black text-red-500 uppercase tracking-widest italic">Prioridade Máxima</span>
             </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 z-30">
          {activeTab === 'prospec' && (
            <div className="space-y-12 animate-in fade-in duration-700 max-w-5xl mx-auto">
               <div className="flex flex-col gap-3 border-b border-zinc-900 pb-8">
                 <h3 className="text-5xl font-black text-white uppercase italic tracking-tighter leading-none">Operação <span className="text-red-600">HUNTER</span></h3>
                 <p className="text-zinc-600 uppercase tracking-[0.4em] font-black text-[10px] ml-1 italic">Mapeamento de Oportunidades GMN (Google Invisível)</p>
               </div>

               <div className="grid grid-cols-1 gap-6">
                  {leads.map(lead => (
                    <Card key={lead.id} className="p-6 border-zinc-800 bg-zinc-950/40 group relative">
                       <div className="flex justify-between items-center">
                          <div className="space-y-2">
                             <div className="flex items-center gap-4">
                                <h4 className="text-xl font-black text-white uppercase italic tracking-tighter leading-none">{lead.name}</h4>
                                <Badge variant={lead.gmn === 'Sem Site' ? 'critical' : 'high'}>GMN: {lead.gmn}</Badge>
                             </div>
                             <div className="flex items-center gap-6 text-zinc-600 text-[10px] font-black uppercase tracking-widest">
                                <span className="flex items-center gap-1.5"><MapPin size={12} /> {lead.niche}</span>
                                <span className="flex items-center gap-1.5"><Database size={12} /> {lead.contact}</span>
                             </div>
                          </div>
                          
                          <div className="flex gap-3">
                             <a href={`https://wa.me/${lead.contact.replace(/\D/g, '')}?text=Olá, notei que sua empresa não aparece bem no Google...`} target="_blank" className="bg-emerald-600 hover:bg-emerald-500 text-black px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg shadow-emerald-900/10">
                               <MessageSquare size={16} /> Atacar (WhatsApp)
                             </a>
                             <button className="bg-zinc-900 text-zinc-500 p-3 rounded-2xl border border-zinc-800 hover:text-white transition-all"><ChevronRight size={20} /></button>
                          </div>
                       </div>
                       
                       <div className="mt-6 pt-4 border-t border-zinc-900 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                             <div className={`w-1.5 h-1.5 rounded-full ${lead.status === 'Novo' ? 'bg-blue-500' : 'bg-orange-500'} animate-pulse`} />
                             <span className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">Status: {lead.status}</span>
                          </div>
                          <div className="flex -space-x-1.5">
                             <div className="w-6 h-6 rounded-lg bg-purple-600 border-2 border-zinc-950 flex items-center justify-center text-[8px] font-black text-white uppercase shadow-lg" title="Luna">L</div>
                             <div className="w-6 h-6 rounded-lg bg-blue-600 border-2 border-zinc-950 flex items-center justify-center text-[8px] font-black text-white uppercase shadow-lg" title="Ícaro">I</div>
                          </div>
                       </div>
                    </Card>
                  ))}
               </div>

               {/* FRAMEWORK DE PITCH RÁPIDO */}
               <Card className="p-8 border-red-500/20 bg-red-500/5 shadow-xl mt-12">
                  <SectionHeader title="Script de Ego (Maya Copy)" icon={Zap} color="text-red-500" />
                  <div className="bg-black/40 p-6 rounded-2xl border border-zinc-900 italic text-lg font-medium text-zinc-300 leading-relaxed">
                    "Olá, sou o Will da Spartana. Vi que sua clínica é excelente, mas o Google está 'escondendo' você de pelo menos 10 novos clientes por semana. Eu já resolvi isso para outras empresas aqui e posso te mostrar em 5 minutos como recuperar esses clientes. Podemos falar?"
                  </div>
                  <p className="mt-4 text-zinc-600 font-black uppercase tracking-widest text-[9px] flex items-center gap-2">
                    <MousePointer2 size={12} /> Dica da Maya: Foque na perda de dinheiro, não na venda do serviço.
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
