import React, { useState, useEffect, useRef } from 'react';
import {
  Users, Target, Activity, ChevronRight, Clock, BarChart3, MessageSquare, Briefcase, User, 
  TrendingUp, Wallet, BookOpen, Layout, Plus, Database, X, Calendar, Trash2, Edit2, 
  CheckCircle2, ListTodo, HelpCircle, Zap, Menu, ChevronLeft, Settings, CreditCard, 
  Repeat, ArrowRight, FolderKanban, Check, DollarSign, PieChart, Star, Search, Bell,
  ArrowUpRight, ArrowDownRight, MoreHorizontal, Send
} from 'lucide-react';

// ——————————————————————————————————————————————————————————————————————————————————————
// PREMIUM UI COMPONENTS (SHADCN / SPARTANA STYLE)
// ——————————————————————————————————————————————————————————————————————————————————————

const Badge = ({ children, variant = 'default' }) => {
  const variants = {
    default: 'bg-zinc-800/50 text-zinc-400 border-zinc-700/50',
    critical: 'bg-red-500/10 text-red-500 border-red-500/20',
    high: 'bg-orange-500/10 text-orange-400 border-orange-900/50',
    success: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    purple: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  };
  return (
    <span className={`px-2.5 py-1 rounded-md text-[10px] font-black border ${variants[variant]} uppercase tracking-widest`}>
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
      canvas.width = img.width;
      canvas.height = img.height;
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

// ——————————————————————————————————————————————————————————————————————————————————————
// MAIN DASHBOARD APPLICATION
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

  // APP STATE
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
    { agent: 'ERIKA', time: '09:20', text: 'Iniciando fase de integração com Supabase.', color: 'bg-purple-500' },
    { agent: 'ÍCARO', time: '08:45', text: 'Estrutura de tabelas para o Workspace Pessoal finalizada.', color: 'bg-blue-500' }
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

  const [newTask, setNewTask] = useState({ 
    title: '', priority: 'Normal', resp: '', status: 'todo',
    description: '', objectives: '', steps: '', outcome: '', questions: '', project: 'Interno'
  });

  const handleDeleteTask = (id) => {
    if (window.confirm('Excluir esta missão?')) {
      setTasks(tasks.filter(t => t.id !== id));
      setShowDetails(false);
    }
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

  return (
    <div className="min-h-screen bg-[#020202] text-zinc-400 font-sans flex overflow-hidden selection:bg-purple-500/30">
      
      {/* 🟢 SIDEBAR NAV */}
      <aside className={`${isSidebarOpen ? 'w-80' : 'w-24'} bg-[#080808] border-r border-zinc-900 transition-all duration-500 flex flex-col z-50`}>
        <div className="p-10 flex items-center gap-5">
            <TransparentImage src="/logo_spartana.jpg" className="w-16 h-16 object-contain" alt="Logo" style={{ transform: 'scale(1.8)' }} />
            {isSidebarOpen && (
              <div className="flex flex-col">
                <span className="font-black text-white text-2xl tracking-tighter uppercase italic leading-none">Spartana</span>
                <span className="text-[8px] font-black text-zinc-600 tracking-[0.4em] uppercase mt-1">Intelligence HQ</span>
              </div>
            )}
        </div>

        <nav className="flex-1 px-6 space-y-12 overflow-y-auto custom-scrollbar">
          <div className="space-y-3">
             <p className={`text-[10px] font-black text-zinc-700 uppercase tracking-[0.3em] mb-6 ${!isSidebarOpen && 'text-center'}`}>Workspace</p>
             <WorkspaceBtn active={activeWorkspace === 'agency'} onClick={() => { setActiveWorkspace('agency'); setActiveTab('dashboard'); }} icon={Briefcase} label="Operações" open={isSidebarOpen} color="text-purple-500" />
             <WorkspaceBtn active={activeWorkspace === 'personal'} onClick={() => { setActiveWorkspace('personal'); setActiveTab('dashboard'); }} icon={User} label="Pessoal" open={isSidebarOpen} color="text-emerald-500" />
          </div>

          <div className="space-y-2 pt-10 border-t border-zinc-900">
            {menuItems[activeWorkspace].map(item => (
              <SidebarBtn key={item.id} active={activeTab === item.id} onClick={() => setActiveTab(item.id)} icon={item.icon} label={item.label} open={isSidebarOpen} />
            ))}
          </div>
        </nav>

        <div className="p-8">
           <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="w-full flex items-center justify-center p-4 rounded-2xl bg-zinc-900/50 hover:bg-zinc-800 transition-all text-zinc-500">
             {isSidebarOpen ? <ChevronLeft size={24} /> : <Menu size={24} />}
           </button>
        </div>
      </aside>

      {/* 🔵 MAIN AREA */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        <header className="h-28 border-b border-zinc-900 flex items-center justify-between px-12 bg-black/40 backdrop-blur-3xl z-40">
          <div className="flex flex-col">
            <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter flex items-center gap-4">
              <span className={activeWorkspace === 'agency' ? 'text-purple-500' : 'text-emerald-500'}>{modes[activeWorkspace].label}</span>
              <span className="text-zinc-800 font-thin not-italic">/</span> 
              <span className="text-zinc-500">{modes[activeWorkspace].tabs.find(t => t.id === activeTab)?.label}</span>
            </h2>
          </div>

          <div className="flex items-center gap-8">
            <button onClick={() => setShowModal(true)} className="bg-white text-black px-10 py-4 rounded-[1.2rem] text-[13px] font-black uppercase tracking-widest flex items-center gap-3 hover:bg-zinc-200 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] active:scale-95">
              <Plus size={20} strokeWidth={3} /> Nova Missão
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
          
          {/* VIEW: PROJECTS (THE NEW REQUIRED TAB) */}
          {activeTab === 'projects' && (
            <div className="space-y-12 max-w-7xl animate-in fade-in duration-500">
               <h3 className="text-5xl font-black text-white uppercase italic tracking-tighter border-b border-zinc-900 pb-8">Projetos <span className="text-purple-500">Ativos</span></h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {['Spartana HQ', 'Estética VIP', 'Seu Costela VCA'].map(proj => (
                    <Card key={proj} className="p-10 bg-zinc-950/40">
                       <div className="flex justify-between items-start mb-10">
                          <div>
                            <h4 className="text-3xl font-black text-white uppercase italic tracking-tight">{proj}</h4>
                            <p className="text-zinc-500 text-xs mt-1 uppercase tracking-widest font-bold">Pipeline de Execução Autônoma</p>
                          </div>
                          <Badge variant="purple">Ativo</Badge>
                       </div>
                       <div className="space-y-4">
                          {tasks.filter(t => t.project.includes(proj)).map(t => (
                            <div key={t.id} className="flex items-center justify-between p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-600 transition-all cursor-pointer" onClick={() => { setSelectedTask(t); setShowDetails(true); }}>
                               <div className="flex items-center gap-4">
                                  <div className={`w-2 h-2 rounded-full ${t.status === 'in_progress' ? 'bg-blue-500' : 'bg-zinc-700'}`} />
                                  <span className="text-sm font-bold text-zinc-300 uppercase">{t.title}</span>
                               </div>
                               <ChevronRight size={16} />
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
            <div className="space-y-12 max-w-7xl animate-in slide-in-from-bottom-4 duration-700">
              {activeTab === 'dashboard' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
                  <div className="lg:col-span-2 space-y-10">
                    <SectionHeader title="Ação Imediata" icon={Zap} color="text-yellow-500" />
                    <div className="grid grid-cols-1 gap-6">
                      {tasks.filter(t => t.status === 'in_progress' && t.category === activeWorkspace).map(task => (
                        <TaskCardLarge key={task.id} task={task} onClick={() => { setSelectedTask(task); setShowDetails(true); }} />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-10">
                    <SectionHeader title="Brainstorm HQ" icon={MessageSquare} color="text-purple-500" />
                    <Card className="p-8 border-purple-500/10 bg-purple-500/5 h-full flex flex-col">
                       <div className="flex-1 space-y-8 mb-8">
                          {brainstormFeed.map((f, i) => <BrainstormItem key={i} {...f} />)}
                       </div>
                       <form onSubmit={sendBrainstorm} className="relative mt-auto pt-6 border-t border-zinc-900">
                          <input 
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-xs text-white focus:border-purple-500 outline-none pr-12 transition-all"
                            placeholder="Sócio, envie sua opinião..."
                            value={brainstormMsg}
                            onChange={e => setBrainstormMsg(e.target.value)}
                          />
                          <button type="submit" className="absolute right-4 top-[2.1rem] text-zinc-600 hover:text-purple-400 transition-all"><Send size={18} /></button>
                       </form>
                    </Card>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 {['todo', 'in_progress', 'done'].map(status => (
                    <div key={status} className="flex flex-col space-y-6">
                       <div className="flex items-center justify-between px-6">
                          <span className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-500">{status === 'todo' ? 'Backlog' : status === 'in_progress' ? 'Execução' : 'Concluído'}</span>
                       </div>
                       <div className="bg-zinc-900/10 border border-zinc-900/40 border-dashed rounded-[3rem] p-4 space-y-4 min-h-[500px]">
                          {tasks.filter(t => t.status === status && t.category === activeWorkspace).map(task => (
                            <TaskKanbanCard key={task.id} task={task} onClick={() => { setSelectedTask(task); setShowDetails(true); }} onEdit={(e) => { e.stopPropagation(); setEditingTask(task); setNewTask({...task}); setShowModal(true); }} onDelete={(e) => { e.stopPropagation(); handleDeleteTask(task.id); }} />
                          ))}
                       </div>
                    </div>
                 ))}
              </div>
            </div>
          )}

          {/* VIEW: FINANCE */}
          {activeTab === 'finance' && (
            <div className="space-y-12 animate-in fade-in duration-500 max-w-5xl">
               <h3 className="text-5xl font-black text-white uppercase italic tracking-tighter">Fluxo <span className="text-emerald-500">Financeiro</span></h3>
               <Card className="p-0 border-zinc-900 bg-zinc-950/40">
                  <table className="w-full text-left">
                    <thead className="bg-zinc-900/50">
                      <tr>
                        <th className="p-8 text-[10px] font-black uppercase tracking-widest text-zinc-600">Descrição</th>
                        <th className="p-8 text-[10px] font-black uppercase tracking-widest text-zinc-600">Valor Real</th>
                        <th className="p-8 text-[10px] font-black uppercase tracking-widest text-zinc-600">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-900">
                      <tr>
                        <td className="p-8 text-lg font-bold text-white uppercase italic">Cartão Black</td>
                        <td className="p-8"><input className="bg-transparent text-red-500 font-mono font-black text-2xl outline-none border-b border-zinc-800 focus:border-red-500 transition-all w-full" defaultValue="R$ 15.000,00" /></td>
                        <td className="p-8"><Badge variant="critical">URGENTE</Badge></td>
                      </tr>
                    </tbody>
                  </table>
               </Card>
            </div>
          )}

          {activeTab === 'habits' && (
            <div className="space-y-12 animate-in fade-in duration-500 max-w-7xl mx-auto">
              <h3 className="text-5xl font-black text-white uppercase italic tracking-tighter">Consistência <span className="text-emerald-500">30D</span></h3>
              <div className="grid grid-cols-1 gap-8">
                {habits.map(habit => (
                  <Card key={habit.id} className="p-12 bg-zinc-950/50">
                    <div className="flex justify-between items-center mb-10 border-b border-zinc-900 pb-8">
                      <div className="flex items-center gap-6">
                        <div className="p-4 bg-emerald-500/10 text-emerald-500 rounded-[1.5rem] border border-emerald-500/20"><Repeat size={32} /></div>
                        <h4 className="text-4xl font-black text-white uppercase italic tracking-tight">{habit.name}</h4>
                      </div>
                      <Badge variant="success">{Math.round((habit.days.filter(d => d).length / 30) * 100)}% OK</Badge>
                    </div>
                    <div className="grid grid-cols-5 md:grid-cols-10 gap-4">
                      {habit.days.map((done, idx) => (
                        <button key={idx} onClick={() => toggleHabit(habit.id, idx)} className={`aspect-square rounded-[1rem] border-2 transition-all duration-300 flex items-center justify-center text-xs font-black ${done ? 'bg-emerald-500 border-emerald-400 text-black shadow-[0_0_30px_rgba(16,185,129,0.3)] scale-110' : 'bg-zinc-900/50 border-zinc-800 text-zinc-700 hover:border-zinc-500'}`}>
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

      {/* 🔴 DETAIL MODAL HD (THE "BIG SCREEN") */}
      {showDetails && selectedTask && (
        <div className="fixed inset-0 bg-black/98 backdrop-blur-3xl z-[100] flex items-center justify-center p-8 lg:p-24 animate-in fade-in duration-300" onClick={() => setShowDetails(false)}>
           <div className="w-full max-w-6xl bg-zinc-950 border border-zinc-800/50 rounded-[4rem] p-16 relative overflow-y-auto max-h-full" onClick={e => e.stopPropagation()}>
              <button onClick={() => setShowDetails(false)} className="absolute top-12 right-12 text-zinc-700 hover:text-white transition-all hover:rotate-90 duration-300"><X size={48} strokeWidth={1.5} /></button>
              <div className="flex items-center gap-6 mb-8">
                 <Badge variant={selectedTask.priority === 'CRÍTICA' ? 'critical' : 'high'}>{selectedTask.priority}</Badge>
                 <span className="text-xs font-black text-zinc-700 uppercase tracking-[0.5em] italic">Protocolo Spartana #{selectedTask.id}</span>
              </div>
              <h2 className="text-7xl font-black text-white uppercase italic tracking-tighter leading-[0.9] mb-12 border-b border-zinc-900 pb-16">{selectedTask.title}</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                 <div className="space-y-16">
                    <DetailBlock title="Visão Geral & Contexto" content={selectedTask.description} icon={Zap} color="text-yellow-500" />
                    <DetailBlock title="Objetivos Estratégicos" content={selectedTask.objectives} icon={Target} color="text-purple-500" />
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
                    <button onClick={(e) => { setEditingTask(selectedTask); setNewTask({...selectedTask}); setShowModal(true); }} className="px-10 py-6 bg-zinc-100 text-black font-black rounded-3xl uppercase tracking-widest hover:bg-white transition-all shadow-xl pointer-events-auto">Editar Protocolo</button>
                    <button onClick={() => handleDeleteTask(selectedTask.id)} className="px-10 py-6 bg-red-950/30 text-red-500 border border-red-500/20 rounded-3xl font-black uppercase tracking-widest hover:bg-red-500 hover:text-black transition-all pointer-events-auto">Abortar Missão</button>
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
                      <TextAreaHD label="Plano de Execução" value={newTask.steps} onChange={e => setNewTask({...newTask, steps: e.target.value})} rows={3} />
                      <TextAreaHD label="Resultado Esperado" value={newTask.outcome} onChange={e => setNewTask({...newTask, outcome: e.target.value})} rows={3} />
                   </div>
                </div>
                <div className="flex justify-end gap-4 border-t border-zinc-900 pt-10">
                   <button type="button" onClick={closeModal} className="px-8 py-4 text-zinc-500 font-bold uppercase tracking-widest hover:text-white transition-all">Cancelar</button>
                   <button type="submit" className="px-12 py-5 bg-white text-black font-black rounded-2xl uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">Lançar Missão</button>
                </div>
              </form>
           </Card>
        </div>
      )}

    </div>
  );
};

// ——————————————————————————————————————————————————————————————————————————————————————
// HELPERS
// ——————————————————————————————————————————————————————————————————————————————————————

const WorkspaceBtn = ({ icon: Icon, label, active, onClick, open, color }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-5 p-5 rounded-[1.5rem] transition-all ${active ? 'bg-zinc-900 border border-zinc-800 shadow-2xl scale-[1.02]' : 'hover:bg-zinc-900/40'}`}>
    <Icon size={28} className={`${active ? color : 'text-zinc-700'}`} />
    {open && <span className={`text-[13px] font-black uppercase tracking-[0.2em] ${active ? 'text-white' : 'text-zinc-600'}`}>{label}</span>}
  </button>
);

const SidebarBtn = ({ icon: Icon, label, active, onClick, open }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-5 p-4 rounded-2xl transition-all ${active ? 'bg-zinc-900/80 text-white border border-zinc-800' : 'text-zinc-600 hover:text-zinc-300 hover:bg-zinc-900/20'}`}>
    <Icon size={20} />
    {open && <span className="text-[12px] font-bold uppercase tracking-widest">{label}</span>}
  </button>
);

const TaskCardLarge = ({ task, onClick }) => (
  <div onClick={onClick} className="bg-zinc-900/40 border border-zinc-800 p-10 rounded-[2.5rem] hover:border-purple-500/50 transition-all cursor-pointer group relative overflow-hidden">
     <div className="flex justify-between items-start mb-8">
        <Badge variant={task.priority === 'CRÍTICA' ? 'critical' : 'high'}>{task.priority}</Badge>
        <span className="text-zinc-700 font-mono text-[10px]">#{task.id}</span>
     </div>
     <span className="text-[11px] font-black text-zinc-600 uppercase tracking-[0.4em] mb-3 block">{task.project}</span>
     <h4 className="text-3xl font-black text-white uppercase italic tracking-tighter group-hover:text-purple-400 transition-colors mb-6">{task.title}</h4>
     <div className="flex items-center justify-between pt-8 border-t border-zinc-800/50">
        <div className="flex items-center gap-4">
           <div className="w-10 h-10 rounded-2xl bg-zinc-800 flex items-center justify-center text-[12px] font-black text-white">{task.resp[0]}</div>
           <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{task.resp}</span>
        </div>
        <ArrowRight size={32} className="text-zinc-800 group-hover:text-purple-500 transition-all" />
     </div>
  </div>
);

const TaskKanbanCard = ({ task, onClick, onDelete, onEdit }) => (
  <div onClick={onClick} className="bg-zinc-950 border border-zinc-800 p-7 rounded-[2.2rem] hover:border-zinc-600 transition-all cursor-pointer group shadow-2xl">
     <div className="flex justify-between items-start mb-6">
        <Badge variant={task.priority === 'CRÍTICA' ? 'critical' : 'default'}>{task.priority}</Badge>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
           <button onClick={onEdit} className="p-2 hover:bg-zinc-900 rounded-xl text-zinc-600 hover:text-blue-400"><Edit2 size={14} /></button>
           <button onClick={onDelete} className="p-2 hover:bg-zinc-900 rounded-xl text-zinc-600 hover:text-red-500"><Trash2 size={14} /></button>
        </div>
     </div>
     <span className="text-[9px] font-black text-zinc-700 uppercase tracking-widest mb-2 block">{task.project}</span>
     <h4 className="text-base font-bold text-zinc-200 uppercase tracking-tight leading-tight mb-8">{task.title}</h4>
     <div className="flex items-center justify-between pt-5 border-t border-zinc-900">
        <div className="flex items-center gap-3">
           <div className="w-7 h-7 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[10px] font-black text-zinc-500 uppercase italic">{task.resp[0]}</div>
           <span className="text-[11px] font-bold text-zinc-600 uppercase tracking-tighter">{task.resp}</span>
        </div>
        <ChevronRight size={18} className="text-zinc-800 group-hover:text-white" />
     </div>
  </div>
);

const BrainstormItem = ({ agent, time, text, color }) => (
  <div className="relative pl-10">
     <div className={`absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full ${color} shadow-[0_0_15px_rgba(168,85,247,0.5)] z-10`} />
     <div className="flex justify-between items-center mb-1">
        <span className="text-[11px] font-black text-white uppercase tracking-widest italic">{agent}</span>
        <span className="text-[10px] font-mono text-zinc-700">{time}</span>
     </div>
     <p className="text-[14px] text-zinc-400 leading-relaxed font-medium">{text}</p>
  </div>
);

const DetailBlock = ({ title, content, icon: Icon, color, isList = false }) => (
  <div className="space-y-8">
     <div className="flex items-center gap-4">
        <Icon size={32} className={color} />
        <h3 className="text-xs font-black uppercase tracking-[0.5em] text-zinc-600">{title}</h3>
     </div>
     {isList ? (
       <div className="space-y-4">
         {content && content.split('\n').map((item, i) => (
           <div key={i} className="flex gap-8 p-8 bg-zinc-900/30 border border-zinc-900 rounded-[2.5rem] text-2xl text-zinc-300 font-medium">
             <span className="text-zinc-800 font-black italic">{String(i+1).padStart(2, '0')}</span>
             <span>{item}</span>
           </div>
         ))}
       </div>
     ) : (
       <p className="text-3xl text-zinc-300 leading-relaxed italic font-light border-l-4 border-zinc-900 pl-10">"{content}"</p>
     )}
  </div>
);

const MetaItem = ({ label, val, icon: Icon }) => (
  <div className="flex items-center gap-4">
     <div className="p-3 bg-zinc-900 rounded-2xl border border-zinc-800"><Icon size={24} className="text-zinc-600" /></div>
     <div>
        <p className="text-[10px] font-black text-zinc-700 uppercase tracking-widest">{label}</p>
        <p className="text-lg font-bold text-zinc-400 uppercase italic">{val}</p>
     </div>
  </div>
);

const InputHD = ({ label, ...props }) => (
  <div className="space-y-3">
    <label className="text-[11px] font-black text-zinc-600 uppercase tracking-[0.2em] ml-1">{label}</label>
    <input className="w-full bg-zinc-900 border border-zinc-800 rounded-[1.5rem] p-6 text-white focus:border-purple-500 outline-none transition-all shadow-inner font-bold text-lg" {...props} />
  </div>
);

const TextAreaHD = ({ label, ...props }) => (
  <div className="space-y-3">
    <label className="text-[11px] font-black text-zinc-600 uppercase tracking-[0.2em] ml-1">{label}</label>
    <textarea className="w-full bg-zinc-900 border border-zinc-800 rounded-[1.5rem] p-6 text-white focus:border-purple-500 outline-none transition-all resize-none shadow-inner font-medium text-lg" {...props} />
  </div>
);

const SectionHeader = ({ title, icon: Icon, color = "text-zinc-700" }) => (
  <div className="flex items-center gap-5">
    <div className="p-2 bg-zinc-900 rounded-lg border border-zinc-800"><Icon size={20} className={color} /></div>
    <h3 className="text-sm font-black uppercase tracking-[0.5em] text-zinc-600">{title}</h3>
  </div>
);

export default Dashboard;
