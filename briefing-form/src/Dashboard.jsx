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
  Repeat,
  ArrowRight,
  FolderKanban
} from 'lucide-react';

// ——————————————————————————————————————————————————————————————————————————————————————
// COMPONENTES BASE (ESTILO SHADCN HD)
// ——————————————————————————————————————————————————————————————————————————————————————

const Badge = ({ children, variant = 'default' }) => {
  const variants = {
    default: 'bg-zinc-800 text-zinc-400 border-zinc-700',
    critical: 'bg-red-950 text-red-400 border-red-900/50',
    high: 'bg-orange-950 text-orange-400 border-orange-900/50',
    success: 'bg-emerald-950 text-emerald-400 border-emerald-900/50',
  };
  return (
    <span className={`px-2.5 py-1 rounded-md text-[11px] font-black border ${variants[variant]} uppercase tracking-wider`}>
      {children}
    </span>
  );
};

const Card = ({ children, className = '', onClick }) => (
  <div onClick={onClick} className={`bg-zinc-900/40 border border-zinc-800 rounded-[1.5rem] overflow-hidden backdrop-blur-sm transition-all hover:border-zinc-600 ${className}`}>
    {children}
  </div>
);

// ——————————————————————————————————————————————————————————————————————————————————————
// DASHBOARD PRINCIPAL
// ——————————————————————————————————————————————————————————————————————————————————————

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeMode, setActiveMode] = useState('agency'); 
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  
  const [newTask, setNewTask] = useState({ 
    title: '', priority: 'Normal', resp: '', status: 'todo',
    description: '', objectives: '', steps: '', outcome: '', questions: '', project: 'Interno'
  });

  const [tasks, setTasks] = useState([
    { 
      id: '001', title: 'Configuração do CRM Digital', priority: 'Alta', resp: 'Ícaro', status: 'in_progress', category: 'agency', date: 'Hoje', project: 'Spartana HQ',
      description: 'Estabelecer a infraestrutura de dados para gestão de leads e projetos.',
      objectives: 'Centralizar informações e garantir persistência via Supabase.',
      steps: '1. Criar tabelas no Supabase\n2. Vincular API ao Dashboard\n3. Testar CRUD de tarefas',
      outcome: 'Dashboard 100% funcional com dados reais.',
      questions: 'Como lidar com o limite de 100 tools do Antigravity?'
    },
    { 
      id: '004', title: 'Métricas Essenciais (Pixel/Tags)', priority: 'CRÍTICA', resp: 'Ícaro', status: 'todo', category: 'agency', date: 'Hoje', project: 'Cliente: Estética VIP',
      description: 'Definir e configurar tracking básico nos ativos digitais para mensurar tráfego e conversão.',
      objectives: 'Assegurar captação precisa de dados para otimização de campanhas.',
      steps: '1. Acessar Meta Ads e GA4\n2. Levantar IDs\n3. Instalar via GTM\n4. Validar disparos',
      outcome: 'Eventos de conversão aparecendo no DebugView.',
      questions: ''
    },
    { 
      id: 'F01', title: 'Mapeamento de Dívidas', priority: 'CRÍTICA', resp: 'Midas', status: 'in_progress', category: 'personal', date: 'Hoje', project: 'Financeiro Will',
      description: 'Análise detalhada de todo o passivo financeiro atual.',
      objectives: 'Identificar as maiores taxas de juros e criar plano de estancamento.',
      steps: '1. Listar todos os bancos\n2. Pegar extratos de 3 meses\n3. Calcular Custo Efetivo Total (CET)',
      outcome: 'Planilha de guerra financeira atualizada.',
      questions: ''
    }
  ]);

  const modes = {
    agency: {
      label: 'PROFISSIONAL',
      icon: Briefcase,
      color: 'text-purple-400',
      tabs: [
        { id: 'dashboard', label: 'Overview', icon: Activity },
        { id: 'kanban', label: 'CRM / Kanban', icon: FolderKanban },
        { id: 'projects', label: 'Projetos Ativos', icon: Target },
        { id: 'billing', label: 'Faturamento', icon: Wallet },
      ]
    },
    personal: {
      label: 'PESSOAL',
      icon: User,
      color: 'text-emerald-400',
      tabs: [
        { id: 'dashboard', label: 'Visão Geral', icon: Activity },
        { id: 'finance', label: 'Dívidas & Contas', icon: CreditCard },
        { id: 'goals', label: 'Metas de Vida', icon: TrendingUp },
        { id: 'habits', label: 'Hábitos HD', icon: Repeat },
      ]
    }
  };

  const handleSaveTask = (e) => {
    e.preventDefault();
    if (editingTask) {
      setTasks(tasks.map(t => t.id === editingTask.id ? { ...t, ...newTask } : t));
    } else {
      const prefix = activeMode === 'agency' ? '00' : 'F0';
      const id = `${prefix}${tasks.length + 1}`;
      setTasks([...tasks, { ...newTask, id, category: activeMode, date: 'Hoje' }]);
    }
    closeModal();
  };

  const handleDeleteTask = (id) => {
    if (window.confirm('Excluir esta missão permanentemente?')) {
      setTasks(tasks.filter(t => t.id !== id));
      if (selectedTask?.id === id) setShowDetails(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTask(null);
    setNewTask({ title: '', priority: 'Normal', resp: '', status: 'todo', description: '', objectives: '', steps: '', outcome: '', questions: '', project: 'Interno' });
  };

  return (
    <div className="min-h-screen bg-[#020202] text-zinc-300 font-sans flex overflow-hidden">
      
      {/* SIDEBAR HAMBURGER STYLE */}
      <aside className={`${isSidebarOpen ? 'w-72' : 'w-24'} bg-zinc-950 border-r border-zinc-900 transition-all duration-300 flex flex-col z-50`}>
        <div className="p-8 flex items-center justify-between">
          {isSidebarOpen ? (
            <div className="flex items-center gap-3">
              <img src="/logo_spartana.jpg" className="w-8 h-8 object-contain mix-blend-screen scale-150" alt="S" />
              <span className="font-black text-white tracking-tighter text-lg uppercase italic">Spartana</span>
            </div>
          ) : (
            <img src="/logo_spartana.jpg" className="w-8 h-8 mx-auto object-contain mix-blend-screen" alt="S" />
          )}
        </div>

        <div className="flex-1 overflow-y-auto px-4 space-y-10">
          {/* MODO PRINCIPAL (PROFISSIONAL / PESSOAL) */}
          <div className="space-y-2">
            <p className={`text-[10px] font-black text-zinc-700 uppercase tracking-[0.2em] mb-4 ${!isSidebarOpen && 'text-center'}`}>Ecossistema</p>
            <ModeBtn active={activeMode === 'agency'} onClick={() => {setActiveMode('agency'); setActiveTab('dashboard');}} icon={Briefcase} label="Profissional" open={isSidebarOpen} color="text-purple-500" />
            <ModeBtn active={activeMode === 'personal'} onClick={() => {setActiveMode('personal'); setActiveTab('dashboard');}} icon={User} label="Pessoal" open={isSidebarOpen} color="text-emerald-500" />
          </div>

          {/* SUB-CATEGORIAS DINÂMICAS */}
          <div className="space-y-2 pt-8 border-t border-zinc-900">
            <p className={`text-[10px] font-black text-zinc-700 uppercase tracking-[0.2em] mb-4 ${!isSidebarOpen && 'text-center'}`}>Gerenciamento</p>
            {modes[activeMode].tabs.map(tab => (
              <SidebarBtn key={tab.id} active={activeTab === tab.id} onClick={() => setActiveTab(tab.id)} icon={tab.icon} label={tab.label} open={isSidebarOpen} />
            ))}
          </div>
        </div>

        <div className="p-6">
           <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="w-full flex items-center justify-center p-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 transition-all">
             {isSidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
           </button>
        </div>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* HEADER HD */}
        <header className="h-24 border-b border-zinc-900 flex items-center justify-between px-10 bg-black/40 backdrop-blur-2xl z-40">
          <div>
            <div className="flex items-center gap-3 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em] mb-1">
              <span>{modes[activeMode].label}</span>
              <ArrowRight size={10} />
              <span className="text-zinc-300">{modes[activeMode].tabs.find(t => t.id === activeTab)?.label}</span>
            </div>
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">
              Performance <span className="text-zinc-700">HD</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 px-5 py-2.5 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
              <Database size={16} className="text-emerald-500" />
              <span className="text-[11px] font-black text-zinc-400 uppercase tracking-widest italic">Supabase Live</span>
            </div>
            <button onClick={() => setShowModal(true)} className="bg-white text-black px-8 py-3 rounded-2xl text-[12px] font-black uppercase tracking-widest flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              <Plus size={18} /> Nova Missão
            </button>
          </div>
        </header>

        {/* ÁREA DE TRABALHO */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          
          {activeTab === 'dashboard' || activeTab === 'kanban' ? (
            <div className="space-y-12 max-w-7xl">
              
              {/* Kanban Principal */}
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black uppercase tracking-[0.4em] text-zinc-600 flex items-center gap-3">
                    <FolderKanban size={18} /> Fluxo de Trabalho HD
                  </h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {kanbanColumns.map(col => (
                    <div key={col.id} className="space-y-6">
                      <div className="flex items-center justify-between px-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${col.color}`} />
                          <span className="text-[12px] font-black uppercase tracking-widest text-zinc-400">{col.title}</span>
                        </div>
                        <span className="text-[11px] font-mono text-zinc-700 bg-zinc-900/50 px-2 py-0.5 rounded-lg border border-zinc-800">
                          {currentTasks.filter(t => t.status === col.id).length}
                        </span>
                      </div>
                      
                      <div className="space-y-4 min-h-[600px] p-4 rounded-[2.5rem] bg-zinc-900/10 border border-zinc-900/50 border-dashed transition-colors hover:border-zinc-800">
                        {currentTasks.filter(t => t.status === col.id).map(task => (
                          <KanbanCard 
                            key={task.id} 
                            task={task} 
                            onClick={() => { setSelectedTask(task); setShowDetails(true); }}
                            onDelete={(e) => { e.stopPropagation(); handleDeleteTask(task.id); }}
                            onEdit={(e) => { e.stopPropagation(); setEditingTask(task); setNewTask({...task}); setShowModal(true); }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feed de Brainstorm */}
              <div className="space-y-6 pt-12 border-t border-zinc-900">
                <h3 className="text-sm font-black uppercase tracking-[0.4em] text-zinc-600 flex items-center gap-3">
                  <MessageSquare size={18} /> Brainstorm Feed HD
                </h3>
                <Card className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <FeedItem agent="ERIKA" text="Protocolo HD de tarefas ativado para zero retrabalho." color="bg-purple-500" />
                    <FeedItem agent="ÍCARO" text="Mapeamento de automações para 'Google Invisível' concluído." color="bg-blue-500" />
                  </div>
                </Card>
              </div>

            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full opacity-30 italic animate-pulse">
               <Zap size={64} className="mb-6 text-zinc-800" />
               <p className="uppercase tracking-[0.8em] text-sm">Módulo {activeTab} em Otimização</p>
            </div>
          )}

        </div>
      </main>

      {/* MODAL DE DETALHES HD (O TELAÃO QUE VOCÊ MANDOU NO PRINT) */}
      {showDetails && selectedTask && (
        <div className="fixed inset-0 bg-black/98 backdrop-blur-2xl z-[100] flex items-center justify-center p-6 lg:p-20" onClick={() => setShowDetails(false)}>
          <div className="w-full max-w-5xl bg-zinc-950 border border-zinc-800 rounded-[3rem] p-12 relative overflow-y-auto max-h-full custom-scrollbar shadow-[0_0_100px_rgba(0,0,0,1)]" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowDetails(false)} className="absolute top-10 right-10 text-zinc-600 hover:text-white transition-all"><X size={32} /></button>
            
            <div className="flex items-center gap-4 mb-4">
              <Badge variant={selectedTask.priority === 'CRÍTICA' ? 'critical' : selectedTask.priority === 'Alta' ? 'high' : 'default'}>{selectedTask.priority}</Badge>
              <span className="text-[12px] font-black text-zinc-700 tracking-[0.3em] uppercase italic">Protocolo #{selectedTask.id}</span>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-zinc-900 pb-10">
              <div>
                <h2 className="text-5xl font-black text-white uppercase italic tracking-tighter leading-tight mb-4">{selectedTask.title}</h2>
                <div className="flex items-center gap-6 text-zinc-500">
                   <div className="flex items-center gap-2"><Target size={16} /> <span className="text-[11px] font-bold uppercase tracking-widest">{selectedTask.project}</span></div>
                   <div className="flex items-center gap-2"><User size={16} /> <span className="text-[11px] font-bold uppercase tracking-widest">Resp: {selectedTask.resp}</span></div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="space-y-12">
                <DetailSection icon={Zap} title="Descrição / Visão Geral" content={selectedTask.description} color="text-yellow-500" />
                <DetailSection icon={Target} title="Objetivos (Entregáveis)" content={selectedTask.objectives} color="text-purple-500" />
                <DetailSection icon={CheckCircle2} title="Conclusão Esperada" content={selectedTask.outcome} color="text-emerald-500" />
              </div>
              <div className="space-y-12">
                <DetailSection icon={ListTodo} title="Plano de Execução" content={selectedTask.steps} isList color="text-blue-500" />
                <DetailSection icon={HelpCircle} title="Campo de Dúvidas / Notas" content={selectedTask.questions || "Aguardando input estratégico..."} color="text-zinc-600" />
              </div>
            </div>

            <div className="mt-20 pt-10 border-t border-zinc-900 flex justify-end gap-4">
               <button onClick={(e) => {setEditingTask(selectedTask); setNewTask({...selectedTask}); setShowModal(true);}} className="bg-zinc-800 hover:bg-zinc-100 hover:text-black text-white px-8 py-4 rounded-2xl text-[12px] font-black uppercase tracking-widest transition-all">Editar Missão</button>
               <button onClick={() => handleDeleteTask(selectedTask.id)} className="bg-red-950 text-red-400 border border-red-900/50 px-8 py-4 rounded-2xl text-[12px] font-black uppercase tracking-widest hover:bg-red-900 hover:text-white transition-all">Abortar</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE CRIAÇÃO / EDIÇÃO */}
      {showModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[110] flex items-center justify-center p-4">
          <Card className="w-full max-w-4xl p-10 bg-zinc-950 border-zinc-800 shadow-[0_0_100px_rgba(168,85,247,0.1)]">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-black uppercase italic tracking-tighter">{editingTask ? 'Refinar Missão' : 'Nova Missão'}</h2>
              <button onClick={closeModal} className="text-zinc-600 hover:text-white transition-all"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSaveTask} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <Input label="Título" value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})} required placeholder="Ex: Métricas GA4" />
                  <Input label="Projeto / Cliente" value={newTask.project} onChange={e => setNewTask({...newTask, project: e.target.value})} placeholder="Ex: Spartana HQ" />
                  <TextArea label="Descrição" value={newTask.description} onChange={e => setNewTask({...newTask, description: e.target.value})} rows={3} />
                  <TextArea label="Objetivos" value={newTask.objectives} onChange={e => setNewTask({...newTask, objectives: e.target.value})} rows={3} />
                </div>
                <div className="space-y-6">
                  <TextArea label="Passos (Como Fazer)" value={newTask.steps} onChange={e => setNewTask({...newTask, steps: e.target.value})} rows={3} />
                  <TextArea label="Resultado (Outcome)" value={newTask.outcome} onChange={e => setNewTask({...newTask, outcome: e.target.value})} rows={3} />
                  <TextArea label="Dúvidas / Clarificações" value={newTask.questions} onChange={e => setNewTask({...newTask, questions: e.target.value})} rows={3} />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-zinc-900">
                <Select label="Prioridade" value={newTask.priority} onChange={e => setNewTask({...newTask, priority: e.target.value})} options={['Normal', 'Alta', 'CRÍTICA']} />
                <Select label="Agente" value={newTask.resp} onChange={e => setNewTask({...newTask, resp: e.target.value})} options={activeMode === 'agency' ? ['Ícaro', 'Maya', 'Erika'] : ['Midas', 'Erika']} />
                <Select label="Status" value={newTask.status} onChange={e => setNewTask({...newTask, status: e.target.value})} options={[{v:'todo',l:'Backlog'},{v:'in_progress',l:'Execução'},{v:'done',l:'Finalizado'}]} />
              </div>
              <button type="submit" className="w-full bg-white text-black font-black py-5 rounded-2xl uppercase tracking-widest hover:scale-[1.02] transition-all shadow-xl">
                {editingTask ? 'Salvar Protocolo' : 'Lançar Missão'}
              </button>
            </form>
          </Card>
        </div>
      )}

    </div>
  );
};

// ——————————————————————————————————————————————————————————————————————————————————————
// SUB-COMPONENTES AUXILIARES
// ——————————————————————————————————————————————————————————————————————————————————————

const ModeBtn = ({ icon: Icon, label, active, onClick, open, color }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${active ? 'bg-zinc-900 border border-zinc-800 shadow-lg' : 'hover:bg-zinc-900/40'}`}>
    <Icon size={24} className={`${active ? color : 'text-zinc-700'}`} />
    {open && <span className={`text-[12px] font-black uppercase tracking-[0.2em] ${active ? 'text-white' : 'text-zinc-500'}`}>{label}</span>}
  </button>
);

const SidebarBtn = ({ icon: Icon, label, active, onClick, open }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all ${active ? 'bg-zinc-900/50 text-white border border-zinc-800/50' : 'text-zinc-600 hover:text-zinc-400 hover:bg-zinc-900/20'}`}>
    <Icon size={18} />
    {open && <span className="text-[11px] font-bold uppercase tracking-widest">{label}</span>}
  </button>
);

const KanbanCard = ({ task, onClick, onDelete, onEdit }) => (
  <div onClick={onClick} className="bg-zinc-900/80 border border-zinc-800 p-6 rounded-[1.8rem] hover:border-zinc-500 group relative cursor-pointer shadow-xl transition-all hover:scale-[1.02]">
    <div className="flex justify-between items-start mb-4">
      <Badge variant={task.priority === 'CRÍTICA' ? 'critical' : task.priority === 'Alta' ? 'high' : 'default'}>{task.priority}</Badge>
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={onEdit} className="p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-blue-400"><Edit2 size={14} /></button>
        <button onClick={onDelete} className="p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-red-500"><Trash2 size={14} /></button>
      </div>
    </div>
    <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-1 block">{task.project}</span>
    <h4 className="text-[15px] font-black text-zinc-100 group-hover:text-white leading-tight uppercase italic mb-6">{task.title}</h4>
    <div className="flex items-center justify-between pt-5 border-t border-zinc-800/50">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px] font-black text-zinc-500 uppercase">{task.resp[0]}</div>
        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">{task.resp}</span>
      </div>
      <ChevronRight size={16} className="text-zinc-800 group-hover:text-white" />
    </div>
  </div>
);

const DetailSection = ({ icon: Icon, title, content, isList = false, color = "text-zinc-500" }) => (
  <div className="space-y-6">
    <div className="flex items-center gap-3">
      {Icon && <Icon size={20} className={color} />}
      <h3 className="text-[12px] font-black uppercase tracking-[0.4em] text-zinc-600">{title}</h3>
    </div>
    {isList ? (
      <div className="space-y-4">
        {content.split('\n').map((item, i) => (
          <div key={i} className="flex gap-4 text-lg text-zinc-400 bg-zinc-900/20 p-5 rounded-2xl border border-zinc-900">
            <span className="text-zinc-700 font-black">{i+1}</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-xl text-zinc-300 leading-relaxed font-medium bg-zinc-900/10 p-6 rounded-3xl border border-zinc-900 italic">"{content}"</p>
    )}
  </div>
);

const FeedItem = ({ agent, text, color }) => (
  <div className="flex items-start gap-4">
    <div className={`mt-1.5 w-3 h-3 rounded-full ${color} shadow-[0_0_10px_rgba(168,85,247,0.5)]`} />
    <div>
      <span className="text-white text-[11px] font-black uppercase tracking-widest italic">{agent}</span>
      <p className="text-[13px] text-zinc-500 leading-relaxed mt-1">{text}</p>
    </div>
  </div>
);

const Input = ({ label, ...props }) => (
  <div className="space-y-3">
    <label className="text-[11px] font-black text-zinc-500 uppercase tracking-widest">{label}</label>
    <input className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-5 text-white focus:border-zinc-500 outline-none transition-all shadow-inner" {...props} />
  </div>
);

const TextArea = ({ label, ...props }) => (
  <div className="space-y-3">
    <label className="text-[11px] font-black text-zinc-500 uppercase tracking-widest">{label}</label>
    <textarea className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-5 text-white focus:border-zinc-500 outline-none transition-all resize-none shadow-inner" {...props} />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div className="space-y-3">
    <label className="text-[11px] font-black text-zinc-500 uppercase tracking-widest">{label}</label>
    <select className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-5 text-white outline-none appearance-none cursor-pointer" {...props}>
      {options.map(o => typeof o === 'string' ? <option key={o} value={o}>{o}</option> : <option key={o.v} value={o.v}>{o.l}</option>)}
    </select>
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
