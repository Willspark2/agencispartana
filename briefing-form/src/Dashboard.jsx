import React, { useState, useEffect } from 'react';
import {
  Users,
  Target,
  Activity,
  ChevronRight,
  Clock,
  BarChart3,
  MessageSquare,
  Briefcase,
  User,
  TrendingUp,
  Wallet,
  BookOpen,
  Layout,
  Plus,
  Database,
  X,
  Calendar,
  Trash2,
  Edit2,
  CheckCircle2,
  ListTodo,
  HelpCircle,
  Zap,
  Menu,
  ChevronLeft,
  Settings,
  CreditCard,
  LineChart,
  Repeat
} from 'lucide-react';

// ——————————————————————————————————————————————————————————————————————————————————————
// UI COMPONENTS
// ——————————————————————————————————————————————————————————————————————————————————————

const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-zinc-800 text-zinc-400 border-zinc-700',
    critical: 'bg-red-950/50 text-red-400 border-red-900/50',
    high: 'bg-orange-950/50 text-orange-400 border-orange-900/50',
    success: 'bg-emerald-950/50 text-emerald-400 border-emerald-900/50',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${variants[variant]} ${className} uppercase tracking-tight`}>
      {children}
    </span>
  );
};

const Card = ({ children, className = '' }) => (
  <div className={`bg-zinc-900/40 border border-zinc-800/50 rounded-2xl overflow-hidden backdrop-blur-sm transition-all hover:border-zinc-700 ${className}`}>
    {children}
  </div>
);

// ——————————————————————————————————————————————————————————————————————————————————————
// MAIN DASHBOARD COMPONENT
// ——————————————————————————————————————————————————————————————————————————————————————

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeMode, setActiveMode] = useState('agency'); // 'agency' or 'personal'
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  
  const [newTask, setNewTask] = useState({ 
    title: '', priority: 'Normal', resp: '', status: 'todo',
    description: '', objectives: '', steps: '', outcome: '', questions: ''
  });

  const [tasks, setTasks] = useState([
    { 
      id: '001', title: 'Configuração do CRM Digital', priority: 'Alta', resp: 'Ícaro', status: 'in_progress', category: 'agency', date: 'Hoje',
      description: 'Estabelecer a infraestrutura de dados para gestão de leads.',
      objectives: 'Centralizar informações via Supabase.',
      steps: '1. Criar tabelas\n2. Vincular API', outcome: 'CRM Funcional', questions: ''
    },
    { 
      id: '004', title: 'Métricas Essenciais (Pixel/Tags)', priority: 'CRÍTICA', resp: 'Ícaro', status: 'todo', category: 'agency', date: 'Hoje',
      description: 'Implementação de tracking HD conforme protocolo.',
      objectives: 'Mensurar ROI das campanhas.',
      steps: '1. Levantar IDs\n2. Instalar GTM', outcome: 'Tracking HD Ativo', questions: ''
    },
    { 
      id: 'F01', title: 'Mapeamento de Dívidas', priority: 'CRÍTICA', resp: 'Midas', status: 'in_progress', category: 'personal', date: 'Hoje',
      description: 'Análise detalhada do passivo financeiro.',
      objectives: 'Estancar sangria de juros.',
      steps: '1. Listar credores\n2. Priorizar taxas', outcome: 'Plano de Guerra Pronto', questions: ''
    }
  ]);

  const modes = {
    agency: {
      label: 'Agência Spartana',
      icon: Briefcase,
      color: 'text-purple-400',
      tabs: [
        { id: 'dashboard', label: 'Dashboard', icon: Activity },
        { id: 'kanban', label: 'CRM / Kanban', icon: Layout },
        { id: 'billing', label: 'Faturamento', icon: Wallet },
        { id: 'squad', label: 'Squad Ativo', icon: Users },
      ]
    },
    personal: {
      label: 'Vida Pessoal',
      icon: User,
      color: 'text-emerald-400',
      tabs: [
        { id: 'dashboard', label: 'Dashboard', icon: Activity },
        { id: 'finance', label: 'Dívidas & Contas', icon: CreditCard },
        { id: 'goals', label: 'Metas Financeiras', icon: TrendingUp },
        { id: 'habits', label: 'Hábitos & Rotina', icon: Repeat },
      ]
    }
  };

  const handleSaveTask = (e) => {
    e.preventDefault();
    if (editingTask) {
      setTasks(tasks.map(t => t.id === editingTask.id ? { ...t, ...newTask } : t));
    } else {
      const id = activeMode === 'agency' ? `00${tasks.length + 1}` : `F0${tasks.length + 1}`;
      setTasks([...tasks, { ...newTask, id, category: activeMode, date: 'Hoje' }]);
    }
    closeModal();
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTask(null);
    setNewTask({ title: '', priority: 'Normal', resp: '', status: 'todo', description: '', objectives: '', steps: '', outcome: '', questions: '' });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 font-sans flex overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-zinc-950 border-r border-zinc-900 transition-all duration-300 flex flex-col z-40 relative shadow-[10px_0_30px_rgba(0,0,0,0.5)]`}>
        <div className="p-6 flex items-center justify-between border-b border-zinc-900/50">
          {isSidebarOpen && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-zinc-900 flex items-center justify-center overflow-hidden">
                <img src="/logo_spartana.jpg" className="w-full h-full object-contain mix-blend-screen scale-125" alt="L" />
              </div>
              <span className="font-black tracking-tighter text-white uppercase italic text-sm">Spartana</span>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-zinc-900 rounded-lg text-zinc-500 hover:text-white transition-all">
            {isSidebarOpen ? <ChevronLeft size={18} /> : <Menu size={22} />}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
          {/* Mode Switch */}
          <div className="space-y-2">
            <p className={`text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600 mb-4 ${!isSidebarOpen && 'text-center'}`}>Ambiente</p>
            <SidebarBtn 
              active={activeMode === 'agency'} 
              onClick={() => { setActiveMode('agency'); setActiveTab('dashboard'); }}
              icon={Briefcase} label="Operações" open={isSidebarOpen} activeColor="text-purple-400"
            />
            <SidebarBtn 
              active={activeMode === 'personal'} 
              onClick={() => { setActiveMode('personal'); setActiveTab('dashboard'); }}
              icon={User} label="Vida Pessoal" open={isSidebarOpen} activeColor="text-emerald-400"
            />
          </div>

          {/* Navigation Tabs */}
          <div className="space-y-2 pt-6 border-t border-zinc-900/50">
            <p className={`text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600 mb-4 ${!isSidebarOpen && 'text-center'}`}>Gerenciamento</p>
            {modes[activeMode].tabs.map(tab => (
              <SidebarBtn 
                key={tab.id}
                active={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                icon={tab.icon} label={tab.label} open={isSidebarOpen}
              />
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-zinc-900/50">
          <SidebarBtn icon={Settings} label="Configurações" open={isSidebarOpen} />
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="h-20 border-b border-zinc-900/50 flex items-center justify-between px-8 bg-black/20 backdrop-blur-xl z-30">
          <div className="flex items-center gap-4">
            <div className={`w-2 h-2 rounded-full ${activeMode === 'agency' ? 'bg-purple-500' : 'bg-emerald-500'} animate-pulse shadow-[0_0_10px_rgba(168,85,247,0.5)]`} />
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-white">
              {modes[activeMode].label} <span className="text-zinc-700 mx-2">/</span> 
              <span className="text-zinc-500">{modes[activeMode].tabs.find(t => t.id === activeTab)?.label}</span>
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-xl">
              <Database size={14} className="text-emerald-500" />
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest italic">Supabase Connected</span>
            </div>
            <button 
              onClick={() => setShowModal(true)}
              className="bg-white text-black px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
            >
              <Plus size={16} /> Nova Missão
            </button>
          </div>
        </header>

        {/* Dynamic View Area */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          
          {activeTab === 'dashboard' && (
             <div className="space-y-8 animate-in fade-in duration-500">
               <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <StatCard label="Métricas Ativas" val="12" icon={Activity} />
                  <StatCard label="Caixa Week" val="R$ 0,00" icon={Wallet} color="text-emerald-400" />
                  <StatCard label="Agent Pulse" val="Ollama" icon={Zap} />
                  <StatCard label="Performance" val="HD" icon={Target} color="text-purple-400" />
               </div>
               
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-600 flex items-center gap-3">
                      <Layout size={14} /> Kanban de Prioridades
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {['todo', 'in_progress', 'done'].map(status => (
                        <div key={status} className="space-y-4">
                           <div className="flex items-center justify-between px-2 text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                             <span>{status.replace('_', ' ')}</span>
                             <span>{tasks.filter(t => t.category === activeMode && t.status === status).length}</span>
                           </div>
                           <div className="space-y-3 min-h-[300px] p-2 rounded-2xl bg-zinc-900/10 border border-zinc-900/50 border-dashed">
                             {tasks.filter(t => t.category === activeMode && t.status === status).map(task => (
                               <ShadcnCard key={task.id} task={task} onClick={() => { setSelectedTask(task); setShowDetails(true); }} />
                             ))}
                           </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-600 flex items-center gap-3">
                      <MessageSquare size={14} /> Brainstorm Feed
                    </h3>
                    <Card className="p-6">
                       <div className="space-y-6">
                         <FeedItem agent="Erika" text="Protocolo HD de tarefas ativado." color="bg-purple-500" />
                         <FeedItem agent="Ícaro" text="Métricas essenciais em pipeline." color="bg-blue-500" />
                       </div>
                    </Card>
                  </div>
               </div>
             </div>
          )}

          {activeTab !== 'dashboard' && (
            <div className="flex flex-col items-center justify-center h-full opacity-30 italic">
               <Zap size={48} className="mb-4 text-zinc-800" />
               <p className="uppercase tracking-[0.5em] text-xs">Módulo {activeTab} em Desenvolvimento</p>
            </div>
          )}

        </div>
      </main>

      {/* MODALS (Details / Create) — Omitted for space, identical logic to previous but refined styling */}
      {showDetails && selectedTask && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-[110] flex items-center justify-center p-4" onClick={() => setShowDetails(false)}>
          <div className="w-full max-w-3xl bg-zinc-950 border border-zinc-800 rounded-[2.5rem] p-10 relative overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h2 className="text-4xl font-black text-white mb-6 uppercase italic tracking-tighter">{selectedTask.title}</h2>
            <div className="space-y-8">
              <DetailSection title="Visão Geral" content={selectedTask.description} />
              <DetailSection title="Plano de Execução" content={selectedTask.steps} isList />
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[120] flex items-center justify-center p-4">
           <Card className="w-full max-w-md p-10 border-zinc-700 bg-zinc-950">
             <div className="flex justify-between items-center mb-8">
               <h2 className="text-xl font-black uppercase italic italic">Nova Missão</h2>
               <button onClick={closeModal}><X size={20} /></button>
             </div>
             <form onSubmit={handleSaveTask} className="space-y-6">
               <input required className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-white outline-none" placeholder="O que vamos executar?" value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})} />
               <button type="submit" className="w-full bg-white text-black font-black py-4 rounded-xl uppercase tracking-widest">Lançar na Operação</button>
             </form>
           </Card>
        </div>
      )}

    </div>
  );
};

// ——————————————————————————————————————————————————————————————————————————————————————
// SUB-COMPONENTS
// ——————————————————————————————————————————————————————————————————————————————————————

const SidebarBtn = ({ icon: Icon, label, active, onClick, open, activeColor = "text-white" }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all group ${active ? 'bg-zinc-900/50 border border-zinc-800/50 shadow-lg shadow-black/20' : 'hover:bg-zinc-900/30'}`}
  >
    <Icon size={20} className={`${active ? activeColor : 'text-zinc-600 group-hover:text-zinc-400'} transition-colors`} />
    {open && <span className={`text-[11px] font-black uppercase tracking-widest ${active ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`}>{label}</span>}
  </button>
);

const ShadcnCard = ({ task, onClick }) => (
  <div onClick={onClick} className="bg-zinc-900/60 border border-zinc-800/50 p-5 rounded-2xl hover:border-zinc-600 transition-all cursor-pointer group shadow-lg">
    <div className="flex justify-between items-start mb-3">
      <Badge variant={task.priority === 'CRÍTICA' ? 'critical' : task.priority === 'Alta' ? 'high' : 'default'}>{task.priority}</Badge>
      <span className="text-[8px] font-mono text-zinc-700 tracking-tighter">#{task.id}</span>
    </div>
    <h4 className="text-[12px] font-bold text-zinc-200 group-hover:text-white transition-colors leading-tight mb-2 uppercase">{task.title}</h4>
    <div className="flex items-center gap-2 mt-4 text-[9px] font-bold text-zinc-600 uppercase italic">
      <div className="w-5 h-5 rounded bg-zinc-800 flex items-center justify-center text-zinc-400">{task.resp[0]}</div>
      <span>{task.resp}</span>
    </div>
  </div>
);

const StatCard = ({ label, val, icon: Icon, color = "text-white" }) => (
  <Card className="p-6 flex flex-col justify-between border-zinc-900 bg-zinc-950/20">
    <Icon size={16} className="text-zinc-700 mb-4" />
    <div>
      <span className={`text-xl font-black block mb-1 uppercase italic ${color}`}>{val}</span>
      <span className="text-[8px] text-zinc-500 font-black uppercase tracking-[0.2em]">{label}</span>
    </div>
  </Card>
);

const FeedItem = ({ agent, text, color }) => (
  <div className="relative pl-6 pb-6 border-l border-zinc-900 last:pb-0">
    <div className={`absolute left-[-4.5px] top-0 w-2 h-2 rounded-full ${color} shadow-[0_0_8px_rgba(168,85,247,0.4)]`} />
    <span className="text-white text-[9px] font-black uppercase tracking-tighter italic block mb-1">{agent}</span>
    <p className="text-[10px] text-zinc-500 leading-tight">{text}</p>
  </div>
);

const DetailSection = ({ title, content, isList = false }) => (
  <div className="space-y-4">
    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">{title}</h3>
    {isList ? (
      <div className="space-y-2">
        {content.split('\n').map((item, i) => <div key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-zinc-700 font-mono">{i+1}.</span>{item}</div>)}
      </div>
    ) : (
      <p className="text-sm text-zinc-300 leading-relaxed italic border-l border-zinc-800 pl-4">"{content}"</p>
    )}
  </div>
);

const TransparentImage = ({ src, alt, className, style }) => {
  const [imgSrc, setImgSrc] = useState(src);
  useEffect(() => {
    const img = new Image(); img.crossOrigin = "Anonymous"; img.src = src;
    img.onload = () => {
      const canvas = document.createElement('canvas'); canvas.width = img.width; canvas.height = img.height;
      const ctx = canvas.getContext('2d'); ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) if (data[i] > 200 && data[i + 1] > 200 && data[i + 2] > 200) data[i + 3] = 0;
      ctx.putImageData(imgData, 0, 0); setImgSrc(canvas.toDataURL());
    };
  }, [src]);
  return <img src={imgSrc} alt={alt} className={className} style={{ ...style, mixBlendMode: 'screen' }} />;
};

export default Dashboard;
