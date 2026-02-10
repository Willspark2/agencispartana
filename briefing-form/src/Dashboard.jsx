import React, { useState, useEffect, useRef } from 'react';
import {
  Users, Target, Activity, ChevronRight, Clock, BarChart3, MessageSquare, Briefcase, User, 
  TrendingUp, Wallet, BookOpen, Layout, Plus, Database, X, Calendar, Trash2, Edit2, 
  CheckCircle2, ListTodo, HelpCircle, Zap, Menu, ChevronLeft, Settings, CreditCard, 
  Repeat, ArrowRight, FolderKanban, Check, DollarSign, PieChart, Star, Search, Bell,
  ArrowUpRight, ArrowDownRight, MoreHorizontal
} from 'lucide-react';

// ——————————————————————————————————————————————————————————————————————————————————————
// PREMIUM UI COMPONENTS (SHADCN / SPARTANA STYLE)
// ——————————————————————————————————————————————————————————————————————————————————————

const Badge = ({ children, variant = 'default' }) => {
  const variants = {
    default: 'bg-zinc-800/50 text-zinc-400 border-zinc-700/50',
    critical: 'bg-red-500/10 text-red-500 border-red-500/20',
    high: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    success: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    purple: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  };
  return (
    <span className={`px-2 py-0.5 rounded-md text-[10px] font-black border ${variants[variant]} uppercase tracking-widest`}>
      {children}
    </span>
  );
};

const Card = ({ children, className = '', onClick }) => (
  <div 
    onClick={onClick} 
    className={`bg-zinc-900/20 border border-zinc-800/50 rounded-[1.5rem] overflow-hidden backdrop-blur-xl transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/30 ${className}`}
  >
    {children}
  </div>
);

const TransparentImage = ({ src, alt, className }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const canvasRef = useRef(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      for (let i = 0; i < data.length; i += 4) {
        // Remove white/near-white backgrounds
        if (data[i] > 210 && data[i + 1] > 210 && data[i + 2] > 210) {
          data[i + 3] = 0;
        }
      }
      ctx.putImageData(imgData, 0, 0);
      setImgSrc(canvas.toDataURL());
    };
  }, [src]);

  return <img src={imgSrc} alt={alt} className={`${className} mix-blend-lighten`} style={{ filter: 'brightness(1.1) contrast(1.1)' }} />;
};

// ——————————————————————————————————————————————————————————————————————————————————————
// MAIN DASHBOARD APPLICATION
// ——————————————————————————————————————————————————————————————————————————————————————

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeWorkspace, setActiveWorkspace] = useState('agency'); // 'agency' | 'personal'
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  // APP STATE (SIMULATING SUPABASE)
  const [tasks, setTasks] = useState([
    { 
      id: '001', title: 'Configuração do CRM Digital', priority: 'Alta', resp: 'Ícaro', status: 'in_progress', category: 'agency', project: 'Spartana HQ',
      description: 'Estabelecer a infraestrutura de dados para gestão de leads.',
      objectives: 'Centralizar informações via Supabase.',
      steps: '1. Criar tabelas\n2. Vincular API', outcome: 'CRM Funcional', questions: ''
    },
    { 
      id: '004', title: 'Métricas Essenciais (Pixel/Tags)', priority: 'CRÍTICA', resp: 'Ícaro', status: 'todo', category: 'agency', project: 'Estética VIP',
      description: 'Implementação de tracking HD conforme protocolo.',
      objectives: 'Mensurar ROI das campanhas.',
      steps: '1. Levantar IDs\n2. Instalar GTM', outcome: 'Tracking HD Ativo', questions: ''
    }
  ]);

  const [finances, setFinances] = useState({
    debts: [
      { id: 1, name: 'Cartão Black', value: 15000, rate: '14.5%', status: 'Pendente' },
      { id: 2, name: 'Empréstimo PJ', value: 45000, rate: '2.1%', status: 'Em dia' },
    ],
    income: [
      { id: 1, source: 'Agência Spartana', value: 8500, type: 'Principal' },
      { id: 2, source: 'Seu Costela VCA', value: 3200, type: 'Variável' },
    ]
  });

  const [habits, setHabits] = useState([
    { id: 1, name: 'Acordar 05:00', days: Array(30).fill(false) },
    { id: 2, name: 'Prospecção 10 Leads', days: Array(30).fill(true, 0, 5) },
    { id: 3, name: 'Leitura Técnica (30min)', days: Array(30).fill(false) }
  ]);

  const toggleHabit = (hId, dIdx) => {
    setHabits(habits.map(h => h.id === hId ? { ...h, days: h.days.map((d, i) => i === dIdx ? !d : d) } : h));
  };

  const menuItems = {
    agency: [
      { id: 'dashboard', label: 'Dashboard', icon: Activity },
      { id: 'kanban', label: 'CRM / Kanban', icon: FolderKanban },
      { id: 'billing', label: 'Financeiro / ROI', icon: Wallet },
      { id: 'squad', label: 'Squad Ativo', icon: Users },
    ],
    personal: [
      { id: 'dashboard', label: 'Overview', icon: Activity },
      { id: 'finance', label: 'Dívidas & Contas', icon: CreditCard },
      { id: 'habits', label: 'Hábitos 30D', icon: Repeat },
      { id: 'goals', label: 'Metas de Vida', icon: TrendingUp },
    ]
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-400 font-sans flex overflow-hidden selection:bg-purple-500/30">
      
      {/* 🟢 SIDEBAR NAV */}
      <aside className={`${isSidebarOpen ? 'w-72' : 'w-24'} bg-zinc-950/50 border-r border-zinc-900 transition-all duration-500 flex flex-col z-50 backdrop-blur-xl`}>
        <div className="p-8 mb-4">
          <div className={`flex items-center gap-4 ${!isSidebarOpen && 'justify-center'}`}>
            <TransparentImage src="/logo_spartana.jpg" className="w-10 h-10 object-contain" alt="Logo" />
            {isSidebarOpen && <span className="font-black text-white text-xl tracking-tighter uppercase italic">Spartana</span>}
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-10 overflow-y-auto custom-scrollbar">
          {/* Workspace Switch */}
          <div className="space-y-2">
             <p className={`text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-4 ${!isSidebarOpen && 'text-center'}`}>Workspace</p>
             <button 
               onClick={() => { setActiveWorkspace('agency'); setActiveTab('dashboard'); }}
               className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeWorkspace === 'agency' ? 'bg-purple-500/10 border border-purple-500/20 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.1)]' : 'hover:bg-zinc-900/50'}`}
             >
               <Briefcase size={22} />
               {isSidebarOpen && <span className="text-xs font-black uppercase tracking-widest">Profissional</span>}
             </button>
             <button 
               onClick={() => { setActiveWorkspace('personal'); setActiveTab('dashboard'); }}
               className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeWorkspace === 'personal' ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.1)]' : 'hover:bg-zinc-900/50'}`}
             >
               <User size={22} />
               {isSidebarOpen && <span className="text-xs font-black uppercase tracking-widest">Pessoal</span>}
             </button>
          </div>

          {/* Navigation Items */}
          <div className="space-y-2">
            <p className={`text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-4 ${!isSidebarOpen && 'text-center'}`}>Gestão</p>
            {menuItems[activeWorkspace].map(item => (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 p-3.5 rounded-xl transition-all ${activeTab === item.id ? 'bg-zinc-900 text-white border border-zinc-800 shadow-xl' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/30'}`}
              >
                <item.icon size={18} />
                {isSidebarOpen && <span className="text-[11px] font-bold uppercase tracking-widest">{item.label}</span>}
              </button>
            ))}
          </div>
        </nav>

        <div className="p-6 border-t border-zinc-900/50">
           <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="w-full flex items-center justify-center p-3 rounded-xl bg-zinc-900/50 hover:bg-zinc-800 transition-all text-zinc-500">
             {isSidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
           </button>
        </div>
      </aside>

      {/* 🔵 MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        
        {/* TOP BAR */}
        <header className="h-24 border-b border-zinc-900 flex items-center justify-between px-12 bg-zinc-950/20 backdrop-blur-md z-40">
          <div className="flex flex-col">
            <div className="flex items-center gap-3 text-[9px] font-black text-zinc-600 uppercase tracking-[0.4em] mb-1">
              <span>{activeWorkspace}</span> <ArrowRight size={10} /> <span>{activeTab}</span>
            </div>
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter flex items-center gap-3">
              Spartana <span className="text-zinc-700 font-thin not-italic">/</span> <span className={activeWorkspace === 'agency' ? 'text-purple-500' : 'text-emerald-500'}>{activeWorkspace === 'agency' ? 'OPERATIONS' : 'LIFE HQ'}</span>
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-3 px-5 py-2.5 bg-zinc-900/30 border border-zinc-800 rounded-2xl">
              <Database size={16} className="text-emerald-500" />
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] italic">Database Protected</span>
            </div>
            <button onClick={() => setShowModal(true)} className="bg-white text-black px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-zinc-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.05)] active:scale-95">
              <Plus size={18} /> Nova Missão
            </button>
          </div>
        </header>

        {/* CONTENT BOX */}
        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar relative">
          
          {/* DASHBOARD OVERVIEW (Both Modes) */}
          {activeTab === 'dashboard' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700 max-w-7xl mx-auto">
              
              {/* STATS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard label={activeWorkspace === 'agency' ? 'Projetos Ativos' : 'Consistência'} val={activeWorkspace === 'agency' ? '12' : '78%'} icon={Target} color="text-white" />
                <StatCard label={activeWorkspace === 'agency' ? 'Faturamento' : 'Patrimônio'} val="R$ 18.5k" icon={Wallet} color="text-emerald-400" />
                <StatCard label="Agent Pulse" val="HD READY" icon={Zap} color="text-yellow-500" />
                <StatCard label="Notificações" val="03" icon={Bell} color="text-purple-500" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* RECENT TASKS */}
                <div className="lg:col-span-2 space-y-6">
                  <SectionHeader title="Missões em Execução" icon={Activity} />
                  <div className="space-y-4">
                    {tasks.filter(t => t.status === 'in_progress' && t.category === activeWorkspace).map(task => (
                       <TaskCardLarge key={task.id} task={task} onClick={() => { setSelectedTask(task); setShowDetails(true); }} />
                    ))}
                    {tasks.filter(t => t.status === 'in_progress' && t.category === activeWorkspace).length === 0 && (
                      <div className="p-20 text-center border-2 border-dashed border-zinc-900 rounded-[2.5rem] opacity-20 uppercase font-black tracking-widest text-xs">Sem missões ativas</div>
                    )}
                  </div>
                </div>

                {/* BRAINSTORM FEED (THE CORE INTERACTION VIEW) */}
                <div className="space-y-6">
                  <SectionHeader title="Brainstorm Live" icon={MessageSquare} />
                  <Card className="p-8 border-purple-500/20 bg-purple-500/5">
                    <div className="space-y-8 relative">
                       <div className="absolute left-1 top-2 bottom-2 w-px bg-zinc-800" />
                       <BrainstormItem agent="ERIKA" time="09:20" color="bg-purple-500" text="Lembrete ativado. Precisamos subir a integração total do Supabase para persistência HD." />
                       <BrainstormItem agent="ÍCARO" time="08:45" color="bg-blue-500" text="Estrutura de tabelas mapeada. Workspace isolado garante segurança dos dados pessoais." />
                       <BrainstormItem agent="MAYA" time="08:12" color="bg-pink-500" text="Nova landing page para High Ticket convertendo em 18% nos testes de copy." />
                       <div className="flex items-center gap-2 text-[10px] font-black text-zinc-600 uppercase tracking-widest pt-4 animate-pulse">
                         <span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Agentes processando...
                       </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {/* KANBAN CRM */}
          {activeTab === 'kanban' && (
            <div className="h-full animate-in fade-in duration-500">
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full min-h-[700px]">
                 {['todo', 'in_progress', 'done'].map(status => (
                    <div key={status} className="flex flex-col h-full space-y-6">
                       <div className="flex items-center justify-between px-4">
                          <Badge variant={status === 'in_progress' ? 'purple' : 'default'}>
                            {status === 'todo' ? 'Backlog' : status === 'in_progress' ? 'Em Execução' : 'Finalizado'}
                          </Badge>
                          <span className="text-xs font-mono font-bold text-zinc-700">{tasks.filter(t => t.status === status && t.category === activeWorkspace).length}</span>
                       </div>
                       <div className="flex-1 bg-zinc-900/10 border border-zinc-900/50 border-dashed rounded-[2.5rem] p-4 space-y-4 overflow-y-auto custom-scrollbar hover:border-zinc-800 transition-colors">
                          {tasks.filter(t => t.status === status && t.category === activeWorkspace).map(task => (
                            <TaskKanbanCard 
                              key={task.id} 
                              task={task} 
                              onClick={() => { setSelectedTask(task); setShowDetails(true); }}
                              onEdit={() => { setEditingTask(task); setNewTask({...task}); setShowModal(true); }}
                              onDelete={() => { if(window.confirm('Excluir?')) setTasks(tasks.filter(it => it.id !== task.id)) }}
                            />
                          ))}
                       </div>
                    </div>
                 ))}
               </div>
            </div>
          )}

          {/* FINANCE WORKSPACE (WITH INPUT TABLES) */}
          {(activeTab === 'finance' || activeTab === 'billing' || activeTab === 'income') && (
            <div className="space-y-12 animate-in slide-in-from-right-4 duration-500 max-w-6xl">
              <div className="flex justify-between items-end border-b border-zinc-900 pb-10">
                <h3 className="text-5xl font-black text-white uppercase italic tracking-tighter leading-none">
                  Gestão <span className="text-zinc-800">Financeira</span>
                </h3>
                <div className="flex gap-4">
                  <button className="px-6 py-3 bg-emerald-500 text-black font-black rounded-xl text-[11px] uppercase tracking-widest hover:scale-105 transition-all">+ Lançamento</button>
                  <button className="px-6 py-3 bg-zinc-900 text-zinc-400 font-black rounded-xl text-[11px] uppercase tracking-widest border border-zinc-800">Exportar PDF</button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-12">
                {/* DEBT TABLE */}
                <div className="space-y-6">
                  <SectionHeader title="Passivos & Dívidas (Sangria)" icon={ArrowDownRight} color="text-red-500" />
                  <div className="overflow-hidden rounded-[2rem] border border-zinc-900 bg-zinc-950/30 backdrop-blur-md">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-zinc-900/50">
                          <th className="p-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">Descrição</th>
                          <th className="p-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">Valor Total</th>
                          <th className="p-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">Taxa Juros</th>
                          <th className="p-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">Status</th>
                          <th className="p-6 text-[10px] font-black uppercase tracking-widest text-zinc-500 text-right">Ação</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-900">
                        {finances.debts.map(debt => (
                          <tr key={debt.id} className="group hover:bg-zinc-900/40 transition-colors">
                            <td className="p-6 text-sm font-bold text-white uppercase italic">{debt.name}</td>
                            <td className="p-6"><input className="bg-transparent border-none text-red-400 font-mono font-black focus:ring-0 w-32" defaultValue={`R$ ${debt.value.toLocaleString()}`} /></td>
                            <td className="p-6 text-zinc-500 font-mono text-xs">{debt.rate}</td>
                            <td className="p-6"><Badge variant={debt.status === 'Pendente' ? 'critical' : 'success'}>{debt.status}</Badge></td>
                            <td className="p-6 text-right"><button className="text-zinc-700 hover:text-white transition-all"><Edit2 size={16} /></button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* INCOME TABLE */}
                <div className="space-y-6">
                  <SectionHeader title="Ativos & Receitas (Caixa)" icon={ArrowUpRight} color="text-emerald-500" />
                  <div className="overflow-hidden rounded-[2rem] border border-zinc-900 bg-zinc-950/30 backdrop-blur-md">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-zinc-900/50">
                          <th className="p-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">Fonte</th>
                          <th className="p-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">Valor Mensal</th>
                          <th className="p-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">Categoria</th>
                          <th className="p-6 text-[10px] font-black uppercase tracking-widest text-zinc-500 text-right">Ação</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-900">
                        {finances.income.map(inc => (
                          <tr key={inc.id} className="group hover:bg-zinc-900/40 transition-colors">
                            <td className="p-6 text-sm font-bold text-white uppercase italic">{inc.source}</td>
                            <td className="p-6"><input className="bg-transparent border-none text-emerald-400 font-mono font-black focus:ring-0 w-32" defaultValue={`R$ ${inc.value.toLocaleString()}`} /></td>
                            <td className="p-6 text-zinc-500 text-[10px] font-black uppercase tracking-widest">{inc.type}</td>
                            <td className="p-6 text-right"><button className="text-zinc-700 hover:text-white transition-all"><Edit2 size={16} /></button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* HABIT TRACKER HD */}
          {activeTab === 'habits' && (
            <div className="space-y-12 animate-in fade-in duration-500 max-w-7xl mx-auto">
              <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter">Protocolo de Hábitos <span className="text-emerald-500">30D</span></h3>
              <div className="grid grid-cols-1 gap-8">
                {habits.map(habit => (
                  <Card key={habit.id} className="p-10 bg-zinc-950/50 border-zinc-800">
                    <div className="flex justify-between items-center mb-8 border-b border-zinc-900 pb-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl border border-emerald-500/20"><Repeat size={24} /></div>
                        <h4 className="text-2xl font-black text-white uppercase italic tracking-tight">{habit.name}</h4>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest block mb-1">Taxa de Sucesso</span>
                        <Badge variant="success">{Math.round((habit.days.filter(d => d).length / 30) * 100)}% CONSISTÊNCIA</Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
                      {habit.days.map((done, idx) => (
                        <button 
                          key={idx}
                          onClick={() => toggleHabit(habit.id, idx)}
                          className={`aspect-square rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center gap-1 ${done ? 'bg-emerald-500 border-emerald-400 text-black shadow-[0_0_30px_rgba(16,185,129,0.2)] scale-105' : 'bg-zinc-900/50 border-zinc-800 text-zinc-600 hover:border-zinc-600'}`}
                        >
                          <span className="text-[10px] font-black">DIA</span>
                          <span className="text-lg font-black leading-none">{idx + 1}</span>
                          {done && <Check size={12} strokeWidth={4} />}
                        </button>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      {/* 🔴 DETAIL MODAL (THE "BIG SCREEN" VIEW) */}
      {showDetails && selectedTask && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-3xl z-[100] flex items-center justify-center p-8 lg:p-24 animate-in fade-in duration-300" onClick={() => setShowDetails(false)}>
           <div 
             className="w-full max-w-6xl bg-zinc-950 border border-zinc-800/50 rounded-[4rem] p-16 relative overflow-y-auto max-h-full custom-scrollbar shadow-[0_0_150px_rgba(0,0,0,1)]" 
             onClick={e => e.stopPropagation()}
           >
              <button onClick={() => setShowDetails(false)} className="absolute top-12 right-12 text-zinc-700 hover:text-white transition-all hover:rotate-90 duration-300">
                <X size={48} strokeWidth={1.5} />
              </button>

              <div className="flex items-center gap-6 mb-8">
                 <Badge variant={selectedTask.priority === 'CRÍTICA' ? 'critical' : 'high'}>{selectedTask.priority}</Badge>
                 <span className="text-xs font-black text-zinc-700 uppercase tracking-[0.5em] italic">Protocolo Spartana #{selectedTask.id}</span>
              </div>

              <h2 className="text-7xl font-black text-white uppercase italic tracking-tighter leading-[0.9] mb-12 border-b border-zinc-900 pb-16">
                {selectedTask.title}
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                 <div className="space-y-16">
                    <DetailBlock title="Visão Geral & Contexto" content={selectedTask.description} icon={Zap} color="text-yellow-500" />
                    <DetailBlock title="Objetivos Estratégicos" content={selectedTask.objectives} icon={Target} color="text-purple-500" />
                    <DetailBlock title="Outcome / Resultado" content={selectedTask.outcome} icon={CheckCircle2} color="text-emerald-500" />
                 </div>
                 <div className="space-y-16">
                    <DetailBlock title="Plano de Execução HD" content={selectedTask.steps} isList icon={ListTodo} color="text-blue-500" />
                    <DetailBlock title="Dúvidas & Clarificações" content={selectedTask.questions || "Aguardando input estratégico do sócio..."} icon={HelpCircle} color="text-zinc-700" />
                 </div>
              </div>

              <div className="mt-24 pt-12 border-t border-zinc-900 flex justify-between items-center">
                 <div className="flex gap-10">
                    <MetaItem label="Agente Responsável" val={selectedTask.resp} icon={User} />
                    <MetaItem label="Projeto Vinculado" val={selectedTask.project} icon={FolderKanban} />
                 </div>
                 <div className="flex gap-4">
                    <button onClick={() => { setEditingTask(selectedTask); setNewTask({...selectedTask}); setShowModal(true); }} className="px-10 py-5 bg-zinc-100 text-black font-black rounded-3xl uppercase tracking-widest hover:bg-white transition-all shadow-xl">Editar Protocolo</button>
                    <button onClick={() => handleDeleteTask(selectedTask.id)} className="px-10 py-5 bg-red-950/30 text-red-500 border border-red-500/20 rounded-3xl font-black uppercase tracking-widest hover:bg-red-500 hover:text-black transition-all">Abortar Missão</button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* 🟡 CREATE / EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[110] flex items-center justify-center p-4 animate-in zoom-in-95 duration-300">
           <Card className="w-full max-w-4xl p-12 bg-[#080808] border-zinc-800 shadow-[0_0_100px_rgba(168,85,247,0.1)]">
              <div className="flex justify-between items-center mb-12">
                 <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white">{editingTask ? 'Refinar' : 'Lançar'} Missão</h2>
                 <button onClick={closeModal} className="text-zinc-600 hover:text-white"><X size={24} /></button>
              </div>
              <form onSubmit={handleSaveTask} className="space-y-10 text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                   <div className="space-y-6">
                      <InputHD label="Título da Missão" value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})} required />
                      <InputHD label="Projeto / Cliente" value={newTask.project} onChange={e => setNewTask({...newTask, project: e.target.value})} />
                      <TextAreaHD label="Descrição Macro" value={newTask.description} onChange={e => setNewTask({...newTask, description: e.target.value})} rows={3} />
                   </div>
                   <div className="space-y-6">
                      <TextAreaHD label="Plano de Execução (Passo a Passo)" value={newTask.steps} onChange={e => setNewTask({...newTask, steps: e.target.value})} rows={3} />
                      <TextAreaHD label="Resultado Esperado (Outcome)" value={newTask.outcome} onChange={e => setNewTask({...newTask, outcome: e.target.value})} rows={3} />
                   </div>
                </div>
                <div className="flex justify-end gap-4 border-t border-zinc-900 pt-10">
                   <button type="button" onClick={closeModal} className="px-8 py-4 text-zinc-500 font-bold uppercase tracking-widest hover:text-white transition-all">Cancelar</button>
                   <button type="submit" className="px-12 py-5 bg-white text-black font-black rounded-2xl uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">Deploy em HD</button>
                </div>
              </form>
           </Card>
        </div>
      )}

    </div>
  );
};

// ——————————————————————————————————————————————————————————————————————————————————————
// DETAILED SUB-COMPONENTS
// ——————————————————————————————————————————————————————————————————————————————————————

const SectionHeader = ({ title, icon: Icon, color = "text-zinc-600" }) => (
  <div className="flex items-center gap-4 mb-2">
    <Icon size={18} className={color} />
    <h3 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-600">{title}</h3>
  </div>
);

const StatCard = ({ label, val, icon: Icon, color }) => (
  <Card className="p-8">
    <div className="flex justify-between items-start mb-6">
      <div className="p-3 bg-zinc-800/50 rounded-2xl border border-zinc-700/50"><Icon size={20} className="text-zinc-400" /></div>
      <span className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">Live Sync</span>
    </div>
    <span className={`text-4xl font-black block mb-2 tracking-tighter uppercase italic ${color}`}>{val}</span>
    <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em]">{label}</span>
  </Card>
);

const TaskCardLarge = ({ task, onClick }) => (
  <div onClick={onClick} className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-[2rem] hover:border-purple-500/50 transition-all cursor-pointer group relative overflow-hidden">
     <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-[50px] -mr-16 -mt-16" />
     <div className="flex justify-between items-start mb-6">
        <Badge variant={task.priority === 'CRÍTICA' ? 'critical' : 'high'}>{task.priority}</Badge>
        <div className="flex items-center gap-2 text-zinc-600 font-mono text-xs">#{task.id}</div>
     </div>
     <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] mb-2 block">{task.project}</span>
     <h4 className="text-2xl font-black text-white uppercase italic tracking-tight group-hover:text-purple-400 transition-colors mb-4">{task.title}</h4>
     <div className="flex items-center justify-between pt-6 border-t border-zinc-800/50">
        <div className="flex items-center gap-3">
           <div className="w-8 h-8 rounded-xl bg-zinc-800 flex items-center justify-center text-[11px] font-black text-white">{task.resp[0]}</div>
           <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{task.resp}</span>
        </div>
        <ArrowRight className="text-zinc-800 group-hover:text-purple-500 transition-all" size={24} />
     </div>
  </div>
);

const TaskKanbanCard = ({ task, onClick, onDelete, onEdit }) => (
  <div onClick={onClick} className="bg-zinc-950 border border-zinc-800 p-6 rounded-[2rem] hover:border-zinc-600 transition-all cursor-pointer group shadow-2xl">
     <div className="flex justify-between items-start mb-4">
        <Badge variant={task.priority === 'CRÍTICA' ? 'critical' : 'default'}>{task.priority}</Badge>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
           <button onClick={onEdit} className="p-1.5 hover:bg-zinc-900 rounded-lg text-zinc-600 hover:text-blue-400"><Edit2 size={14} /></button>
           <button onClick={onDelete} className="p-1.5 hover:bg-zinc-900 rounded-lg text-zinc-600 hover:text-red-500"><Trash2 size={14} /></button>
        </div>
     </div>
     <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest mb-1 block">{task.project}</span>
     <h4 className="text-sm font-bold text-zinc-200 uppercase tracking-tight leading-tight mb-6">{task.title}</h4>
     <div className="flex items-center justify-between pt-4 border-t border-zinc-900/50">
        <div className="flex items-center gap-2">
           <div className="w-6 h-6 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[10px] font-black text-zinc-500 uppercase italic">{task.resp[0]}</div>
           <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-tighter">{task.resp}</span>
        </div>
        <ChevronRight size={14} className="text-zinc-800 group-hover:text-white" />
     </div>
  </div>
);

const BrainstormItem = ({ agent, time, text, color }) => (
  <div className="relative pl-8">
     <div className={`absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full ${color} shadow-[0_0_10px_rgba(168,85,247,0.5)] z-10`} />
     <div className="flex justify-between items-center mb-1">
        <span className="text-[10px] font-black text-white uppercase tracking-widest italic">{agent}</span>
        <span className="text-[9px] font-mono text-zinc-700">{time}</span>
     </div>
     <p className="text-[12px] text-zinc-400 leading-relaxed font-medium">{text}</p>
  </div>
);

const DetailBlock = ({ title, content, icon: Icon, color, isList = false }) => (
  <div className="space-y-6">
     <div className="flex items-center gap-3">
        <Icon size={24} className={color} />
        <h3 className="text-xs font-black uppercase tracking-[0.5em] text-zinc-600">{title}</h3>
     </div>
     {isList ? (
       <div className="space-y-4">
         {content.split('\n').map((item, i) => (
           <div key={i} className="flex gap-6 p-6 bg-zinc-900/30 border border-zinc-900 rounded-[2rem] text-xl text-zinc-300 font-medium">
             <span className="text-zinc-800 font-black italic">{String(i+1).padStart(2, '0')}</span>
             <span>{item}</span>
           </div>
         ))}
       </div>
     ) : (
       <p className="text-2xl text-zinc-300 leading-relaxed italic font-light border-l-2 border-zinc-900 pl-8">"{content}"</p>
     )}
  </div>
);

const MetaItem = ({ label, val, icon: Icon }) => (
  <div className="flex items-center gap-3">
     <Icon size={18} className="text-zinc-700" />
     <div>
        <p className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">{label}</p>
        <p className="text-sm font-bold text-zinc-400 uppercase italic">{val}</p>
     </div>
  </div>
);

const InputHD = ({ label, ...props }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">{label}</label>
    <input className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 text-white focus:border-zinc-500 outline-none transition-all shadow-inner font-bold" {...props} />
  </div>
);

const TextAreaHD = ({ label, ...props }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">{label}</label>
    <textarea className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 text-white focus:border-zinc-500 outline-none transition-all resize-none shadow-inner font-medium" {...props} />
  </div>
);

export default Dashboard;
