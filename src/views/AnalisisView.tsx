import { 
  TrendingUp, Target, AlertTriangle, BrainCircuit, BarChart2, CalendarDays,
  Lightbulb, Download
} from 'lucide-react';
import {
  ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

// Datos con 'rango' (Mínimo y Máximo) para dibujar la sombra de margen de error
const proyeccionData = [
  { name: 'Lun', visitas: 42, rango: [34, 50] },
  { name: 'Mar', visitas: 47, rango: [39, 55] },
  { name: 'Mié', visitas: 38, rango: [30, 46] },
  { name: 'Jue', visitas: 51, rango: [43, 59] },
  { name: 'Vie', visitas: 55, rango: [47, 63] },
  { name: 'Sáb', visitas: 46, rango: [38, 54] },
  { name: 'Dom', visitas: 41, rango: [33, 49] },
];

const factoresData = [
  { name: 'Día de la semana', impacto: 0.34, width: '88%' },
  { name: 'Visitas semana anterior', impacto: 0.27, width: '75%' },
  { name: 'Área de destino', impacto: 0.18, width: '52%' },
  { name: 'Feriados / eventos', impacto: 0.12, width: '34%' },
  { name: 'Estacionalidad mensual', impacto: 0.09, width: '22%' },
];

const detalleDias = [
  { dia: 'Lunes 21 sep. 2026', count: 42 }, { dia: 'Martes 22 sep. 2026', count: 47 },
  { dia: 'Miércoles 23 sep. 2026', count: 38 }, { dia: 'Jueves 24 sep. 2026', count: 51 },
  { dia: 'Viernes 25 sep. 2026', count: 55 }, { dia: 'Sábado 26 sep. 2026', count: 46 },
  { dia: 'Domingo 27 sep. 2026', count: 41 },
];

export function AnalisisView() {
  return (
    <div className="flex flex-col h-full animate-fade-in pb-8">
      
      {/* Cabecera */}
      <div className="mb-6 border-l-[5px] border-[#e0525f] pl-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#2c2a3d] tracking-tight">
              Análisis y Predicción
            </h1>
            <span className="bg-[#fff1f2] text-[#e0525f] border border-[#fecdd3] px-2.5 py-1 rounded-md text-[11px] font-extrabold tracking-wider uppercase flex items-center gap-1.5 shadow-sm">
              <BrainCircuit size={14} className="animate-pulse" /> Modelo Activo
            </span>
          </div>
          <p className="text-[#8b889c] text-[15px] font-medium">
            Detalle estadístico del Random Forest y proyección de demanda automatizada.
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

      {/* Fila de Tarjetas de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <div className="bg-white border border-[#ececf4] rounded-2xl p-6 shadow-sm flex flex-col gap-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#5b4fcf]/10 to-transparent rounded-bl-full"></div>
          <div className="flex items-center gap-2 text-[#8b889c] text-[12px] font-bold uppercase tracking-wider">
            <CalendarDays size={16} className="text-[#5b4fcf]" /> Próximos 7 días
          </div>
          <div className="text-[36px] font-extrabold text-[#2c2a3d] leading-none mt-1">320 <span className="text-[20px] text-[#8b889c] font-medium">±28</span></div>
          <div className="text-[#22b573] text-[13px] font-bold flex items-center gap-1 mt-1">
            <TrendingUp size={16} /> +12% vs semana anterior
          </div>
        </div>
        
        <div className="bg-white border border-[#ececf4] rounded-2xl p-6 shadow-sm flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[#8b889c] text-[12px] font-bold uppercase tracking-wider">
            <Target size={16} className="text-[#e0525f]" /> Precisión (R²)
          </div>
          <div className="text-[36px] font-extrabold text-[#2c2a3d] leading-none mt-1">0.91</div>
          <div className="text-[#8b889c] text-[13px] mt-1">
            Algoritmo: <span className="font-bold text-[#2c2a3d]">Random Forest (200 árboles)</span>
          </div>
        </div>

        <div className="bg-white border border-[#ececf4] rounded-2xl p-6 shadow-sm flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[#8b889c] text-[12px] font-bold uppercase tracking-wider">
            <AlertTriangle size={16} className="text-[#f0a83c]" /> Error Absoluto (MAE)
          </div>
          <div className="text-[36px] font-extrabold text-[#2c2a3d] leading-none mt-1">8.4</div>
          <div className="text-[#8b889c] text-[13px] mt-1">
            Visitas de desviación estándar
          </div>
        </div>
      </div>

      {/* PANEL DE RECOMENDACIONES IA */}
      <div className="bg-gradient-to-r from-[#f0f4ff] to-[#f8faff] border border-[#dbeafe] rounded-2xl p-6 shadow-sm mb-6">
        <h3 className="text-[15px] font-extrabold text-[#1e3a8a] mb-4 flex items-center gap-2">
          <Lightbulb size={20} className="text-[#3b82f6] fill-[#3b82f6]" /> Recomendaciones Inteligentes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#ececf4] flex gap-3 items-start hover:border-[#3b82f6] transition-colors">
            <div className="bg-[#fee2e2] text-[#ef4444] p-2 rounded-lg shrink-0"><AlertTriangle size={18}/></div>
            <div>
              <h4 className="text-[13px] font-bold text-[#2c2a3d] mb-1">Pico de demanda el Viernes</h4>
              <p className="text-[12px] text-[#8b889c] leading-snug">Se estiman 55 visitas. Se recomienda reforzar el personal de registro en recepción entre las 09:00 AM y 11:30 AM para evitar cuellos de botella.</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#ececf4] flex gap-3 items-start hover:border-[#3b82f6] transition-colors">
            <div className="bg-[#dcfce3] text-[#16a34a] p-2 rounded-lg shrink-0"><TrendingUp size={18}/></div>
            <div>
              <h4 className="text-[13px] font-bold text-[#2c2a3d] mb-1">Tendencia en Traumatología</h4>
              <p className="text-[12px] text-[#8b889c] leading-snug">El área muestra un incremento inusual del 14% para el fin de semana. Verifique la disponibilidad de los especialistas de guardia.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Principal: Gráfico y Factores */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        
        {/* Gráfico de Proyección (Ocupa 2 columnas) */}
        <div className="xl:col-span-2 bg-white border border-[#ececf4] rounded-2xl p-6 shadow-sm flex flex-col">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 border-b border-[#ececf4] pb-4">
            <h3 className="text-[16px] font-bold text-[#2c2a3d] flex items-center gap-2">
              <BarChart2 size={18} className="text-[#5b4fcf]" /> Proyección diaria (Con margen de error)
            </h3>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="flex bg-[#f4f5fb] p-1 rounded-lg border border-[#ececf4]">
                <button className="px-4 py-1.5 text-[12px] font-bold bg-white text-[#5b4fcf] rounded-md shadow-sm">7 días</button>
                <button className="px-4 py-1.5 text-[12px] font-bold text-[#8b889c] hover:text-[#2c2a3d] transition-colors">14 días</button>
                <button className="px-4 py-1.5 text-[12px] font-bold text-[#8b889c] hover:text-[#2c2a3d] transition-colors">Mes</button>
              </div>
              <button className="hidden md:flex items-center gap-2 bg-white border border-[#ececf4] text-[#2c2a3d] px-3 py-1.5 rounded-lg text-[12px] font-bold hover:bg-[#f4f5fb] transition-colors shadow-sm">
                <Download size={14} /> Exportar CSV
              </button>
            </div>
          </div>

          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              {/* Usamos ComposedChart para combinar el Área de sombra y la Línea */}
              <ComposedChart data={proyeccionData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ececf4" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#8b889c' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#8b889c' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  labelStyle={{ fontWeight: 'bold', color: '#2c2a3d', marginBottom: '4px' }}
                />
                <Area type="monotone" dataKey="rango" fill="#fff1f2" stroke="none" activeDot={false} />
                <Line type="monotone" dataKey="visitas" stroke="#e0525f" strokeWidth={4} dot={{ r: 5, fill: '#e0525f', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 7, strokeWidth: 0 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Factores más influyentes (Ocupa 1 columna) */}
        <div className="xl:col-span-1 bg-white border border-[#ececf4] rounded-2xl p-6 shadow-sm flex flex-col">
          <h3 className="text-[16px] font-bold text-[#2c2a3d] mb-6 flex items-center gap-2">
            <BrainCircuit size={18} className="text-[#5b4fcf]" /> Peso de los factores
          </h3>
          <div className="flex flex-col gap-6 flex-1 justify-center">
            {factoresData.map((factor, index) => (
              <div key={index} className="flex flex-col gap-1.5">
                <div className="flex justify-between text-[13px] font-bold">
                  <span className="text-[#2c2a3d]">{factor.name}</span>
                  <span className="text-[#5b4fcf] bg-[#f4f5fb] px-2 py-0.5 rounded-md text-[11px]">{factor.impacto}</span>
                </div>
                <div className="h-2 w-full bg-[#f4f5fb] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#7c6ff0] to-[#5b4fcf] rounded-full" style={{ width: factor.width }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Detalle Día por Día */}
      <div className="bg-white border border-[#ececf4] rounded-2xl p-6 shadow-sm">
        <h3 className="text-[16px] font-bold text-[#2c2a3d] mb-4">Detalle diario proyectado</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {detalleDias.map((dia, index) => (
            <div key={index} className="bg-[#f9fafc] border border-[#ececf4] rounded-xl p-4 flex flex-col justify-center items-center text-center hover:border-[#5b4fcf] hover:bg-white transition-all cursor-default shadow-sm">
              <span className="text-[12px] font-extrabold text-[#2c2a3d] uppercase tracking-wide mb-1">{dia.dia.split(' ')[0]}</span>
              <span className="text-[11px] font-medium text-[#8b889c] mb-2">{dia.dia.substring(dia.dia.indexOf(' ')+1)}</span>
              <div className="text-[22px] font-extrabold text-[#5b4fcf] leading-none mb-1">{dia.count}</div>
              <span className="text-[11px] font-bold text-[#8b889c]">visitas</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}