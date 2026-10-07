import { ReactNode } from 'react';

// Le decimos a TypeScript qué datos va a recibir nuestra tarjeta
interface KpiCardProps {
  title: string;
  value: string;
  subtitle: string;
  iconBgColor: string;
  icon: ReactNode;
}

export function KpiCard({ title, value, subtitle, iconBgColor, icon }: KpiCardProps) {
  return (
    <div className="bg-white border border-[#ececf4] rounded-2xl p-[18px] px-5 flex flex-col gap-2.5 shadow-sm">
      <div className="flex justify-between items-center">
        <span className="text-[26px] font-bold text-[#2c2a3d] leading-none">{value}</span>
        <span className={`w-[38px] h-[38px] rounded-xl flex items-center justify-center text-white ${iconBgColor}`}>
          {icon}
        </span>
      </div>
      <div>
        <div className="text-[14px] text-[#2c2a3d]">{title}</div>
        <div className="text-[12px] text-[#8b889c] mt-0.5">{subtitle}</div>
      </div>
    </div>
  );
}