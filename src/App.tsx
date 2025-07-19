import React, { useState } from 'react';
import './index.css';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import TicketManagement from './components/TicketManagement';
import ClientManagement from './components/ClientManagement';
import TechnicianPanel from './components/TechnicianPanel';
import CalendarView from './components/CalendarView';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'tickets':
        return <TicketManagement />;
      case 'clients':
        return <ClientManagement />;
      case 'technicians':
        return <TechnicianPanel />;
      case 'calendar':
        return <CalendarView />;
      case 'settings':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Configurações</h2>
            <p className="text-gray-600">Página em desenvolvimento</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderCurrentPage()}
    </Layout>
  );
}

export default App;