import { useState } from 'react';
import { LoginView } from './views/LoginView';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './views/DashboardView';
import { RegistrarVisitaView } from './views/RegistrarVisitaView';
import { HistorialVisitasView } from './views/HistorialVisitasView';
import { UsuariosView } from './views/UsuariosView';
import { ReportesView } from './views/ReportesView';
import { AnalisisView } from './views/AnalisisView';
import { ConfiguracionView } from './views/ConfiguracionView';

function App() {
  // ESTADO: Protege la aplicación. (Falso = No ha entrado / True = Ya entró)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // ESTADO: Controla qué pantalla se ve
  const [currentView, setCurrentView] = useState('dashboard');

  // Función para cerrar sesión y reiniciar la vista al dashboard
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('dashboard');
  };

  // Si NO está autenticado, retornamos ÚNICAMENTE la pantalla de Login
  if (!isAuthenticated) {
    return <LoginView onLogin={() => setIsAuthenticated(true)} />;
  }

  // Si YA está autenticado, renderizamos el sistema normal
  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView onNavigate={setCurrentView} />;
      case 'registrar':
        return <RegistrarVisitaView />;
      case 'historial':
        return <HistorialVisitasView />;
      case 'usuarios':
        return <UsuariosView />;
      case 'reportes':
        return <ReportesView />;
      case 'analisis':
        return <AnalisisView />;
      case 'configuracion':
        return <ConfiguracionView />;
      default:
        return (
          <div className="flex items-center justify-center h-full border-2 border-dashed border-[#e2e8f0] rounded-2xl">
            <h2 className="text-[#94a3b8] text-xl font-bold">🛠️ Pantalla en construcción...</h2>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8faf9]">
      {/* Le pasamos la orden "onLogout" a la barra lateral */}
      <Sidebar 
        currentView={currentView} 
        onNavigate={setCurrentView} 
        onLogout={handleLogout} 
      />
      <main className="flex-1 p-8 overflow-y-auto">
        {renderView()}
      </main>
    </div>
  )
}

export default App;