import { Client, Ticket, Technician, Equipment, CalendarEvent } from '../types';

export const mockClients: Client[] = [
  {
    id: '1',
    name: 'TechCorp Solutions',
    email: 'contact@techcorp.com',
    phone: '(11) 3333-4444',
    address: 'Av. Paulista, 1000 - São Paulo, SP',
    contact: 'João Silva',
    units: [
      {
        id: '1',
        name: 'Matriz SP',
        address: 'Av. Paulista, 1000 - São Paulo, SP',
        clientId: '1',
        equipment: []
      }
    ]
  },
  {
    id: '2',
    name: 'Industrial ABC',
    email: 'manutencao@industrialabc.com',
    phone: '(11) 2222-3333',
    address: 'Rua Industrial, 500 - São Bernardo, SP',
    contact: 'Maria Santos',
    units: [
      {
        id: '2',
        name: 'Fábrica Principal',
        address: 'Rua Industrial, 500 - São Bernardo, SP',
        clientId: '2',
        equipment: []
      }
    ]
  }
];

export const mockEquipment: Equipment[] = [
  {
    id: '1',
    name: 'Compressor de Ar',
    model: 'CAR-2000',
    serialNumber: 'SN123456789',
    installDate: '2023-01-15',
    unitId: '1',
    status: 'active'
  },
  {
    id: '2',
    name: 'Bomba Hidráulica',
    model: 'BH-500',
    serialNumber: 'SN987654321',
    installDate: '2023-03-20',
    unitId: '2',
    status: 'maintenance'
  }
];

export const mockTechnicians: Technician[] = [
  {
    id: '1',
    name: 'Carlos Oliveira',
    email: 'carlos@techservice.com',
    phone: '(11) 99999-1111',
    skills: ['Elétrica', 'Hidráulica', 'Mecânica'],
    location: 'São Paulo, SP',
    isActive: true,
    assignedTickets: 3
  },
  {
    id: '2',
    name: 'Ana Costa',
    email: 'ana@techservice.com',
    phone: '(11) 99999-2222',
    skills: ['Refrigeração', 'Ar Condicionado'],
    location: 'São Paulo, SP',
    isActive: true,
    assignedTickets: 2
  },
  {
    id: '3',
    name: 'Roberto Silva',
    email: 'roberto@techservice.com',
    phone: '(11) 99999-3333',
    skills: ['Automação', 'PLC', 'Elétrica'],
    location: 'São Bernardo, SP',
    isActive: true,
    assignedTickets: 1
  }
];

export const mockTickets: Ticket[] = [
  {
    id: '1',
    title: 'Vazamento no Compressor',
    description: 'Compressor apresentando vazamento de óleo na base.',
    priority: 'high',
    status: 'in-progress',
    type: 'corrective',
    clientId: '1',
    clientName: 'TechCorp Solutions',
    equipmentId: '1',
    equipmentName: 'Compressor de Ar',
    technicianId: '1',
    technicianName: 'Carlos Oliveira',
    createdAt: '2024-01-15T08:30:00Z',
    updatedAt: '2024-01-15T10:15:00Z',
    dueDate: '2024-01-16T18:00:00Z',
    attachments: [],
    expenses: [],
    checkInTime: '2024-01-15T09:00:00Z',
    location: 'Av. Paulista, 1000 - São Paulo, SP'
  },
  {
    id: '2',
    title: 'Manutenção Preventiva - Bomba',
    description: 'Manutenção preventiva mensal da bomba hidráulica.',
    priority: 'medium',
    status: 'assigned',
    type: 'preventive',
    clientId: '2',
    clientName: 'Industrial ABC',
    equipmentId: '2',
    equipmentName: 'Bomba Hidráulica',
    technicianId: '2',
    technicianName: 'Ana Costa',
    createdAt: '2024-01-14T14:20:00Z',
    updatedAt: '2024-01-14T14:20:00Z',
    dueDate: '2024-01-17T16:00:00Z',
    attachments: [],
    expenses: []
  },
  {
    id: '3',
    title: 'Sistema Elétrico Instável',
    description: 'Quedas frequentes de energia no setor de produção.',
    priority: 'critical',
    status: 'open',
    type: 'corrective',
    clientId: '2',
    clientName: 'Industrial ABC',
    technicianId: '',
    technicianName: '',
    createdAt: '2024-01-15T16:45:00Z',
    updatedAt: '2024-01-15T16:45:00Z',
    dueDate: '2024-01-16T12:00:00Z',
    attachments: [],
    expenses: []
  }
];

export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Manutenção Compressor - TechCorp',
    date: '2024-01-16',
    time: '09:00',
    type: 'maintenance',
    technicianId: '1',
    ticketId: '1',
    description: 'Reparo do vazamento no compressor'
  },
  {
    id: '2',
    title: 'Manutenção Preventiva - Industrial ABC',
    date: '2024-01-17',
    time: '14:00',
    type: 'maintenance',
    technicianId: '2',
    ticketId: '2',
    description: 'Manutenção preventiva da bomba hidráulica'
  }
];