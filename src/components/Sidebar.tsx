
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut,
  UserPlus,
  History,
  BarChart3,
  HelpCircle,
  UserRound,
} from 'lucide-react';
import logo from '../assets/logo.png';

interface UsuarioSesion {
  id: number;
  full_name: string;
  email: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
  user: UsuarioSesion;
}

const nombresRoles: Record<string, string> = {
  admin: 'Administrador',
  recepcionista: 'Recepcionista',
  medico: 'Médico',
  enfermero: 'Enfermero/a',
  archivo: 'Personal de archivo',
};

export function Sidebar({
  currentView,
  onNavigate,
  onLogout,
  user,
}: SidebarProps) {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      color: 'text-[#22b573]',
    },
    {
      id: 'registrar',
      label: 'Registrar Visita',
      icon: UserPlus,
      color: 'text-[#3b82f6]',
    },
    {
      id: 'historial',
      label: 'Historial',
      icon: History,
      color: 'text-[#8b5cf6]',
    },
    {
      id: 'usuarios',
      label: 'Usuarios',
      icon: Users,
      color: 'text-[#f59e0b]',
    },
    {
      id: 'reportes',
      label: 'Reportes',
      icon: FileText,
      color: 'text-[#0ea5e9]',
    },
    {
      id: 'analisis',
      label: 'Análisis y Predicción',
      icon: BarChart3,
      color: 'text-[#e11d48]',
    },
    {
      id: 'configuracion',
      label: 'Configuración',
      icon: Settings,
      color: 'text-[#64748b]',
    },
  ];

  const nombreRol = nombresRoles[user.role] ?? user.role;

  const iniciales = user.full_name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join('')
    .toUpperCase();

  return (
    <aside className="w-64 bg-white border-r border-[#e2e8f0] flex flex-col justify-between h-full shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10">
      <div>
        <div className="h-20 flex items-center gap-3 px-6 border-b border-[#e2e8f0]">
          <img
            src={logo}
            alt="Logo Hospital Los Olivos"
            className="w-10 h-10 object-contain drop-shadow-sm"
          />

          <div className="flex flex-col">
            <span className="text-[18px] font-extrabold text-[#1e293b] tracking-tight leading-none">
              Los Olivos
            </span>
            <span className="text-[11px] font-bold text-[#22b573] tracking-widest uppercase mt-1">
              Hospital
            </span>
          </div>
        </div>

        <nav className="p-4 flex flex-col gap-1.5">
          <span className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-wider mb-2 px-3 mt-2">
            Menú Principal
          </span>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-bold transition-all relative overflow-hidden group ${
                  isActive
                    ? 'text-[#059669] bg-[#ecfdf5]'
                    : 'text-[#64748b] hover:bg-[#f8faf9] hover:text-[#1e293b]'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-1.5 bottom-1.5 w-1.5 bg-[#22b573] rounded-r-md" />
                )}

                <Icon
                  size={20}
                  className={`${isActive ? 'text-[#059669]' : item.color} transition-colors`}
                />

                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-[#e2e8f0] bg-white">
        {/* Datos reales del usuario autenticado */}
        <div className="flex items-center gap-3 px-3 py-3 mb-2 rounded-xl bg-[#f8faf9] border border-[#e2e8f0]">
          <div className="w-10 h-10 shrink-0 rounded-full bg-[#dcfce7] text-[#15803d] flex items-center justify-center font-extrabold text-sm">
            {iniciales || <UserRound size={20} />}
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-[#1e293b] truncate">
              {user.full_name}
            </p>
            <p className="text-xs font-semibold text-[#22b573] truncate">
              {nombreRol}
            </p>
          </div>
        </div>

        <button
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-bold text-[#64748b] hover:bg-[#f8faf9] hover:text-[#1e293b] transition-all"
          onClick={() => window.alert('Contacta al administrador del sistema para recibir soporte técnico.')}
        >
          <HelpCircle size={20} className="text-[#64748b]" />
          Soporte técnico
        </button>

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-bold text-[#ef4444] hover:bg-[#fef2f2] transition-all mt-1"
        >
          <LogOut size={20} className="text-[#ef4444]" />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
