export interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'technician' | 'manager';
  avatar?: string;
  phone?: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  contact: string;
  units: Unit[];
}

export interface Unit {
  id: string;
  name: string;
  address: string;
  clientId: string;
  equipment: Equipment[];
}

export interface Equipment {
  id: string;
  name: string;
  model: string;
  serialNumber: string;
  installDate: string;
  unitId: string;
  status: 'active' | 'maintenance' | 'inactive';
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'assigned' | 'in-progress' | 'completed' | 'closed';
  type: 'corrective' | 'preventive';
  clientId: string;
  clientName: string;
  equipmentId?: string;
  equipmentName?: string;
  technicianId?: string;
  technicianName?: string;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  completedAt?: string;
  attachments: string[];
  expenses: Expense[];
  checkInTime?: string;
  checkOutTime?: string;
  location?: string;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: 'fuel' | 'parts' | 'food' | 'other';
  receipt?: string;
  date: string;
}

export interface Technician {
  id: string;
  name: string;
  email: string;
  phone: string;
  skills: string[];
  location?: string;
  isActive: boolean;
  assignedTickets: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'maintenance' | 'meeting' | 'training';
  technicianId?: string;
  ticketId?: string;
  description?: string;
}