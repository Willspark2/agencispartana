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
  MoreVertical,
  Calendar
} from 'lucide-react';

// ——————————————————————————————————————————————————————————————————————————————————————
// SHADCN-INSPIRED UI COMPONENTS (INLINED FOR COMPATIBILITY)
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
  <div className={`bg-zinc-900/40 border border-zinc-800/50 rounded-xl overflow-hidden backdrop-blur-sm transition-all hover:border-zinc-700 ${className}`}>
    {children}
  </div>
);

// ——————————————————————————————————————————————————————————————————————————————————————
// MAIN DASHBOARD COMPONENT
// ——————————————————————————————————————————————————————————————————————————————————————

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('agency');
  const [viewMode, setViewMode] = useState('kanban');
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', priority: 'Normal', resp: '' });

  const agencyTeam = [
    { name: 'Erika', role: 'Head de Performance', status: 'Gerenciando', color: 'text-purple-400' },
    { name: 'Ícaro', role: 'Architect / Ops', status: 'Pulse (15m)', color: 'text-blue-400' },
    { name: 'Maya', role: 'Copy / Social', status: 'Standby', color: 'text-pink-400' }
  ];

  const personalTeam = [
    { name: 'Midas', role: 'Financial Strategist', status: 'Ollama Pulse', color: 'text-yellow-400' },
    { name: 'Erika', role: 'Mentor de Vida', status: 'Atenta', color: 'text-purple-400' }
  ];

  const [tasks, setTasks] = useState([
    { id: '001', title: 'Configuração do CRM Digital', priority: 'Alta', resp: 'Ícaro', status: 'in_progress', category: 'agency', date: 'Hoje' },
    { id: '002', title: 'Definição de Oferta Irresistível', priority: 'Alta', resp: 'Erika', status: 'todo', category: 'agency', date: 'Amanhã' },
    { id: 'F01', title: 'Mapeamento de Dívidas vs Fluxo', priority: 'CRÍTICA', resp: 'Midas', status: 'in_progress', category: 'personal', date: 'Hoje' },
    { id: 'F02', title: 'Resumo "Pai Rico Pai Pobre"', priority: 'Média', resp: 'Midas', status: 'todo', category: 'personal', date: 'Próx. Semana' }
  ]);

  const currentTeam = activeTab === 'agency' ? agencyTeam : personalTeam;
  const currentTasks = tasks.filter(t => t.category === activeTab);
  
  const kanbanColumns = [
    { id: 'todo', title: 'Backlog', color: 'bg-zinc-500' },
    { id: 'in_progress', title: 'Em Execução', color: 'bg-blue-500' },
    { id: 'done', title: 'Finalizado', color: 'bg-emerald-500' }
  ];

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.title) return;
    const id = activeTab === 'agency' ? `00${tasks.length + 1}` : `F0${tasks.length + 1}`;
    const task = { 
      id,
      title: newTask.title,
      priority: newTask.priority,
      status: 'todo', 
      category: activeTab,
      resp: newTask.resp || (activeTab === 'agency' ? 'Erika' : 'Midas'),
      date: 'Hoje'
    };
    setTasks([...tasks, task]);
    setShowModal(false);
    setNewTask({ title: '', priority: 'Normal', resp: '' });
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 p-4 md:p-8 font-sans selection:bg-purple-500/30">
      
      {/* Supabase Indicator */}
      <div className="fixed top-4 right-4 flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 px-3 py-1.5 rounded-full backdrop-blur-md z-50">
        <Database size={12} className="text-emerald-500" />
        <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-tighter">Supabase: Online</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 relative flex items-center justify-center overflow-hidden">
            <TransparentImage
              src="/logo_spartana.jpg"
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tighter text-white uppercase flex items-center gap-2">
              Spartana <span className="text-zinc-700 font-thin">|</span> <span className="text-zinc-400">{activeTab === 'agency' ? 'OPERATIONS' : 'LIFE'}</span>
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-zinc-500 tracking-widest uppercase text-[8px] font-bold italic">Unidade de Performance Ativa</p>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 p-1 rounded-xl border border-zinc-800 flex gap-2">
          <button 
            onClick={() => setActiveTab('agency')}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-xs font-black transition-all ${activeTab === 'agency' ? 'bg-zinc-100 text-black' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <Briefcase size={14} /> AGÊNCIA
          </button>
          <button 
            onClick={() => setActiveTab('personal')}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-xs font-black transition-all ${activeTab === 'personal' ? 'bg-zinc-100 text-black' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <User size={14} /> PESSOAL
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Squad Ativo</h2>
              <Users size={14} className="text-zinc-600" />
            </div>
            <div className="space-y-4">
              {currentTeam.map((member) => (
                <div key={member.name} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-[10px] font-black border border-zinc-700 group-hover:border-purple-500 transition-all">
                      {member.name[0]}
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-zinc-200">{member.name}</h3>
                      <p className="text-[9px] text-zinc-600">{member.role}</p>
                    </div>
                  </div>
                  <span className={`text-[8px] font-black px-2 py-0.5 rounded-md bg-black/40 ${member.color}`}>●</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Brainstorm Feed</h2>
              <MessageSquare size={14} className="text-zinc-600" />
            </div>
            <div className="space-y-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              <FeedItem agent="Erika" color="bg-purple-500" text='Plano "Google Invisível" aprovado.' />
              <FeedItem agent="Midas" color="bg-yellow-500" text="LTV projetado em R$ 6.2k." />
              <FeedItem agent="Maya" color="bg-pink-500" text="Copy de medo finalizada." />
            </div>
          </Card>
        </div>

        {/* Kanban / CRM (SHADCN DESIGN) */}
        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Target size={18} className="text-zinc-500" />
                <h2 className="text-sm font-black uppercase tracking-widest text-zinc-200">
                  CRM {activeTab === 'agency' ? 'Vendas' : 'Vida'}
                </h2>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-0.5 flex gap-1">
                <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-600'}`}><Activity size={14} /></button>
                <button onClick={() => setViewMode('kanban')} className={`p-1.5 rounded-md transition-all ${viewMode === 'kanban' ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-600'}`}><Layout size={14} /></button>
              </div>
            </div>
            <button 
              onClick={() => setShowModal(true)}
              className="text-[10px] bg-zinc-100 text-black font-black px-5 py-2 rounded-lg hover:bg-white transition-all uppercase tracking-widest flex items-center gap-2"
            >
              <Plus size={14} /> Missão
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {kanbanColumns.map(col => (
              <div key={col.id} className="space-y-4">
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${col.color}`} />
                    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-zinc-500">{col.title}</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-700">{currentTasks.filter(t => t.status === col.id).length}</span>
                </div>
                
                <div className="space-y-3 min-h-[400px] p-2 rounded-2xl bg-zinc-900/20 border border-dashed border-zinc-800/50">
                  {currentTasks.filter(t => t.status === col.id).map(task => (
                    <ShadcnCard key={task.id} task={task} />
                  ))}
                  {currentTasks.filter(t => t.status === col.id).length === 0 && (
                    <div className="flex flex-col items-center justify-center h-32 opacity-20 italic text-[10px]">Vazio</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MiniStat label="Conversão" val="12%" icon={Activity} />
        <MiniStat label="PIX Week" val="R$ 0,00" icon={Wallet} color="text-emerald-500" />
        <MiniStat label="Tokens" val="Ollama" icon={Database} />
        <MiniStat label="Squad Status" val="Pronto" icon={Users} color="text-purple-500" />
      </div>

      {/* Modal Nova Atividade (Shadcn-like) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <Card className="w-full max-w-md p-8 border-zinc-700 bg-zinc-950 shadow-[0_0_50px_rgba(0,0,0,1)]">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-black uppercase italic tracking-tighter">Nova Missão</h2>
              <button onClick={() => setShowModal(false)} className="text-zinc-600 hover:text-white"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleAddTask} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Descrição</label>
                <input 
                  autoFocus required
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white focus:ring-1 focus:ring-zinc-600 outline-none transition-all"
                  placeholder="Defina o objetivo..."
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Prioridade</label>
                  <select 
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white outline-none appearance-none"
                    value={newTask.priority}
                    onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                  >
                    <option>Normal</option>
                    <option>Alta</option>
                    <option>CRÍTICA</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Agente</label>
                  <select 
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white outline-none appearance-none"
                    value={newTask.resp}
                    onChange={(e) => setNewTask({...newTask, resp: e.target.value})}
                  >
                    <option value="">Designar</option>
                    {activeTab === 'agency' ? (
                      <><option>Ícaro</option><option>Maya</option><option>Erika</option></>
                    ) : (
                      <><option>Midas</option><option>Erika</option></>
                    )}
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full bg-zinc-100 text-black font-black py-4 rounded-lg uppercase tracking-widest hover:bg-white transition-all shadow-xl">
                Deploy Missão
              </button>
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

const ShadcnCard = ({ task }) => (
  <Card className="p-4 border-zinc-800/80 bg-zinc-900/60 hover:border-zinc-500 group shadow-lg">
    <div className="flex justify-between items-start mb-3">
      <Badge variant={task.priority === 'CRÍTICA' ? 'critical' : task.priority === 'Alta' ? 'high' : 'default'}>
        {task.priority}
      </Badge>
      <span className="text-[8px] font-mono text-zinc-700 tracking-tighter">#{task.id}</span>
    </div>
    <h4 className="text-[12px] font-bold text-zinc-200 group-hover:text-white transition-colors leading-tight mb-4">{task.title}</h4>
    <div className="flex items-center justify-between pt-4 border-t border-zinc-800/50">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[8px] font-black text-zinc-500 uppercase italic">
          {task.resp[0]}
        </div>
        <span className="text-[9px] font-bold text-zinc-600 tracking-tighter uppercase">{task.resp}</span>
      </div>
      <div className="flex items-center gap-1 opacity-40">
        <Calendar size={10} />
        <span className="text-[8px]">{task.date}</span>
      </div>
    </div>
  </Card>
);

const FeedItem = ({ agent, text, color }) => (
  <div className="relative pl-6 pb-6 border-l border-zinc-800 last:pb-0">
    <div className={`absolute left-[-4.5px] top-0 w-2 h-2 rounded-full ${color}`} />
    <div className="flex flex-col">
      <span className="text-white text-[9px] font-black uppercase tracking-tighter italic mb-1">{agent}</span>
      <p className="text-[10px] text-zinc-500 leading-tight bg-zinc-900/30 p-2 rounded-lg border border-zinc-800/50">{text}</p>
    </div>
  </div>
);

const MiniStat = ({ label, val, icon: Icon, color = "text-white" }) => (
  <div className="bg-zinc-900/30 border border-zinc-800/50 p-4 rounded-xl flex items-center gap-4 group hover:bg-zinc-900 transition-all">
    <div className="p-2 bg-black/40 rounded-lg border border-zinc-800 group-hover:border-zinc-700">
      <Icon size={14} className="text-zinc-500" />
    </div>
    <div>
      <span className={`text-sm font-black block uppercase italic ${color}`}>{val}</span>
      <span className="text-[8px] text-zinc-600 font-bold uppercase tracking-widest">{label}</span>
    </div>
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
  return <img src={imgSrc} alt={alt} className={className} style={{ ...style, mixBlendMode: 'screen', transform: 'scale(1.5)' }} />;
};

export default Dashboard;
