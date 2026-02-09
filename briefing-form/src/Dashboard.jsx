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
  BookOpen
} from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('agency');

  const agencyTeam = [
    { name: 'Erika', role: 'Head de Performance', status: 'Gerenciando', color: 'text-purple-400' },
    { name: 'Ícaro', role: 'Architect / Ops', status: 'Pulse (15m)', color: 'text-blue-400' },
    { name: 'Maya', role: 'Copy / Social', status: 'Standby', color: 'text-pink-400' }
  ];

  const personalTeam = [
    { name: 'Midas', role: 'Financial Strategist', status: 'Analisando Livros', color: 'text-yellow-400' },
    { name: 'Erika', role: 'Mentor de Vida', status: 'Atenta', color: 'text-purple-400' }
  ];

  const agencyTasks = [
    { id: '001', title: 'Configuração do CRM Digital', priority: 'Alta', resp: 'Ícaro', status: 'Em Progresso' },
    { id: '002', title: 'Definição de Oferta Irresistível', priority: 'Alta', resp: 'Erika', status: 'Aguardando' }
  ];

  const personalTasks = [
    { id: 'F01', title: 'Mapeamento de Dívidas vs Fluxo', priority: 'CRÍTICA', resp: 'Midas', status: 'Analisando' },
    { id: 'F02', title: 'Resumo Estratégico: "Pai Rico Pai Pobre"', priority: 'Média', resp: 'Midas', status: 'Pendente' }
  ];

  const currentTeam = activeTab === 'agency' ? agencyTeam : personalTeam;
  const currentTasks = activeTab === 'agency' ? agencyTasks : personalTasks;

  return (
    <div className="min-h-screen bg-black text-gray-100 p-4 md:p-8 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-white flex items-center gap-3">
            <img src="/logo_spartana.jpg" alt="Logo" className="w-10 h-10 object-contain" />
            SPARTANA {activeTab === 'agency' ? 'OPERATIONS' : 'PERSONAL'}
          </h1>
          <p className="text-gray-400 mt-1 tracking-widest uppercase text-[10px]">Centro de Comando & Performance</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
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

          {/* Midas Special (Personal Only) */}
          {activeTab === 'personal' && (
            <div className="bg-gradient-to-br from-yellow-900/20 to-zinc-900 border border-yellow-900/30 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4 text-yellow-500 font-semibold text-sm">
                <TrendingUp size={18} />
                <h2>ESTRATÉGIA FINANCEIRA</h2>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                "O foco inicial é estancar a sangria. Midas está processando as bibliotecas de educação financeira para criar seu plano de guerra."
              </p>
              <div className="flex gap-2">
                <div className="flex-1 bg-black/40 p-2 rounded-lg border border-zinc-800">
                  <span className="text-[10px] text-zinc-500 block">Dívidas</span>
                  <span className="text-sm font-bold text-red-500">Mapeando</span>
                </div>
                <div className="flex-1 bg-black/40 p-2 rounded-lg border border-zinc-800">
                  <span className="text-[10px] text-zinc-500 block">Aportes</span>
                  <span className="text-sm font-bold text-green-500">Próx. Fase</span>
                </div>
              </div>
            </div>
          )}

          {/* Activity Log */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-6 text-white font-semibold">
              <Activity size={18} />
              <h2 className="text-sm uppercase tracking-wider">Cadência Live</h2>
            </div>
            <div className="space-y-4 font-mono text-[10px]">
              <div className="border-l-2 border-yellow-500 pl-3 py-1">
                <span className="text-zinc-500">[20:58]</span> <span className="text-white">Midas:</span> Inicializando módulo de gestão de dívidas.
              </div>
              <div className="border-l-2 border-purple-500 pl-3 py-1">
                <span className="text-zinc-500">[20:56]</span> <span className="text-white">Erika:</span> Nova aba 'Pessoal' integrada ao Dashboard.
              </div>
            </div>
          </div>
        </div>

        {/* Main Content (Tasks) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2 text-white font-semibold">
                <Target size={18} />
                <h2 className="text-sm uppercase tracking-wider">CRM de Prioridades</h2>
              </div>
              <button className="text-[10px] bg-white text-black font-bold px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors uppercase tracking-widest">
                + Nova Atividade
              </button>
            </div>

            <div className="space-y-3">
              {currentTasks.map((task) => (
                <div key={task.id} className="group bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center justify-between hover:border-zinc-600 transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className={`w-1 h-10 rounded-full ${task.priority === 'CRÍTICA' ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-zinc-700'}`} />
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
          </div>
        </div>

      </div>

      {/* Bottom Stats */}
      <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: activeTab === 'agency' ? 'Projetos Ativos' : 'Livros Processados', val: activeTab === 'agency' ? '02' : '00', icon: activeTab === 'agency' ? BarChart3 : BookOpen },
          { label: activeTab === 'agency' ? 'Leads' : 'Foco Atual', val: activeTab === 'agency' ? '00' : 'Sair do Vermelho', icon: Users },
          { label: activeTab === 'agency' ? 'PIX Semana' : 'Dívida Reduzida', val: 'R$ 0,00', icon: Wallet },
          { label: 'Saúde Operacional', val: '100%', icon: CheckCircle2 },
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

const CheckCircle2 = ({ size, className }) => <Activity size={size} className={className} />;

export default Dashboard;
