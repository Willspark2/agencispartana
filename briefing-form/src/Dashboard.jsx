import React, { useState } from 'react';
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
  Plus
} from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('agency');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'kanban'

  const agencyTeam = [
    { name: 'Erika', role: 'Head de Performance', status: 'Gerenciando', color: 'text-purple-400' },
    { name: 'Ícaro', role: 'Architect / Ops', status: 'Pulse (15m)', color: 'text-blue-400' },
    { name: 'Maya', role: 'Copy / Social', status: 'Standby', color: 'text-pink-400' }
  ];

  const personalTeam = [
    { name: 'Midas', role: 'Financial Strategist', status: 'Analisando Livros', color: 'text-yellow-400' },
    { name: 'Erika', role: 'Mentor de Vida', status: 'Atenta', color: 'text-purple-400' }
  ];

  const initialTasks = [
    { id: '001', title: 'Configuração do CRM Digital', priority: 'Alta', resp: 'Ícaro', status: 'in_progress' },
    { id: '002', title: 'Definição de Oferta Irresistível', priority: 'Alta', resp: 'Erika', status: 'todo' },
    { id: '003', title: 'Brainstorm: Prospecção Google', priority: 'CRÍTICA', resp: 'Erika', status: 'done' }
  ];

  const currentTeam = activeTab === 'agency' ? agencyTeam : personalTeam;
  
  const kanbanColumns = [
    { id: 'todo', title: 'A Fazer', color: 'border-zinc-700' },
    { id: 'in_progress', title: 'Em Progresso', color: 'border-blue-500' },
    { id: 'done', title: 'Concluído', color: 'border-green-500' }
  ];

  return (
    <div className="min-h-screen bg-black text-gray-100 p-4 md:p-8 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 relative flex items-center justify-center overflow-hidden">
            <TransparentImage
              src="/logo_spartana.jpg"
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tighter text-white">
              SPARTANA {activeTab === 'agency' ? 'OPERATIONS' : 'PERSONAL'}
            </h1>
            <p className="text-gray-400 mt-1 tracking-widest uppercase text-[10px]">Centro de Comando & Performance</p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="bg-zinc-900 p-1 rounded-xl border border-zinc-800 flex gap-1">
          <button
            onClick={() => setActiveTab('agency')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'agency' ? 'bg-white text-black shadow-lg' : 'text-zinc-500 hover:text-white'}`}
          >
            <Briefcase size={14} /> AGÊNCIA
          </button>
          <button
            onClick={() => setActiveTab('personal')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'personal' ? 'bg-white text-black shadow-lg' : 'text-zinc-500 hover:text-white'}`}
          >
            <User size={14} /> PESSOAL
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Team */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-6 text-white font-semibold">
              <Users size={18} />
              <h2 className="text-sm uppercase tracking-wider">Time Ativo</h2>
            </div>
            <div className="space-y-3">
              {currentTeam.map((member) => (
                <div key={member.name} className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/50">
                  <div>
                    <h3 className="text-sm font-medium text-white">{member.name}</h3>
                    <p className="text-[10px] text-zinc-500">{member.role}</p>
                  </div>
                  <span className={`text-[9px] font-mono px-2 py-1 rounded bg-black/50 ${member.color}`}>● {member.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Log (BRAINSTORM FEED) */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-6 text-white font-semibold">
              <MessageSquare size={18} />
              <h2 className="text-sm uppercase tracking-wider">Brainstorm Feed</h2>
            </div>
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              <div className="border-l-2 border-purple-500 pl-3 py-1">
                <span className="text-[9px] text-zinc-500 block">01:25</span>
                <span className="text-purple-400 text-[10px] font-bold">Erika:</span> Estratégia "Google Invisível" consolidada. Midas finalizou a precificação.
              </div>
              <div className="border-l-2 border-yellow-500 pl-3 py-1">
                <span className="text-[9px] text-zinc-500 block">01:22</span>
                <span className="text-yellow-400 text-[10px] font-bold">Midas:</span> Setup de R$ 1.497 é o ideal para o ROI do cliente.
              </div>
              <div className="border-l-2 border-pink-500 pl-3 py-1">
                <span className="text-[9px] text-zinc-500 block">01:20</span>
                <span className="text-pink-400 text-[10px] font-bold">Maya:</span> Script focado em ego "Tentei te indicar e não achei" pronto.
              </div>
              <div className="border-l-2 border-blue-500 pl-3 py-1">
                <span className="text-[9px] text-zinc-500 block">01:15</span>
                <span className="text-blue-400 text-[10px] font-bold">Ícaro:</span> Automação de extração de leads sem site via Google Places validada.
              </div>
            </div>
          </div>
        </div>

        {/* Main Content (CRM KANBAN) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <Target size={18} />
                  <h2 className="text-sm uppercase tracking-wider">CRM de Prioridades</h2>
                </div>
                {/* View Switcher */}
                <div className="bg-black/40 border border-zinc-800 rounded-lg p-1 flex gap-1">
                  <button onClick={() => setViewMode('list')} className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-zinc-800 text-white' : 'text-zinc-600'}`}><Activity size={14} /></button>
                  <button onClick={() => setViewMode('kanban')} className={`p-1.5 rounded ${viewMode === 'kanban' ? 'bg-zinc-800 text-white' : 'text-zinc-600'}`}><Layout size={14} /></button>
                </div>
              </div>
              <button className="text-[10px] bg-white text-black font-bold px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors uppercase tracking-widest flex items-center gap-2">
                <Plus size={14} /> Nova Atividade
              </button>
            </div>

            {viewMode === 'kanban' ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[500px]">
                {kanbanColumns.map(col => (
                  <div key={col.id} className="bg-black/20 rounded-xl border border-zinc-800/50 flex flex-col h-full">
                    <div className={`p-3 border-t-2 ${col.color} bg-zinc-900/50 rounded-t-xl flex justify-between items-center`}>
                      <span className="text-[10px] font-bold uppercase tracking-widest">{col.title}</span>
                      <span className="bg-zinc-800 text-zinc-400 text-[10px] px-2 py-0.5 rounded-full">
                        {initialTasks.filter(t => t.status === col.id).length}
                      </span>
                    </div>
                    <div className="p-3 space-y-3 flex-1 overflow-y-auto">
                      {initialTasks.filter(t => t.status === col.id).map(task => (
                        <div key={task.id} className="bg-zinc-900 border border-zinc-800 p-3 rounded-lg hover:border-zinc-600 transition-all cursor-grab active:cursor-grabbing group">
                          <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded mb-2 inline-block ${task.priority === 'CRÍTICA' ? 'bg-red-950 text-red-400' : 'bg-zinc-800 text-zinc-400'}`}>
                            {task.priority}
                          </span>
                          <h4 className="text-xs font-medium text-white group-hover:text-blue-400 transition-colors">{task.title}</h4>
                          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-zinc-800/50">
                            <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center text-[8px] font-bold text-zinc-500">
                              {task.resp[0]}
                            </div>
                            <span className="text-[9px] text-zinc-500">{task.resp}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {initialTasks.map((task) => (
                  <div key={task.id} className="group bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center justify-between hover:border-zinc-600 transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className={`w-1 h-10 rounded-full ${task.priority === 'CRÍTICA' ? 'bg-red-500' : 'bg-zinc-700'}`} />
                      <div>
                        <span className="text-[10px] text-zinc-600 font-mono block">#{task.id}</span>
                        <h3 className="text-sm font-medium text-white">{task.title}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[9px] text-zinc-500 flex items-center gap-1 uppercase"><Clock size={10} /> {task.status}</span>
                          <span className="text-[9px] text-zinc-500 flex items-center gap-1 uppercase"><User size={10} /> {task.resp}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-zinc-700 group-hover:text-white transition-all" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Bottom Stats */}
      <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: activeTab === 'agency' ? 'Projetos Ativos' : 'Livros Processados', val: activeTab === 'agency' ? '02' : '00', icon: activeTab === 'agency' ? BarChart3 : BookOpen },
          { label: activeTab === 'agency' ? 'Leads' : 'Foco Atual', val: activeTab === 'agency' ? '00' : 'Sair do Vermelho', icon: Users },
          { label: activeTab === 'agency' ? 'PIX Semana' : 'Dívida Reduzida', val: 'R$ 0,00', icon: Wallet },
          { label: 'Saúde Operacional', val: '100%', icon: Activity },
        ].map((stat) => (
          <div key={stat.label} className="bg-zinc-900/30 border border-zinc-800/50 p-4 rounded-xl">
            <stat.icon size={14} className="text-zinc-500 mb-2" />
            <span className="text-lg font-bold text-white block leading-none mb-1">{stat.val}</span>
            <span className="text-[9px] text-zinc-500 uppercase tracking-tighter">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const TransparentImage = ({ src, alt, className, style }) => {
  const [imgSrc, setImgSrc] = useState(src);

  React.useEffect(() => {
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
        const r = data[i], g = data[i + 1], b = data[i + 2];
        if (r > 200 && g > 200 && b > 200) data[i + 3] = 0;
      }
      ctx.putImageData(imgData, 0, 0);
      setImgSrc(canvas.toDataURL());
    };
  }, [src]);

  return <img src={imgSrc} alt={alt} className={className} style={{ ...style, mixBlendMode: 'screen', transform: 'scale(1.5)' }} />;
};

export default Dashboard;
