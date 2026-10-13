import { useMemo, useState } from 'react';
import {
  CalendarDays,
  PieChart,
  List,
  User,
  TrendingUp,
  Settings,
  Download,
  Search,
  FileDown,
  Sheet,
} from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

interface UsuarioSesion {
  id: number;
  full_name: string;
  email: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

interface ReportesViewProps {
  user: UsuarioSesion;
}

interface Reporte {
  id: number;
  title: string;
  date: string;
  format: 'PDF' | 'Excel';
  type: string;
  from: string;
  to: string;
}

const reportTypes = [
  {
    title: 'Visitas por período',
    desc: 'Resumen general de visitas en un rango de fechas',
    icon: CalendarDays,
    color: 'text-[#7c6ff0]',
    bg: 'bg-[#f4f5fb]',
    badge: 'Más usado',
  },
  {
    title: 'Visitas por área',
    desc: 'Estadísticas de visitas agrupadas por área',
    icon: PieChart,
    color: 'text-[#4f6ef7]',
    bg: 'bg-[#f0f4ff]',
  },
  {
    title: 'Visitas por motivo',
    desc: 'Cantidad de visitas según el motivo',
    icon: List,
    color: 'text-[#f0a83c]',
    bg: 'bg-[#fffbf0]',
  },
  {
    title: 'Visitas por persona',
    desc: 'Reporte de visitas por persona visitada',
    icon: User,
    color: 'text-[#22b573]',
    bg: 'bg-[#f0fdf4]',
  },
  {
    title: 'Predicción de demanda',
    desc: 'Pronóstico de visitas con Random Forest',
    icon: TrendingUp,
    color: 'text-[#e0525f]',
    bg: 'bg-[#fff1f2]',
  },
  {
    title: 'Reporte personalizado',
    desc: 'Cree reportes con filtros específicos',
    icon: Settings,
    color: 'text-[#8b889c]',
    bg: 'bg-[#f9fafc]',
  },
];

// Datos de demostración. Todavía no proceden del backend.
const demoVisits = [
  {
    codigo: 'VIS-001',
    visitante: 'Juan Pérez',
    area: 'Emergencia',
    motivo: 'Visita a paciente',
    fecha: '2026-08-05',
    persona: 'Área de Emergencia',
  },
  {
    codigo: 'VIS-002',
    visitante: 'María López',
    area: 'Consulta externa',
    motivo: 'Consulta médica',
    fecha: '2026-08-12',
    persona: 'Consultorio 2',
  },
  {
    codigo: 'VIS-003',
    visitante: 'Carlos Ramos',
    area: 'Administración',
    motivo: 'Trámite administrativo',
    fecha: '2026-08-18',
    persona: 'Administración',
  },
  {
    codigo: 'VIS-004',
    visitante: 'Ana Torres',
    area: 'Hospitalización',
    motivo: 'Visita a paciente',
    fecha: '2026-08-25',
    persona: 'Hospitalización',
  },
];

const roleLabels: Record<string, string> = {
  admin: 'Administrador',
  recepcionista: 'Recepcionista',
  medico: 'Médico',
  enfermero: 'Enfermero',
  archivo: 'Archivo',
};

const formatDate = (date: string) => {
  if (!date) return '—';

  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
};

export function ReportesView({ user }: ReportesViewProps) {
  const today = new Date();
  const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0'),
  ].join('-');

  const firstDayString = `${today.getFullYear()}-${String(
    today.getMonth() + 1,
  ).padStart(2, '0')}-01`;

  const [reportType, setReportType] = useState('Visitas por período');
  const [dateFrom, setDateFrom] = useState(firstDayString);
  const [dateTo, setDateTo] = useState(todayString);
  const [search, setSearch] = useState('');
  const [notice, setNotice] = useState('');
  const [reports, setReports] = useState<Reporte[]>([]);

  const initials = user.full_name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase();

  const visibleReports = useMemo(
    () =>
      reports.filter((report) =>
        report.title.toLowerCase().includes(search.toLowerCase()),
      ),
    [reports, search],
  );

  const filteredVisits = useMemo(() => {
    return demoVisits.filter((visit) => {
      const afterStart = !dateFrom || visit.fecha >= dateFrom;
      const beforeEnd = !dateTo || visit.fecha <= dateTo;

      return afterStart && beforeEnd;
    });
  }, [dateFrom, dateTo]);

  const getReportRows = () => {
    if (reportType === 'Visitas por área') {
      const totals: Record<string, number> = {};

      filteredVisits.forEach((visit) => {
        totals[visit.area] = (totals[visit.area] || 0) + 1;
      });

      return Object.entries(totals).map(([area, total]) => ({
        Área: area,
        'Cantidad de visitas': total,
      }));
    }

    if (reportType === 'Visitas por motivo') {
      const totals: Record<string, number> = {};

      filteredVisits.forEach((visit) => {
        totals[visit.motivo] = (totals[visit.motivo] || 0) + 1;
      });

      return Object.entries(totals).map(([motivo, total]) => ({
        Motivo: motivo,
        'Cantidad de visitas': total,
      }));
    }

    if (reportType === 'Visitas por persona') {
      return filteredVisits.map((visit) => ({
        Visitante: visit.visitante,
        'Persona o destino': visit.persona,
        Área: visit.area,
        Fecha: formatDate(visit.fecha),
      }));
    }

    if (reportType === 'Predicción de demanda') {
      return [
        {
          Indicador: 'Registros de demostración en el período',
          Valor: filteredVisits.length,
        },
        {
          Indicador: 'Pronóstico',
          Valor: 'No disponible: modelo predictivo no conectado',
        },
      ];
    }

    return filteredVisits.map((visit) => ({
      Código: visit.codigo,
      Visitante: visit.visitante,
      Área: visit.area,
      Motivo: visit.motivo,
      Fecha: formatDate(visit.fecha),
    }));
  };

  const registerReport = (format: 'PDF' | 'Excel') => {
    if (!reportType) {
      setNotice('Selecciona un tipo de reporte.');
      return;
    }

    if (dateFrom && dateTo && dateFrom > dateTo) {
      setNotice('La fecha inicial no puede ser posterior a la fecha final.');
      return;
    }

    const rows = getReportRows();

    if (rows.length === 0) {
      setNotice(
        'No hay registros de demostración para el rango de fechas seleccionado.',
      );
      return;
    }

    const fileDate = new Date().toISOString().slice(0, 10);
    const safeName = reportType
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_|_$/g, '');

    const filename = `reporte_${safeName}_${fileDate}`;

    if (format === 'PDF') {
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text('Hospital Los Olivos', 14, 18);

      doc.setFontSize(12);
      doc.text(reportType, 14, 28);

      doc.setFontSize(10);
      doc.text(
        `Período: ${dateFrom ? formatDate(dateFrom) : 'Sin inicio'} - ${
          dateTo ? formatDate(dateTo) : 'Sin fin'
        }`,
        14,
        36,
      );
      doc.text('Datos de demostración', 14, 43);

      const headers = Object.keys(rows[0]);
      const body = rows.map((row) =>
        headers.map((header) => String(row[header as keyof typeof row] ?? '')),
      );

      autoTable(doc, {
        startY: 49,
        head: [headers],
        body,
        styles: { fontSize: 9, cellPadding: 3 },
        headStyles: { fillColor: [91, 79, 207] },
      });

      doc.save(`${filename}.pdf`);
    } else {
      const worksheet = XLSX.utils.json_to_sheet(rows);
      const workbook = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte');
      XLSX.writeFile(workbook, `${filename}.xlsx`);
    }

    const newReport: Reporte = {
      id: Date.now(),
      title: reportType,
      date: new Date().toLocaleString('es-PE'),
      format,
      type: reportType,
      from: dateFrom,
      to: dateTo,
    };

    setReports((previous) => [newReport, ...previous]);
    setNotice(`${format} generado correctamente con datos de demostración.`);
  };

  const applyQuickDate = (period: 'today' | '7days' | 'month') => {
    const now = new Date();

    const to = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, '0'),
      String(now.getDate()).padStart(2, '0'),
    ].join('-');

    if (period === 'today') {
      setDateFrom(to);
      setDateTo(to);
      return;
    }

    if (period === '7days') {
      const start = new Date(now);
      start.setDate(start.getDate() - 6);

      setDateFrom(
        `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(
          2,
          '0',
        )}-${String(start.getDate()).padStart(2, '0')}`,
      );
      setDateTo(to);
      return;
    }

    setDateFrom(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`);
    setDateTo(to);
  };

  const selectReportType = (type: string) => {
    setReportType(type);
    setNotice('');
  };

  return (
    <div className="flex flex-col h-full animate-fade-in pb-8">
      <div className="mb-8 border-l-[5px] border-[#7c6ff0] pl-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#2c2a3d] tracking-tight mb-1.5">
            Reportes
          </h1>
          <p className="text-[#8b889c] text-[15px] font-medium">
            Genere y descargue reportes detallados de las visitas externas.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white border border-[#ececf4] py-1.5 pl-1.5 pr-5 rounded-full shadow-sm shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7c6ff0] to-[#3b2f78] flex items-center justify-center text-white font-bold text-sm shadow-inner">
            {initials || 'U'}
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-bold text-[#2c2a3d] leading-tight">
              {user.full_name}
            </span>
            <span className="text-[11px] font-bold text-[#5b4fcf] leading-tight uppercase tracking-wider mt-0.5">
              {roleLabels[user.role] || user.role}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#ececf4] rounded-2xl p-6 mb-8 shadow-sm">
        <div className="flex flex-col xl:flex-row gap-5 items-end">
          <div className="flex-1 w-full flex flex-col gap-2">
            <label className="text-[12px] font-bold text-[#8b889c] uppercase tracking-wider">
              Tipo de reporte
            </label>
            <select
              value={reportType}
              onChange={(event) => selectReportType(event.target.value)}
              className="border border-[#ececf4] rounded-xl px-4 py-3 text-[14px] focus:border-[#5b4fcf] outline-none text-[#2c2a3d] bg-white cursor-pointer shadow-sm"
            >
              {reportTypes.map((item) => (
                <option key={item.title} value={item.title}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 w-full flex flex-col gap-2">
            <div className="flex flex-wrap justify-between items-end gap-2">
              <label className="text-[12px] font-bold text-[#8b889c] uppercase tracking-wider">
                Rango de fechas
              </label>
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => applyQuickDate('today')}
                  className="text-[11px] font-bold text-[#5b4fcf] bg-[#f4f5fb] hover:bg-[#ececf4] px-2 py-1 rounded transition-colors"
                >
                  Hoy
                </button>
                <button
                  type="button"
                  onClick={() => applyQuickDate('7days')}
                  className="text-[11px] font-bold text-[#5b4fcf] bg-[#f4f5fb] hover:bg-[#ececf4] px-2 py-1 rounded transition-colors"
                >
                  7 días
                </button>
                <button
                  type="button"
                  onClick={() => applyQuickDate('month')}
                  className="text-[11px] font-bold text-[#5b4fcf] bg-[#f4f5fb] hover:bg-[#ececf4] px-2 py-1 rounded transition-colors"
                >
                  Este mes
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="date"
                value={dateFrom}
                onChange={(event) => setDateFrom(event.target.value)}
                className="w-full min-w-0 border border-[#ececf4] rounded-xl px-3 py-3 text-[14px] focus:border-[#5b4fcf] outline-none text-[#2c2a3d] shadow-sm"
              />
              <span className="text-[#8b889c] font-medium">a</span>
              <input
                type="date"
                value={dateTo}
                onChange={(event) => setDateTo(event.target.value)}
                className="w-full min-w-0 border border-[#ececf4] rounded-xl px-3 py-3 text-[14px] focus:border-[#5b4fcf] outline-none text-[#2c2a3d] shadow-sm"
              />
            </div>
          </div>

          <div className="w-full xl:w-auto flex gap-2 pt-2 xl:pt-0">
            <button
              type="button"
              onClick={() => registerReport('PDF')}
              className="flex-1 xl:flex-none flex items-center justify-center gap-2 bg-[#5b4fcf] text-white px-5 py-3 rounded-xl text-[14px] font-bold hover:bg-[#3b2f78] shadow-sm transition-colors"
            >
              <FileDown size={18} />
              Generar PDF
            </button>
            <button
              type="button"
              onClick={() => registerReport('Excel')}
              className="flex-1 xl:flex-none flex items-center justify-center gap-2 bg-[#22b573] text-white px-5 py-3 rounded-xl text-[14px] font-bold hover:bg-[#1a935c] shadow-sm transition-colors"
            >
              <Sheet size={18} />
              Generar Excel
            </button>
          </div>
        </div>

        {notice && (
          <p
            role="status"
            className="mt-4 text-sm font-medium text-[#5b4fcf]"
          >
            {notice}
          </p>
        )}

        <p className="mt-3 text-xs text-[#8b889c]">
          Nota: los archivos se generan con datos de demostración. Esta pantalla
          aún no consulta los registros reales del backend.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 flex flex-col gap-4">
          <h3 className="text-[16px] font-bold text-[#2c2a3d] mb-1">
            Catálogo de reportes
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportTypes.map((item) => {
              const Icon = item.icon;
              const selected = reportType === item.title;

              return (
                <button
                  type="button"
                  key={item.title}
                  onClick={() => selectReportType(item.title)}
                  aria-pressed={selected}
                  className={`relative text-left bg-white border rounded-2xl p-5 shadow-sm transition-all flex items-start gap-4 ${
                    selected
                      ? 'border-[#5b4fcf] ring-1 ring-[#5b4fcf]'
                      : 'border-[#ececf4] hover:border-[#5b4fcf] hover:shadow-md'
                  }`}
                >
                  {item.badge && (
                    <span className="absolute top-3 right-3 bg-[#e5f7ed] text-[#22b573] text-[10px] font-extrabold px-2 py-0.5 rounded-md tracking-wider uppercase">
                      {item.badge}
                    </span>
                  )}

                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${item.bg} ${item.color}`}
                  >
                    <Icon size={22} />
                  </div>

                  <div className="pr-10">
                    <h4 className="text-[14px] font-bold text-[#2c2a3d] mb-1">
                      {item.title}
                    </h4>
                    <p className="text-[13px] text-[#8b889c] leading-snug">
                      {item.desc}
                    </p>
                    {selected && (
                      <p className="mt-2 text-[11px] font-bold text-[#5b4fcf]">
                        Seleccionado
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="xl:col-span-1 flex flex-col gap-4">
          <h3 className="text-[16px] font-bold text-[#2c2a3d] mb-1">
            Reportes generados
          </h3>

          <div className="bg-white border border-[#ececf4] rounded-2xl shadow-sm overflow-hidden flex flex-col">
            <div className="p-4 border-b border-[#ececf4] bg-[#f9fafc]">
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Buscar reportes generados..."
                  className="w-full bg-white border border-[#ececf4] rounded-lg pl-9 pr-3 py-2 text-[13px] focus:border-[#5b4fcf] outline-none"
                />
                <Search
                  size={14}
                  className="absolute left-3 top-2.5 text-[#8b889c]"
                />
              </div>
            </div>

            {visibleReports.length > 0 ? (
              <div className="flex flex-col">
                {visibleReports.map((report) => (
                  <div
                    key={report.id}
                    className="p-5 border-b border-[#ececf4] last:border-0 hover:bg-[#f4f5fb] transition-colors flex items-center justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <h5 className="text-[13px] font-bold text-[#2c2a3d] leading-tight mb-1">
                        {report.title}
                      </h5>
                      <p className="text-[11px] text-[#8b889c]">
                        Generado: {report.date}
                      </p>
                      <p className="text-[11px] text-[#8b889c]">
                        {formatDate(report.from)} - {formatDate(report.to)}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold tracking-wider shrink-0 ${
                        report.format === 'PDF'
                          ? 'bg-[#fee2e2] text-[#ef4444]'
                          : 'bg-[#dcfce3] text-[#16a34a]'
                      }`}
                    >
                      {report.format}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center">
                <FileDown
                  size={28}
                  className="mx-auto mb-2 text-[#b9b6c9]"
                />
                <p className="text-[13px] font-semibold text-[#2c2a3d]">
                  No hay reportes generados
                </p>
                <p className="mt-1 text-[12px] text-[#8b889c]">
                  Genera un PDF o Excel para verlo aquí.
                </p>
              </div>
            )}

            <div className="p-3 border-t border-[#ececf4] bg-[#f9fafc]">
              <p className="text-[11px] text-[#8b889c] text-center">
                El historial se mantiene mientras esta pantalla esté abierta.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}