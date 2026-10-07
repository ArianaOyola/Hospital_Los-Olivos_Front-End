import { 
  Save, Eraser, User, Stethoscope, Users, Search, 
  Check, Calendar, Clock, AlertCircle, Info, CalendarDays, FileText
} from 'lucide-react';

export function RegistrarVisitaView() {
  return (
    <div className="flex flex-col h-full animate-fade-in pb-8">
      
      {/* Cabecera CON el perfil de usuario */}
      <div className="mb-6 border-l-[5px] border-[#22b573] pl-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#2c2a3d] tracking-tight mb-1.5">
            Registrar nueva visita
          </h1>
          <p className="text-[#8b889c] text-[15px] font-medium">
            Complete los datos para registrar la visita externa
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

      {/* Alerta de autoguardado */}
      <div className="bg-[#f0f9ff] border border-[#bae6fd] rounded-xl p-4 mb-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-[#0284c7] text-white rounded-full p-1">
            <Check size={16} />
          </div>
          <div>
            <strong className="text-[14px] text-[#0c4a6e] block">Guardado automáticamente</strong>
            <span className="text-[13px] text-[#0369a1]">La información ingresada se está guardando en borrador.</span>
          </div>
        </div>
      </div>

      {/* Grid Principal: 2 Columnas */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* COLUMNA IZQUIERDA: FORMULARIO */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          <div className="bg-white border border-[#ececf4] rounded-2xl shadow-sm p-8 flex flex-col gap-10">
            
            {/* SECCIÓN 1 */}
            <section>
              <div className="flex items-center gap-2 mb-5 border-b border-[#ececf4] pb-3">
                <User size={20} className="text-[#5b4fcf]" />
                <h2 className="text-[16px] font-bold text-[#2c2a3d]">1. Datos del Visitante</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-[#2c2a3d]">DNI <span className="text-[#e0525f]">*</span></label>
                  <div className="relative">
                    <input type="text" placeholder="Ingrese DNI" maxLength={8} className="w-full border border-[#ececf4] rounded-xl pl-4 pr-10 py-3 text-[14px] focus:border-[#5b4fcf] focus:ring-1 focus:ring-[#5b4fcf] outline-none" />
                    <Search size={18} className="absolute right-3 top-3.5 text-[#8b889c]" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-[#2c2a3d]">Nombres <span className="text-[#e0525f]">*</span></label>
                  <div className="relative">
                    <input type="text" placeholder="Ingrese nombres" className="w-full border border-[#ececf4] rounded-xl pl-4 pr-10 py-3 text-[14px] focus:border-[#5b4fcf] focus:ring-1 focus:ring-[#5b4fcf] outline-none" />
                    <Check size={18} className="absolute right-3 top-3.5 text-[#22b573] opacity-50" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-[#2c2a3d]">Apellidos <span className="text-[#e0525f]">*</span></label>
                  <div className="relative">
                    <input type="text" placeholder="Ingrese apellidos" className="w-full border border-[#ececf4] rounded-xl pl-4 pr-10 py-3 text-[14px] focus:border-[#5b4fcf] focus:ring-1 focus:ring-[#5b4fcf] outline-none" />
                    <Check size={18} className="absolute right-3 top-3.5 text-[#22b573] opacity-50" />
                  </div>
                </div>
              </div>
            </section>

            {/* SECCIÓN 2 */}
            <section>
              <div className="flex items-center gap-2 mb-5 border-b border-[#ececf4] pb-3">
                <Stethoscope size={20} className="text-[#5b4fcf]" />
                <h2 className="text-[16px] font-bold text-[#2c2a3d]">2. Detalles de la Visita</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-[#2c2a3d]">Fecha de visita <span className="text-[#e0525f]">*</span></label>
                  <div className="relative">
                    <input type="text" defaultValue="19/09/2026" className="w-full border border-[#ececf4] rounded-xl pl-4 pr-10 py-3 text-[14px] focus:border-[#5b4fcf] focus:ring-1 focus:ring-[#5b4fcf] outline-none" />
                    <Calendar size={18} className="absolute right-3 top-3.5 text-[#8b889c]" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-[#2c2a3d]">Hora de ingreso <span className="text-[#e0525f]">*</span></label>
                  <div className="relative">
                    <input type="text" defaultValue="10:30 AM" className="w-full border border-[#ececf4] rounded-xl pl-4 pr-10 py-3 text-[14px] focus:border-[#5b4fcf] focus:ring-1 focus:ring-[#5b4fcf] outline-none" />
                    <Clock size={18} className="absolute right-3 top-3.5 text-[#8b889c]" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-[#2c2a3d]">Área de destino <span className="text-[#e0525f]">*</span></label>
                  <select className="border border-[#ececf4] rounded-xl px-4 py-3 text-[14px] text-[#2c2a3d] focus:border-[#5b4fcf] outline-none bg-white">
                    <option value="">Seleccione el área</option>
                    <option>Medicina General</option>
                    <option>Pediatría</option>
                    <option>Traumatología</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-[#2c2a3d]">Motivo de la visita <span className="text-[#e0525f]">*</span></label>
                  <select className="border border-[#ececf4] rounded-xl px-4 py-3 text-[14px] text-[#2c2a3d] focus:border-[#5b4fcf] outline-none bg-white">
                    <option value="">Seleccione el motivo</option>
                    <option>Consulta médica</option>
                    <option>Visita a paciente</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-[#2c2a3d]">Persona visitada</label>
                  <input type="text" placeholder="Ingrese nombre" className="border border-[#ececf4] rounded-xl px-4 py-3 text-[14px] focus:border-[#5b4fcf] outline-none" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-[#2c2a3d]">Doctor a visitar <span className="text-[#e0525f]">*</span></label>
                  <select className="border border-[#ececf4] rounded-xl px-4 py-3 text-[14px] text-[#2c2a3d] focus:border-[#5b4fcf] outline-none bg-white">
                    <option value="">Seleccione el doctor</option>
                    <option>Dr. Pérez</option>
                    <option>Dra. García</option>
                  </select>
                </div>
              </div>

              <div className="bg-[#f9fafc] border border-[#ececf4] rounded-xl p-4 mt-6 flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex items-center gap-2">
                  <Info size={18} className="text-[#5b4fcf]" />
                  <span className="text-[13px] font-bold text-[#2c2a3d]">Info. Registro:</span>
                </div>
                <div className="flex gap-6">
                  <div>
                    <span className="text-[11px] text-[#8b889c] block uppercase font-bold">Fecha</span>
                    <span className="text-[13px] text-[#2c2a3d] font-medium">—</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#8b889c] block uppercase font-bold">Hora</span>
                    <span className="text-[13px] text-[#2c2a3d] font-medium">—</span>
                  </div>
                </div>
                <div className="text-[12px] text-[#8b889c] md:ml-auto italic">
                  * Registrado automáticamente al guardar
                </div>
              </div>
            </section>

            {/* SECCIÓN 3 */}
            <section>
              <div className="flex items-center gap-2 mb-5 border-b border-[#ececf4] pb-3">
                <Users size={20} className="text-[#5b4fcf]" />
                <h2 className="text-[16px] font-bold text-[#2c2a3d]">3. Acompañante y Observaciones</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-[#2c2a3d]">Nombres (Acompañante)</label>
                  <input type="text" placeholder="Opcional" className="border border-[#ececf4] rounded-xl px-4 py-3 text-[14px] bg-[#f9fafc] focus:border-[#5b4fcf] outline-none" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-[#2c2a3d]">Apellidos (Acompañante)</label>
                  <input type="text" placeholder="Opcional" className="border border-[#ececf4] rounded-xl px-4 py-3 text-[14px] bg-[#f9fafc] focus:border-[#5b4fcf] outline-none" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-[#2c2a3d]">Observaciones</label>
                <textarea rows={3} placeholder="Ingrese observaciones adicionales..." className="border border-[#ececf4] rounded-xl px-4 py-3 text-[14px] focus:border-[#5b4fcf] outline-none resize-none"></textarea>
              </div>
            </section>

          </div>
        </div>

        {/* COLUMNA DERECHA: PANELES DINÁMICOS */}
        <div className="xl:col-span-1 flex flex-col gap-6">
          
          <div className="bg-white border border-[#ececf4] rounded-2xl shadow-sm p-6">
            <h3 className="text-[15px] font-bold text-[#2c2a3d] mb-4 flex items-center gap-2">
              <Check size={18} className="text-[#5b4fcf]" /> Validación del formulario
            </h3>
            
            <div className="bg-[#fffbeb] border border-[#fde68a] p-3 rounded-xl flex gap-3 mb-5">
              <AlertCircle size={18} className="text-[#d97706] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[13px] text-[#b45309] block">Campos por completar (9)</strong>
                <span className="text-[12px] text-[#d97706]">Complete los campos para continuar.</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-6">
              {['DNI del visitante', 'Nombres', 'Apellidos', 'Fecha de visita', 'Hora de ingreso', 'Área de destino', 'Motivo de la visita', 'Doctor a visitar'].map((item, i) => (
                <div key={i} className="flex justify-between items-center py-1.5 border-b border-[#f4f5fb] last:border-0">
                  <span className="text-[13px] text-[#2c2a3d]">{item}</span>
                  <span className="text-[11px] font-bold bg-[#fef3c7] text-[#d97706] px-2 py-0.5 rounded-full">Pendiente</span>
                </div>
              ))}
            </div>

            <button className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-[14px] font-bold text-white bg-[#5b4fcf] hover:bg-[#3b2f78] transition-colors shadow-sm mb-3 opacity-60 cursor-not-allowed">
              <User size={18} /> Registrar visita
            </button>
            <button className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-[13px] font-bold text-[#8b889c] hover:bg-[#f4f5fb] transition-colors">
              <Eraser size={16} /> Limpiar formulario
            </button>
          </div>

          <div className="bg-white border border-[#ececf4] rounded-2xl shadow-sm p-6">
            <h3 className="text-[15px] font-bold text-[#2c2a3d] mb-1 flex items-center gap-2">
              <CalendarDays size={18} className="text-[#5b4fcf]" /> Disponibilidad del doctor
            </h3>
            <p className="text-[12px] text-[#8b889c] mb-4 pl-6">Seleccione un doctor para ver horarios</p>
            
            <div className="bg-[#f4f5fb] rounded-xl p-6 flex flex-col items-center justify-center text-center border border-dashed border-[#c9c6e0] min-h-[200px]">
              <FileText size={32} className="text-[#c9c6e0] mb-2" />
              <strong className="text-[13px] text-[#8b889c]">Esperando selección...</strong>
              <span className="text-[12px] text-[#8b889c] mt-1 px-4">Al seleccionar un doctor, aparecerá aquí su calendario y turnos disponibles.</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}