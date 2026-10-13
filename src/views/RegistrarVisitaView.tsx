
import {
  Save,
  Eraser,
  User,
  Stethoscope,
  Users,
  Search,
  Check,
  Calendar,
  Clock,
  AlertCircle,
  Info,
  CalendarDays,
  FileText,
} from 'lucide-react';

interface UsuarioSesion {
  id: number;
  full_name: string;
  email: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

interface RegistrarVisitaProps {
  user: UsuarioSesion;
}

const nombresRoles: Record<string, string> = {
  admin: 'Administrador',
  recepcionista: 'Recepcionista',
  medico: 'Médico',
  enfermero: 'Enfermero/a',
  archivo: 'Personal de archivo',
};

export function RegistrarVisitaView({
  user,
}: RegistrarVisitaProps) {
  const nombreUsuario = user.full_name?.trim() || 'Usuario';

  const iniciales = nombreUsuario
    .split(/\s+/)
    .slice(0, 2)
    .map((parte) => parte.charAt(0))
    .join('')
    .toUpperCase();

  const rolUsuario = nombresRoles[user.role] ?? user.role;

  return (
    <div className="flex flex-col h-full animate-fade-in pb-8">
      {/* Cabecera con el perfil del usuario conectado */}
      <div className="mb-6 border-l-[5px] border-[#22b573] pl-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#2c2a3d] tracking-tight mb-1.5">
            Registrar nueva visita
          </h1>

          <p className="text-[#8b889c] text-[15px] font-medium">
            Complete los datos para registrar la visita externa
          </p>
        </div>

        {/* Perfil dinámico */}
        <div className="flex items-center gap-3 bg-white border border-[#ececf4] py-1.5 pl-1.5 pr-5 rounded-full shadow-sm shrink-0 hover:border-[#22b573] transition-colors">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#22b573] to-[#1a935c] flex items-center justify-center text-white font-bold text-sm shadow-inner">
            {iniciales}
          </div>

          <div className="flex flex-col">
            <span className="text-[13px] font-bold text-[#2c2a3d] leading-tight">
              {nombreUsuario}
            </span>

            <span className="text-[11px] font-bold text-[#22b573] leading-tight uppercase tracking-wider mt-0.5">
              {rolUsuario}
            </span>
          </div>
        </div>
      </div>

      {/* Alerta informativa */}
      <div className="bg-[#f0f9ff] border border-[#bae6fd] rounded-xl p-4 mb-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-[#0284c7] text-white rounded-full p-1">
            <Check size={16} />
          </div>

          <div>
            <strong className="text-[14px] text-[#0c4a6e] block">
              Guardado automáticamente
            </strong>

            <span className="text-[13px] text-[#0369a1]">
              La información ingresada se está guardando en borrador.
            </span>
          </div>
        </div>
      </div>

      {/* Grid principal */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Columna izquierda: formulario */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          <div className="bg-white border border-[#ececf4] rounded-2xl shadow-sm p-8 flex flex-col gap-10">
            {/* Sección 1: datos del visitante */}
            <section>
              <div className="flex items-center gap-2 mb-5 border-b border-[#ececf4] pb-3">
                <User size={20} className="text-[#22b573]" />

                <h2 className="text-[16px] font-bold text-[#2c2a3d]">
                  1. Datos del Visitante
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-[#2c2a3d]">
                    DNI <span className="text-[#e0525f]">*</span>
                  </label>

                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Ingrese DNI"
                      maxLength={8}
                      className="w-full border border-[#ececf4] rounded-xl pl-4 pr-10 py-3 text-[14px] focus:border-[#22b573] focus:ring-1 focus:ring-[#22b573] outline-none transition-colors"
                    />

                    <Search
                      size={18}
                      className="absolute right-3 top-3.5 text-[#8b889c]"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-[#2c2a3d]">
                    Nombres <span className="text-[#e0525f]">*</span>
                  </label>

                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Ingrese nombres"
                      className="w-full border border-[#ececf4] rounded-xl pl-4 pr-10 py-3 text-[14px] focus:border-[#22b573] focus:ring-1 focus:ring-[#22b573] outline-none transition-colors"
                    />

                    <Check
                      size={18}
                      className="absolute right-3 top-3.5 text-[#22b573] opacity-50"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-[#2c2a3d]">
                    Apellidos <span className="text-[#e0525f]">*</span>
                  </label>

                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Ingrese apellidos"
                      className="w-full border border-[#ececf4] rounded-xl pl-4 pr-10 py-3 text-[14px] focus:border-[#22b573] focus:ring-1 focus:ring-[#22b573] outline-none transition-colors"
                    />

                    <Check
                      size={18}
                      className="absolute right-3 top-3.5 text-[#22b573] opacity-50"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Sección 2: detalles de la visita */}
            <section>
              <div className="flex items-center gap-2 mb-5 border-b border-[#ececf4] pb-3">
                <Stethoscope size={20} className="text-[#22b573]" />

                <h2 className="text-[16px] font-bold text-[#2c2a3d]">
                  2. Detalles de la Visita
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-[#2c2a3d]">
                    Fecha de visita{' '}
                    <span className="text-[#e0525f]">*</span>
                  </label>

                  <div className="relative">
                    <input
                      type="text"
                      defaultValue="19/09/2026"
                      className="w-full border border-[#ececf4] rounded-xl pl-4 pr-10 py-3 text-[14px] focus:border-[#22b573] focus:ring-1 focus:ring-[#22b573] outline-none transition-colors"
                    />

                    <Calendar
                      size={18}
                      className="absolute right-3 top-3.5 text-[#8b889c]"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-[#2c2a3d]">
                    Hora de ingreso{' '}
                    <span className="text-[#e0525f]">*</span>
                  </label>

                  <div className="relative">
                    <input
                      type="text"
                      defaultValue="10:30 AM"
                      className="w-full border border-[#ececf4] rounded-xl pl-4 pr-10 py-3 text-[14px] focus:border-[#22b573] focus:ring-1 focus:ring-[#22b573] outline-none transition-colors"
                    />

                    <Clock
                      size={18}
                      className="absolute right-3 top-3.5 text-[#8b889c]"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-[#2c2a3d]">
                    Área de destino{' '}
                    <span className="text-[#e0525f]">*</span>
                  </label>

                  <select className="border border-[#ececf4] rounded-xl px-4 py-3 text-[14px] text-[#2c2a3d] focus:border-[#22b573] outline-none bg-white transition-colors">
                    <option value="">Seleccione el área</option>
                    <option>Medicina General</option>
                    <option>Pediatría</option>
                    <option>Traumatología</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-[#2c2a3d]">
                    Motivo de la visita{' '}
                    <span className="text-[#e0525f]">*</span>
                  </label>

                  <select className="border border-[#ececf4] rounded-xl px-4 py-3 text-[14px] text-[#2c2a3d] focus:border-[#22b573] outline-none bg-white transition-colors">
                    <option value="">Seleccione el motivo</option>
                    <option>Consulta médica</option>
                    <option>Visita a paciente</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-[#2c2a3d]">
                    Persona visitada
                  </label>

                  <input
                    type="text"
                    placeholder="Ingrese nombre"
                    className="border border-[#ececf4] rounded-xl px-4 py-3 text-[14px] focus:border-[#22b573] outline-none transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-[#2c2a3d]">
                    Doctor a visitar{' '}
                    <span className="text-[#e0525f]">*</span>
                  </label>

                  <select className="border border-[#ececf4] rounded-xl px-4 py-3 text-[14px] text-[#2c2a3d] focus:border-[#22b573] outline-none bg-white transition-colors">
                    <option value="">Seleccione el doctor</option>
                    <option>Dr. Pérez</option>
                    <option>Dra. García</option>
                  </select>
                </div>
              </div>

              {/* Información del registro */}
              <div className="bg-[#f9fafc] border border-[#ececf4] rounded-xl p-4 mt-6 flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex items-center gap-2">
                  <Info size={18} className="text-[#22b573]" />

                  <span className="text-[13px] font-bold text-[#2c2a3d]">
                    Info. Registro:
                  </span>
                </div>

                <div className="flex gap-6">
                  <div>
                    <span className="text-[11px] text-[#8b889c] block uppercase font-bold">
                      Fecha
                    </span>

                    <span className="text-[13px] text-[#2c2a3d] font-medium">
                      —
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] text-[#8b889c] block uppercase font-bold">
                      Hora
                    </span>

                    <span className="text-[13px] text-[#2c2a3d] font-medium">
                      —
                    </span>
                  </div>
                </div>

                <div className="text-[12px] text-[#8b889c] md:ml-auto italic">
                  * Registrado automáticamente al guardar
                </div>
              </div>
            </section>

            {/* Sección 3: acompañante y observaciones */}
            <section>
              <div className="flex items-center gap-2 mb-5 border-b border-[#ececf4] pb-3">
                <Users size={20} className="text-[#22b573]" />

                <h2 className="text-[16px] font-bold text-[#2c2a3d]">
                  3. Acompañante y Observaciones
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-[#2c2a3d]">
                    Nombres (Acompañante)
                  </label>

                  <input
                    type="text"
                    placeholder="Opcional"
                    className="border border-[#ececf4] rounded-xl px-4 py-3 text-[14px] bg-[#f9fafc] focus:border-[#22b573] outline-none transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-[#2c2a3d]">
                    Apellidos (Acompañante)
                  </label>

                  <input
                    type="text"
                    placeholder="Opcional"
                    className="border border-[#ececf4] rounded-xl px-4 py-3 text-[14px] bg-[#f9fafc] focus:border-[#22b573] outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-[#2c2a3d]">
                  Observaciones
                </label>

                <textarea
                  rows={3}
                  placeholder="Ingrese observaciones adicionales..."
                  className="border border-[#ececf4] rounded-xl px-4 py-3 text-[14px] focus:border-[#22b573] outline-none resize-none transition-colors"
                />
              </div>
            </section>
          </div>
        </div>

        {/* Columna derecha: paneles */}
        <div className="xl:col-span-1 flex flex-col gap-6">
          {/* Validación del formulario */}
          <div className="bg-white border border-[#ececf4] rounded-2xl shadow-sm p-6">
            <h3 className="text-[15px] font-bold text-[#2c2a3d] mb-4 flex items-center gap-2">
              <Check size={18} className="text-[#22b573]" />
              Validación del formulario
            </h3>

            <div className="bg-[#fffbeb] border border-[#fde68a] p-3 rounded-xl flex gap-3 mb-5">
              <AlertCircle
                size={18}
                className="text-[#d97706] shrink-0 mt-0.5"
              />

              <div>
                <strong className="text-[13px] text-[#b45309] block">
                  Campos por completar (9)
                </strong>

                <span className="text-[12px] text-[#d97706]">
                  Complete los campos para continuar.
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-6">
              {[
                'DNI del visitante',
                'Nombres',
                'Apellidos',
                'Fecha de visita',
                'Hora de ingreso',
                'Área de destino',
                'Motivo de la visita',
                'Doctor a visitar',
              ].map((item) => (
                <div
                  key={item}
                  className="flex justify-between items-center py-1.5 border-b border-[#f4f5fb] last:border-0"
                >
                  <span className="text-[13px] text-[#2c2a3d]">
                    {item}
                  </span>

                  <span className="text-[11px] font-bold bg-[#fef3c7] text-[#d97706] px-2 py-0.5 rounded-full">
                    Pendiente
                  </span>
                </div>
              ))}
            </div>

            <button
              type="button"
              disabled
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-[14px] font-bold text-white bg-[#22b573] hover:bg-[#1a935c] transition-colors shadow-sm mb-3 opacity-60 cursor-not-allowed"
            >
              <User size={18} />
              Registrar visita
            </button>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-[13px] font-bold text-[#8b889c] hover:bg-[#f4f5fb] transition-colors"
            >
              <Eraser size={16} />
              Limpiar formulario
            </button>
          </div>

          {/* Disponibilidad del doctor */}
          <div className="bg-white border border-[#ececf4] rounded-2xl shadow-sm p-6">
            <h3 className="text-[15px] font-bold text-[#2c2a3d] mb-1 flex items-center gap-2">
              <CalendarDays
                size={18}
                className="text-[#22b573]"
              />
              Disponibilidad del doctor
            </h3>

            <p className="text-[12px] text-[#8b889c] mb-4 pl-6">
              Seleccione un doctor para ver horarios
            </p>

            <div className="bg-[#f4f5fb] rounded-xl p-6 flex flex-col items-center justify-center text-center border border-dashed border-[#c9c6e0] min-h-[200px]">
              <FileText
                size={32}
                className="text-[#c9c6e0] mb-2"
              />

              <strong className="text-[13px] text-[#8b889c]">
                Esperando selección...
              </strong>

              <span className="text-[12px] text-[#8b889c] mt-1 px-4">
                Al seleccionar un doctor, aparecerá aquí su calendario
                y turnos disponibles.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
