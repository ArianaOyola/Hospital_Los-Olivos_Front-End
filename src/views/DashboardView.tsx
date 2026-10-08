import { Users, TrendingUp, Clock, CheckCircle2, BarChart2 } from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

interface DashboardProps {
  onNavigate?: (view: string) => void;
}

// Datos del gráfico de líneas
const visitasMensuales = [
  { name: 'Ene', visitas: 150 }, { name: 'Feb', visitas: 220 },
  { name: 'Mar', visitas: 180 }, { name: 'Abr', visitas: 290 },
  { name: 'May', visitas: 200 }, { name: 'Jun', visitas: 340 },
  { name: 'Jul', visitas: 310 }, { name: 'Ago', visitas: 280 },
  { name: 'Sep', visitas: 390 }, { name: 'Oct', visitas: 320 },
  { name: 'Nov', visitas: 410 }, { name: 'Dic', visitas: 380 },
];

// Datos del gráfico de anillo (Colores actualizados sin morado)
const visitasPorArea = [
  { name: 'Medicina General', value: 32, color: '#0ea5e9' }, // Azul claro corporativo
  { name: 'Pediatría', value: 21, color: '#22b573' },        // Verde principal
  { name: 'Traumatología', value: 18, color: '#3b82f6' },    // Azul fuerte
  { name: 'Cardiología', value: 14, color: '#f59e0b' },      // Ámbar
  { name: 'Otras áreas', value: 15, color: '#cbd5e1' },      // Gris
];

export function DashboardView({ onNavigate }: DashboardProps) {
  return (
    <div className="flex flex-col h-full animate-fade-in pb-8">
      
      {/* Cabecera con el Perfil en Verde */}
      <div className="mb-6 flex items-center justify-between">
        <div className="border-l-[5px] border-[#22b573] pl-4">
          <h1 className="text-3xl font-extrabold text-[#2c2a3d] tracking-tight mb-1">
            Dashboard General
          </h1>
          <p className="text-[#8b889c] text-[14px]">
            Monitor y resumen en tiempo real del registro de visitas externas.
          </p>
        </div>
        
        {/* Perfil de Usuario 100% Verde */}
        <div className="flex items-center gap-3 bg-white border border-[#ececf4] py-1.5 pl-1.5 pr-5 rounded-full shadow-sm hover:border-[#22b573] transition-colors cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-[#22b573] flex items-center justify-center text-white font-bold text-sm">
            CH
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-bold text-[#2c2a3d] leading-tight">Camila Huancahuari</span>
            <span className="text-[11px] font-bold text-[#22b573] leading-tight tracking-wider uppercase mt-0.5">Administrador</span>
          </div>
        </div>
      </div>

      {/* 4 Tarjetas KPI superiores (Colores actualizados) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <div className="bg-white border border-[#ececf4] rounded-2xl p-5 shadow-sm flex items-start justify-between">
          <div className="flex flex-col">
            <h3 className="text-[28px] font-extrabold text-[#2c2a3d] leading-none mb-2">1,250</h3>
            <p className="text-[13px] font-bold text-[#2c2a3d]">Total de visitas</p>
            <p className="text-[12px] text-[#8b889c]">Este mes</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#0ea5e9] text-white flex items-center justify-center">
            <Users size={20} />
          </div>
        </div>
        
        <div className="bg-white border border-[#ececf4] rounded-2xl p-5 shadow-sm flex items-start justify-between">
          <div className="flex flex-col">
            <h3 className="text-[28px] font-extrabold text-[#2c2a3d] leading-none mb-2">85</h3>
            <p className="text-[13px] font-bold text-[#2c2a3d]">Visitas hoy</p>
            <p className="text-[12px] text-[#8b889c]">18% más que ayer</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#10b981] text-white flex items-center justify-center">
            <TrendingUp size={20} />
          </div>
        </div>
        
        <div className="bg-white border border-[#ececf4] rounded-2xl p-5 shadow-sm flex items-start justify-between">
          <div className="flex flex-col">
            <h3 className="text-[28px] font-extrabold text-[#2c2a3d] leading-none mb-2">12</h3>
            <p className="text-[13px] font-bold text-[#2c2a3d]">Visitas en espera</p>
            <p className="text-[12px] text-[#8b889c]">Por registrar salida</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#f0a83c] text-white flex items-center justify-center">
            <Clock size={20} />
          </div>
        </div>
        
        <div className="bg-white border border-[#ececf4] rounded-2xl p-5 shadow-sm flex items-start justify-between">
          <div className="flex flex-col">
            <h3 className="text-[28px] font-extrabold text-[#2c2a3d] leading-none mb-2">1,138</h3>
            <p className="text-[13px] font-bold text-[#2c2a3d]">Visitas registradas</p>
            <p className="text-[12px] text-[#8b889c]">Completadas</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#22b573] text-white flex items-center justify-center">
            <CheckCircle2 size={20} />
          </div>
        </div>
      </div>

      {/* Sección de Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        
        {/* Gráfico de Líneas (Ahora en Verde) */}
        <div className="lg:col-span-2 bg-white border border-[#ececf4] rounded-2xl p-6 shadow-sm">
          <h3 className="text-[15px] font-extrabold text-[#2c2a3d] mb-6">Visitas por mes</h3>
          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={visitasMensuales} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ececf4" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#8b889c' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#8b889c' }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="visitas" stroke="#22b573" strokeWidth={3} dot={{ r: 4, fill: '#22b573', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico de Anillo */}
        <div className="lg:col-span-1 bg-white border border-[#ececf4] rounded-2xl p-6 shadow-sm flex flex-col">
          <h3 className="text-[15px] font-extrabold text-[#2c2a3d] mb-4">Visitas por área</h3>
          <div className="h-[180px] w-full mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={visitasPorArea} innerRadius={55} outerRadius={80} paddingAngle={2} dataKey="value">
                  {visitasPorArea.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col gap-2 mt-auto">
            {visitasPorArea.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-[13px]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-[#2c2a3d]">{item.name}</span>
                </div>
                <span className="font-bold text-[#8b889c]">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tarjeta inferior (Predicción) */}
      <div className="bg-white border border-[#ececf4] rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-1">
          <h3 className="text-[15px] font-extrabold text-[#2c2a3d]">Predicción de visitas (Random Forest)</h3>
          <p className="text-[13px] text-[#8b889c] mb-1">Se estima que en los próximos 7 días habrá:</p>
          <div className="text-[32px] font-extrabold text-[#2c2a3d] leading-none mb-1">
            320 ± 28 visitas
          </div>
          <span className="text-[#22b573] text-[13px] font-bold flex items-center gap-1">
            ↗ Aumento esperado
          </span>
        </div>
        
        <button
          onClick={() => onNavigate && onNavigate('analisis')}
          className="flex items-center justify-center gap-2 bg-[#22b573] text-white px-6 py-3 rounded-xl text-[14px] font-bold hover:bg-[#1a935c] shadow-sm transition-colors shrink-0"
        >
          <BarChart2 size={18} /> Ver análisis detallado
        </button>
      </div>

    </div>
  );
}