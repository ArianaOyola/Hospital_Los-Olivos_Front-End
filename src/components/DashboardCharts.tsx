import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

// Datos simulados (en la Fase 2, esto vendrá de tu base de datos)
const dataMensual = [
  { name: 'Ene', visitas: 150 }, { name: 'Feb', visitas: 230 },
  { name: 'Mar', visitas: 180 }, { name: 'Abr', visitas: 290 },
  { name: 'May', visitas: 200 }, { name: 'Jun', visitas: 340 },
  { name: 'Jul', visitas: 310 }, { name: 'Ago', visitas: 280 },
  { name: 'Sep', visitas: 390 }, { name: 'Oct', visitas: 320 },
  { name: 'Nov', visitas: 410 }, { name: 'Dic', visitas: 380 },
];

const dataArea = [
  { name: 'Medicina General', value: 32, color: '#5b4fcf' },
  { name: 'Pediatría', value: 21, color: '#22b573' },
  { name: 'Traumatología', value: 18, color: '#4f6ef7' },
  { name: 'Cardiología', value: 14, color: '#f0a83c' },
  { name: 'Otras áreas', value: 15, color: '#c9c6e0' },
];

export function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
      
      {/* Gráfico de Líneas (Ocupa 2 de las 3 columnas en pantallas grandes) */}
      <div className="bg-white border border-[#ececf4] rounded-2xl p-6 shadow-sm lg:col-span-2">
        <h3 className="text-[15px] font-bold text-[#2c2a3d] mb-6">Visitas por mes</h3>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dataMensual} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ececf4" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#8b889c' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#8b889c' }} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Line type="monotone" dataKey="visitas" stroke="#5b4fcf" strokeWidth={3} dot={{ r: 4, fill: '#5b4fcf', strokeWidth: 0 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gráfico Circular (Ocupa 1 columna) */}
      <div className="bg-white border border-[#ececf4] rounded-2xl p-6 shadow-sm flex flex-col">
        <h3 className="text-[15px] font-bold text-[#2c2a3d] mb-2">Visitas por área</h3>
        <div className="flex-1 min-h-[180px] w-full flex justify-center items-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={dataArea} innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value" stroke="none">
                {dataArea.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Leyenda del gráfico circular */}
        <ul className="flex flex-col gap-2 mt-4">
          {dataArea.map((item, index) => (
            <li key={index} className="flex items-center gap-2 text-[13px] text-[#2c2a3d]">
              <span className="w-2.5 h-2.5 rounded-full block flex-shrink-0" style={{ backgroundColor: item.color }}></span>
              <span className="truncate">{item.name}</span> 
              <span className="ml-auto font-medium text-[#8b889c]">{item.value}%</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}