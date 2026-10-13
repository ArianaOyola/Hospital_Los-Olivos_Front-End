
import { useEffect, useState } from 'react';
import { LoginView } from './views/LoginView';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './views/DashboardView';
import { RegistrarVisitaView } from './views/RegistrarVisitaView';
import { HistorialVisitasView } from './views/HistorialVisitasView';
import { UsuariosView } from './views/UsuariosView';
import { ReportesView } from './views/ReportesView';
import { AnalisisView } from './views/AnalisisView';
import { ConfiguracionView } from './views/ConfiguracionView';
import { apiFetch } from './services/api';

interface UsuarioSesion {
  id: number;
  full_name: string;
  email: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => Boolean(localStorage.getItem('access_token'))
  );

  const [currentView, setCurrentView] = useState('dashboard');
  const [currentUser, setCurrentUser] = useState<UsuarioSesion | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(
    () => Boolean(localStorage.getItem('access_token'))
  );
  const [sessionError, setSessionError] = useState('');

  // Consulta al backend los datos del usuario autenticado.
  useEffect(() => {
    if (!isAuthenticated) {
      setCurrentUser(null);
      setIsLoadingUser(false);
      return;
    }

    let cancelled = false;

    const loadCurrentUser = async () => {
      setIsLoadingUser(true);
      setSessionError('');

      try {
        const user = await apiFetch<UsuarioSesion>('/users/me');

        if (!cancelled) {
          setCurrentUser(user);
        }
      } catch {
        if (!cancelled) {
          localStorage.removeItem('access_token');
          setCurrentUser(null);
          setIsAuthenticated(false);
          setSessionError(
            'Tu sesión no es válida o ha expirado. Inicia sesión nuevamente.'
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoadingUser(false);
        }
      }
    };

    void loadCurrentUser();

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setCurrentUser(null);
    setIsAuthenticated(false);
    setIsLoadingUser(false);
    setSessionError('');
    setCurrentView('dashboard');
  };

  const handleLogin = () => {
    setSessionError('');
    setIsLoadingUser(true);
    setIsAuthenticated(true);
    setCurrentView('dashboard');
  };

  if (!isAuthenticated) {
    return (
      <>
        {sessionError && (
          <p className="p-3 text-center text-sm text-red-600">
            {sessionError}
          </p>
        )}
        <LoginView onLogin={handleLogin} />
      </>
    );
  }

  if (isLoadingUser || !currentUser) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8faf9]">
        <p className="text-[#64748b]">
          Verificando sesión...
        </p>
      </div>
    );
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
  return (
    <DashboardView
      onNavigate={setCurrentView}
      user={currentUser}
    />
  );
      case 'registrar':
  return <RegistrarVisitaView user={currentUser} />;

      case 'historial':
  return <HistorialVisitasView user={currentUser} />;
      case 'usuarios':
        return <UsuariosView />;

      case 'reportes':
  return <ReportesView user={currentUser} />;

      case 'analisis':
  return <AnalisisView user={currentUser} />;

      case 'configuracion':
        return <ConfiguracionView />;

      default:
        return (
          <div className="flex h-full items-center justify-center rounded-2xl border-2 border-dashed border-[#e2e8f0]">
            <h2 className="text-xl font-bold text-[#94a3b8]">
              🛠️ Pantalla en construcción...
            </h2>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8faf9]">
      <Sidebar
        currentView={currentView}
        onNavigate={setCurrentView}
        onLogout={handleLogout}
        user={currentUser}
      />

      <main className="flex-1 overflow-y-auto p-8">
        {renderView()}
      </main>
    </div>
  );
}

export default App;
