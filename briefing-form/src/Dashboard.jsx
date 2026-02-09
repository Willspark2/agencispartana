import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Target, 
  Activity, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  BarChart3,
  MessageSquare
} from 'lucide-react';

// Mock data integration - in a real app this would fetch agency/CRM.json
const initialTeam = [
  { name: 'Erika', role: 'Head de Performance', status: 'Online', color: 'text-green-400' },
  { name: 'Ícaro', role: 'Architect / Ops', status: 'Executando Tarefa 001', color: 'text-blue-400' },
  { name: 'Maya', role: 'Copy / Social', status: 'Offline', color: 'text-gray-500' }
];

const initialTasks = [
  { id: '001', title: 'Configuração do CRM Digital', priority: 'Alta', resp: 'Ícaro', status: 'Em Progresso' },
  { id: '002', title: 'Definição de Oferta Irresistível', priority: 'Alta', resp: 'Erika', status: 'Aguardando' }
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-black text-gray-100 p-8 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter text-white flex items-center gap-3">
            <span className="bg-white text-black px-2 py-1 rounded">🦁</span>
            AGÊNCIA SPARTANA
          </h1>
          <p className="text-gray-400 mt-2 tracking-widest uppercase text-xs">Unidade de Performance & Operações</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-lg">
            <span className="text-zinc-500 text-xs block uppercase">Status Global</span>
            <span className="text-green-400 font-mono text-sm">● OPERACIONAL</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Team Section */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-6 text-white font-semibold">
              <Users size={20} />
              <h2>EQUIPE ATIVA</h2>
            </div>
            <div className="space-y-4">
              {initialTeam.map((member) => (
                <div key={member.name} className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-zinc-800/50">
                  <div>
                    <h3 className="font-medium text-white">{member.name}</h3>
                    <p className="text-xs text-zinc-500">{member.role}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] font-mono ${member.color}`}>{member.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-6 text-white font-semibold">
              <Activity size={20} />
              <h2>CADÊNCIA (Live)</h2>
            </div>
            <div className="space-y-4 font-mono text-xs">
              <div className="border-l-2 border-green-500 pl-3 py-1">
                <span className="text-zinc-500">[20:14]</span> <span className="text-white">Ícaro:</span> Repositório HQ organizado.
              </div>
              <div className="border-l-2 border-blue-500 pl-3 py-1">
                <span className="text-zinc-500">[20:09]</span> <span className="text-white">Erika:</span> Estratégia de split de repositórios definida.
              </div>
              <div className="border-l-2 border-zinc-700 pl-3 py-1">
                <span className="text-zinc-500">[20:01]</span> <span className="text-white">Sistema:</span> CRM Inicializado.
              </div>
            </div>
          </div>
        </div>

        {/* Tasks Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm h-full">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2 text-white font-semibold">
                <Target size={20} />
                <h2>CRM DE PRIORIDADES</h2>
              </div>
              <button className="text-xs bg-white text-black font-bold px-3 py-1 rounded-full hover:bg-gray-200 transition-colors">
                + NOVA TAREFA
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-zinc-500 text-xs uppercase tracking-wider border-b border-zinc-800">
                    <th className="pb-4 font-medium">Tarefa</th>
                    <th className="pb-4 font-medium">Resp.</th>
                    <th className="pb-4 font-medium">Prioridade</th>
                    <th className="pb-4 font-medium">Status</th>
                    <th className="pb-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50">
                  {initialTasks.map((task) => (
                    <tr key={task.id} className="group hover:bg-zinc-800/30 transition-colors">
                      <td className="py-4">
                        <span className="text-zinc-600 text-[10px] block font-mono">#{task.id}</span>
                        <span className="text-sm font-medium text-white">{task.title}</span>
                      </td>
                      <td className="py-4 text-sm text-zinc-400">{task.resp}</td>
                      <td className="py-4">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-red-950 text-red-400 border border-red-900/50 uppercase font-bold">
                          {task.priority}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-1.5 text-xs text-zinc-300">
                          <Clock size={14} className="text-blue-400" />
                          {task.status}
                        </div>
                      </td>
                      <td className="py-4 text-right">
                        <ChevronRight size={18} className="text-zinc-600 group-hover:text-white transition-colors cursor-pointer" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

      {/* Footer / Stats */}
      <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Projetos Ativos', val: '02', icon: BarChart3 },
          { label: 'Contatos Cold', val: '00', icon: Users },
          { label: 'PIX Gerado (Week)', val: 'R$ 0,00', icon: CheckCircle2 },
          { label: 'Conversas Agentes', val: '42', icon: MessageSquare },
        ].map((stat) => (
          <div key={stat.label} className="bg-zinc-900/30 border border-zinc-800/50 p-4 rounded-xl">
            <div className="flex justify-between items-start mb-2">
              <stat.icon size={16} className="text-zinc-500" />
              <span className="text-[10px] text-zinc-600 font-mono">LIVE</span>
            </div>
            <span className="text-2xl font-bold text-white block">{stat.val}</span>
            <span className="text-xs text-zinc-500 uppercase tracking-tighter">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
