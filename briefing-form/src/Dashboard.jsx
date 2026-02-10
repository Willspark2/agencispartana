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
  X
} from 'lucide-react';

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

  // Initialize tasks state with dummy data
  const [tasks, setTasks] = useState([
    { id: '001', title: 'Configuração do CRM Digital', priority: 'Alta', resp: 'Ícaro', status: 'in_progress', category: 'agency' },
    { id: '002', title: 'Definição de Oferta Irresistível', priority: 'Alta', resp: 'Erika', status: 'todo', category: 'agency' },
    { id: 'F01', title: 'Mapeamento de Dívidas vs Fluxo', priority: 'CRÍTICA', resp: 'Midas', status: 'in_progress', category: 'personal' },
    { id: 'F02', title: 'Resumo "Pai Rico Pai Pobre"', priority: 'Média', resp: 'Midas', status: 'todo', category: 'personal' }
  ]);

  const currentTeam = activeTab === 'agency' ? agencyTeam : personalTeam;
  const currentTasks = tasks.filter(t => t.category === activeTab);
  
  const kanbanColumns = [
    { id: 'todo', title: 'A Fazer', color: 'border-zinc-700' },
    { id: 'in_progress', title: 'Em Progresso', color: 'border-blue-500' },
    { id: 'done', title: 'Concluído', color: 'border-green-500' }
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
      resp: newTask.resp || (activeTab === 'agency' ? 'Erika' : 'Midas')
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
        <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-tighter">Supabase: Local Mode</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 relative">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 relative flex items-center justify-center overflow-hidden group">
            <div className="absolute inset-0 bg-yellow-500/5 blur-2xl group-hover:bg-yellow-500/10 transition-all rounded-full" />
            <TransparentImage
              src="/logo_spartana.jpg"
              alt="Logo"
              className="w-full h-full object-contain relative z-10"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tighter text-white uppercase italic">
              Spartana <span className="text-zinc-600 font-light not-italic">/</span> {activeTab === 'agency' ? 'Ops' : 'Life'}
            </h1>
            <p className="text-zinc-500 mt-1 tracking-[0.2em] uppercase text-[9px] font-medium">QG de Inteligência & Performance</p>
          </div>
        </div>

        <div className="bg-zinc-900/50 p-1.5 rounded-2xl border border-zinc-800 flex gap-2 backdrop-blur-md">
          <button 
            onClick={() => setActiveTab('agency')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black transition-all ${activeTab === 'agency' ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'text-zinc-500 hover:text-white'}`}
          >
            <Briefcase size={14} /> AGÊNCIA
          </button>
          <button 
            onClick={() => setActiveTab('personal')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black transition-all ${activeTab === 'personal' ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'text-zinc-500 hover:text-white'}`}
          >
            <User size={14} /> PESSOAL
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-[2rem] p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-8 text-zinc-400 font-bold tracking-widest text-[10px] uppercase">
              <Users size={16} />
              <h2>Squad Ativo</h2>
            </div>
            <div className="space-y-4">
              {currentTeam.map((member) => (
                <div key={member.name} className="flex items-center justify-between p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/30 hover:border-zinc-700 transition-all group">
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">{member.name}</h3>
                    <p className="text-[10px] text-zinc-500 mt-0.5">{member.role}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-md bg-black/40 ${member.color}`}>● {member.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-[2rem] p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-8 text-zinc-400 font-bold tracking-widest text-[10px] uppercase">
              <MessageSquare size={16} />
              <h2>Brainstorm Live</h2>
            </div>
            <div className="space-y-6 max-h-[350px] overflow-y-auto pr-3 custom-scrollbar">
              <FeedItem time="01:25" agent="Erika" color="border-purple-500" text='Estratégia "Google Invisível" consolidada no QG.' />
              <FeedItem time="01:22" agent="Midas" color="border-yellow-500" text="Setup R$ 1.497 validado para ROI." />
              <FeedItem time="01:20" agent="Maya" color="border-pink-500" text="Copy de prospecção Ego-Focado pronta." />
              <FeedItem time="01:15" agent="Ícaro" color="border-blue-500" text="Pipeline de scraping Google Places ativo." />
            </div>
          </div>
        </div>

        {/* Kanban / CRM */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-zinc-900/20 border border-zinc-800/50 rounded-[2.5rem] p-8 backdrop-blur-md min-h-[600px] flex flex-col">
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 text-white font-black tracking-tight">
                  <Target size={22} className="text-purple-500" />
                  <h2 className="text-xl uppercase">CRM {activeTab === 'agency' ? 'Vendas' : 'Vida'}</h2>
                </div>
                <div className="bg-black/60 border border-zinc-800 rounded-xl p-1 flex gap-1">
                  <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-zinc-800 text-white shadow-inner' : 'text-zinc-600 hover:text-zinc-400'}`}><Activity size={16} /></button>
                  <button onClick={() => setViewMode('kanban')} className={`p-2 rounded-lg transition-all ${viewMode === 'kanban' ? 'bg-zinc-800 text-white shadow-inner' : 'text-zinc-600 hover:text-zinc-400'}`}><Layout size={16} /></button>
                </div>
              </div>
              <button 
                onClick={() => setShowModal(true)}
                className="text-[10px] bg-white text-black font-black px-6 py-3 rounded-xl hover:bg-zinc-200 transition-all uppercase tracking-[0.1em] flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <Plus size={16} /> Nova Atividade
              </button>
            </div>

            <div className="flex-1">
              {viewMode === 'kanban' ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
                  {kanbanColumns.map(col => (
                    <div key={col.id} className="bg-zinc-950/40 rounded-[2rem] border border-zinc-800/30 flex flex-col h-full overflow-hidden">
                      <div className={`p-5 border-t-4 ${col.color} bg-zinc-900/40 flex justify-between items-center`}>
                        <span className="text-[11px] font-black uppercase tracking-widest text-zinc-300">{col.title}</span>
                        <span className="bg-black/50 text-zinc-500 text-[10px] font-mono px-2.5 py-1 rounded-lg border border-zinc-800">
                          {currentTasks.filter(t => t.status === col.id).length}
                        </span>
                      </div>
                      <div className="p-4 space-y-4 flex-1 overflow-y-auto custom-scrollbar">
                        {currentTasks.filter(t => t.status === col.id).map(task => (
                          <KanbanCard key={task.id} task={task} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3 px-2">
                  {currentTasks.map(task => <ListCard key={task.id} task={task} />)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label={activeTab === 'agency' ? 'Projetos' : 'Educação'} val={activeTab === 'agency' ? '02' : '01'} icon={activeTab === 'agency' ? BarChart3 : BookOpen} />
        <StatCard label={activeTab === 'agency' ? 'Faturamento' : 'Patrimônio'} val="R$ 0,00" icon={activeTab === 'agency' ? Wallet : TrendingUp} color="text-emerald-500" />
        <StatCard label="Token Pulse" val="Ollama" icon={Activity} />
        <StatCard label="Status Operacional" val="Spartano" icon={Target} color="text-purple-500" />
      </div>

      {/* Modal Nova Atividade */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-[100] flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-[2.5rem] p-8 relative shadow-[0_0_50px_rgba(168,85,247,0.1)]">
            <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 text-zinc-500 hover:text-white"><X size={24} /></button>
            <h2 className="text-2xl font-black text-white mb-2 uppercase italic tracking-tighter">Nova Missão</h2>
            <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-8">Setor: {activeTab === 'agency' ? 'Agência Spartana' : 'Vida Pessoal'}</p>
            
            <form onSubmit={handleAddTask} className="space-y-6">
              <div>
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 block">Descrição da Tarefa</label>
                <input 
                  autoFocus
                  required
                  className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-4 text-sm text-white focus:border-purple-500 outline-none transition-all shadow-inner"
                  placeholder="Ex: Prospectar 10 leads de Clínicas"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 block">Prioridade</label>
                  <select 
                    className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-4 text-sm text-white outline-none appearance-none"
                    value={newTask.priority}
                    onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                  >
                    <option>Normal</option>
                    <option>Alta</option>
                    <option>CRÍTICA</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 block">Agente</label>
                  <select 
                    className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-4 text-sm text-white outline-none appearance-none"
                    value={newTask.resp}
                    onChange={(e) => setNewTask({...newTask, resp: e.target.value})}
                  >
                    <option value="">Auto-Designar</option>
                    {activeTab === 'agency' ? (
                      <>
                        <option>Ícaro</option>
                        <option>Maya</option>
                        <option>Erika</option>
                      </>
                    ) : (
                      <>
                        <option>Midas</option>
                        <option>Erika</option>
                      </>
                    )}
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full bg-white text-black font-black py-4 rounded-xl uppercase tracking-widest hover:bg-zinc-200 transition-all active:scale-95 shadow-xl">
                Lançar na Operação
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const FeedItem = ({ time, agent, text, color }) => (
  <div className={`border-l-4 ${color} pl-4 py-1.5 bg-zinc-900/20 rounded-r-xl transition-all hover:bg-zinc-900/40`}>
    <div className="flex justify-between items-center mb-1">
      <span className="text-white text-[10px] font-black uppercase tracking-tighter italic">{agent}</span>
      <span className="text-[8px] font-mono text-zinc-600">{time}</span>
    </div>
    <p className="text-[10px] text-zinc-400 leading-snug">{text}</p>
  </div>
);

const KanbanCard = ({ task }) => (
  <div className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-2xl hover:border-zinc-500 transition-all cursor-grab active:cursor-grabbing group shadow-lg">
    <div className="flex justify-between items-start mb-3">
      <span className={`text-[8px] font-black px-2 py-1 rounded-md uppercase ${task.priority === 'CRÍTICA' ? 'bg-red-950 text-red-400 border border-red-900/50' : 'bg-zinc-800 text-zinc-400'}`}>
        {task.priority}
      </span>
      <span className="text-[8px] font-mono text-zinc-600 tracking-tighter">#{task.id}</span>
    </div>
    <h4 className="text-[13px] font-bold text-white group-hover:text-purple-400 transition-colors leading-tight mb-4">{task.title}</h4>
    <div className="flex items-center justify-between pt-4 border-t border-zinc-800/50">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg bg-zinc-800 flex items-center justify-center text-[10px] font-black text-zinc-500 uppercase">
          {task.resp[0]}
        </div>
        <span className="text-[10px] font-bold text-zinc-500 tracking-tighter uppercase">{task.resp}</span>
      </div>
      <ChevronRight size={14} className="text-zinc-700 group-hover:text-white" />
    </div>
  </div>
);

const ListCard = ({ task }) => (
  <div className="group bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 flex items-center justify-between hover:bg-zinc-900 hover:border-zinc-600 transition-all cursor-pointer">
    <div className="flex items-center gap-6">
      <div className={`w-1.5 h-12 rounded-full ${task.priority === 'CRÍTICA' ? 'bg-red-500' : 'bg-zinc-800'}`} />
      <div>
        <span className="text-[9px] text-zinc-600 font-mono block mb-1 uppercase tracking-widest">Task ID: {task.id}</span>
        <h3 className="text-sm font-black text-white uppercase tracking-tight italic group-hover:text-purple-400 transition-all">{task.title}</h3>
        <div className="flex items-center gap-4 mt-2">
          <span className="text-[10px] text-zinc-500 font-bold flex items-center gap-1.5 uppercase"><Clock size={12} className="text-zinc-700" /> {task.status}</span>
          <span className="text-[10px] text-zinc-500 font-bold flex items-center gap-1.5 uppercase"><User size={12} className="text-zinc-700" /> {task.resp}</span>
        </div>
      </div>
    </div>
    <div className="bg-zinc-800/50 p-2 rounded-xl group-hover:bg-white group-hover:text-black transition-all">
      <ChevronRight size={20} />
    </div>
  </div>
);

const StatCard = ({ label, val, icon: Icon, color = "text-white" }) => (
  <div className="bg-zinc-900/20 border border-zinc-800/50 p-6 rounded-[2rem] hover:bg-zinc-900/40 transition-all flex flex-col justify-between group">
    <div className="flex justify-between items-start mb-4">
      <div className="bg-zinc-900 p-2 rounded-xl border border-zinc-800 group-hover:border-zinc-700 transition-all">
        <Icon size={18} className="text-zinc-500" />
      </div>
      <span className="text-[8px] text-zinc-600 font-black uppercase tracking-widest italic">Live Pulse</span>
    </div>
    <div>
      <span className={`text-2xl font-black block mb-1 uppercase italic ${color}`}>{val}</span>
      <span className="text-[9px] text-zinc-500 font-black uppercase tracking-[0.2em]">{label}</span>
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
  return <img src={imgSrc} alt={alt} className={className} style={{ ...style, mixBlendMode: 'screen', transform: 'scale(1.5)' }} />;
};

export default Dashboard;
