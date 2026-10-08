import { useState } from 'react';
import { Mail, Lock, ArrowRight, ArrowLeft, User, ShieldCheck } from 'lucide-react';
import logo from '../assets/logo.png';

interface LoginProps {
  onLogin: () => void;
}

export function LoginView({ onLogin }: LoginProps) {
  // Estado para controlar qué formulario estamos viendo: 'login', 'register' o 'forgot'
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot'>('login');

  return (
    <div className="min-h-screen flex bg-white font-sans animate-fade-in">
      
      {/* ======================================================== */}
      {/* PANEL IZQUIERDO - BRANDING CORPORATIVO CON IMAGEN DE FONDO */}
      {/* ======================================================== */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#22b573] to-[#0f766e] p-12 flex-col justify-between relative overflow-hidden">
         
         {/* Imagen de fondo con efecto transparente/mezcla */}
         <div 
           className="absolute inset-0 opacity-15 bg-cover bg-center mix-blend-overlay"
           style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000&auto=format&fit=crop')" }}
         ></div>
         {/* Círculos decorativos para darle más luz */}
         <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-white opacity-10 rounded-full blur-3xl pointer-events-none"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-black opacity-10 rounded-full blur-3xl pointer-events-none"></div>

         {/* Logo Real del Hospital */}
         <div className="relative z-10 flex items-center gap-3 text-white">
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-lg p-1">
              {/* Aquí insertamos el logo.png en lugar de la línea de vida */}
              <img src={logo} alt="Logo Los Olivos" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-[24px] font-extrabold tracking-tight leading-none text-white">Los Olivos</span>
              <span className="text-[12px] font-bold tracking-widest uppercase mt-1 text-[#a7f3d0]">Hospital</span>
            </div>
         </div>

         {/* Texto Central */}
         <div className="relative z-10">
            <h1 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight mb-4 drop-shadow-sm">
              Gestión inteligente<br/>para atención de calidad.
            </h1>
            <p className="text-[#a7f3d0] text-lg font-medium max-w-md">
              Plataforma centralizada para el control de visitas, análisis predictivo y gestión administrativa.
            </p>
         </div>

         {/* Footer */}
         <div className="relative z-10 text-[#a7f3d0] text-sm font-medium">
           &copy; 2026 Hospital Los Olivos. Todos los derechos reservados.
         </div>
      </div>

      {/* ======================================================== */}
      {/* PANEL DERECHO - FORMULARIOS DINÁMICOS */}
      {/* ======================================================== */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#f8faf9] relative">
         <div className="w-full max-w-md bg-white p-10 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#ececf4] relative overflow-hidden">
            
            {/* Logo en versión móvil (Solo se ve si la pantalla es pequeña) */}
            <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
               <img src={logo} alt="Logo Los Olivos" className="w-12 h-12 object-contain" />
               <div className="flex flex-col text-left">
                 <span className="text-[20px] font-extrabold text-[#2c2a3d] tracking-tight leading-none">Los Olivos</span>
                 <span className="text-[11px] font-bold text-[#22b573] tracking-widest uppercase mt-0.5">Hospital</span>
               </div>
            </div>

            {/* ------------------------------------------------------------------ */}
            {/* 1. VISTA DE INICIO DE SESIÓN */}
            {/* ------------------------------------------------------------------ */}
            {authMode === 'login' && (
              <div className="animate-slide-up">
                <div className="text-center mb-8">
                   <h2 className="text-[26px] font-extrabold text-[#2c2a3d] mb-2">Iniciar Sesión</h2>
                   <p className="text-[#8b889c] text-[14px]">Ingrese sus credenciales para acceder al sistema</p>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); onLogin(); }} className="flex flex-col gap-5">
                   <div className="flex flex-col gap-2">
                     <label className="text-[12px] font-bold text-[#2c2a3d] uppercase tracking-wider">Usuario o Correo</label>
                     <div className="relative">
                       <input type="text" defaultValue="admin" className="w-full border border-[#ececf4] rounded-xl pl-11 pr-4 py-3.5 text-[14px] focus:border-[#22b573] focus:ring-1 focus:ring-[#22b573] outline-none transition-colors bg-[#f9fafc] focus:bg-white" />
                       <Mail size={18} className="absolute left-4 top-4 text-[#8b889c]" />
                     </div>
                   </div>

                   <div className="flex flex-col gap-2">
                     <div className="flex justify-between items-end">
                       <label className="text-[12px] font-bold text-[#2c2a3d] uppercase tracking-wider">Contraseña</label>
                       {/* Botón para ir a Olvidó contraseña */}
                       <button type="button" onClick={() => setAuthMode('forgot')} className="text-[12px] font-bold text-[#22b573] hover:text-[#1a935c] transition-colors">¿Olvidó su contraseña?</button>
                     </div>
                     <div className="relative">
                       <input type="password" defaultValue="password123" className="w-full border border-[#ececf4] rounded-xl pl-11 pr-4 py-3.5 text-[14px] focus:border-[#22b573] focus:ring-1 focus:ring-[#22b573] outline-none transition-colors bg-[#f9fafc] focus:bg-white" />
                       <Lock size={18} className="absolute left-4 top-4 text-[#8b889c]" />
                     </div>
                   </div>

                   <div className="flex items-center gap-2 mt-1 mb-2">
                     <input type="checkbox" id="remember" className="w-4 h-4 rounded border-[#ececf4] text-[#22b573] focus:ring-[#22b573] cursor-pointer" />
                     <label htmlFor="remember" className="text-[13px] text-[#8b889c] cursor-pointer select-none">Mantener sesión iniciada</label>
                   </div>

                   <button type="submit" className="w-full flex items-center justify-center gap-2 bg-[#22b573] text-white px-6 py-4 rounded-xl text-[15px] font-bold hover:bg-[#1a935c] shadow-md hover:shadow-lg transition-all group">
                     Ingresar al sistema
                     <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                   </button>
                </form>

                {/* Caja inferior de Crear Cuenta */}
                <div className="mt-8 text-center bg-[#f9fafc] border border-[#ececf4] rounded-xl p-5 flex flex-col items-center justify-center gap-2">
                  <span className="text-[13px] text-[#8b889c]">¿No tiene una cuenta asignada?</span>
                  <button onClick={() => setAuthMode('register')} className="text-[14px] font-extrabold text-[#22b573] hover:text-[#1a935c] transition-colors">
                    Crear una cuenta nueva
                  </button>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------------ */}
            {/* 2. VISTA DE CREAR CUENTA */}
            {/* ------------------------------------------------------------------ */}
            {authMode === 'register' && (
              <div className="animate-slide-up">
                <button onClick={() => setAuthMode('login')} className="flex items-center gap-2 text-[#8b889c] hover:text-[#2c2a3d] transition-colors mb-6 text-[13px] font-bold">
                  <ArrowLeft size={16} /> Volver a inicio
                </button>
                
                <div className="mb-8">
                   <h2 className="text-[26px] font-extrabold text-[#2c2a3d] mb-2">Crear Cuenta</h2>
                   <p className="text-[#8b889c] text-[14px]">Registre sus datos para solicitar acceso.</p>
                </div>

                <form className="flex flex-col gap-4">
                   <div className="flex flex-col gap-2">
                     <label className="text-[12px] font-bold text-[#2c2a3d] uppercase tracking-wider">Nombre completo</label>
                     <div className="relative">
                       <input type="text" placeholder="Ej. Camila Huancahuari" className="w-full border border-[#ececf4] rounded-xl pl-11 pr-4 py-3 text-[14px] focus:border-[#22b573] outline-none transition-colors bg-[#f9fafc] focus:bg-white" />
                       <User size={18} className="absolute left-4 top-3.5 text-[#8b889c]" />
                     </div>
                   </div>

                   <div className="flex flex-col gap-2">
                     <label className="text-[12px] font-bold text-[#2c2a3d] uppercase tracking-wider">Correo institucional</label>
                     <div className="relative">
                       <input type="email" placeholder="nombre@hospital.com" className="w-full border border-[#ececf4] rounded-xl pl-11 pr-4 py-3 text-[14px] focus:border-[#22b573] outline-none transition-colors bg-[#f9fafc] focus:bg-white" />
                       <Mail size={18} className="absolute left-4 top-3.5 text-[#8b889c]" />
                     </div>
                   </div>

                   <div className="flex flex-col gap-2">
                     <label className="text-[12px] font-bold text-[#2c2a3d] uppercase tracking-wider">Contraseña</label>
                     <div className="relative">
                       <input type="password" placeholder="Mínimo 8 caracteres" className="w-full border border-[#ececf4] rounded-xl pl-11 pr-4 py-3 text-[14px] focus:border-[#22b573] outline-none transition-colors bg-[#f9fafc] focus:bg-white" />
                       <Lock size={18} className="absolute left-4 top-3.5 text-[#8b889c]" />
                     </div>
                   </div>

                   <button type="button" onClick={() => setAuthMode('login')} className="w-full mt-2 flex items-center justify-center gap-2 bg-[#2c2a3d] text-white px-6 py-4 rounded-xl text-[15px] font-bold hover:bg-[#1e1d2b] shadow-md transition-all">
                     <ShieldCheck size={18} /> Registrar mi cuenta
                   </button>
                </form>
              </div>
            )}

            {/* ------------------------------------------------------------------ */}
            {/* 3. VISTA DE RECUPERAR CONTRASEÑA */}
            {/* ------------------------------------------------------------------ */}
            {authMode === 'forgot' && (
              <div className="animate-slide-up">
                <button onClick={() => setAuthMode('login')} className="flex items-center gap-2 text-[#8b889c] hover:text-[#2c2a3d] transition-colors mb-6 text-[13px] font-bold">
                  <ArrowLeft size={16} /> Volver a inicio
                </button>
                
                <div className="mb-8">
                   <h2 className="text-[26px] font-extrabold text-[#2c2a3d] mb-2">Recuperar Acceso</h2>
                   <p className="text-[#8b889c] text-[14px]">Ingrese su correo electrónico y le enviaremos un enlace para restablecer su contraseña.</p>
                </div>

                <form className="flex flex-col gap-5">
                   <div className="flex flex-col gap-2">
                     <label className="text-[12px] font-bold text-[#2c2a3d] uppercase tracking-wider">Correo registrado</label>
                     <div className="relative">
                       <input type="email" placeholder="Ej. admin@hospital.com" className="w-full border border-[#ececf4] rounded-xl pl-11 pr-4 py-3.5 text-[14px] focus:border-[#22b573] outline-none transition-colors bg-[#f9fafc] focus:bg-white" />
                       <Mail size={18} className="absolute left-4 top-4 text-[#8b889c]" />
                     </div>
                   </div>

                   <button type="button" onClick={() => setAuthMode('login')} className="w-full mt-2 flex items-center justify-center gap-2 bg-[#22b573] text-white px-6 py-4 rounded-xl text-[15px] font-bold hover:bg-[#1a935c] shadow-md transition-all">
                     Enviar enlace de recuperación
                   </button>
                </form>
              </div>
            )}

         </div>
      </div>

    </div>
  );
}