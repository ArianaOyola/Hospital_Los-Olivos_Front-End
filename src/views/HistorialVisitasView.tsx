import { useState } from 'react';
import { Search, Download, Eye, Filter, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

// Datos exactos de tu diseño original
const historialData = [
  { id: 'VIS-0001250', fecha: '19/09/2026', visitante: 'Juan Pérez López', area: 'Medicina General', motivo: 'Consulta', doctor: 'Dr. Pérez', ingreso: '08:15 AM', salida: '09:20 AM', estado: 'Completado' },
  { id: 'VIS-0001249', fecha: '19/09/2026', visitante: 'María Fernández R.', area: 'Pediatría', motivo: 'Control', doctor: 'Dra. García', ingreso: '09:00 AM', salida: '—', estado: 'En curso' },
  { id: 'VIS-0001248', fecha: '19/09/2026', visitante: 'Carlos Salazar M.', area: 'Traumatología', motivo: 'Emergencia', doctor: 'Dr. Rodríguez', ingreso: '07:45 AM', salida: '08:30 AM', estado: 'Completado' },
  { id: 'VIS-0001247', fecha: '18/09/2026', visitante: 'Ana Torres Gómez', area: 'Cardiología', motivo: 'Consulta', doctor: 'Dra. Fernández', ingreso: '10:10 AM', salida: '11:05 AM', estado: 'Completado' },
];

export function HistorialVisitasView() {
  const [visitaSeleccionada, setVisitaSeleccionada] = useState<any>(null);

  return (
    <div className="flex flex-col h-full animate-fade-in pb-8 relative">
      
      {/* Cabecera idéntica a tu diseño */}
      <div className="mb-6 flex items-center justify-between">
        <div className="border-l-[5px] border-[#22b573] pl-4">
          <h1 className="text-3xl font-extrabold text-[#2c2a3d] tracking-tight mb-1">
            Historial de visitas
          </h1>
          <p className="text-[#8b889c] text-[14px]">
            Consulte y filtre el historial de visitas registradas.
          </p>
        </div>
        
        {/* Perfil de Usuario */}
        <div className="flex items-center gap-3 bg-white border border-[#ececf4] py-1.5 pl-1.5 pr-5 rounded-full shadow-sm">
          <div className="w-10 h-10 rounded-full bg-[#22b573] flex items-center justify-center text-white font-bold text-sm">
            CH
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-bold text-[#2c2a3d] leading-tight">Camila Huancahuari</span>
            <span className="text-[11px] font-bold text-[#22b573] leading-tight tracking-wider uppercase mt-0.5">Administrador</span>
          </div>
        </div>
      </div>

      {/* Barra de Filtros */}
      <div className="bg-white border border-[#ececf4] rounded-2xl p-5 mb-6 shadow-sm flex flex-wrap lg:flex-nowrap gap-4 items-end">
        <div className="flex flex-col gap-1.5 flex-1 min-w-[250px]">
          <label className="text-[11px] font-bold text-[#8b889c] uppercase tracking-wider">Buscar</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b889c]" size={18} />
            <input type="text" placeholder="Nombre, DNI o código..." className="w-full border border-[#ececf4] rounded-xl pl-10 pr-4 py-2.5 text-[13px] focus:border-[#22b573] outline-none transition-colors" />
          </div>
        </div>
        
        <div className="flex flex-col gap-1.5 w-full sm:w-auto">
          <label className="text-[11px] font-bold text-[#8b889c] uppercase tracking-wider">Desde</label>
          <div className="relative">
            <input type="text" defaultValue="01/08/2026" className="w-full sm:w-[140px] border border-[#ececf4] rounded-xl px-4 py-2.5 text-[13px] text-[#2c2a3d] focus:border-[#22b573] outline-none transition-colors" />
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b889c]" size={16} />
          </div>
        </div>
        
        <div className="flex flex-col gap-1.5 w-full sm:w-auto">
          <label className="text-[11px] font-bold text-[#8b889c] uppercase tracking-wider">Hasta</label>
          <div className="relative">
            <input type="text" defaultValue="18/09/2026" className="w-full sm:w-[140px] border border-[#ececf4] rounded-xl px-4 py-2.5 text-[13px] text-[#2c2a3d] focus:border-[#22b573] outline-none transition-colors" />
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b889c]" size={16} />
          </div>
        </div>

        <div className="flex flex-col gap-1.5 w-full sm:w-auto">
          <label className="text-[11px] font-bold text-[#8b889c] uppercase tracking-wider">Área</label>
          <select className="border border-[#ececf4] rounded-xl px-4 py-2.5 text-[13px] text-[#2c2a3d] focus:border-[#22b573] outline-none bg-white min-w-[160px] transition-colors">
            <option>Todas las áreas</option>
            <option>Medicina General</option>
            <option>Pediatría</option>
          </select>
        </div>
        
        <button className="flex items-center justify-center gap-2 bg-white text-[#2c2a3d] border border-[#ececf4] px-5 py-2.5 rounded-xl text-[13px] font-bold hover:bg-[#f9fafc] shadow-sm transition-colors w-full sm:w-auto">
          <Filter size={16} /> Filtrar
        </button>
        <button className="flex items-center justify-center gap-2 bg-[#22b573] text-white px-5 py-2.5 rounded-xl text-[13px] font-bold hover:bg-[#1a935c] shadow-sm transition-colors w-full sm:w-auto">
          <Download size={16} /> Exportar
        </button>
      </div>

      {/* Tabla Completa */}
      <div className="bg-white border border-[#ececf4] rounded-2xl shadow-sm flex flex-col flex-1">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#f9fafc] border-b border-[#ececf4]">
              <tr>
                <th className="py-4 px-6 text-[11px] font-bold text-[#8b889c] uppercase tracking-wider whitespace-nowrap">Código</th>
                <th className="py-4 px-6 text-[11px] font-bold text-[#8b889c] uppercase tracking-wider whitespace-nowrap">Fecha</th>
                <th className="py-4 px-6 text-[11px] font-bold text-[#8b889c] uppercase tracking-wider whitespace-nowrap">Visitante</th>
                <th className="py-4 px-6 text-[11px] font-bold text-[#8b889c] uppercase tracking-wider whitespace-nowrap">Área</th>
                <th className="py-4 px-6 text-[11px] font-bold text-[#8b889c] uppercase tracking-wider whitespace-nowrap">Doctor</th>
                <th className="py-4 px-6 text-[11px] font-bold text-[#8b889c] uppercase tracking-wider whitespace-nowrap">Ingreso</th>
                <th className="py-4 px-6 text-[11px] font-bold text-[#8b889c] uppercase tracking-wider whitespace-nowrap">Salida</th>
                <th className="py-4 px-6 text-[11px] font-bold text-[#8b889c] uppercase tracking-wider whitespace-nowrap">Estado</th>
                <th className="py-4 px-6 text-[11px] font-bold text-[#8b889c] uppercase tracking-wider text-center whitespace-nowrap">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {historialData.map((visita, index) => (
                <tr key={index} className="border-b border-[#ececf4] hover:bg-[#f9fafc] transition-colors">
                  <td className="py-4 px-6 text-[13px] font-bold text-[#22b573] whitespace-nowrap">{visita.id}</td>
                  <td className="py-4 px-6 text-[13px] text-[#2c2a3d] whitespace-nowrap">{visita.fecha}</td>
                  <td className="py-4 px-6 text-[13px] font-bold text-[#2c2a3d] whitespace-nowrap">{visita.visitante}</td>
                  <td className="py-4 px-6 text-[13px] text-[#8b889c] whitespace-nowrap">{visita.area}</td>
                  <td className="py-4 px-6 text-[13px] text-[#8b889c] whitespace-nowrap">{visita.doctor}</td>
                  <td className="py-4 px-6 text-[13px] font-bold text-[#2c2a3d] whitespace-nowrap">{visita.ingreso}</td>
                  <td className="py-4 px-6 text-[13px] text-[#8b889c] whitespace-nowrap">{visita.salida}</td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold inline-block ${
                      visita.estado === 'Completado' 
                        ? 'bg-[#e5f7ed] text-[#22b573]' 
                        : 'bg-[#fff4e5] text-[#f0a83c]'
                    }`}>
                      {visita.estado}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button 
                      onClick={() => setVisitaSeleccionada(visita)}
                      className="p-1.5 rounded-lg text-[#8b889c] hover:text-[#22b573] hover:bg-[#eafaf1] transition-all"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Paginación Inferior original */}
        <div className="p-4 border-t border-[#ececf4] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[13px] text-[#8b889c]">Mostrando 1 a 6 de 1,250 registros</span>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#ececf4] text-[#8b889c] hover:bg-[#f9fafc]"><ChevronLeft size={16}/></button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#22b573] text-white font-bold text-[13px]">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#ececf4] text-[#2c2a3d] hover:bg-[#f9fafc] font-bold text-[13px]">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#ececf4] text-[#2c2a3d] hover:bg-[#f9fafc] font-bold text-[13px]">3</button>
            <span className="w-8 h-8 flex items-center justify-center text-[#8b889c]">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#ececf4] text-[#8b889c] hover:bg-[#f9fafc]"><ChevronRight size={16}/></button>
          </div>
        </div>
      </div>

      {/* Modal / Ventana Emergente */}
      {visitaSeleccionada && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#2c2a3d]/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-[20px] p-8 w-full max-w-md shadow-2xl relative">
            <h2 className="text-[22px] font-extrabold text-[#2c2a3d] leading-none mb-1">
              {visitaSeleccionada.id}
            </h2>
            <p className="text-[#8b889c] text-[13px] mb-6">Detalle de la visita</p>

            <div className="grid grid-cols-2 gap-y-5 gap-x-6 mb-8">
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-[#8b889c] mb-1">Fecha</span>
                <span className="text-[14px] font-bold text-[#2c2a3d]">{visitaSeleccionada.fecha}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-[#8b889c] mb-1">Visitante</span>
                <span className="text-[14px] font-bold text-[#2c2a3d]">{visitaSeleccionada.visitante}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-[#8b889c] mb-1">Área</span>
                <span className="text-[14px] font-bold text-[#2c2a3d]">{visitaSeleccionada.area}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-[#8b889c] mb-1">Motivo</span>
                <span className="text-[14px] font-bold text-[#2c2a3d]">{visitaSeleccionada.motivo}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-[#8b889c] mb-1">Doctor</span>
                <span className="text-[14px] font-bold text-[#2c2a3d]">{visitaSeleccionada.doctor}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-[#8b889c] mb-1">Ingreso</span>
                <span className="text-[14px] font-bold text-[#2c2a3d]">{visitaSeleccionada.ingreso}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-[#8b889c] mb-1">Salida</span>
                <span className="text-[14px] font-bold text-[#2c2a3d]">{visitaSeleccionada.salida}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-[#8b889c] mb-1">Estado</span>
                <span className="text-[14px] font-bold text-[#2c2a3d]">{visitaSeleccionada.estado}</span>
              </div>
            </div>

            <button
              onClick={() => setVisitaSeleccionada(null)}
              className="w-full bg-[#22b573] text-white font-bold py-3.5 rounded-xl hover:bg-[#1a935c] shadow-sm transition-colors text-[14px]"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

    </div>
  );
}