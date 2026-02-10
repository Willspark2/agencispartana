import React, { useState, useEffect, useRef } from 'react';
import {
  Users, Target, Activity, ChevronRight, Clock, BarChart3, MessageSquare, Briefcase, User, 
  TrendingUp, Wallet, BookOpen, Layout, Plus, Database, X, Calendar, Trash2, Edit2, 
  CheckCircle2, ListTodo, HelpCircle, Zap, Menu, ChevronLeft, Settings, CreditCard, 
  Repeat, ArrowRight, FolderKanban, Check, DollarSign, PieChart, Star, Search, Bell,
  ArrowUpRight, ArrowDownRight, MoreHorizontal, Send
} from 'lucide-react';

// ——————————————————————————————————————————————————————————————————————————————————————
// PREMIUM UI COMPONENTS (DEFINIDOS NO TOPO PARA EVITAR ERROS DE INICIALIZAÇÃO)
// ——————————————————————————————————————————————————————————————————————————————————————

const Badge = ({ children, variant = 'default' }) => {
  const variants = {
    default: 'bg-zinc-800/50 text-zinc-400 border-zinc-700/50',
    critical: 'bg-red-500/10 text-red-500 border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.1)]',
    high: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    purple: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  };
  return (
    <span className={`px-3 py-1 rounded-md text-[10px] font-black border ${variants[variant]} uppercase tracking-widest`}>
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

const TransparentImage = ({ src, alt, className, style }) => {
  const [imgSrc, setImgSrc] = useState(src);
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width; canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        if (data[i] > 200 && data[i + 1] > 200 && data[i + 2] > 200) data[i + 3] = 0;
      }
      ctx.putImageData(imgData, 0, 0);
      setImgSrc(canvas.toDataURL());
    };
  }, [src]);
  return <img src={imgSrc} alt={alt} className={className} style={{ ...style, mixBlendMode: 'screen' }} />;
};

const WorkspaceBtn = ({ icon: Icon, label, active, onClick, open, color }) => (
  <button 
    onClick={onClick} 
    className={`w-full flex items-center gap-6 p-6 rounded-[2rem] transition-all duration-500 ${active ? 'bg-zinc-900 border border-zinc-800 shadow-2xl scale-[1.02]' : 'hover:bg-zinc-900/40 opacity-50 hover:opacity-100'}`}
  >
    <Icon size={32} className={`${active ? color : 'text-zinc-700'}`} />
    {open && <span className={`text-[14px] font-black uppercase tracking-[0.2em] ${active ? 'text-white' : 'text-zinc-600'}`}>{label}</span>}
  </button>
);

const SidebarBtn = ({ icon: Icon, label, active, onClick, open }) => (
  <button 
    onClick={onClick} 
    className={`w-full flex items-center gap-5 p-4 rounded-2xl transition-all ${active ? 'bg-zinc-900 text-white border border-zinc-800 shadow-lg' : 'text-zinc-600 hover:text-zinc-300 hover:bg-zinc-900/20'}`}
  >
    <Icon size={20} />
    {open && <span className="text-[12px] font-bold uppercase tracking-widest">{label}</span>}
  </button>
);

const TaskCardLarge = ({ task, onClick }) => (
  <div onClick={onClick} className="bg-zinc-900/40 border border-zinc-800 p-10 rounded-[2.5rem] hover:border-purple-500/50 transition-all cursor-pointer group relative overflow-hidden shadow-2xl text-left">
     <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/5 blur-[80px] -mr-20 -mt-20" />
     <div className="flex justify-between items-start mb-8 text-left">
        <Badge variant={task.priority === 'CRÍTICA' ? 'critical' : 'high'}>{task.priority}</Badge>
        <span className="text-zinc-700 font-mono text-xs tracking-tighter">#{task.id}</span>
     </div>
     <div className="flex items-center gap-2 mb-3 text-left">
        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">{task.project}</span>
     </div>
     <h4 className="text-4xl font-black text-white uppercase italic tracking-tighter group-hover:text-purple-400 transition-colors mb-10 leading-[0.95] text-left">{task.title}</h4>
     <div className="flex items-center justify-between pt-10 border-t border-zinc-800/50 text-left">
        <div className="flex items-center gap-4 text-left">
           <div className="w-12 h-12 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[14px] font-black text-white shadow-inner">{task.resp ? task.resp[0] : '?'}</div>
           <div className="text-left">
              <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-0.5">Responsável</p>
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest italic">{task.resp}</span>
           </div>
        </div>
        <div className="w-14 h-14 rounded-full border border-zinc-800 flex items-center justify-center group-hover:border-purple-500/50 group-hover:bg-purple-500/10 transition-all">
          <ArrowRight size={28} className="text-zinc-700 group-hover:text-purple-400 transition-all" />
        </div>
     </div>
  </div>
);

const TaskKanbanCard = ({ task, onClick, onDelete, onEdit }) => (
  <div onClick={onClick} className="bg-[#0a0a0a] border border-zinc-800 p-7 rounded-[2.2rem] hover:border-zinc-600 transition-all cursor-pointer group shadow-2xl relative overflow-hidden text-left">
     <div className="flex justify-between items-start mb-6">
        <Badge variant={task.priority === 'CRÍTICA' ? 'critical' : 'default'}>{task.priority}</Badge>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all z-10">
           <button onClick={(e) => { e.stopPropagation(); onEdit(); }} className="p-2.5 bg-zinc-900 rounded-xl text-zinc-600 hover:text-blue-400 hover:bg-zinc-800 border border-zinc-800 transition-all"><Edit2 size={14} /></button>
           <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="p-2.5 bg-zinc-900 rounded-xl text-zinc-600 hover:text-red-500 hover:bg-zinc-800 border border-zinc-800 transition-all"><Trash2 size={14} /></button>
        </div>
     </div>
     <span className="text-[9px] font-black text-zinc-700 uppercase tracking-widest mb-2 block">{task.project}</span>
     <h4 className="text-sm font-bold text-zinc-200 uppercase tracking-tight leading-tight mb-8 group-hover:text-white">{task.title}</h4>
     <div className="flex items-center justify-between pt-4 border-t border-zinc-900/50 text-left">
        <div className="flex items-center gap-3 text-left">
           <div className="w-7 h-7 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-[10px] font-black text-zinc-500 uppercase italic">{task.resp ? task.resp[0] : '?'}</div>
           <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-tighter">{task.resp}</span>
        </div>
        <ChevronRight size={18} className="text-zinc-800 group-hover:text-white" />
     </div>
  </div>
);

const BrainstormItem = ({ agent, time, text, color }) => (
  <div className="relative pl-10 group text-left">
     <div className={`absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full ${color} shadow-[0_0_15px_rgba(168,85,247,0.5)] z-10 transition-all group-hover:scale-125`} />
     <div className="flex justify-between items-center mb-1 text-left">
        <span className="text-[10px] font-black text-white uppercase tracking-widest italic">{agent}</span>
        <span className="text-[10px] font-mono text-zinc-700">{time}</span>
     </div>
     <p className="text-[14px] text-zinc-400 leading-relaxed font-medium bg-zinc-900/30 p-3 rounded-2xl border border-zinc-800/30 text-left">{text}</p>
  </div>
);

const DetailBlock = ({ title, content, icon: Icon, color, isList = false }) => (
  <div className="space-y-8 text-left">
     <div className="flex items-center gap-4 text-left">
        {Icon && <Icon size={32} className={color} />}
        <h3 className="text-xs font-black uppercase tracking-[0.5em] text-zinc-600">{title}</h3>
     </div>
     {isList ? (
       <div className="space-y-4 text-left">
         {content && content.split('\n').map((item, i) => (
           <div key={i} className="flex gap-8 p-8 bg-zinc-900/30 border border-zinc-900 rounded-[2.5rem] text-2xl text-zinc-300 font-medium hover:bg-zinc-900/50 transition-colors shadow-inner text-left">
             <span className="text-zinc-800 font-black italic">{String(i+1).padStart(2, '0')}</span>
             <span className="text-left">{item}</span>
           </div>
         ))}
       </div>
     ) : (
       <p className="text-3xl text-zinc-300 leading-relaxed italic font-light border-l-4 border-zinc-900 pl-10 py-2 text-left">"{content}"</p>
     )}
  </div>
);

const MetaItem = ({ label, val, icon: Icon }) => (
  <div className="flex items-center gap-4 text-left">
     <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800 shadow-inner"><Icon size={24} className="text-zinc-600" /></div>
     <div className="text-left">
        <p className="text-[10px] font-black text-zinc-700 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-xl font-black text-zinc-400 uppercase italic leading-none">{val}</p>
     </div>
  </div>
);

const InputHD = ({ label, ...props }) => (
  <div className="space-y-3 text-left">
    <label className="text-[11px] font-black text-zinc-600 uppercase tracking-[0.2em] ml-1">{label}</label>
    <input className="w-full bg-zinc-900 border border-zinc-800 rounded-[1.5rem] p-6 text-white focus:border-purple-500 outline-none transition-all shadow-inner font-bold text-lg" {...props} />
  </div>
);

const TextAreaHD = ({ label, ...props }) => (
  <div className="space-y-3 text-left">
    <label className="text-[11px] font-black text-zinc-600 uppercase tracking-[0.2em] ml-1">{label}</label>
    <textarea className="w-full bg-zinc-900 border border-zinc-800 rounded-[1.5rem] p-6 text-white focus:border-purple-500 outline-none transition-all resize-none shadow-inner font-medium text-lg" {...props} />
  </div>
);

const SectionHeader = ({ title, icon: Icon, color = "text-zinc-700" }) => (
  <div className="flex items-center gap-5 text-left">
    <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 shadow-xl"><Icon size={24} className={color} /></div>
    <h3 className="text-sm font-black uppercase tracking-[0.5em] text-zinc-600 text-left">{title}</h3>
  </div>
);

// ——————————————————————————————————————————————————————————————————————————————————————
// COMPONENTE PRINCIPAL (DASHBOARD)
// ——————————————————————————————————————————————————————————————————————————————————————

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeWorkspace, setActiveWorkspace] = useState('agency'); 
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [brainstormMsg, setBrainstormMsg] = useState('');

  // 📁 PROJECTS STATE
  const [projects, setProjects] = useState([
    { id: 'P01', name: 'Spartana HQ', status: 'Ativo', description: 'Pipeline de Execução Autônoma' },
    { id: 'P02', name: 'Estética VIP', status: 'Ativo', description: 'Pipeline de Execução Autônoma' },
    { id: 'P03', name: 'Seu Costela VCA', status: 'Ativo', description: 'Pipeline de Execução Autônoma' }
  ]);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [newProject, setNewProject] = useState({ name: '', description: '', status: 'Ativo' });

  // 📝 TASKS STATE
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

  const [brainstormFeed, setBrainstormFeed] = useState([
    { agent: 'ERIKA', time: '09:20', text: 'Protocolo de edição de projetos liberado.', color: 'bg-purple-500' },
    { agent: 'ÍCARO', time: '08:45', text: 'Estrutura de tabelas para o Workspace Pessoal finalizada.', color: 'bg-blue-500' }
  ]);

  const handleSaveTask = (e) => {
    e.preventDefault();
    if (editingTask) {
      setTasks(tasks.map(t => t.id === editingTask.id ? { ...t, ...newTask } : t));
      if (selectedTask?.id === editingTask.id) setSelectedTask({ ...selectedTask, ...newTask });
    } else {
      const prefix = activeWorkspace === 'agency' ? '00' : 'F0';
      const id = `${prefix}${tasks.length + 1}`;
      setTasks([...tasks, { ...newTask, id, category: activeWorkspace, date: 'Hoje' }]);
    }
    closeModal();
  };

  const handleDeleteTask = (id) => {
    if (window.confirm('Excluir esta missão permanentemente?')) {
      setTasks(tasks.filter(t => t.id !== id));
      setShowDetails(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTask(null);
    setNewTask({ title: '', priority: 'Normal', resp: '', status: 'todo', description: '', objectives: '', steps: '', outcome: '', questions: '', project: 'Interno' });
  };

  const handleSaveProject = (e) => {
    e.preventDefault();
    if (editingProject) {
      setProjects(projects.map(p => p.id === editingProject.id ? { ...p, ...newProject } : p));
    } else {
      const id = `P0${projects.length + 1}`;
      setProjects([...projects, { ...newProject, id }]);
    }
    setShowProjectModal(false);
    setEditingProject(null);
    setNewProject({ name: '', description: '', status: 'Ativo' });
  };

  const sendBrainstorm = (e) => {
    e.preventDefault();
    if(!brainstormMsg) return;
    setBrainstormFeed([{ agent: 'WILL', time: 'Agora', text: brainstormMsg, color: 'bg-emerald-500' }, ...brainstormFeed]);
    setBrainstormMsg('');
  };

  const menuItems = {
    agency: [
      { id: 'dashboard', label: 'Dashboard', icon: Activity },
      { id: 'kanban', label: 'CRM / Kanban', icon: FolderKanban },
      { id: 'projects', label: 'Projetos Ativos', icon: Layout },
      { id: 'billing', label: 'Faturamento / ROI', icon: Wallet },
    ],
    personal: [
      { id: 'dashboard', label: 'Overview', icon: Activity },
      { id: 'finance', label: 'Dívidas & Contas', icon: CreditCard },
      { id: 'habits', label: 'Hábitos 30D', icon: Repeat },
      { id: 'goals', label: 'Metas de Vida', icon: TrendingUp },
    ]
  };

  const kanbanColumns = [
    { id: 'todo', title: 'Backlog', color: 'bg-zinc-500' },
    { id: 'in_progress', title: 'Em Execução', color: 'bg-blue-500' },
    { id: 'done', title: 'Concluído', color: 'bg-emerald-500' }
  ];

  const currentTasks = tasks.filter(t => t.category === activeWorkspace);

  const [habits, setHabits] = useState([
    { id: 1, name: 'Acordar 05:00', days: Array(30).fill(false) },
    { id: 2, name: 'Prospecção Ativa', days: Array(30).fill(true, 0, 5) }
  ]);

  const toggleHabit = (hId, dIdx) => {
    setHabits(habits.map(h => h.id === hId ? { ...h, days: h.days.map((d, i) => i === dIdx ? !d : d) } : h));
  };

  return (
    <div className="min-h-screen bg-[#020202] text-zinc-400 font-sans flex overflow-hidden selection:bg-purple-500/30">
      
      {/* 🔴 GLOBAL CSS OVERRIDE TO HIDE SCROLLBARS */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { display: none; }
        .custom-scrollbar { -ms-overflow-style: none; scrollbar-width: none; overflow-x: hidden; }
        * { scrollbar-width: none; -ms-overflow-style: none; }
        *::-webkit-scrollbar { display: none; }
      `}</style>

      {/* 🟢 SIDEBAR NAV */}
      <aside className={`${isSidebarOpen ? 'w-80' : 'w-24'} bg-[#080808] border-r border-zinc-900 transition-all duration-500 flex flex-col z-50 shadow-[20px_0_50px_rgba(0,0,0,0.8)]`}>
        <div className="p-10 flex items-center gap-5 overflow-hidden text-left">
            <TransparentImage src="/logo_spartana.jpg" className="w-16 h-16 object-contain" alt="Logo" style={{ transform: 'scale(3.0)' }} />
            {isSidebarOpen && (
              <div className="flex flex-col animate-in fade-in slide-in-from-left-4 duration-700 text-left">
                <span className="font-black text-white text-3xl tracking-tighter uppercase italic leading-none text-left">Spartana</span>
                <span className="text-[8px] font-black text-zinc-600 tracking-[0.4em] uppercase mt-1 text-left text-left">Command Center</span>
              </div>
            )}
        </div>

        <nav className="flex-1 px-6 space-y-12 overflow-y-auto custom-scrollbar text-left text-left">
          <div className="space-y-3 text-left">
             <p className={`text-[10px] font-black text-zinc-800 uppercase tracking-[0.3em] mb-6 ${!isSidebarOpen && 'text-center'}`}>Ambiente</p>
             <WorkspaceBtn active={activeWorkspace === 'agency'} onClick={() => { setActiveWorkspace('agency'); setActiveTab('dashboard'); }} icon={Briefcase} label="Profissional" open={isSidebarOpen} color="text-purple-500" />
             <WorkspaceBtn active={activeWorkspace === 'personal'} onClick={() => { setActiveWorkspace('personal'); setActiveTab('dashboard'); }} icon={User} label="Pessoal" open={isSidebarOpen} color="text-emerald-500" />
          </div>

          <div className="space-y-2 pt-10 border-t border-zinc-900/50 text-left">
             <p className={`text-[10px] font-black text-zinc-800 uppercase tracking-[0.3em] mb-6 ${!isSidebarOpen && 'text-center'}`}>Gerenciamento</p>
            {menuItems[activeWorkspace].map(item => (
              <SidebarBtn key={item.id} active={activeTab === item.id} onClick={() => setActiveTab(item.id)} icon={item.icon} label={item.label} open={isSidebarOpen} />
            ))}
          </div>
        </nav>

        <div className="p-8 border-t border-zinc-900/50 text-left">
           <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="w-full flex items-center justify-center p-4 rounded-2xl bg-zinc-900/30 hover:bg-zinc-800 transition-all text-zinc-600 hover:text-white border border-zinc-800/50">
             {isSidebarOpen ? <ChevronLeft size={24} /> : <Menu size={24} />}
           </button>
        </div>
      </aside>

      {/* 🔵 MAIN AREA */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-black text-left">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.03),transparent_40%)]" />
        
        <header className="h-28 border-b border-zinc-900/50 flex items-center justify-between px-12 bg-black/40 backdrop-blur-3xl z-40">
          <div className="flex flex-col text-left">
            <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter flex items-center gap-5 text-left">
              <span className={activeWorkspace === 'agency' ? 'text-purple-500' : 'text-emerald-500'}>{activeWorkspace === 'agency' ? 'PROFISSIONAL' : 'PESSOAL'}</span>
              <span className="text-zinc-800 font-thin not-italic">/</span> 
              <span className="text-zinc-500">{menuItems[activeWorkspace].find(t => t.id === activeTab)?.label}</span>
            </h2>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 px-6 py-3 bg-zinc-950/80 border border-zinc-800 rounded-[1.2rem] shadow-inner">
               <Database size={18} className="text-emerald-500" />
               <span className="text-[11px] font-black text-zinc-500 uppercase tracking-widest italic">Supabase Connected</span>
            </div>
            {activeTab === 'projects' ? (
              <button onClick={() => { setEditingProject(null); setNewProject({name: '', description: '', status: 'Ativo'}); setShowProjectModal(true); }} className="bg-white text-black px-12 py-4 rounded-[1.2rem] text-[14px] font-black uppercase tracking-widest flex items-center gap-3 hover:bg-zinc-200 transition-all shadow-[0_0_50px_rgba(255,255,255,0.1)] active:scale-95">
                <Plus size={22} strokeWidth={3} /> Novo Projeto
              </button>
            ) : (
              <button onClick={() => { setEditingTask(null); setNewTask({ title: '', priority: 'Normal', resp: '', status: 'todo', description: '', objectives: '', steps: '', outcome: '', questions: '', project: 'Interno' }); setShowModal(true); }} className="bg-white text-black px-12 py-4 rounded-[1.2rem] text-[14px] font-black uppercase tracking-widest flex items-center gap-3 hover:bg-zinc-200 transition-all shadow-[0_0_50px_rgba(255,255,255,0.1)] active:scale-95">
                <Plus size={22} strokeWidth={3} /> Nova Missão
              </button>
            )}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar z-30 text-left">
          
          {/* VIEW: PROJECTS (EDITABLE & DELETEABLE) */}
          {activeTab === 'projects' && (
            <div className="space-y-16 max-w-7xl animate-in fade-in duration-700 text-left">
               <div className="flex flex-col gap-4 text-left">
                 <h3 className="text-7xl font-black text-white uppercase italic tracking-tighter leading-[0.85] text-left">Projetos <br /><span className="text-purple-600 text-left">Ativos</span></h3>
                 <p className="text-zinc-600 uppercase tracking-[0.5em] font-black text-xs ml-2 text-left">Pipeline de Execução Autônoma</p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
                  {projects.map(proj => (
                    <Card key={proj.id} className="p-12 bg-zinc-950/60 border-zinc-800/80 shadow-2xl relative group text-left">
                       <div className="absolute top-6 right-8 flex gap-2 opacity-0 group-hover:opacity-100 transition-all text-left">
                          <button onClick={() => { setEditingProject(proj); setNewProject({...proj}); setShowProjectModal(true); }} className="p-3 bg-zinc-900 rounded-xl text-zinc-500 hover:text-blue-400 border border-zinc-800"><Edit2 size={16} /></button>
                          <button onClick={() => { if(window.confirm('Excluir projeto e todas as missões?')) setProjects(projects.filter(p => p.id !== proj.id)) }} className="p-3 bg-zinc-900 rounded-xl text-zinc-500 hover:text-red-500 border border-zinc-800"><Trash2 size={16} /></button>
                       </div>
                       <div className="flex justify-between items-start mb-12 text-left">
                          <div className="text-left">
                            <h4 className="text-4xl font-black text-white uppercase italic tracking-tight mb-2 leading-none text-left">{proj.name}</h4>
                            <div className="flex items-center gap-3 text-left">
                               <div className={`w-2 h-2 rounded-full ${proj.status === 'Ativo' ? 'bg-emerald-500' : 'bg-blue-500'} animate-pulse`} />
                               <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest text-left">{proj.description}</span>
                            </div>
                          </div>
                          <Badge variant={proj.status === 'Ativo' ? 'purple' : 'success'}>{proj.status}</Badge>
                       </div>
                       <div className="space-y-4 text-left">
                          {tasks.filter(t => t.project === proj.name).map(t => (
                            <div key={t.id} className="flex items-center justify-between p-6 rounded-3xl bg-black border border-zinc-900 hover:border-purple-500/50 hover:bg-zinc-900/40 transition-all cursor-pointer group/item text-left" onClick={() => { setSelectedTask(t); setShowDetails(true); }}>
                               <div className="flex items-center gap-5 text-left">
                                  <div className={`w-3 h-3 rounded-full ${t.status === 'in_progress' ? 'bg-blue-500' : 'bg-zinc-800'}`} />
                                  <span className="text-base font-bold text-zinc-400 uppercase group-hover/item:text-white transition-colors text-left">{t.title}</span>
                               </div>
                               <ChevronRight size={20} className="text-zinc-800 group-hover/item:text-white" />
                            </div>
                          ))}
                       </div>
                    </Card>
                  ))}
               </div>
            </div>
          )}

          {/* VIEW: DASHBOARD / KANBAN */}
          {(activeTab === 'dashboard' || activeTab === 'kanban') && (
            <div className="space-y-20 max-w-7xl animate-in slide-in-from-bottom-6 duration-1000 text-left text-left">
              {activeTab === 'dashboard' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-left">
                  <div className="lg:col-span-2 space-y-12 text-left">
                    <SectionHeader title="Ação Imediata" icon={Zap} color="text-yellow-500" />
                    <div className="grid grid-cols-1 gap-6 text-left">
                      {tasks.filter(t => t.status === 'in_progress' && t.category === activeWorkspace).map(task => (
                        <TaskCardLarge key={task.id} task={task} onClick={() => { setSelectedTask(task); setShowDetails(true); }} />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-12 text-left">
                    <SectionHeader title="Brainstorm HQ" icon={MessageSquare} color="text-purple-500" />
                    <Card className="p-10 border-purple-500/10 bg-purple-500/5 h-full flex flex-col min-h-[500px] text-left">
                       <div className="flex-1 space-y-10 mb-10 overflow-y-auto custom-scrollbar pr-4 text-left">
                          {brainstormFeed.map((f, i) => <BrainstormItem key={i} {...f} />)}
                       </div>
                       <form onSubmit={sendBrainstorm} className="relative mt-auto pt-8 border-t border-zinc-900 text-left text-left">
                          <input 
                            className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-3xl p-6 text-sm text-white focus:border-purple-500 outline-none pr-16 transition-all shadow-inner text-left"
                            placeholder="Sócio, envie sua visão estratégica..."
                            value={brainstormMsg}
                            onChange={e => setBrainstormMsg(e.target.value)}
                          />
                          <button type="submit" className="absolute right-6 top-[2.7rem] text-zinc-600 hover:text-purple-400 transition-all hover:scale-125 text-left"><Send size={24} /></button>
                       </form>
                    </Card>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 text-left">
                 {kanbanColumns.map(col => (
                    <div key={col.id} className="flex flex-col space-y-8 text-left">
                       <div className="flex items-center justify-between px-8 text-left">
                          <span className="text-[13px] font-black uppercase tracking-[0.4em] text-zinc-600 text-left">{col.title}</span>
                          <span className="text-sm font-mono font-black text-zinc-800 bg-zinc-900/50 px-3 py-1 rounded-lg border border-zinc-800/50 text-left">{tasks.filter(t => t.status === col.id && t.category === activeWorkspace).length}</span>
                       </div>
                       <div className="flex-1 bg-zinc-950/40 border border-zinc-900/60 border-dashed rounded-[4rem] p-5 space-y-5 min-h-[600px] hover:border-zinc-800 transition-colors duration-500 text-left text-left">
                          {tasks.filter(t => t.status === col.id && t.category === activeWorkspace).map(task => (
                            <TaskKanbanCard 
                              key={task.id} 
                              task={task} 
                              onClick={() => { setSelectedTask(task); setShowDetails(true); }} 
                              onEdit={() => { setEditingTask(task); setNewTask({...task}); setShowModal(true); }} 
                              onDelete={() => { handleDeleteTask(task.id); }} 
                            />
                          ))}
                       </div>
                    </div>
                 ))}
              </div>
            </div>
          )}

          {/* VIEW: FINANCE */}
          {activeTab === 'finance' && (
            <div className="space-y-16 animate-in fade-in duration-700 max-w-6xl text-left">
               <h3 className="text-7xl font-black text-white uppercase italic tracking-tighter leading-none border-b border-zinc-900 pb-12 text-left">Fluxo <span className="text-emerald-600 text-left text-left text-left">Financeiro</span></h3>
               <div className="grid grid-cols-1 gap-12 text-left">
                  <div className="space-y-8 text-left">
                     <SectionHeader title="Gestão de Passivos" icon={ArrowDownRight} color="text-red-500" />
                     <div className="overflow-hidden rounded-[3rem] border border-zinc-900 bg-[#080808] shadow-2xl text-left">
                        <table className="w-full text-left">
                          <thead className="bg-zinc-950">
                            <tr>
                              <th className="p-8 text-[11px] font-black uppercase tracking-widest text-zinc-600 text-left">Descrição</th>
                              <th className="p-8 text-[11px] font-black uppercase tracking-widest text-zinc-600 text-left">Valor Real (Input)</th>
                              <th className="p-8 text-[11px] font-black uppercase tracking-widest text-zinc-600 text-left">Urgência</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-zinc-900 text-left text-left">
                            <tr>
                              <td className="p-10 text-2xl font-black text-white uppercase italic tracking-tight leading-none text-left">Cartão Black</td>
                              <td className="p-10 text-left"><input className="bg-transparent text-red-500 font-mono font-black text-4xl outline-none border-b-2 border-zinc-900 focus:border-red-600 transition-all w-full tracking-tighter text-left text-left" defaultValue="R$ 15.000,00" /></td>
                              <td className="p-10 text-left"><Badge variant="critical">IMEDIATO</Badge></td>
                            </tr>
                          </tbody>
                        </table>
                     </div>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'habits' && (
            <div className="space-y-16 animate-in fade-in duration-700 max-w-7xl mx-auto text-left text-left text-left text-left">
              <h3 className="text-7xl font-black text-white uppercase italic tracking-tighter leading-none text-left">Protocolo <span className="text-emerald-600 text-left text-left text-left">30D</span></h3>
              <div className="grid grid-cols-1 gap-10 text-left">
                {habits.map(habit => (
                  <Card key={habit.id} className="p-16 bg-[#080808] border-zinc-900 shadow-2xl text-left">
                    <div className="flex justify-between items-center mb-16 border-b border-zinc-900 pb-12 text-left">
                      <div className="flex items-center gap-10 text-left">
                        <div className="p-6 bg-emerald-500/10 text-emerald-500 rounded-[2.5rem] border border-emerald-500/20 shadow-2xl text-left"><Repeat size={48} /></div>
                        <div className="text-left text-left">
                          <h4 className="text-5xl font-black text-white uppercase italic tracking-tight leading-none mb-4 text-left">{habit.name}</h4>
                          <p className="text-zinc-600 uppercase tracking-[0.4em] font-black text-xs text-left text-left">Otimização Diária de Performance</p>
                        </div>
                      </div>
                      <div className="text-right text-left text-left text-left text-left text-left text-left">
                         <Badge variant="success">{Math.round((habit.days.filter(d => d).length / 30) * 100)}% OK</Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 md:grid-cols-10 gap-5 px-4 text-left">
                      {habit.days.map((done, idx) => (
                        <button key={idx} onClick={() => toggleHabit(habit.id, idx)} className={`aspect-square rounded-[1.5rem] border-4 transition-all duration-500 flex items-center justify-center text-xl font-black ${done ? 'bg-emerald-500 border-emerald-400 text-black shadow-[0_0_50px_rgba(16,185,129,0.3)] scale-110' : 'bg-zinc-950 border-zinc-900 text-zinc-800 hover:border-zinc-700 hover:text-zinc-500'}`}>
                          {idx + 1}
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

      {/* 🔴 DETAIL MODAL HD */}
      {showDetails && selectedTask && (
        <div className="fixed inset-0 bg-black/98 backdrop-blur-3xl z-[100] flex items-center justify-center p-8 lg:p-24 animate-in fade-in duration-500 text-left text-left" onClick={() => setShowDetails(false)}>
           <div 
             className="w-full max-w-6xl bg-[#050505] border border-zinc-800/50 rounded-[5rem] p-20 relative overflow-y-auto max-h-full custom-scrollbar shadow-[0_0_200px_rgba(0,0,0,1)] text-left" 
             onClick={e => e.stopPropagation()}
           >
              <button onClick={() => setShowDetails(false)} className="absolute top-16 right-16 text-zinc-800 hover:text-white transition-all hover:rotate-90 duration-300 pointer-events-auto text-left"><X size={64} strokeWidth={1} /></button>
              
              <div className="flex items-center gap-8 mb-10 text-left animate-in slide-in-from-left-4 duration-700 text-left text-left">
                 <Badge variant={selectedTask.priority === 'CRÍTICA' ? 'critical' : 'high'}>{selectedTask.priority}</Badge>
                 <span className="text-[14px] font-black text-zinc-700 uppercase tracking-[0.8em] italic leading-none text-left">Protocolo Spartana #{selectedTask.id}</span>
              </div>

              <h2 className="text-[120px] font-black text-white uppercase italic tracking-tighter leading-[0.8] mb-20 border-b border-zinc-900 pb-20 text-left text-left text-left text-left text-left">{selectedTask.title}</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 text-left animate-in fade-in duration-1000 delay-300 text-left text-left text-left text-left">
                 <div className="space-y-24 text-left text-left">
                    <DetailBlock title="Visão Geral & Contexto" content={selectedTask.description} icon={Zap} color="text-yellow-500" />
                    <DetailBlock title="Objetivos Estratégicos" content={selectedTask.objectives} icon={Target} color="text-purple-500" />
                 </div>
                 <div className="space-y-24 text-left text-left text-left">
                    <DetailBlock title="Plano de Execução HD" content={selectedTask.steps} isList icon={ListTodo} color="text-blue-500" />
                    <DetailBlock title="Dúvidas & Clarificações" content={selectedTask.questions || "Aguardando input estratégico do sócio..."} icon={HelpCircle} color="text-zinc-800" />
                 </div>
              </div>

              <div className="mt-32 pt-16 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-12 text-left text-left text-left">
                 <div className="flex gap-20 text-left text-left">
                    <MetaItem label="Agente em Campo" val={selectedTask.resp} icon={User} />
                    <MetaItem label="Projeto Vinculado" val={selectedTask.project} icon={FolderKanban} />
                 </div>
                 <div className="flex gap-6 pointer-events-auto text-left text-left text-left">
                    <button onClick={(e) => { e.stopPropagation(); setEditingTask(selectedTask); setNewTask({...selectedTask}); setShowModal(true); }} className="px-16 py-8 bg-zinc-100 text-black font-black rounded-[2.5rem] uppercase tracking-[0.2em] text-lg hover:bg-white transition-all shadow-xl pointer-events-auto text-left">Editar Protocolo</button>
                    <button onClick={(e) => { e.stopPropagation(); handleDeleteTask(selectedTask.id); }} className="px-16 py-8 bg-red-950/20 text-red-600 border border-red-900/30 rounded-[2.5rem] font-black uppercase tracking-[0.2em] text-lg hover:bg-red-600 hover:text-white transition-all active:scale-95 pointer-events-auto text-left">Abortar Missão</button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* 🟡 CREATE / EDIT TASK MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-[110] flex items-center justify-center p-6 animate-in zoom-in-95 duration-500 text-left text-left">
           <Card className="w-full max-w-5xl p-16 bg-[#050505] border-zinc-800 shadow-[0_0_150px_rgba(168,85,247,0.05)] text-left text-left">
              <div className="flex justify-between items-center mb-16 border-b border-zinc-900 pb-10 text-left">
                 <h2 className="text-5xl font-black uppercase italic tracking-tighter text-white text-left text-left">{editingTask ? 'Refinar' : 'Lançar'} Missão</h2>
                 <button onClick={closeModal} className="text-zinc-800 hover:text-white transition-all text-left text-left text-left text-left text-left"><X size={48} strokeWidth={1} /></button>
              </div>
              <form onSubmit={handleSaveTask} className="space-y-12 text-left text-left text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-left text-left text-left text-left">
                   <div className="space-y-8 text-left text-left text-left text-left">
                      <InputHD label="Título da Missão" value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})} required placeholder="Qual o alvo?" />
                      <div className="space-y-3 text-left">
                        <label className="text-[11px] font-black text-zinc-600 uppercase tracking-[0.2em] ml-1 text-left text-left text-left">Projeto Relacionado</label>
                        <select className="w-full bg-zinc-900 border border-zinc-800 rounded-[1.5rem] p-6 text-white focus:border-purple-500 outline-none appearance-none font-bold text-lg text-left" value={newTask.project} onChange={e => setNewTask({...newTask, project: e.target.value})}>
                          {projects.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                          <option value="Interno">Interno</option>
                        </select>
                      </div>
                      <TextAreaHD label="Descrição Macro" value={newTask.description} onChange={e => setNewTask({...newTask, description: e.target.value})} rows={3} placeholder="O contexto do 'porquê'..." />
                   </div>
                   <div className="space-y-8 text-left text-left text-left">
                      <TextAreaHD label="Plano de Execução HD" value={newTask.steps} onChange={e => setNewTask({...newTask, steps: e.target.value})} rows={3} placeholder="Passo a passo técnico..." />
                      <TextAreaHD label="Resultado Esperado (Outcome)" value={newTask.outcome} onChange={e => setNewTask({...newTask, outcome: e.target.value})} rows={3} placeholder="Como saberemos que foi concluído?" />
                   </div>
                </div>
                <div className="flex justify-end gap-6 pt-12 border-t border-zinc-900 text-left text-left text-left">
                   <button type="button" onClick={closeModal} className="px-10 py-6 text-zinc-700 font-black uppercase tracking-[0.3em] hover:text-white transition-all text-left text-left">Cancelar</button>
                   <button type="submit" className="px-20 py-8 bg-white text-black font-black rounded-[2rem] uppercase tracking-[0.2em] hover:scale-[1.02] transition-all text-xl text-left text-left text-left">Confirmar Deploy</button>
                </div>
              </form>
           </Card>
        </div>
      )}

      {/* 🟠 CREATE / EDIT PROJECT MODAL */}
      {showProjectModal && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-[110] flex items-center justify-center p-6 animate-in zoom-in-95 duration-500 text-left text-left text-left">
           <Card className="w-full max-w-3xl p-16 bg-[#050505] border-zinc-800 text-left shadow-2xl text-left text-left">
              <div className="flex justify-between items-center mb-16 border-b border-zinc-900 pb-10 text-left text-left">
                 <h2 className="text-5xl font-black uppercase italic tracking-tighter text-white text-left text-left">{editingProject ? 'Ajustar' : 'Lançar'} Projeto</h2>
                 <button onClick={() => setShowProjectModal(false)} className="text-zinc-800 hover:text-white text-left text-left text-left text-left text-left text-left text-left text-left"><X size={48} strokeWidth={1} /></button>
              </div>
              <form onSubmit={handleSaveProject} className="space-y-12 text-left text-left text-left text-left">
                <div className="space-y-8 text-left text-left text-left text-left">
                  <InputHD label="Nome do Projeto / Cliente" value={newProject.name} onChange={e => setNewProject({...newProject, name: e.target.value})} required />
                  <TextAreaHD label="Descrição do Pipeline" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} rows={2} />
                  <div className="space-y-3 text-left">
                    <label className="text-[11px] font-black text-zinc-600 uppercase tracking-[0.2em] ml-1 text-left text-left">Status do Contrato</label>
                    <select className="w-full bg-zinc-900 border border-zinc-800 rounded-[1.5rem] p-6 text-white focus:border-purple-500 outline-none appearance-none font-bold text-lg text-left text-left" value={newProject.status} onChange={e => setNewProject({...newProject, status: e.target.value})}>
                      <option value="Ativo">Ativo</option>
                      <option value="Concluído">Concluído</option>
                      <option value="Pausado">Pausado</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-6 pt-12 border-t border-zinc-900 text-left text-left text-left text-left">
                   <button type="button" onClick={() => setShowProjectModal(false)} className="px-10 py-6 text-zinc-700 font-black uppercase tracking-[0.3em] hover:text-white transition-all text-left text-left text-left">Cancelar</button>
                   <button type="submit" className="px-20 py-8 bg-white text-black font-black rounded-[2rem] uppercase tracking-[0.2em] hover:scale-[1.02] transition-all text-xl text-left text-left text-left text-left">Lançar Projeto</button>
                </div>
              </form>
           </Card>
        </div>
      )}

    </div>
  );
};

export default Dashboard;
