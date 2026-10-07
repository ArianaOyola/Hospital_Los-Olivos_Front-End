import { Search, Download, Filter, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

const historialData = [
  { id: 'VIS-0001250', fecha: '19/09/2026', visitante: 'Juan Pérez López', area: 'Medicina General', motivo: 'Consulta', doctor: 'Dr. Pérez', ingreso: '08:15 AM', salida: '09:20 AM', estado: 'Completado' },
  { id: 'VIS-0001249', fecha: '19/09/2026', visitante: 'María Fernández R.', area: 'Pediatría', motivo: 'Control', doctor: 'Dra. García', ingreso: '09:00 AM', salida: '—', estado: 'En curso' },
  { id: 'VIS-0001248', fecha: '19/09/2026', visitante: 'Carlos Salazar M.', area: 'Traumatología', motivo: 'Emergencia', doctor: 'Dr. Rodríguez', ingreso: '07:45 AM', salida: '08:30 AM', estado: 'Completado' },
  { id: 'VIS-0001247', fecha: '18/09/2026', visitante: 'Ana Torres Gómez', area: 'Cardiología', motivo: 'Consulta', doctor: 'Dra. Fernández', ingreso: '10:10 AM', salida: '11:05 AM', estado: 'Completado' },
  { id: 'VIS-0001246', fecha: '18/09/2026', visitante: 'Luis Medina Castro', area: 'Medicina General', motivo: 'Control', doctor: 'Dr. Pérez', ingreso: '08:30 AM', salida: '10:00 AM', estado: 'Completado' },
  { id: 'VIS-0001245', fecha: '18/09/2026', visitante: 'Rosa Huamán Díaz', area: 'Pediatría', motivo: 'Consulta', doctor: 'Dra. García', ingreso: '08:00 AM', salida: '08:45 AM', estado: 'Completado' },
];

export function HistorialVisitasView() {
  return (
    <div className="flex flex-col h-full animate-fade-in pb-8">
      
      {/* Cabecera CON el perfil de usuario */}
      <div className="mb-6 border-l-[5px] border-[#4f6ef7] pl-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#2c2a3d] tracking-tight mb-1.5">
            Historial de visitas
          </h1>
          <p className="text-[#8b889c] text-[15px] font-medium">
            Consulte y filtre el historial de visitas registradas.
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

      {/* Tarjeta de Filtros */}
      <div className="bg-white border border-[#ececf4] rounded-2xl p-5 mb-6 shadow-sm flex flex-col xl:flex-row gap-4 items-end">
        <div className="flex-1 w-full flex flex-col gap-1.5">
          <label className="text-[12px] font-bold text-[#8b889c] uppercase tracking-wider">Buscar</label>
          <div className="relative">
            <input type="text" placeholder="Nombre, DNI o código..." className="w-full border border-[#ececf4] rounded-xl pl-10 pr-4 py-2.5 text-[14px] focus:border-[#5b4fcf] outline-none" />
            <Search size={16} className="absolute left-3.5 top-3 text-[#8b889c]" />
          </div>
        </div>
        <div className="w-full xl:w-auto flex flex-col gap-1.5">
          <label className="text-[12px] font-bold text-[#8b889c] uppercase tracking-wider">Desde</label>
          <input type="date" defaultValue="2026-08-01" className="border border-[#ececf4] rounded-xl px-4 py-2.5 text-[14px] focus:border-[#5b4fcf] outline-none text-[#2c2a3d]" />
        </div>
        <div className="w-full xl:w-auto flex flex-col gap-1.5">
          <label className="text-[12px] font-bold text-[#8b889c] uppercase tracking-wider">Hasta</label>
          <input type="date" defaultValue="2026-09-18" className="border border-[#ececf4] rounded-xl px-4 py-2.5 text-[14px] focus:border-[#5b4fcf] outline-none text-[#2c2a3d]" />
        </div>
        <div className="w-full xl:w-auto flex flex-col gap-1.5">
          <label className="text-[12px] font-bold text-[#8b889c] uppercase tracking-wider">Área</label>
          <select className="border border-[#ececf4] rounded-xl px-4 py-2.5 text-[14px] focus:border-[#5b4fcf] outline-none text-[#2c2a3d] bg-white">
            <option value="">Todas las áreas</option>
            <option>Medicina General</option>
            <option>Pediatría</option>
            <option>Traumatología</option>
          </select>
        </div>
        <div className="flex gap-2 w-full xl:w-auto">
          <button className="flex-1 xl:flex-none flex items-center justify-center gap-2 bg-[#f4f5fb] text-[#2c2a3d] border border-[#ececf4] px-5 py-2.5 rounded-xl text-[14px] font-bold hover:bg-[#ececf4] transition-colors">
            <Filter size={16} /> Filtrar
          </button>
          <button className="flex-1 xl:flex-none flex items-center justify-center gap-2 bg-[#22b573] text-white px-5 py-2.5 rounded-xl text-[14px] font-bold hover:bg-[#1a935c] shadow-sm transition-colors">
            <Download size={16} /> Exportar
          </button>
        </div>
      </div>

      {/* Tarjeta de la Tabla */}
      <div className="bg-white border border-[#ececf4] rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f9fafc] border-b border-[#ececf4]">
                <th className="py-4 px-6 text-[12px] font-bold text-[#8b889c] uppercase tracking-wider">Código</th>
                <th className="py-4 px-6 text-[12px] font-bold text-[#8b889c] uppercase tracking-wider">Fecha</th>
                <th className="py-4 px-6 text-[12px] font-bold text-[#8b889c] uppercase tracking-wider">Visitante</th>
                <th className="py-4 px-6 text-[12px] font-bold text-[#8b889c] uppercase tracking-wider">Área</th>
                <th className="py-4 px-6 text-[12px] font-bold text-[#8b889c] uppercase tracking-wider">Doctor</th>
                <th className="py-4 px-6 text-[12px] font-bold text-[#8b889c] uppercase tracking-wider">Ingreso</th>
                <th className="py-4 px-6 text-[12px] font-bold text-[#8b889c] uppercase tracking-wider">Salida</th>
                <th className="py-4 px-6 text-[12px] font-bold text-[#8b889c] uppercase tracking-wider">Estado</th>
                <th className="py-4 px-6 text-[12px] font-bold text-[#8b889c] uppercase tracking-wider text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {historialData.map((row, index) => (
                <tr key={index} className="border-b border-[#ececf4] hover:bg-[#f4f5fb] transition-colors">
                  <td className="py-3.5 px-6 text-[13px] font-semibold text-[#5b4fcf]">{row.id}</td>
                  <td className="py-3.5 px-6 text-[13px] text-[#2c2a3d]">{row.fecha}</td>
                  <td className="py-3.5 px-6 text-[13px] font-medium text-[#2c2a3d]">{row.visitante}</td>
                  <td className="py-3.5 px-6 text-[13px] text-[#8b889c]">{row.area}</td>
                  <td className="py-3.5 px-6 text-[13px] text-[#8b889c]">{row.doctor}</td>
                  <td className="py-3.5 px-6 text-[13px] font-medium text-[#2c2a3d]">{row.ingreso}</td>
                  <td className="py-3.5 px-6 text-[13px] text-[#8b889c]">{row.salida}</td>
                  <td className="py-3.5 px-6">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                      row.estado === 'Completado' ? 'bg-[#e5f7ed] text-[#22b573]' : 'bg-[#fffbeb] text-[#d97706]'
                    }`}>
                      {row.estado}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-center">
                    <button className="text-[#8b889c] hover:text-[#5b4fcf] transition-colors p-1.5 rounded-lg hover:bg-[#ececf4]">
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Paginación */}
        <div className="p-5 flex items-center justify-between border-t border-[#ececf4] bg-white">
          <span className="text-[13px] text-[#8b889c]">Mostrando 1 a 6 de 1,250 registros</span>
          <div className="flex gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#ececf4] text-[#8b889c] hover:bg-[#f4f5fb]"><ChevronLeft size={16} /></button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#5b4fcf] text-white font-bold text-[13px]">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#ececf4] text-[#2c2a3d] hover:bg-[#f4f5fb] text-[13px] font-medium">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#ececf4] text-[#2c2a3d] hover:bg-[#f4f5fb] text-[13px] font-medium">3</button>
            <span className="w-8 h-8 flex items-center justify-center text-[#8b889c]">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#ececf4] text-[#8b889c] hover:bg-[#f4f5fb]"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>

    </div>
  );
}