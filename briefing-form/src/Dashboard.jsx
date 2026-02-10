import React, { useState, useEffect, useRef } from 'react';
import {
  Users, Target, Activity, ChevronRight, Clock, BarChart3, MessageSquare, Briefcase, User, 
  TrendingUp, Wallet, BookOpen, Layout, Plus, Database, X, Calendar, Trash2, Edit2, 
  CheckCircle2, ListTodo, HelpCircle, Zap, Menu, ChevronLeft, Settings, CreditCard, 
  Repeat, ArrowRight, FolderKanban, Check, DollarSign, PieChart, Star, Search, Bell,
  ArrowUpRight, ArrowDownRight, MoreHorizontal, Send, Rocket, Shield
} from 'lucide-react';

// ——————————————————————————————————————————————————————————————————————————————————————
// PREMIUM UI COMPONENTS (ESTILO SPARTANA HD)
// ——————————————————————————————————————————————————————————————————————————————————————

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
    className={`w-full flex items-center gap-6 p-6 rounded-[2.5rem] transition-all duration-500 ${active ? 'bg-zinc-900 border border-zinc-800 shadow-2xl scale-[1.02]' : 'hover:bg-zinc-900/40 opacity-40 hover:opacity-100'}`}
  >
    <Icon size={32} className={`${active ? color : 'text-zinc-600'}`} />
    {open && <span className={`text-[14px] font-black uppercase tracking-[0.2em] ${active ? 'text-white' : 'text-zinc-600'}`}>{label}</span>}
  </button>
);

const SidebarBtn = ({ icon: Icon, label, active, onClick, open }) => (
  <button 
    onClick={onClick} 
    className={`w-full flex items-center gap-6 p-5 rounded-3xl transition-all ${active ? 'bg-zinc-900 text-white border border-zinc-800 shadow-lg shadow-black/40' : 'text-zinc-600 hover:text-zinc-300 hover:bg-zinc-900/20'}`}
  >
    <Icon size={22} />
    {open && <span className="text-[12px] font-black uppercase tracking-widest">{label}</span>}
  </button>
);

// ——————————————————————————————————————————————————————————————————————————————————————
// MAIN DASHBOARD COMPONENT
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
    { id: 'P03', name: 'Seu Costela VCA', status: 'Ativo', description: 'Sistema de Delivery (DeliveryPro)' }
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

  // 🎯 GOALS STATE (NEW PLAN)
  const [goals, setGoals] = useState([
    { id: 1, title: 'Liberdade Financeira (Fase 1)', status: 'Em progresso', progress: 45, agents: ['Midas', 'Erika'], strategy: 'Regra 70/30 de extermínio de dívidas via faturamento excedente.' },
    { id: 2, title: 'Escala High Ticket', status: 'Planejamento', progress: 15, agents: ['Maya', 'Ícaro'], strategy: 'Automação de prospecção Google Invisível + Script de Ego.' }
  ]);

  const [brainstormFeed, setBrainstormFeed] = useState([
    { agent: 'ERIKA', time: '10:45', text: 'Plano de Metas de Vida iniciado. Foco em métricas e ciclos de 30 dias.', color: 'bg-purple-500' },
    { agent: 'MIDAS', time: '10:48', text: 'Estratégia 70/30 para dívidas definida. Marco 1: Reserva de Sobrevivência.', color: 'bg-yellow-500' },
    { agent: 'ÍCARO', time: '10:55', text: 'Pipeline Seu Costela (DeliveryPro) via Supabase/Clerk mapeado.', color: 'bg-blue-500' }
  ]);

  const handleSaveTask = (e) => {
    e.preventDefault();
    if (editingTask) {
      setTasks(tasks.map(t => t.id === editingTask.id ? { ...t, ...newTask } : t));
    } else {
      const prefix = activeWorkspace === 'agency' ? '00' : 'F0';
      const id = `${prefix}${tasks.length + 1}`;
      setTasks([...tasks, { ...newTask, id, category: activeWorkspace, date: 'Hoje' }]);
    }
    closeModal();
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
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTask(null);
    setNewTask({ title: '', priority: 'Normal', resp: '', status: 'todo', description: '', objectives: '', steps: '', outcome: '', questions: '', project: 'Interno' });
  };

  const sendBrainstorm = (e) => {
    e.preventDefault();
    if(!brainstormMsg) return;
    setBrainstormFeed([{ agent: 'WILL', time: 'Agora', text: brainstormMsg, color: 'bg-emerald-500' }, ...brainstormFeed]);
    setBrainstormMsg('');
  };

  const [newTask, setNewTask] = useState({ 
    title: '', priority: 'Normal', resp: '', status: 'todo',
    description: '', objectives: '', steps: '', outcome: '', questions: '', project: 'Interno'
  });

  const [habits, setHabits] = useState([
    { id: 1, name: 'Acordar 05:00', days: Array(30).fill(false) },
    { id: 2, name: 'Prospecção Ativa', days: Array(30).fill(true, 0, 5) }
  ]);

  const toggleHabit = (hId, dIdx) => {
    setHabits(habits.map(h => h.id === hId ? { ...h, days: h.days.map((d, i) => i === dIdx ? !d : d) } : h));
  };

  const menuItems = {
    agency: [
      { id: 'dashboard', label: 'Overview', icon: Activity },
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

  return (
    <div className="min-h-screen bg-[#020202] text-zinc-400 font-sans flex overflow-hidden selection:bg-purple-500/30">
      
      {/* 🔴 GLOBAL CSS OVERRIDE TO HIDE SCROLLBARS */}
      <style>{`
        ::-webkit-scrollbar { display: none; }
        * { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>

      {/* 🟢 SIDEBAR NAV */}
      <aside className={`${isSidebarOpen ? 'w-80' : 'w-28'} bg-[#080808] border-r border-zinc-900 transition-all duration-500 flex flex-col z-50 shadow-[20px_0_60px_rgba(0,0,0,0.9)]`}>
        <div className="p-10 flex items-center gap-6 overflow-hidden text-left">
            <TransparentImage src="/logo_spartana.jpg" className="w-16 h-16 object-contain" alt="Logo" style={{ transform: 'scale(3.5)' }} />
            {isSidebarOpen && (
              <div className="flex flex-col animate-in fade-in slide-in-from-left-4 duration-700 text-left">
                <span className="font-black text-white text-3xl tracking-tighter uppercase italic leading-none text-left">Spartana</span>
                <span className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.4em] mt-1.5 text-left text-left">Command Center</span>
              </div>
            )}
        </div>

        <nav className="flex-1 px-6 space-y-12 overflow-y-auto text-left">
          <div className="space-y-4 text-left">
             <WorkspaceBtn active={activeWorkspace === 'agency'} onClick={() => { setActiveWorkspace('agency'); setActiveTab('dashboard'); }} icon={Briefcase} label="Operações" open={isSidebarOpen} color="text-purple-500" />
             <WorkspaceBtn active={activeWorkspace === 'personal'} onClick={() => { setActiveWorkspace('personal'); setActiveTab('dashboard'); }} icon={User} label="Pessoal" open={isSidebarOpen} color="text-emerald-500" />
          </div>

          <div className="space-y-2 pt-10 border-t border-zinc-900/50 text-left">
             <p className={`text-[10px] font-black text-zinc-800 uppercase tracking-[0.3em] mb-6 ${!isSidebarOpen && 'text-center'}`}>Navegação</p>
            {menuItems[activeWorkspace].map(item => (
              <SidebarBtn key={item.id} active={activeTab === item.id} onClick={() => setActiveTab(item.id)} icon={item.icon} label={item.label} open={isSidebarOpen} />
            ))}
          </div>
        </nav>

        <div className="p-8 border-t border-zinc-900/50 text-left text-left">
           <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="w-full flex items-center justify-center p-5 rounded-3xl bg-zinc-900/30 hover:bg-zinc-800 transition-all text-zinc-600 hover:text-white border border-zinc-800/50 shadow-inner">
             {isSidebarOpen ? <ChevronLeft size={28} /> : <Menu size={28} />}
           </button>
        </div>
      </aside>

      {/* 🔵 MAIN AREA */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-black text-left">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.03),transparent_40%)]" />
        
        <header className="h-32 border-b border-zinc-900/50 flex items-center justify-between px-16 bg-black/60 backdrop-blur-3xl z-40">
          <div className="flex flex-col text-left">
            <h2 className="text-5xl font-black text-white uppercase italic tracking-tighter flex items-center gap-6 text-left leading-none">
              <span className={activeWorkspace === 'agency' ? 'text-purple-600' : 'text-emerald-600'}>{activeWorkspace === 'agency' ? 'PROFISSIONAL' : 'PESSOAL'}</span>
              <span className="text-zinc-900 font-thin not-italic">/</span> 
              <span className="text-zinc-500">{menuItems[activeWorkspace].find(t => t.id === activeTab)?.label}</span>
            </h2>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 px-8 py-4 bg-zinc-950 border border-zinc-900 rounded-3xl shadow-2xl">
               <Database size={20} className="text-emerald-500" />
               <span className="text-[11px] font-black text-zinc-600 uppercase tracking-widest italic">Supabase Secure</span>
            </div>
            {activeTab === 'projects' ? (
              <button onClick={() => { setEditingProject(null); setNewProject({name: '', description: '', status: 'Ativo'}); setShowProjectModal(true); }} className="bg-white text-black px-12 py-5 rounded-3xl text-[14px] font-black uppercase tracking-widest flex items-center gap-3 hover:bg-zinc-200 transition-all shadow-[0_0_60px_rgba(255,255,255,0.1)] active:scale-95">
                <Plus size={24} strokeWidth={4} /> Novo Projeto
              </button>
            ) : (
              <button onClick={() => { setEditingTask(null); setNewTask({ title: '', priority: 'Normal', resp: '', status: 'todo', description: '', objectives: '', steps: '', outcome: '', questions: '', project: 'Interno' }); setShowModal(true); }} className="bg-white text-black px-12 py-5 rounded-3xl text-[14px] font-black uppercase tracking-widest flex items-center gap-3 hover:bg-zinc-200 transition-all shadow-[0_0_60px_rgba(255,255,255,0.1)] active:scale-95">
                <Plus size={24} strokeWidth={4} /> Nova Missão
              </button>
            )}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-16 custom-scrollbar z-30 text-left">
          
          {/* VIEW: GOALS (O PLANO DE GUERRA) */}
          {activeTab === 'goals' && (
            <div className="space-y-20 animate-in fade-in duration-1000 max-w-7xl mx-auto">
               <div className="flex flex-col gap-6 border-b border-zinc-900 pb-12">
                 <h3 className="text-8xl font-black text-white uppercase italic tracking-tighter leading-[0.8]">Metas de <br /><span className="text-emerald-600">Vida HD</span></h3>
                 <p className="text-zinc-600 uppercase tracking-[0.6em] font-black text-sm ml-3">Estratégia Unificada Agência & Pessoal</p>
               </div>

               <div className="grid grid-cols-1 gap-10">
                  {goals.map(goal => (
                    <Card key={goal.id} className="p-16 border-zinc-800 bg-zinc-950/40 relative group overflow-hidden shadow-2xl">
                       <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px]" />
                       <div className="flex justify-between items-start mb-12 relative z-10">
                          <div className="space-y-2">
                             <h4 className="text-5xl font-black text-white uppercase italic tracking-tighter leading-none">{goal.title}</h4>
                             <p className="text-zinc-500 text-lg font-medium italic border-l-2 border-emerald-500 pl-6 py-2">"{goal.strategy}"</p>
                          </div>
                          <Badge variant="success">{goal.status}</Badge>
                       </div>
                       
                       <div className="space-y-6 relative z-10 mb-12">
                          <div className="flex justify-between text-[11px] font-black uppercase tracking-[0.3em] text-zinc-600">
                             <span>Progresso do Alvo</span>
                             <span>{goal.progress}%</span>
                          </div>
                          <div className="h-4 bg-zinc-900 rounded-full overflow-hidden p-1 border border-zinc-800 shadow-inner">
                             <div className="h-full bg-emerald-500 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all duration-1000" style={{ width: `${goal.progress}%` }} />
                          </div>
                       </div>

                       <div className="flex items-center justify-between pt-10 border-t border-zinc-900">
                          <div className="flex items-center gap-6">
                             <div className="text-[10px] font-black text-zinc-700 uppercase tracking-widest">Agentes no Plano:</div>
                             <div className="flex -space-x-3">
                                {goal.agents.map(a => (
                                  <div key={a} title={a} className="w-12 h-12 rounded-2xl bg-zinc-800 border-2 border-zinc-950 flex items-center justify-center text-xs font-black text-white uppercase shadow-xl hover:-translate-y-1 transition-transform cursor-help">{a[0]}</div>
                                ))}
                             </div>
                          </div>
                          <button className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-emerald-500 hover:text-white transition-all group/btn">
                             Ver Detalhes do Plano <ArrowRight size={20} className="group-hover/btn:translate-x-2 transition-all" />
                          </button>
                       </div>
                    </Card>
                  ))}
               </div>
            </div>
          )}

          {/* VIEW: PROJECTS (CRUD REFORÇADO) */}
          {activeTab === 'projects' && (
            <div className="space-y-16 max-w-7xl animate-in fade-in duration-700 text-left">
               <div className="flex flex-col gap-4 text-left border-b border-zinc-900 pb-12">
                 <h3 className="text-8xl font-black text-white uppercase italic tracking-tighter leading-[0.85] text-left">Pipeline <br /><span className="text-purple-600 text-left text-left">Contratos</span></h3>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left text-left">
                  {projects.map(proj => (
                    <Card key={proj.id} className="p-12 bg-zinc-950/60 border-zinc-800/80 shadow-[0_0_60px_rgba(0,0,0,0.5)] relative group text-left text-left">
                       <div className="absolute top-8 right-10 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 text-left text-left">
                          <button onClick={() => { setEditingProject(proj); setNewProject({...proj}); setShowProjectModal(true); }} className="p-4 bg-zinc-900 rounded-2xl text-zinc-500 hover:text-blue-400 border border-zinc-800 hover:border-blue-500/50 transition-all text-left text-left shadow-2xl"><Edit2 size={20} /></button>
                          <button onClick={() => { if(window.confirm('Eliminar projeto permanentemente?')) setProjects(projects.filter(p => p.id !== proj.id)) }} className="p-4 bg-zinc-900 rounded-2xl text-zinc-500 hover:text-red-500 border border-zinc-800 hover:border-red-500/50 transition-all text-left text-left shadow-2xl"><Trash2 size={20} /></button>
                       </div>
                       <div className="flex justify-between items-start mb-12 text-left">
                          <div className="text-left text-left">
                            <h4 className="text-5xl font-black text-white uppercase italic tracking-tight mb-3 leading-none text-left">{proj.name}</h4>
                            <div className="flex items-center gap-4 text-left text-left">
                               <div className={`w-3 h-3 rounded-full ${proj.status === 'Ativo' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]'} animate-pulse`} />
                               <span className="text-[12px] font-black text-zinc-600 uppercase tracking-[0.3em] text-left">{proj.description}</span>
                            </div>
                          </div>
                       </div>
                       <div className="space-y-4 text-left text-left text-left">
                          {tasks.filter(t => t.project === proj.name).map(t => (
                            <div key={t.id} className="flex items-center justify-between p-7 rounded-[2rem] bg-black border border-zinc-900 hover:border-purple-500/30 hover:bg-zinc-900/20 transition-all cursor-pointer group/item text-left shadow-inner" onClick={() => { setSelectedTask(t); setShowDetails(true); }}>
                               <div className="flex items-center gap-6 text-left">
                                  <div className={`w-2.5 h-2.5 rounded-full ${t.status === 'in_progress' ? 'bg-blue-500' : 'bg-zinc-800'}`} />
                                  <span className="text-lg font-black text-zinc-400 uppercase tracking-tighter group-hover/item:text-white transition-colors text-left italic">{t.title}</span>
                               </div>
                               <ArrowRight size={24} className="text-zinc-900 group-hover/item:text-purple-500 transition-all" />
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
            <div className="space-y-20 max-w-7xl animate-in slide-in-from-bottom-6 duration-1000 text-left text-left text-left">
              {activeTab === 'dashboard' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-left">
                  <div className="lg:col-span-2 space-y-12 text-left text-left">
                    <SectionHeader title="Prioridade de Execução" icon={Zap} color="text-yellow-500" />
                    <div className="grid grid-cols-1 gap-8 text-left text-left text-left">
                      {tasks.filter(t => t.status === 'in_progress' && t.category === activeWorkspace).map(task => (
                        <TaskCardLarge key={task.id} task={task} onClick={() => { setSelectedTask(task); setShowDetails(true); }} />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-12 text-left text-left">
                    <SectionHeader title="Brainstorm Live" icon={MessageSquare} color="text-purple-500" />
                    <Card className="p-12 border-purple-500/10 bg-purple-500/5 h-full flex flex-col min-h-[500px] text-left">
                       <div className="flex-1 space-y-12 mb-10 overflow-y-auto text-left">
                          {brainstormFeed.map((f, i) => <BrainstormItem key={i} {...f} />)}
                       </div>
                       <form onSubmit={sendBrainstorm} className="relative mt-auto pt-10 border-t border-zinc-900 text-left">
                          <input 
                            className="w-full bg-[#080808] border border-zinc-800 rounded-[1.5rem] p-6 text-sm text-white focus:border-purple-500 outline-none pr-20 transition-all shadow-inner text-left"
                            placeholder="Sócio, envie sua visão estratégica..."
                            value={brainstormMsg}
                            onChange={e => setBrainstormMsg(e.target.value)}
                          />
                          <button type="submit" className="absolute right-6 top-[3.1rem] text-zinc-700 hover:text-purple-400 transition-all hover:scale-125 text-left"><Send size={28} /></button>
                       </form>
                    </Card>
                  </div>
                </div>
              )}
              
              {/* KANBAN SECTION */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-left text-left">
                 {kanbanColumns.map(col => (
                    <div key={col.id} className="flex flex-col space-y-10 text-left text-left">
                       <div className="flex items-center justify-between px-10 text-left text-left">
                          <div className="flex items-center gap-4 text-left">
                             <div className={`w-3 h-3 rounded-full ${col.color} shadow-[0_0_10px_rgba(255,255,255,0.1)]`} />
                             <span className="text-[14px] font-black uppercase tracking-[0.5em] text-zinc-600 text-left">{col.title}</span>
                          </div>
                          <span className="text-base font-mono font-black text-zinc-800 bg-zinc-950 px-4 py-1 rounded-xl border border-zinc-900 text-left">{tasks.filter(t => t.status === col.id && t.category === activeWorkspace).length}</span>
                       </div>
                       <div className="flex-1 bg-zinc-950/60 border border-zinc-900/80 border-dashed rounded-[5rem] p-6 space-y-6 min-h-[600px] hover:border-zinc-800 transition-all duration-700 shadow-2xl text-left text-left">
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
            <div className="space-y-20 animate-in fade-in duration-700 max-w-6xl text-left text-left text-left">
               <h3 className="text-8xl font-black text-white uppercase italic tracking-tighter leading-none border-b border-zinc-900 pb-16 text-left">Finanças <span className="text-emerald-600 text-left">HD</span></h3>
               <div className="grid grid-cols-1 gap-16 text-left">
                  <div className="space-y-10 text-left">
                     <SectionHeader title="Rastreamento de Passivos" icon={ArrowDownRight} color="text-red-500" />
                     <Card className="p-0 border-zinc-900 bg-[#060606] shadow-2xl text-left">
                        <table className="w-full text-left">
                          <thead className="bg-zinc-950/80">
                            <tr>
                              <th className="p-10 text-[12px] font-black uppercase tracking-widest text-zinc-700 text-left">Descrição</th>
                              <th className="p-10 text-[12px] font-black uppercase tracking-widest text-zinc-700 text-left">Valor (Input Livre)</th>
                              <th className="p-10 text-[12px] font-black uppercase tracking-widest text-zinc-700 text-left text-right">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-zinc-900 text-left">
                            <tr className="group hover:bg-zinc-900/20 transition-all">
                              <td className="p-12 text-3xl font-black text-white uppercase italic tracking-tighter text-left">Cartão Black Personal</td>
                              <td className="p-12 text-left">
                                <input className="bg-transparent text-red-500 font-mono font-black text-5xl outline-none border-b-2 border-zinc-900 focus:border-red-600 transition-all w-full tracking-tighter text-left" defaultValue="R$ 15.000,00" />
                              </td>
                              <td className="p-12 text-right">
                                <Badge variant="critical">URGENTE</Badge>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                     </Card>
                  </div>
               </div>
            </div>
          )}
        </div>
      </main>

      {/* 🔴 DETAIL MODAL HD (O TELÃO DE ELITE) */}
      {showDetails && selectedTask && (
        <div className="fixed inset-0 bg-black/98 backdrop-blur-[60px] z-[100] flex items-center justify-center p-8 lg:p-24 animate-in fade-in duration-500 text-left" onClick={() => setShowDetails(false)}>
           <div 
             className="w-full max-w-[90rem] bg-[#050505] border border-zinc-800/50 rounded-[6rem] p-24 relative overflow-y-auto max-h-full shadow-[0_0_300px_rgba(0,0,0,1)] text-left" 
             onClick={e => e.stopPropagation()}
           >
              <button onClick={() => setShowDetails(false)} className="absolute top-20 right-20 text-zinc-800 hover:text-white transition-all hover:rotate-90 duration-500 pointer-events-auto text-left"><X size={80} strokeWidth={0.5} /></button>
              
              <div className="flex items-center gap-12 mb-12 text-left animate-in slide-in-from-left-6 duration-1000 text-left">
                 <Badge variant={selectedTask.priority === 'CRÍTICA' ? 'critical' : 'high'}>{selectedTask.priority}</Badge>
                 <span className="text-xl font-black text-zinc-800 uppercase tracking-[1em] italic leading-none text-left">MISSÃO #{selectedTask.id}</span>
              </div>

              <h2 className="text-[160px] font-black text-white uppercase italic tracking-[ -0.05em] leading-[0.75] mb-24 border-b border-zinc-900 pb-24 text-left max-w-6xl animate-in slide-in-from-bottom-8 duration-1000 delay-200">
                {selectedTask.title}
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-40 text-left animate-in fade-in duration-1000 delay-500 text-left">
                 <div className="space-y-32 text-left">
                    <DetailBlock title="Visão Geral & Contexto" content={selectedTask.description} icon={Zap} color="text-yellow-500" />
                    <DetailBlock title="Objetivos Estratégicos" content={selectedTask.objectives} icon={Target} color="text-purple-500" />
                 </div>
                 <div className="space-y-32 text-left text-left">
                    <DetailBlock title="Plano de Execução HD" content={selectedTask.steps} isList icon={ListTodo} color="text-blue-500" />
                    <DetailBlock title="Dúvidas & Clarificações" content={selectedTask.questions || "Aguardando input estratégico do sócio..."} icon={HelpCircle} color="text-zinc-800" />
                 </div>
              </div>

              <div className="mt-40 pt-20 border-t border-zinc-900 flex flex-col lg:flex-row justify-between items-end gap-12 text-left">
                 <div className="flex gap-24 text-left text-left">
                    <MetaItem label="Agente em Campo" val={selectedTask.resp} icon={User} />
                    <MetaItem label="Projeto Vinculado" val={selectedTask.project} icon={FolderKanban} />
                 </div>
                 <div className="flex gap-8 pointer-events-auto text-left text-left">
                    <button onClick={(e) => { e.stopPropagation(); setEditingTask(selectedTask); setNewTask({...selectedTask}); setShowModal(true); }} className="px-20 py-10 bg-zinc-100 text-black font-black rounded-[3rem] uppercase tracking-[0.2em] text-2xl hover:bg-white transition-all shadow-2xl active:scale-95 text-left">Editar Protocolo</button>
                    <button onClick={(e) => { e.stopPropagation(); handleDeleteTask(selectedTask.id); }} className="px-20 py-10 bg-red-950/20 text-red-600 border border-red-900/30 rounded-[3rem] font-black uppercase tracking-[0.2em] text-2xl hover:bg-red-600 hover:text-white transition-all active:scale-95 pointer-events-auto text-left text-left text-left">Abortar Missão</button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* 🟡 CREATE / EDIT TASK MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/98 backdrop-blur-3xl z-[110] flex items-center justify-center p-8 animate-in zoom-in-95 duration-500 text-left text-left text-left text-left">
           <Card className="w-full max-w-6xl p-20 bg-[#050505] border-zinc-800 shadow-[0_0_200px_rgba(168,85,247,0.1)] text-left text-left">
              <div className="flex justify-between items-center mb-20 border-b border-zinc-900 pb-12 text-left text-left text-left">
                 <h2 className="text-7xl font-black uppercase italic tracking-tighter text-white text-left text-left">Missão <span className="text-purple-600">HD</span></h2>
                 <button onClick={closeModal} className="text-zinc-800 hover:text-white transition-all text-left text-left text-left"><X size={64} strokeWidth={1} /></button>
              </div>
              <form onSubmit={handleSaveTask} className="space-y-16 text-left text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 text-left text-left text-left">
                   <div className="space-y-10 text-left text-left text-left text-left">
                      <InputHD label="Título da Missão" value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})} required placeholder="Qual o alvo?" />
                      <div className="space-y-3 text-left">
                        <label className="text-[11px] font-black text-zinc-700 uppercase tracking-[0.4em] ml-2 text-left">Projeto Vinculado</label>
                        <select className="w-full bg-zinc-950 border border-zinc-800 rounded-[2rem] p-8 text-white focus:border-purple-500 outline-none appearance-none font-bold text-2xl text-left shadow-inner" value={newTask.project} onChange={e => setNewTask({...newTask, project: e.target.value})}>
                          {projects.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                          <option value="Interno">Interno</option>
                        </select>
                      </div>
                      <TextAreaHD label="Descrição Macro" value={newTask.description} onChange={e => setNewTask({...newTask, description: e.target.value})} rows={3} placeholder="Contexto de elite..." />
                   </div>
                   <div className="space-y-10 text-left text-left text-left">
                      <TextAreaHD label="Plano de Execução HD" value={newTask.steps} onChange={e => setNewTask({...newTask, steps: e.target.value})} rows={3} placeholder="Etapa por etapa..." />
                      <TextAreaHD label="Resultado Esperado (Outcome)" value={newTask.outcome} onChange={e => setNewTask({...newTask, outcome: e.target.value})} rows={3} placeholder="Como saberemos que foi 'Done'?" />
                   </div>
                </div>
                <div className="flex justify-end gap-8 pt-16 border-t border-zinc-900 text-left text-left text-left">
                   <button type="button" onClick={closeModal} className="px-12 py-8 text-zinc-800 font-black uppercase tracking-[0.5em] hover:text-white transition-all text-left text-left">Cancelar</button>
                   <button type="submit" className="px-24 py-10 bg-white text-black font-black rounded-[3rem] uppercase tracking-[0.2em] hover:scale-[1.03] transition-all text-2xl shadow-3xl text-left">Lançar Missão de Performance</button>
                </div>
              </form>
           </Card>
        </div>
      )}

      {/* 🟠 CREATE / EDIT PROJECT MODAL (REFINADO) */}
      {showProjectModal && (
        <div className="fixed inset-0 bg-black/98 backdrop-blur-3xl z-[110] flex items-center justify-center p-8 animate-in zoom-in-95 duration-500 text-left text-left">
           <Card className="w-full max-w-4xl p-20 bg-[#050505] border-zinc-800 text-left shadow-[0_0_150px_rgba(255,255,255,0.05)]">
              <div className="flex justify-between items-center mb-16 border-b border-zinc-900 pb-12 text-left">
                 <h2 className="text-6xl font-black uppercase italic tracking-tighter text-white text-left">{editingProject ? 'Refinar' : 'Novo'} Contrato</h2>
                 <button onClick={() => setShowProjectModal(false)} className="text-zinc-800 hover:text-white text-left text-left text-left"><X size={64} strokeWidth={1} /></button>
              </div>
              <form onSubmit={handleSaveProject} className="space-y-12 text-left text-left text-left text-left">
                <div className="space-y-10 text-left text-left">
                  <InputHD label="Nome do Projeto / Cliente" value={newProject.name} onChange={e => setNewProject({...newProject, name: e.target.value})} required placeholder="Ex: Estética VIP" />
                  <TextAreaHD label="Descrição do Pipeline" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} rows={2} placeholder="Ex: Gestão de GMN e Performance" />
                  <div className="space-y-4 text-left">
                    <label className="text-[11px] font-black text-zinc-700 uppercase tracking-[0.4em] ml-2 text-left">Status de Execução</label>
                    <select className="w-full bg-zinc-950 border border-zinc-800 rounded-[2rem] p-8 text-white focus:border-purple-500 outline-none appearance-none font-bold text-2xl text-left shadow-inner" value={newProject.status} onChange={e => setNewProject({...newProject, status: e.target.value})}>
                      <option value="Ativo">Ativo</option>
                      <option value="Concluído">Concluído</option>
                      <option value="Pausado">Pausado</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-8 pt-16 border-t border-zinc-900 text-left">
                   <button type="button" onClick={() => setShowProjectModal(false)} className="px-12 py-8 text-zinc-800 font-black uppercase tracking-[0.5em] hover:text-white transition-all text-left">Cancelar</button>
                   <button type="submit" className="px-24 py-10 bg-white text-black font-black rounded-[3rem] uppercase tracking-[0.2em] hover:scale-[1.03] transition-all text-2xl shadow-3xl text-left">Lançar Projeto</button>
                </div>
              </form>
           </Card>
        </div>
      )}

    </div>
  );
};

export default Dashboard;
