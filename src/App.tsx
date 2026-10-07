import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './views/DashboardView';
import { RegistrarVisitaView } from './views/RegistrarVisitaView';
import { HistorialVisitasView } from './views/HistorialVisitasView';
import { UsuariosView } from './views/UsuariosView';
import { ReportesView } from './views/ReportesView';
import { AnalisisView } from './views/AnalisisView';
import { ConfiguracionView } from './views/ConfiguracionView';

function App() {
  // Estado para controlar qué pantalla estamos viendo
  const [currentView, setCurrentView] = useState('dashboard');

  // Función que decide qué mostrar en la derecha dependiendo del botón seleccionado
  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView />;
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
          <div className="flex items-center justify-center h-full border-2 border-dashed border-[#ececf4] rounded-2xl">
            <h2 className="text-[#8b889c] text-xl font-bold">🛠️ Pantalla en construcción...</h2>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#f4f5fb]">
      <Sidebar currentView={currentView} onNavigate={setCurrentView} />
      <main className="flex-1 p-8 overflow-y-auto">
        {renderView()}
      </main>
    </div>
  )
}

export default App;