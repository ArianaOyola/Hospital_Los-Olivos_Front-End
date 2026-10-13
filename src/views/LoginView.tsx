import { useState, type FormEvent } from 'react';
import {
  Mail,
  Lock,
  ArrowRight,
  ArrowLeft,
  User,
  ShieldCheck,
} from 'lucide-react';
import logo from '../assets/logo.png';

interface LoginProps {
  onLogin: () => void;
}

interface AuthResponse {
  access_token?: string;
  token_type?: string;
  detail?: string;
  mensaje?: string;
  full_name?: string;
  email?: string;
}

function LoginViewComponent({ onLogin }: LoginProps) {
  const [authMode, setAuthMode] = useState<
    'login' | 'register' | 'forgot'
  >('login');

  // Datos de inicio de sesión
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorLogin, setErrorLogin] = useState('');
  const [cargando, setCargando] = useState(false);
  const [successLogin, setSuccessLogin] = useState('');

  // Datos de registro
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [registerLoading, setRegisterLoading] = useState(false);

  // Inicio de sesión conectado al backend
  const handleLogin = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setErrorLogin('');
    setSuccessLogin('');
    setCargando(true);

    try {
      const response = await fetch(
        'http://127.0.0.1:8000/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const data: AuthResponse = await response
        .json()
        .catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.detail ||
            data.mensaje ||
            'Correo o contraseña incorrectos.'
        );
      }

      if (!data.access_token) {
        throw new Error(
          'El servidor no devolvió un token de acceso.'
        );
      }

      localStorage.setItem(
        'access_token',
        data.access_token
      );

      onLogin();
    } catch (error) {
      setErrorLogin(
        error instanceof TypeError
          ? 'No se pudo conectar con el backend. Verifica que FastAPI esté funcionando y que CORS esté configurado.'
          : error instanceof Error
            ? error.message
            : 'Ocurrió un error al iniciar sesión.'
      );
    } finally {
      setCargando(false);
    }
  };

  // Registro conectado al backend
  const handleRegister = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setRegisterError('');
    setRegisterLoading(true);

    try {
      const response = await fetch(
        'http://127.0.0.1:8000/api/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            full_name: registerName.trim(),
            email: registerEmail.trim(),
            password: registerPassword,
          }),
        }
      );

      const data: AuthResponse = await response
        .json()
        .catch(() => ({}));

      if (!response.ok) {
        if (response.status === 409) {
          throw new Error(
            'Este correo ya está registrado. Prueba iniciar sesión o utiliza otro correo.'
          );
        }

        throw new Error(
          data.detail ||
            data.mensaje ||
            'No se pudo crear la cuenta.'
        );
      }

      // La cuenta se creó. Regresamos al inicio de sesión.
      setEmail(registerEmail.trim());
      setPassword('');
      setRegisterName('');
      setRegisterEmail('');
      setRegisterPassword('');
      setRegisterError('');
      setErrorLogin('');
      setSuccessLogin(
        '¡Tu cuenta se creó correctamente! Ahora inicia sesión con tu correo y contraseña.'
      );
      setAuthMode('login');
    } catch (error) {
      setRegisterError(
        error instanceof TypeError
          ? 'No se pudo conectar con el backend. Verifica que FastAPI esté funcionando y que CORS esté configurado.'
          : error instanceof Error
            ? error.message
            : 'Ocurrió un error al registrar la cuenta.'
      );
    } finally {
      setRegisterLoading(false);
    }
  };

  // Recuperación de contraseña: pendiente de implementar
  const handleForgotPassword = (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setAuthMode('login');
    setErrorLogin(
      'La recuperación de contraseña todavía no está habilitada.'
    );
  };

  return (
    <div className="min-h-screen flex bg-white font-sans animate-fade-in">
      {/* PANEL IZQUIERDO */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#22b573] to-[#0f766e] p-12 flex-col justify-between relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-15 bg-cover bg-center mix-blend-overlay"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000&auto=format&fit=crop')",
          }}
        />

        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-white opacity-10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-black opacity-10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex items-center gap-3 text-white">
          <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-lg p-1">
            <img
              src={logo}
              alt="Logo Los Olivos"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex flex-col">
            <span className="text-[24px] font-extrabold tracking-tight leading-none">
              Los Olivos
            </span>
            <span className="text-[12px] font-bold tracking-widest uppercase mt-1 text-[#a7f3d0]">
              Hospital
            </span>
          </div>
        </div>

        <div className="relative z-10">
          <h1 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight mb-4">
            Gestión inteligente
            <br />
            para atención de calidad.
          </h1>
          <p className="text-[#a7f3d0] text-lg font-medium max-w-md">
            Plataforma centralizada para el control de
            visitas, análisis predictivo y gestión
            administrativa.
          </p>
        </div>

        <div className="relative z-10 text-[#a7f3d0] text-sm font-medium">
          &copy; 2026 Hospital Los Olivos. Todos los
          derechos reservados.
        </div>
      </div>

      {/* PANEL DERECHO */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#f8faf9]">
        <div className="w-full max-w-md bg-white p-10 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#ececf4]">

          {/* LOGO MÓVIL */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <img
              src={logo}
              alt="Logo Los Olivos"
              className="w-12 h-12 object-contain"
            />
            <div className="flex flex-col">
              <span className="text-[20px] font-extrabold text-[#2c2a3d]">
                Los Olivos
              </span>
              <span className="text-[11px] font-bold text-[#22b573] tracking-widest uppercase">
                Hospital
              </span>
            </div>
          </div>

          {/* INICIO DE SESIÓN */}
          {authMode === 'login' && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-[26px] font-extrabold text-[#2c2a3d] mb-2">
                  Iniciar Sesión
                </h2>
                <p className="text-[#8b889c] text-[14px]">
                  Ingrese sus credenciales para acceder al
                  sistema
                </p>
              </div>

              {successLogin && (
                <p
                  role="status"
                  className="mb-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl p-3"
                >
                  {successLogin}
                </p>
              )}

              <form
                onSubmit={handleLogin}
                className="flex flex-col gap-5"
              >
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="login-email"
                    className="text-[12px] font-bold text-[#2c2a3d] uppercase tracking-wider"
                  >
                    Correo electrónico
                  </label>

                  <div className="relative">
                    <input
                      id="login-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="username"
                      required
                      placeholder="correo@ejemplo.com"
                      className="w-full border border-[#ececf4] rounded-xl pl-11 pr-4 py-3.5 text-[14px] focus:border-[#22b573] focus:ring-1 focus:ring-[#22b573] outline-none bg-[#f9fafc] focus:bg-white"
                    />
                    <Mail
                      size={18}
                      className="absolute left-4 top-4 text-[#8b889c]"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-end">
                    <label
                      htmlFor="login-password"
                      className="text-[12px] font-bold text-[#2c2a3d] uppercase tracking-wider"
                    >
                      Contraseña
                    </label>

                    <button
                      type="button"
                      onClick={() => {
                        setErrorLogin('');
                        setSuccessLogin('');
                        setAuthMode('forgot');
                      }}
                      className="text-[12px] font-bold text-[#22b573] hover:text-[#1a935c]"
                    >
                      ¿Olvidó su contraseña?
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      id="login-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      required
                      placeholder="Ingrese su contraseña"
                      className="w-full border border-[#ececf4] rounded-xl pl-11 pr-4 py-3.5 text-[14px] focus:border-[#22b573] focus:ring-1 focus:ring-[#22b573] outline-none bg-[#f9fafc] focus:bg-white"
                    />
                    <Lock
                      size={18}
                      className="absolute left-4 top-4 text-[#8b889c]"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-1 mb-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 rounded border-[#ececf4] text-[#22b573] focus:ring-[#22b573]"
                  />
                  <label
                    htmlFor="remember"
                    className="text-[13px] text-[#8b889c] cursor-pointer"
                  >
                    Mantener sesión iniciada
                  </label>
                </div>

                {errorLogin && (
                  <p
                    role="alert"
                    className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl p-3"
                  >
                    {errorLogin}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={cargando}
                  className="w-full flex items-center justify-center gap-2 bg-[#22b573] text-white px-6 py-4 rounded-xl text-[15px] font-bold hover:bg-[#1a935c] shadow-md transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {cargando
                    ? 'Validando acceso...'
                    : 'Ingresar al sistema'}

                  {!cargando && <ArrowRight size={18} />}
                </button>
              </form>

              <div className="mt-8 text-center bg-[#f9fafc] border border-[#ececf4] rounded-xl p-5 flex flex-col items-center gap-2">
                <span className="text-[13px] text-[#8b889c]">
                  ¿No tiene una cuenta asignada?
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setRegisterError('');
                    setRegisterName('');
                    setRegisterEmail('');
                    setRegisterPassword('');
                    setSuccessLogin('');
                    setAuthMode('register');
                  }}
                  className="text-[14px] font-extrabold text-[#22b573] hover:text-[#1a935c]"
                >
                  Crear una cuenta nueva
                </button>
              </div>
            </div>
          )}

          {/* REGISTRO CONECTADO AL BACKEND */}
          {authMode === 'register' && (
            <div>
              <button
                type="button"
                onClick={() => {
                  setRegisterError('');
                  setAuthMode('login');
                }}
                className="flex items-center gap-2 text-[#8b889c] mb-6 text-[13px] font-bold"
              >
                <ArrowLeft size={16} /> Volver a inicio
              </button>

              <h2 className="text-[26px] font-extrabold text-[#2c2a3d] mb-2">
                Crear Cuenta
              </h2>
              <p className="text-[#8b889c] text-[14px] mb-6">
                Completa tus datos para crear tu cuenta.
              </p>

              <form
                onSubmit={handleRegister}
                className="flex flex-col gap-4"
              >
                <div className="relative">
                  <input
                    type="text"
                    value={registerName}
                    onChange={(e) =>
                      setRegisterName(e.target.value)
                    }
                    placeholder="Nombre completo"
                    autoComplete="name"
                    minLength={2}
                    maxLength={150}
                    required
                    className="w-full border border-[#ececf4] rounded-xl pl-11 pr-4 py-3 focus:border-[#22b573] outline-none"
                  />
                  <User
                    size={18}
                    className="absolute left-4 top-3.5 text-[#8b889c]"
                  />
                </div>

                <div className="relative">
                  <input
                    type="email"
                    value={registerEmail}
                    onChange={(e) =>
                      setRegisterEmail(e.target.value)
                    }
                    placeholder="Correo electrónico"
                    autoComplete="email"
                    required
                    className="w-full border border-[#ececf4] rounded-xl pl-11 pr-4 py-3 focus:border-[#22b573] outline-none"
                  />
                  <Mail
                    size={18}
                    className="absolute left-4 top-3.5 text-[#8b889c]"
                  />
                </div>

                <div className="relative">
                  <input
                    type="password"
                    value={registerPassword}
                    onChange={(e) =>
                      setRegisterPassword(e.target.value)
                    }
                    placeholder="Contraseña (mínimo 6 caracteres)"
                    autoComplete="new-password"
                    minLength={6}
                    maxLength={100}
                    required
                    className="w-full border border-[#ececf4] rounded-xl pl-11 pr-4 py-3 focus:border-[#22b573] outline-none"
                  />
                  <Lock
                    size={18}
                    className="absolute left-4 top-3.5 text-[#8b889c]"
                  />
                </div>

                {registerError && (
                  <p
                    role="alert"
                    className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl p-3"
                  >
                    {registerError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={registerLoading}
                  className="w-full flex items-center justify-center gap-2 bg-[#22b573] text-white px-6 py-4 rounded-xl font-bold hover:bg-[#1a935c] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <ShieldCheck size={18} />
                  {registerLoading
                    ? 'Creando cuenta...'
                    : 'Crear cuenta'}
                </button>
              </form>
            </div>
          )}

          {/* RECUPERACIÓN DE CONTRASEÑA */}
          {authMode === 'forgot' && (
            <div>
              <button
                type="button"
                onClick={() => {
                  setErrorLogin('');
                  setAuthMode('login');
                }}
                className="flex items-center gap-2 text-[#8b889c] mb-6 text-[13px] font-bold"
              >
                <ArrowLeft size={16} /> Volver a inicio
              </button>

              <h2 className="text-[26px] font-extrabold text-[#2c2a3d] mb-2">
                Recuperar Acceso
              </h2>
              <p className="text-[#8b889c] text-[14px] mb-6">
                La recuperación de contraseña aún no está
                habilitada en el backend.
              </p>

              <form
                onSubmit={handleForgotPassword}
                className="flex flex-col gap-5"
              >
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Correo registrado"
                    className="w-full border border-[#ececf4] rounded-xl pl-11 pr-4 py-3.5"
                  />
                  <Mail
                    size={18}
                    className="absolute left-4 top-4 text-[#8b889c]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#22b573] text-white px-6 py-4 rounded-xl font-bold"
                >
                  Solicitar recuperación
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export { LoginViewComponent as LoginView };