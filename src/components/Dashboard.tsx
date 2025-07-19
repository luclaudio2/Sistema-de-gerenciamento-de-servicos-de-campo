import React from 'react';
import { 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Users,
  Wrench,
  DollarSign,
  Calendar
} from 'lucide-react';
import { mockTickets, mockTechnicians } from '../data/mockData';

const Dashboard: React.FC = () => {
  const totalTickets = mockTickets.length;
  const openTickets = mockTickets.filter(t => t.status === 'open').length;
  const inProgressTickets = mockTickets.filter(t => t.status === 'in-progress').length;
  const completedTickets = mockTickets.filter(t => t.status === 'completed').length;
  const activeTechnicians = mockTechnicians.filter(t => t.isActive).length;

  const stats = [
    {
      name: 'Chamados Abertos',
      value: openTickets,
      change: '+2,5%',
      changeType: 'increase',
      icon: AlertTriangle,
      color: 'text-amber-600',
      bg: 'bg-amber-50'
    },
    {
      name: 'Em Andamento',
      value: inProgressTickets,
      change: '+12%',
      changeType: 'increase',
      icon: Clock,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      name: 'Concluídos no Mês',
      value: completedTickets,
      change: '+5,4%',
      changeType: 'increase',
      icon: CheckCircle,
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      name: 'Técnicos Ativos',
      value: activeTechnicians,
      change: '0%',
      changeType: 'neutral',
      icon: Users,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    }
  ];

  const recentTickets = mockTickets.slice(0, 5);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'assigned': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Painel de Controle</h1>
        <p className="text-gray-600 mt-1">Visão geral do sistema de manutenção</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bg}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className={`h-4 w-4 ${stat.changeType === 'increase' ? 'text-green-500' : 'text-gray-400'}`} />
                <span className={`ml-2 text-sm font-medium ${stat.changeType === 'increase' ? 'text-green-600' : 'text-gray-600'}`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">vs. mês anterior</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Tickets */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Chamados Recentes</h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Ver todos
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentTickets.map((ticket) => (
                <div key={ticket.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <Wrench className="h-5 w-5 text-gray-400" />
                      <div>
                        <h4 className="font-medium text-gray-900">{ticket.title}</h4>
                        <p className="text-sm text-gray-600">{ticket.clientName}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority === 'critical' ? 'Crítica' : 
                       ticket.priority === 'high' ? 'Alta' : 
                       ticket.priority === 'medium' ? 'Média' : 'Baixa'}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(ticket.status)}`}>
                      {ticket.status === 'open' ? 'Aberto' : 
                       ticket.status === 'assigned' ? 'Atribuído' : 
                       ticket.status === 'in-progress' ? 'Em Andamento' : 
                       ticket.status === 'completed' ? 'Concluído' : 'Fechado'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Ações Rápidas</h3>
          </div>
          <div className="p-6 space-y-4">
            <button className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
              <Wrench className="h-5 w-5 mr-2" />
              Novo Chamado
            </button>
            <button className="w-full flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
              <Users className="h-5 w-5 mr-2" />
              Adicionar Cliente
            </button>
            <button className="w-full flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200">
              <Calendar className="h-5 w-5 mr-2" />
              Agendar Manutenção
            </button>
            <button className="w-full flex items-center justify-center px-4 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors duration-200">
              <DollarSign className="h-5 w-5 mr-2" />
              Relatório Financeiro
            </button>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance dos Técnicos</h3>
          <div className="space-y-4">
            {mockTechnicians.map((tech) => (
              <div key={tech.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-white">
                      {tech.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{tech.name}</p>
                    <p className="text-sm text-gray-600">{tech.assignedTickets} chamados ativos</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">95%</p>
                  <p className="text-xs text-gray-500">Taxa de sucesso</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Indicadores de Performance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Tempo Médio de Resposta</p>
                <p className="text-sm text-gray-600">2.5 horas</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Tempo Médio de Resolução</p>
                <p className="text-sm text-gray-600">8.2 horas</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
            <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Cumprimento de SLA</p>
                <p className="text-sm text-gray-600">92%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-amber-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;