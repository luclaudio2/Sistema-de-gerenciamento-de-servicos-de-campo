import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  CheckCircle, 
  Camera, 
  FileText, 
  DollarSign,
  Navigation,
  Play,
  Square,
  User,
  Phone,
  Mail,
  Wrench,
  AlertTriangle
} from 'lucide-react';
import { mockTechnicians, mockTickets } from '../data/mockData';
import { Technician, Ticket } from '../types';

const TechnicianPanel: React.FC = () => {
  const [selectedTechnician, setSelectedTechnician] = useState<Technician>(mockTechnicians[0]);
  const [activeTab, setActiveTab] = useState<'assigned' | 'profile' | 'schedule'>('assigned');
  
  const technicianTickets = mockTickets.filter(ticket => 
    ticket.technicianId === selectedTechnician.id
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const AssignedTickets = () => (
    <div className="space-y-4">
      {technicianTickets.length > 0 ? (
        technicianTickets.map((ticket) => (
          <div key={ticket.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{ticket.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority === 'critical' ? 'Crítica' : 
                       ticket.priority === 'high' ? 'Alta' : 
                       ticket.priority === 'medium' ? 'Média' : 'Baixa'}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{ticket.description}</p>
                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <span>#{ticket.id}</span>
                    <span>{ticket.clientName}</span>
                    {ticket.equipmentName && <span>{ticket.equipmentName}</span>}
                  </div>
                </div>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(ticket.status)}`}>
                  {ticket.status === 'open' ? 'Aberto' : 
                   ticket.status === 'assigned' ? 'Atribuído' : 
                   ticket.status === 'in-progress' ? 'Em Andamento' : 
                   ticket.status === 'completed' ? 'Concluído' : 'Fechado'}
                </span>
              </div>
              
              {ticket.location && (
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <MapPin className="h-4 w-4 mr-2" />
                  {ticket.location}
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  Criado: {formatDate(ticket.createdAt)}
                </div>
                {ticket.dueDate && (
                  <div className="flex items-center text-sm text-gray-600">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Prazo: {formatDate(ticket.dueDate)}
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2">
                {ticket.status === 'assigned' && (
                  <button className="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    <Play className="h-4 w-4 mr-2" />
                    Iniciar Trabalho
                  </button>
                )}
                {ticket.status === 'in-progress' && (
                  <>
                    <button className="inline-flex items-center px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors duration-200">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Finalizar
                    </button>
                    <button className="inline-flex items-center px-3 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors duration-200">
                      <Square className="h-4 w-4 mr-2" />
                      Pausar
                    </button>
                  </>
                )}
                <button className="inline-flex items-center px-3 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors duration-200">
                  <Camera className="h-4 w-4 mr-2" />
                  Adicionar Foto
                </button>
                <button className="inline-flex items-center px-3 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 transition-colors duration-200">
                  <FileText className="h-4 w-4 mr-2" />
                  Relatório
                </button>
                <button className="inline-flex items-center px-3 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors duration-200">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Despesas
                </button>
                <button className="inline-flex items-center px-3 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200">
                  <Navigation className="h-4 w-4 mr-2" />
                  Navegar
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          <Wrench className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum chamado atribuído</h3>
          <p className="text-gray-600">Quando novos chamados forem atribuídos a você, eles aparecerão aqui.</p>
        </div>
      )}
    </div>
  );

  const TechnicianProfile = () => (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="h-20 w-20 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-white">
              {selectedTechnician.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{selectedTechnician.name}</h2>
            <p className="text-gray-600">Técnico de Campo</p>
            <div className="flex items-center mt-2">
              <div className={`h-3 w-3 rounded-full mr-2 ${selectedTechnician.isActive ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-sm text-gray-600">
                {selectedTechnician.isActive ? 'Ativo' : 'Inativo'}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Informações de Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-gray-900">{selectedTechnician.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-gray-900">{selectedTechnician.phone}</span>
              </div>
              {selectedTechnician.location && (
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-900">{selectedTechnician.location}</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Especialidades</h3>
            <div className="flex flex-wrap gap-2">
              {selectedTechnician.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{selectedTechnician.assignedTickets}</p>
              <p className="text-sm text-gray-600">Chamados Ativos</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">25</p>
              <p className="text-sm text-gray-600">Concluídos no Mês</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">95%</p>
              <p className="text-sm text-gray-600">Taxa de Sucesso</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const Schedule = () => (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Agenda da Semana</h3>
        <div className="space-y-4">
          <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Manutenção Compressor - TechCorp</h4>
                <p className="text-sm text-gray-600 mt-1">16/01/2024 - 09:00</p>
                <p className="text-sm text-gray-500">Av. Paulista, 1000 - São Paulo, SP</p>
              </div>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                Agendado
              </span>
            </div>
          </div>
          <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Manutenção Preventiva - Industrial ABC</h4>
                <p className="text-sm text-gray-600 mt-1">17/01/2024 - 14:00</p>
                <p className="text-sm text-gray-500">Rua Industrial, 500 - São Bernardo, SP</p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                Confirmado
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Painel do Técnico</h1>
          <p className="text-gray-600 mt-1">Gerencie suas atribuições e atividades</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <select
            value={selectedTechnician.id}
            onChange={(e) => {
              const tech = mockTechnicians.find(t => t.id === e.target.value);
              if (tech) setSelectedTechnician(tech);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {mockTechnicians.map(tech => (
              <option key={tech.id} value={tech.id}>{tech.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Wrench className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{selectedTechnician.assignedTickets}</p>
              <p className="text-sm text-gray-600">Chamados Ativos</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">2</p>
              <p className="text-sm text-gray-600">Em Andamento</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">8</p>
              <p className="text-sm text-gray-600">Concluídos</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-50 rounded-lg">
              <User className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">95%</p>
              <p className="text-sm text-gray-600">Performance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('assigned')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'assigned'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Chamados Atribuídos
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'schedule'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Agenda
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'profile'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Perfil
            </button>
          </nav>
        </div>
        <div className="p-6">
          {activeTab === 'assigned' && <AssignedTickets />}
          {activeTab === 'schedule' && <Schedule />}
          {activeTab === 'profile' && <TechnicianProfile />}
        </div>
      </div>
    </div>
  );
};

export default TechnicianPanel;