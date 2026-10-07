import { KpiCard } from '../components/KpiCard';
import { DashboardCharts } from '../components/DashboardCharts';
import { Users, TrendingUp, Clock, CheckCircle, BarChart2 } from 'lucide-react';

export function DashboardView() {
  return (
    <>
      {/* Cabecera de la página */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div className="border-l-[5px] border-[#5b4fcf] pl-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#2c2a3d] tracking-tight mb-1.5">
            Dashboard General
          </h1>
          <p className="text-[#8b889c] text-[15px] font-medium">
            Monitor y resumen en tiempo real del registro de visitas externas.
          </p>
        </div>
        
        {/* Perfil de Usuario */}
        <div className="flex items-center gap-3 bg-white border border-[#ececf4] py-1.5 pl-1.5 pr-5 rounded-full shadow-sm cursor-pointer hover:border-[#5b4fcf] transition-colors">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7c6ff0] to-[#3b2f78] flex items-center justify-center text-white font-bold text-sm shadow-inner">
            CH
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-bold text-[#2c2a3d] leading-tight">Camila Huancahuari</span>
            <span className="text-[11px] font-bold text-[#5b4fcf] leading-tight uppercase tracking-wider mt-0.5">Administrador</span>
          </div>
        </div>
      </div>
      
      {/* Tarjetas KPI */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <KpiCard value="1,250" title="Total de visitas" subtitle="Este mes" iconBgColor="bg-[#4f6ef7]" icon={<Users size={20} />} />
        <KpiCard value="85" title="Visitas hoy" subtitle="18% más que ayer" iconBgColor="bg-[#7c6ff0]" icon={<TrendingUp size={20} />} />
        <KpiCard value="12" title="Visitas en espera" subtitle="Por registrar salida" iconBgColor="bg-[#f0a83c]" icon={<Clock size={20} />} />
        <KpiCard value="1,138" title="Visitas registradas" subtitle="Completadas" iconBgColor="bg-[#22b573]" icon={<CheckCircle size={20} />} />
      </div>

      {/* Gráficos */}
      <DashboardCharts />

      {/* Panel de Predicción */}
      <div className="bg-white border border-[#ececf4] rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h3 className="text-[15px] font-bold text-[#2c2a3d] mb-1">Predicción de visitas (Random Forest)</h3>
          <p className="text-[#8b889c] text-[13px] m-0">Se estima que en los próximos 7 días habrá:</p>
          <div className="text-[30px] font-bold text-[#2c2a3d] mt-2 leading-none">320 ± 28 visitas</div>
          <div className="text-[#22b573] text-[13px] font-semibold mt-2 flex items-center gap-1">
            <TrendingUp size={14} /> Aumento esperado
          </div>
        </div>
        <button className="bg-[#3b2f78] text-white px-5 py-3 rounded-xl text-[13px] font-semibold flex items-center justify-center gap-2 hover:bg-[#5b4fcf] transition-colors">
          <BarChart2 size={16} />
          Ver análisis detallado
        </button>
      </div>
    </>
  );
}