import { 
  FileText, CalendarDays, PieChart, List, User, TrendingUp, 
  Settings, Download, Search, FileDown, Sheet
} from 'lucide-react';

// Datos de los tipos de reporte (agregamos una propiedad 'badge' al más importante)
const reportTypes = [
  { title: 'Visitas por período', desc: 'Resumen general de visitas en un rango de fechas', icon: CalendarDays, color: 'text-[#7c6ff0]', bg: 'bg-[#f4f5fb]', badge: 'Más usado' },
  { title: 'Visitas por área', desc: 'Estadísticas de visitas agrupadas por área', icon: PieChart, color: 'text-[#4f6ef7]', bg: 'bg-[#f0f4ff]' },
  { title: 'Visitas por motivo', desc: 'Cantidad de visitas según el motivo', icon: List, color: 'text-[#f0a83c]', bg: 'bg-[#fffbf0]' },
  { title: 'Visitas por persona', desc: 'Reporte de visitas por persona visitada', icon: User, color: 'text-[#22b573]', bg: 'bg-[#f0fdf4]' },
  { title: 'Predicción de demanda', desc: 'Pronóstico de visitas con Random Forest', icon: TrendingUp, color: 'text-[#e0525f]', bg: 'bg-[#fff1f2]' },
  { title: 'Reporte personalizado', desc: 'Cree reportes con filtros específicos', icon: Settings, color: 'text-[#8b889c]', bg: 'bg-[#f9fafc]' },
];

// Datos de los reportes generados recientemente
const recentReports = [
  { title: 'Reporte visitas agosto 2026', date: '01/09/2026 10:30 AM', format: 'PDF' },
  { title: 'Visitas por área - Agosto 2026', date: '01/09/2026 09:15 AM', format: 'Excel' },
  { title: 'Predicción demanda sep 2026', date: '31/08/2026 08:45 AM', format: 'PDF' },
];

export function ReportesView() {
  return (
    <div className="flex flex-col h-full animate-fade-in pb-8">
      
      {/* Cabecera CON el perfil de usuario */}
      <div className="mb-8 border-l-[5px] border-[#7c6ff0] pl-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#2c2a3d] tracking-tight mb-1.5">
            Reportes
          </h1>
          <p className="text-[#8b889c] text-[15px] font-medium">
            Genere y descargue reportes detallados de las visitas externas.
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

      {/* Barra de Generación Rápida MEJORADA */}
      <div className="bg-white border border-[#ececf4] rounded-2xl p-6 mb-8 shadow-sm">
        
        <div className="flex flex-col xl:flex-row gap-5 items-end">
          <div className="flex-1 w-full flex flex-col gap-2">
            <label className="text-[12px] font-bold text-[#8b889c] uppercase tracking-wider">Tipo de reporte</label>
            <select className="border border-[#ececf4] rounded-xl px-4 py-3 text-[14px] focus:border-[#5b4fcf] outline-none text-[#2c2a3d] bg-white cursor-pointer shadow-sm">
              <option value="">Seleccionar tipo...</option>
              <option>Visitas por período</option>
              <option>Visitas por área</option>
              <option>Visitas por motivo</option>
            </select>
          </div>
          
          <div className="flex-1 w-full flex flex-col gap-2">
            <div className="flex justify-between items-end">
              <label className="text-[12px] font-bold text-[#8b889c] uppercase tracking-wider">Rango de fechas</label>
              {/* Filtros Rápidos (Quick Presets) */}
              <div className="hidden md:flex gap-1.5">
                <button className="text-[11px] font-bold text-[#5b4fcf] bg-[#f4f5fb] hover:bg-[#ececf4] px-2 py-0.5 rounded transition-colors">Hoy</button>
                <button className="text-[11px] font-bold text-[#5b4fcf] bg-[#f4f5fb] hover:bg-[#ececf4] px-2 py-0.5 rounded transition-colors">7 días</button>
                <button className="text-[11px] font-bold text-[#5b4fcf] bg-[#f4f5fb] hover:bg-[#ececf4] px-2 py-0.5 rounded transition-colors">Este mes</button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input type="date" defaultValue="2026-08-01" className="w-full border border-[#ececf4] rounded-xl px-4 py-3 text-[14px] focus:border-[#5b4fcf] outline-none text-[#2c2a3d] shadow-sm" />
              <span className="text-[#8b889c] font-medium">a</span>
              <input type="date" defaultValue="2026-09-19" className="w-full border border-[#ececf4] rounded-xl px-4 py-3 text-[14px] focus:border-[#5b4fcf] outline-none text-[#2c2a3d] shadow-sm" />
            </div>
          </div>

          {/* Botones de Generación por Formato */}
          <div className="w-full xl:w-auto flex gap-2 pt-2 xl:pt-0">
            <button className="flex-1 xl:flex-none flex items-center justify-center gap-2 bg-[#5b4fcf] text-white px-5 py-3 rounded-xl text-[14px] font-bold hover:bg-[#3b2f78] shadow-sm transition-colors">
              <FileDown size={18} /> Generar PDF
            </button>
            <button className="flex-1 xl:flex-none flex items-center justify-center gap-2 bg-[#22b573] text-white px-5 py-3 rounded-xl text-[14px] font-bold hover:bg-[#1a935c] shadow-sm transition-colors">
              <Sheet size={18} /> Generar Excel
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Catálogo de Reportes */}
        <div className="xl:col-span-2 flex flex-col gap-4">
          <h3 className="text-[16px] font-bold text-[#2c2a3d] flex items-center gap-2 mb-1">
            Catálogo de reportes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportTypes.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="relative bg-white border border-[#ececf4] rounded-2xl p-5 shadow-sm hover:border-[#5b4fcf] hover:shadow-md transition-all cursor-pointer group flex items-start gap-4">
                  {/* Etiqueta de "Más usado" */}
                  {item.badge && (
                    <span className="absolute top-3 right-3 bg-[#e5f7ed] text-[#22b573] text-[10px] font-extrabold px-2 py-0.5 rounded-md tracking-wider uppercase">
                      {item.badge}
                    </span>
                  )}
                  
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${item.bg} ${item.color} group-hover:scale-110 transition-transform`}>
                    <Icon size={22} />
                  </div>
                  <div className="pr-10">
                    <h4 className="text-[14px] font-bold text-[#2c2a3d] mb-1 group-hover:text-[#5b4fcf] transition-colors">{item.title}</h4>
                    <p className="text-[13px] text-[#8b889c] leading-snug">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Panel lateral: Reportes Recientes MEJORADO */}
        <div className="xl:col-span-1 flex flex-col gap-4">
          <h3 className="text-[16px] font-bold text-[#2c2a3d] flex items-center gap-2 mb-1">
            Reportes recientes
          </h3>
          <div className="bg-white border border-[#ececf4] rounded-2xl shadow-sm overflow-hidden flex flex-col">
            
            {/* Buscador Rápido de Reportes */}
            <div className="p-4 border-b border-[#ececf4] bg-[#f9fafc]">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Buscar en historial..." 
                  className="w-full bg-white border border-[#ececf4] rounded-lg pl-9 pr-3 py-2 text-[13px] focus:border-[#5b4fcf] outline-none"
                />
                <Search size={14} className="absolute left-3 top-2.5 text-[#8b889c]" />
              </div>
            </div>

            <div className="flex flex-col">
              {recentReports.map((report, index) => (
                <div key={index} className="p-5 border-b border-[#ececf4] last:border-0 hover:bg-[#f4f5fb] transition-colors flex items-center justify-between gap-4">
                  <div>
                    <h5 className="text-[13px] font-bold text-[#2c2a3d] leading-tight mb-1">{report.title}</h5>
                    <p className="text-[11px] text-[#8b889c]">Generado: {report.date}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold tracking-wider ${
                      report.format === 'PDF' ? 'bg-[#fee2e2] text-[#ef4444]' : 'bg-[#dcfce3] text-[#16a34a]'
                    }`}>
                      {report.format}
                    </span>
                    <button className="text-[#8b889c] hover:text-[#5b4fcf] transition-colors bg-white border border-[#ececf4] p-1.5 rounded-lg shadow-sm">
                      <Download size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full p-3 text-[13px] font-bold text-[#5b4fcf] hover:bg-[#f4f5fb] transition-colors border-t border-[#ececf4]">
              Ver todo el historial
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}