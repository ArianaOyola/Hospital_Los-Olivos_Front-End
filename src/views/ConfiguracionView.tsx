import { useState } from 'react';
import { 
  Building2, Grid, List as ListIcon, Users, Shield, Database, 
  Save, Plus, Edit2, Trash2, Download
} from 'lucide-react';

// Opciones del menú de configuración
const configTabs = [
  { id: 'general', label: 'General', icon: Building2 },
  { id: 'areas', label: 'Áreas del hospital', icon: Grid },
  { id: 'motivos', label: 'Motivos de visita', icon: ListIcon },
  { id: 'doctores', label: 'Doctores', icon: Users },
  { id: 'roles', label: 'Roles y permisos', icon: Shield },
  { id: 'backup', label: 'Copia de seguridad', icon: Database },
];

export function ConfiguracionView() {
  // Estado para controlar qué pestaña interna estamos viendo
  const [activeTab, setActiveTab] = useState('general');

  // Función que decide qué contenido mostrar según la pestaña seleccionada
  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="animate-fade-in">
            <h3 className="text-[18px] font-extrabold text-[#2c2a3d] mb-1">Información general</h3>
            <p className="text-[#8b889c] text-[13px] mb-6">Ajuste los datos principales de la institución y el sistema.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[13px] font-bold text-[#2c2a3d]">Nombre del sistema</label>
                <input type="text" defaultValue="Sistema de Registro y Análisis de Visitas" className="border border-[#ececf4] rounded-xl px-4 py-3 text-[14px] focus:border-[#5b4fcf] outline-none w-full" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-[#2c2a3d]">Institución</label>
                <input type="text" defaultValue="Hospital Los Olivos" className="border border-[#ececf4] rounded-xl px-4 py-3 text-[14px] focus:border-[#5b4fcf] outline-none" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-[#2c2a3d]">Zona horaria</label>
                <select className="border border-[#ececf4] rounded-xl px-4 py-3 text-[14px] focus:border-[#5b4fcf] outline-none bg-white">
                  <option>(UTC-05:00) Lima, Quito, Bogotá</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[13px] font-bold text-[#2c2a3d]">Dirección principal</label>
                <input type="text" defaultValue="Av. Universitaria 1234, Los Olivos, Lima" className="border border-[#ececf4] rounded-xl px-4 py-3 text-[14px] focus:border-[#5b4fcf] outline-none" />
              </div>
              
              {/* Logo Upload UI */}
              <div className="flex flex-col gap-2 md:col-span-2 mt-2">
                <label className="text-[13px] font-bold text-[#2c2a3d]">Logo del hospital</label>
                <div className="flex items-center gap-4 p-4 border border-[#ececf4] rounded-xl bg-[#f9fafc]">
                  <div className="w-16 h-16 bg-white border border-[#ececf4] rounded-lg flex items-center justify-center text-[24px] font-bold text-[#5b4fcf] shadow-sm">
                    ✚
                  </div>
                  <div>
                    <button className="bg-white border border-[#ececf4] text-[#2c2a3d] px-4 py-2 rounded-lg text-[13px] font-bold hover:bg-[#f4f5fb] transition-colors mb-1 shadow-sm">
                      Subir nueva imagen
                    </button>
                    <p className="text-[11px] text-[#8b889c]">Formatos soportados: PNG, JPG (Máx. 3MB)</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end border-t border-[#ececf4] pt-6">
              <button className="flex items-center gap-2 bg-[#5b4fcf] text-white px-6 py-3 rounded-xl text-[14px] font-bold hover:bg-[#3b2f78] shadow-sm transition-colors">
                <Save size={18} /> Guardar cambios
              </button>
            </div>
          </div>
        );

      case 'areas':
        return (
          <div className="animate-fade-in flex flex-col h-full">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h3 className="text-[18px] font-extrabold text-[#2c2a3d] mb-1">Áreas del hospital</h3>
                <p className="text-[#8b889c] text-[13px]">Administre las áreas disponibles para el registro de visitas.</p>
              </div>
              <button className="flex items-center gap-2 bg-[#5b4fcf] text-white px-5 py-2.5 rounded-xl text-[13px] font-bold hover:bg-[#3b2f78] shadow-sm transition-colors">
                <Plus size={16} /> Nueva área
              </button>
            </div>
            
            <div className="border border-[#ececf4] rounded-xl overflow-hidden flex-1">
              <table className="w-full text-left">
                <thead className="bg-[#f9fafc] border-b border-[#ececf4]">
                  <tr>
                    <th className="py-3 px-4 text-[12px] font-bold text-[#8b889c] uppercase">Área</th>
                    <th className="py-3 px-4 text-[12px] font-bold text-[#8b889c] uppercase">Descripción</th>
                    <th className="py-3 px-4 text-[12px] font-bold text-[#8b889c] uppercase">Estado</th>
                    <th className="py-3 px-4 text-[12px] font-bold text-[#8b889c] uppercase text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {['Medicina General', 'Pediatría', 'Traumatología', 'Cardiología'].map((area, i) => (
                    <tr key={i} className="border-b border-[#ececf4] hover:bg-[#f4f5fb] transition-colors">
                      <td className="py-3 px-4 text-[13px] font-bold text-[#2c2a3d]">{area}</td>
                      <td className="py-3 px-4 text-[13px] text-[#8b889c]">Atención y consultas de {area.toLowerCase()}</td>
                      <td className="py-3 px-4">
                        <span className="bg-[#e5f7ed] text-[#22b573] px-2.5 py-1 rounded-md text-[11px] font-extrabold tracking-wider uppercase">Activa</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <button className="text-[#8b889c] hover:text-[#5b4fcf] transition-colors p-1.5 rounded-lg hover:bg-[#ececf4]"><Edit2 size={16}/></button>
                          <button className="text-[#8b889c] hover:text-[#e0525f] transition-colors p-1.5 rounded-lg hover:bg-[#fef2f2]"><Trash2 size={16}/></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'roles':
        return (
          <div className="animate-fade-in">
            <h3 className="text-[18px] font-extrabold text-[#2c2a3d] mb-1">Matriz de Permisos</h3>
            <p className="text-[#8b889c] text-[13px] mb-6">Defina qué módulos puede ver y editar cada rol del sistema.</p>
            
            <div className="border border-[#ececf4] rounded-xl overflow-hidden mb-6">
              <table className="w-full text-center">
                <thead className="bg-[#f9fafc] border-b border-[#ececf4]">
                  <tr>
                    <th className="py-4 px-4 text-[12px] font-bold text-[#8b889c] uppercase text-left">Módulo</th>
                    <th className="py-4 px-4 text-[12px] font-bold text-[#2c2a3d] uppercase">Admin</th>
                    <th className="py-4 px-4 text-[12px] font-bold text-[#2c2a3d] uppercase">Analista</th>
                    <th className="py-4 px-4 text-[12px] font-bold text-[#2c2a3d] uppercase">Registrador</th>
                  </tr>
                </thead>
                <tbody>
                  {['Dashboard General', 'Registrar Visita', 'Historial', 'Análisis y Predicción IA', 'Reportes'].map((modulo, i) => (
                    <tr key={i} className="border-b border-[#ececf4] hover:bg-[#f4f5fb] transition-colors">
                      <td className="py-3.5 px-4 text-[13px] font-bold text-[#2c2a3d] text-left">{modulo}</td>
                      <td className="py-3.5 px-4"><input type="checkbox" defaultChecked className="w-4 h-4 cursor-pointer accent-[#5b4fcf]" disabled /></td>
                      <td className="py-3.5 px-4"><input type="checkbox" defaultChecked={i !== 1} className="w-4 h-4 cursor-pointer accent-[#5b4fcf]" /></td>
                      <td className="py-3.5 px-4"><input type="checkbox" defaultChecked={i === 0 || i === 1 || i === 2} className="w-4 h-4 cursor-pointer accent-[#5b4fcf]" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex justify-end">
              <button className="flex items-center gap-2 bg-[#5b4fcf] text-white px-6 py-3 rounded-xl text-[14px] font-bold hover:bg-[#3b2f78] shadow-sm transition-colors">
                <Save size={18} /> Guardar permisos
              </button>
            </div>
          </div>
        );

      case 'backup':
        return (
          <div className="animate-fade-in flex flex-col md:flex-row gap-8">
            <div className="flex-1 flex flex-col gap-4">
              <div>
                <h3 className="text-[18px] font-extrabold text-[#2c2a3d] mb-1">Generar Respaldo</h3>
                <p className="text-[#8b889c] text-[13px]">Asegure su información creando una copia manual.</p>
              </div>
              <div className="bg-[#f9fafc] border border-[#ececf4] rounded-xl p-5 flex flex-col gap-3">
                <label className="flex items-center gap-3 cursor-pointer text-[13px] font-bold text-[#2c2a3d]">
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#5b4fcf]" /> Base de datos completa
                </label>
                <label className="flex items-center gap-3 cursor-pointer text-[13px] font-bold text-[#2c2a3d]">
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#5b4fcf]" /> Archivos y configuraciones
                </label>
                <label className="flex items-center gap-3 cursor-pointer text-[13px] font-bold text-[#2c2a3d]">
                  <input type="checkbox" className="w-4 h-4 accent-[#5b4fcf]" /> Registro de auditoría (Logs)
                </label>
                <button className="mt-2 w-full flex items-center justify-center gap-2 bg-[#22b573] text-white px-5 py-3 rounded-xl text-[14px] font-bold hover:bg-[#1a935c] shadow-sm transition-colors">
                  <Database size={18} /> Procesar Respaldo
                </button>
              </div>
            </div>
            
            <div className="flex-[1.5] flex flex-col">
              <h3 className="text-[16px] font-extrabold text-[#2c2a3d] mb-4">Respaldos anteriores</h3>
              <div className="border border-[#ececf4] rounded-xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-[#f9fafc] border-b border-[#ececf4]">
                    <tr>
                      <th className="py-3 px-4 text-[12px] font-bold text-[#8b889c] uppercase">Fecha</th>
                      <th className="py-3 px-4 text-[12px] font-bold text-[#8b889c] uppercase">Tamaño</th>
                      <th className="py-3 px-4 text-[12px] font-bold text-[#8b889c] uppercase text-center">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {['19/09/2026 02:00 AM', '18/09/2026 02:00 AM', '17/09/2026 02:00 AM'].map((fecha, i) => (
                      <tr key={i} className="border-b border-[#ececf4] hover:bg-[#f4f5fb] transition-colors">
                        <td className="py-3 px-4 text-[13px] font-bold text-[#2c2a3d]">{fecha}</td>
                        <td className="py-3 px-4 text-[13px] text-[#8b889c]">256 MB</td>
                        <td className="py-3 px-4 text-center">
                          <button className="text-[#5b4fcf] hover:bg-[#ececf4] p-1.5 rounded-lg transition-colors"><Download size={16}/></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-full min-h-[300px]">
            <h2 className="text-[#8b889c] text-[15px] font-bold">Seleccione una opción del menú lateral.</h2>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full animate-fade-in pb-8">
      
      {/* Cabecera CON el perfil de usuario */}
      <div className="mb-8 border-l-[5px] border-[#8b889c] pl-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#2c2a3d] tracking-tight mb-1.5">
            Configuración
          </h1>
          <p className="text-[#8b889c] text-[15px] font-medium">
            Ajustes generales, catálogos y mantenimiento del sistema.
          </p>
        </div>
        
        {/* Tu Perfil de Administrador */}
        <div className="flex items-center gap-3 bg-white border border-[#ececf4] py-1.5 pl-1.5 pr-5 rounded-full shadow-sm cursor-pointer hover:border-[#5b4fcf] transition-colors shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7c6ff0] to-[#3b2f78] flex items-center justify-center text-white font-bold text-sm shadow-inner">
            CH
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-bold text-[#2c2a3d] leading-tight">Camila Huancahuari</span>
            <span className="text-[11px] font-bold text-[#5b4fcf] leading-tight uppercase tracking-wider mt-0.5">Administrador</span>
          </div>
        </div>
      </div>

      {/* Estructura de 2 Columnas (Menú Izquierdo + Panel Derecho) */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
        {/* Menú Lateral de Configuración */}
        <div className="w-full lg:w-64 shrink-0 bg-white border border-[#ececf4] rounded-2xl p-3 shadow-sm flex flex-col gap-1">
          {configTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-bold transition-all w-full text-left ${
                  isActive 
                    ? 'bg-[#f4f5fb] text-[#5b4fcf]' 
                    : 'text-[#8b889c] hover:bg-[#f9fafc] hover:text-[#2c2a3d]'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-[#5b4fcf]' : 'text-[#8b889c]'} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Panel Central Dinámico */}
        <div className="flex-1 w-full bg-white border border-[#ececf4] rounded-2xl p-8 shadow-sm min-h-[400px]">
          {renderTabContent()}
        </div>

      </div>
    </div>
  );
}