import React, { useState, useEffect } from 'react';
import { 
  Users, Target, Activity, ChevronRight, Clock, BarChart3, MessageSquare, Briefcase, User, 
  TrendingUp, Wallet, BookOpen, Layout, Plus, Database, X, Calendar, Trash2, Edit2, 
  CheckCircle2, ListTodo, HelpCircle, Zap, Menu, ChevronLeft, Settings, CreditCard, 
  Repeat, ArrowRight, FolderKanban, Check, DollarSign, PieChart, Star, Search, Bell,
  ArrowUpRight, ArrowDownRight, MoreHorizontal, Send, Rocket, Shield, MapPin, MousePointer2
} from 'lucide-react';

// ——————————————————————————————————————————————————————————————————————————————————————
// PREMIUM UI COMPONENTS (ESTILO SPARTANA HD - SCALE REFINADA)
// ——————————————————————————————————————————————————————————————————————————————————————

const Badge = ({ children, variant = 'default' }) => {
  const variants = {
    default: 'bg-zinc-800/50 text-zinc-400 border-zinc-700/50',
    critical: 'bg-red-500/10 text-red-500 border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.15)]',
    high: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    success: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    purple: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  };
  return (
    <span className={`px-2 py-0.5 rounded-md text-[9px] font-black border ${variants[variant]} uppercase tracking-widest`}>
      {children}
    </span>
  );
};

const Card = ({ children, className = '', onClick }) => (
  <div 
    onClick={onClick} 
    className={`bg-zinc-900/20 border border-zinc-800/50 rounded-2xl overflow-hidden backdrop-blur-xl transition-all duration-500 hover:border-zinc-700 hover:bg-zinc-900/40 ${className}`}
  >
    {children}
  </div>
);

const SectionHeader = ({ title, icon: Icon, color }) => (
  <div className="flex items-center gap-4 mb-8">
    <div className={`p-3 rounded-xl bg-zinc-900/50 border border-zinc-800 shadow-xl ${color}`}>
      <Icon size={18} />
    </div>
    <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">{title}</h3>
  </div>
);

const BrainstormItem = ({ agent, time, text, color }) => (
  <div className="flex gap-4 group">
    <div className={`w-8 h-8 rounded-lg ${color} flex-shrink-0 flex items-center justify-center text-[10px] font-black text-white shadow-lg`}>
      {agent[0]}
    </div>
    <div className="space-y-1">
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-black text-white uppercase tracking-widest">{agent}</span>
        <span className="text-[8px] font-bold text-zinc-700 uppercase tracking-widest">{time}</span>
      </div>
      <p className="text-zinc-400 text-sm leading-relaxed">{text}</p>
    </div>
  </div>
);

// ——————————————————————————————————————————————————————————————————————————————————————
// MAIN DASHBOARD COMPONENT
// ——————————————————————————————————————————————————————————————————————————————————————

const Dashboard = ({ initialTab }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [brainstormMsg, setBrainstormMsg] = useState('');

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const [leads] = useState([
    { id: 1, name: 'Restaurante Sabor Mineiro', niche: 'Alimentação', status: 'Novo', gmn: 'Ruim', contact: '(31) 98888-0001' },
    { id: 2, name: 'Clínica Sorriso VIP', niche: 'Saúde', status: 'Pitch Enviado', gmn: 'Sem Site', contact: '(31) 98888-0002' },
    { id: 3, name: 'Estética Bella Donna', niche: 'Beleza', status: 'Reunião Marcada', gmn: 'Ruim', contact: '(31) 98888-0003' },
  ]);

  const [brainstormFeed, setBrainstormFeed] = useState([
    { agent: 'ERIKA', time: '10:45', text: 'Operação Hunter ativada. Foco total em caixa rápido via GMN.', color: 'bg-purple-500' },
    { agent: 'MAYA', time: '10:55', text: 'Script de Ego pronto para disparo. Focar na dor financeira.', color: 'bg-red-500' },
    { agent: 'ÍCARO', time: '11:05', text: 'Mapeamento de 20 novos leads na região iniciado.', color: 'bg-blue-500' }
  ]);

  const sidebarLinks = [
    { id: 'prospec', label: 'Operação Hunter', icon: Target },
    { id: 'dashboard', label: 'Comando', icon: Activity },
    { id: 'kanban', label: 'CRM / Kanban', icon: FolderKanban },
    { id: 'projects', label: 'Projetos Ativos', icon: Layout },
    { id: 'finance', label: 'Dívidas & Contas', icon: CreditCard },
  ];

  const sendBrainstorm = (e) => {
    e.preventDefault();
    if(!brainstormMsg) return;
    setBrainstormFeed([{ agent: 'WILL', time: 'Agora', text: brainstormMsg, color: 'bg-emerald-500' }, ...brainstormFeed]);
    setBrainstormMsg('');
  };

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
        <div className="mt-auto p-6">
           <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="w-full flex items-center justify-center p-3 rounded-xl bg-zinc-900/30 hover:bg-zinc-800 transition-all text-zinc-600">
             {isSidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
           </button>
        </div>
      </aside>

      {/* MAIN AREA */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-black">
        <header className="h-20 border-b border-zinc-900/50 flex items-center justify-between px-10 bg-black/60 backdrop-blur-3xl z-40">
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">
            {activeTab === 'prospec' ? <span className="text-red-600">MODO GUERRA</span> : <span className="text-purple-600">CENTRAL DE COMANDO</span>}
            <span className="text-zinc-800 mx-4 font-thin">/</span>
            <span className="text-zinc-500">{sidebarLinks.find(l => l.id === activeTab)?.label}</span>
          </h2>
          <div className="flex gap-4">
             <div className="bg-zinc-950 border border-zinc-900 px-4 py-2 rounded-xl flex items-center gap-3">
                <Database size={16} className="text-emerald-500" />
                <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest italic">Supabase Ativo</span>
             </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 z-30">
          
          {/* VIEW: PROSPECÇÃO (HUNTER) */}
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
                             <a href={`https://wa.me/${lead.contact.replace(/\D/g, '')}?text=Olá!`} target="_blank" className="bg-emerald-600 hover:bg-emerald-500 text-black px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center gap-2 transition-all">
                               <MessageSquare size={16} /> Atacar
                             </a>
                          </div>
                       </div>
                    </Card>
                  ))}
               </div>
            </div>
          )}

          {/* VIEW: COMANDO (OVERVIEW) */}
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 animate-in slide-in-from-bottom-6 duration-700">
               <div className="lg:col-span-2 space-y-10">
                  <SectionHeader title="Métricas de Elite" icon={Activity} color="text-purple-500" />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <Card className="p-6 bg-zinc-950/50">
                        <span className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.3em]">Faturamento Real</span>
                        <div className="text-3xl font-black text-white italic tracking-tighter mt-2">R$ 12.450,00</div>
                        <div className="flex items-center gap-2 mt-2 text-emerald-500 font-bold text-[10px]">
                           <ArrowUpRight size={12} /> +12% vs last week
                        </div>
                     </Card>
                     <Card className="p-6 bg-zinc-950/50">
                        <span className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.3em]">Leads em Aberto</span>
                        <div className="text-3xl font-black text-white italic tracking-tighter mt-2">42</div>
                        <Badge variant="high" className="mt-2">Alta Conversão</Badge>
                     </Card>
                     <Card className="p-6 bg-zinc-950/50">
                        <span className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.3em]">Projetos Ativos</span>
                        <div className="text-3xl font-black text-white italic tracking-tighter mt-2">08</div>
                        <div className="mt-2 text-[10px] font-bold text-zinc-600 italic">4 Clientes High Ticket</div>
                     </Card>
                  </div>

                  <SectionHeader title="Pipeline de Projetos" icon={Layout} color="text-blue-500" />
                  <Card className="p-0 border-zinc-900 bg-[#060606]">
                     <div className="p-6 border-b border-zinc-900 flex justify-between items-center">
                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Contratos em Execução</span>
                        <button className="text-[10px] font-black text-purple-500 uppercase hover:text-white transition-all">Ver Todos</button>
                     </div>
                     <div className="divide-y divide-zinc-900">
                        {['Estética VIP', 'Seu Costela VCA', 'Academia Iron'].map(proj => (
                           <div key={proj} className="p-6 flex items-center justify-between hover:bg-zinc-900/20 transition-all cursor-pointer">
                              <span className="font-black text-white uppercase italic tracking-tight">{proj}</span>
                              <Badge variant="success">Em Dia</Badge>
                           </div>
                        ))}
                     </div>
                  </Card>
               </div>

               <div className="space-y-10">
                  <SectionHeader title="Brainstorm Live" icon={MessageSquare} color="text-emerald-500" />
                  <Card className="p-6 border-emerald-500/10 bg-emerald-500/5 h-[600px] flex flex-col">
                     <div className="flex-1 space-y-6 overflow-y-auto mb-6">
                        {brainstormFeed.map((f, i) => <BrainstormItem key={i} {...f} />)}
                     </div>
                     <form onSubmit={sendBrainstorm} className="relative mt-auto pt-6 border-t border-zinc-900">
                        <input 
                          className="w-full bg-black border border-zinc-800 rounded-xl p-4 text-xs text-white outline-none focus:border-emerald-500 transition-all"
                          placeholder="Sócio, envie sua visão..."
                          value={brainstormMsg}
                          onChange={e => setBrainstormMsg(e.target.value)}
                        />
                        <button type="submit" className="absolute right-4 top-[2.2rem] text-emerald-500 hover:scale-110 transition-all"><Send size={20} /></button>
                     </form>
                  </Card>
               </div>
            </div>
          )}

          {/* VIEWS ADICIONAIS (PLACEHOLDERS REFINADOS) */}
          {(activeTab === 'kanban' || activeTab === 'projects' || activeTab === 'finance') && (
            <div className="flex flex-col items-center justify-center h-[60vh] animate-in fade-in duration-1000">
               <div className="w-20 h-20 bg-zinc-900 rounded-3xl flex items-center justify-center border border-zinc-800 mb-6 text-zinc-700">
                  <Database size={40} />
               </div>
               <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">Aguardando Conexão Supabase</h3>
               <p className="text-zinc-600 uppercase tracking-widest text-[10px] mt-4 font-black">Rodar SQL no painel para ativar este módulo.</p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default Dashboard;
