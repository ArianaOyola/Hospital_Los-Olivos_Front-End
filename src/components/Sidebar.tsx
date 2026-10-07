import { LayoutDashboard, UserPlus, ClipboardList, LineChart, FileText, Users, Settings, LogOut } from 'lucide-react';
import logoHospital from '../assets/logo.png';

// 1. Le decimos qué variables necesita recibir el Sidebar
interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'registrar', label: 'Registrar Visita', icon: UserPlus },
  { id: 'historial', label: 'Historial de Visitas', icon: ClipboardList },
  { id: 'analisis', label: 'Análisis y Predicción', icon: LineChart },
  { id: 'reportes', label: 'Reportes', icon: FileText },
  { id: 'usuarios', label: 'Usuarios', icon: Users },
  { id: 'configuracion', label: 'Configuración', icon: Settings },
];

// 2. Recibimos esas variables
export function Sidebar({ currentView, onNavigate }: SidebarProps) {
  return (
    <aside className="w-[230px] bg-white border-r border-[#ececf4] p-6 flex flex-col min-h-screen shrink-0">
      <div className="flex items-center gap-3 mb-8 px-2 font-bold text-[#2c2a3d] text-[15px] leading-tight">
        <img src={logoHospital} alt="Logo Hospital Los Olivos" className="w-14 h-14 object-contain" />
        <div>Hospital<br />Los Olivos</div>
      </div>

      <nav className="flex-1 flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id; // Comprueba si este botón es el activo
          
          return (
            <button 
              key={item.id}
              onClick={() => onNavigate(item.id)} // Avisa que se hizo clic
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors text-left ${
                isActive 
                  ? 'bg-[#5b4fcf] text-white font-semibold shadow-sm' 
                  : 'text-[#8b889c] hover:bg-[#f4f5fb] hover:text-[#2c2a3d]'
              }`}
            >
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <button className="flex items-center gap-3 px-3 py-2.5 text-[#8b889c] text-sm hover:text-[#2c2a3d] transition-colors mt-auto w-full text-left">
        <LogOut size={18} />
        Cerrar sesión
      </button>
    </aside>
  );
}