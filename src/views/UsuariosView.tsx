
import { useEffect, useState } from 'react';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Download,
  Save,
  X,
  RefreshCw,
} from 'lucide-react';
import { apiFetch } from '../services/api';

type RolUsuario =
  | 'admin'
  | 'recepcionista'
  | 'medico'
  | 'enfermero'
  | 'archivo';

interface UsuarioAPI {
  id: number;
  full_name: string;
  email: string;
  role: RolUsuario;
  is_active: boolean;
  created_at: string;
}

interface FormularioUsuario {
  full_name: string;
  email: string;
  password: string;
  role: RolUsuario;
  is_active: boolean;
}

const formularioVacio: FormularioUsuario = {
  full_name: '',
  email: '',
  password: '',
  role: 'recepcionista',
  is_active: true,
};

const roles: { value: RolUsuario; label: string }[] = [
  { value: 'admin', label: 'Administrador' },
  { value: 'recepcionista', label: 'Recepcionista' },
  { value: 'medico', label: 'Médico' },
  { value: 'enfermero', label: 'Enfermero' },
  { value: 'archivo', label: 'Archivo e historias clínicas' },
];

const coloresAvatar = [
  'from-[#22b573] to-[#1a935c]',
  'from-[#4f6ef7] to-[#2c3e9e]',
  'from-[#f0a83c] to-[#b87c22]',
  'from-[#e0525f] to-[#9b343f]',
];

function obtenerIniciales(nombre: string) {
  return nombre
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((parte) => parte[0] ?? '')
    .join('')
    .toUpperCase();
}

function nombreRol(rol: RolUsuario) {
  return roles.find((item) => item.value === rol)?.label ?? rol;
}

export function UsuariosView() {
  const [usuarios, setUsuarios] = useState<UsuarioAPI[]>([]);
  const [seleccionados, setSeleccionados] = useState<number[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [filtroRol, setFiltroRol] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [usuarioEditando, setUsuarioEditando] =
    useState<UsuarioAPI | null>(null);
  const [formulario, setFormulario] =
    useState<FormularioUsuario>(formularioVacio);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [procesandoId, setProcesandoId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  async function cargarUsuarios() {
    setCargando(true);
    setError('');

    try {
      const datos = await apiFetch<UsuarioAPI[]>('/users/');
      setUsuarios(datos);
      setSeleccionados([]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'No se pudieron cargar los usuarios.',
      );
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    void cargarUsuarios();
  }, []);

  const usuariosFiltrados = usuarios.filter((usuario) => {
    const texto = busqueda.trim().toLowerCase();

    const coincideBusqueda =
      usuario.full_name.toLowerCase().includes(texto) ||
      usuario.email.toLowerCase().includes(texto);

    const coincideRol =
      !filtroRol || usuario.role === filtroRol;

    const coincideEstado =
      !filtroEstado ||
      (filtroEstado === 'activo' && usuario.is_active) ||
      (filtroEstado === 'inactivo' && !usuario.is_active);

    return coincideBusqueda && coincideRol && coincideEstado;
  });

  function abrirNuevoUsuario() {
    setUsuarioEditando(null);
    setFormulario(formularioVacio);
    setError('');
    setMensaje('');
    setModalAbierto(true);
  }

  function abrirEdicion(usuario: UsuarioAPI) {
    setUsuarioEditando(usuario);
    setFormulario({
      full_name: usuario.full_name,
      email: usuario.email,
      password: '',
      role: usuario.role,
      is_active: usuario.is_active,
    });
    setError('');
    setMensaje('');
    setModalAbierto(true);
  }

  function cerrarModal() {
    if (guardando) return;
    setModalAbierto(false);
    setUsuarioEditando(null);
    setFormulario(formularioVacio);
  }

  function actualizarCampo<K extends keyof FormularioUsuario>(
    campo: K,
    valor: FormularioUsuario[K],
  ) {
    setFormulario((anterior) => ({
      ...anterior,
      [campo]: valor,
    }));
  }

  async function guardarUsuario(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setError('');
    setMensaje('');

    const nombre = formulario.full_name.trim();
    const email = formulario.email.trim();

    if (nombre.length < 2) {
      setError('El nombre debe tener al menos 2 caracteres.');
      return;
    }

    if (!email) {
      setError('Debes ingresar un correo electrónico.');
      return;
    }

    if (!usuarioEditando && formulario.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setGuardando(true);

    try {
      if (usuarioEditando) {
        await apiFetch<UsuarioAPI>(`/users/${usuarioEditando.id}`, {
          method: 'PUT',
          body: JSON.stringify({
            full_name: nombre,
            email,
            role: formulario.role,
            is_active: formulario.is_active,
          }),
        });

        setMensaje('Usuario actualizado correctamente.');
      } else {
        await apiFetch<UsuarioAPI>('/users/', {
          method: 'POST',
          body: JSON.stringify({
            full_name: nombre,
            email,
            password: formulario.password,
            role: formulario.role,
          }),
        });

        setMensaje('Usuario creado correctamente.');
      }

      setModalAbierto(false);
      setUsuarioEditando(null);
      setFormulario(formularioVacio);
      await cargarUsuarios();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'No se pudo guardar el usuario.',
      );
    } finally {
      setGuardando(false);
    }
  }

  async function cambiarEstado(usuario: UsuarioAPI) {
    const nuevoEstado = !usuario.is_active;
    const accion = nuevoEstado ? 'activar' : 'desactivar';

    if (
      !window.confirm(
        `¿Deseas ${accion} la cuenta de ${usuario.full_name}?`,
      )
    ) {
      return;
    }

    setProcesandoId(usuario.id);
    setError('');
    setMensaje('');

    try {
      await apiFetch<UsuarioAPI>(`/users/${usuario.id}`, {
        method: 'PUT',
        body: JSON.stringify({ is_active: nuevoEstado }),
      });

      setUsuarios((anteriores) =>
        anteriores.map((item) =>
          item.id === usuario.id
            ? { ...item, is_active: nuevoEstado }
            : item,
        ),
      );

      setMensaje(
        `La cuenta se ha ${nuevoEstado ? 'activado' : 'desactivado'} correctamente.`,
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'No se pudo cambiar el estado de la cuenta.',
      );
    } finally {
      setProcesandoId(null);
    }
  }

  function toggleSeleccion(id: number) {
    setSeleccionados((anteriores) =>
      anteriores.includes(id)
        ? anteriores.filter((item) => item !== id)
        : [...anteriores, id],
    );
  }

  function toggleSeleccionarTodos() {
    const todosVisiblesSeleccionados =
      usuariosFiltrados.length > 0 &&
      usuariosFiltrados.every((usuario) =>
        seleccionados.includes(usuario.id),
      );

    setSeleccionados((anteriores) =>
      todosVisiblesSeleccionados
        ? anteriores.filter(
            (id) =>
              !usuariosFiltrados.some((usuario) => usuario.id === id),
          )
        : [
            ...new Set([
              ...anteriores,
              ...usuariosFiltrados.map((usuario) => usuario.id),
            ]),
          ],
    );
  }

  async function cambiarEstadoSeleccionados() {
    const activos = usuarios.filter(
      (usuario) =>
        seleccionados.includes(usuario.id) && usuario.is_active,
    );

    if (activos.length === 0) {
      setError('Selecciona al menos un usuario activo.');
      return;
    }

    if (
      !window.confirm(
        `¿Deseas desactivar las ${activos.length} cuentas activas seleccionadas?`,
      )
    ) {
      return;
    }

    setError('');
    setMensaje('');
    setCargando(true);

    try {
      const resultados = await Promise.allSettled(
        activos.map((usuario) =>
          apiFetch<UsuarioAPI>(`/users/${usuario.id}`, {
            method: 'PUT',
            body: JSON.stringify({ is_active: false }),
          }),
        ),
      );

      const exitosos = resultados.filter(
        (resultado) => resultado.status === 'fulfilled',
      ).length;

      await cargarUsuarios();

      if (exitosos === activos.length) {
        setMensaje('Se desactivaron las cuentas seleccionadas.');
      } else {
        setError(
          `Se desactivaron ${exitosos} de ${activos.length} cuentas. Revisa los permisos y vuelve a intentarlo si es necesario.`,
        );
      }
    } catch {
      setError('No se pudieron actualizar las cuentas seleccionadas.');
    } finally {
      setCargando(false);
    }
  }

  function exportarCSV() {
    const encabezado = [
      'ID',
      'Nombre completo',
      'Correo electrónico',
      'Rol',
      'Estado',
    ];

    const filas = usuariosFiltrados.map((usuario) => [
      usuario.id,
      usuario.full_name,
      usuario.email,
      nombreRol(usuario.role),
      usuario.is_active ? 'Activo' : 'Inactivo',
    ]);

    const escapar = (valor: string | number) =>
      `"${String(valor).replace(/"/g, '""')}"`;

    const contenido = [encabezado, ...filas]
      .map((fila) => fila.map(escapar).join(','))
      .join('\r\n');

    const archivo = new Blob(
      ['\uFEFF' + contenido],
      { type: 'text/csv;charset=utf-8;' },
    );

    const url = URL.createObjectURL(archivo);
    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download = 'usuarios-hospital-los-olivos.csv';
    enlace.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="relative flex h-full flex-col animate-fade-in pb-8">
      <div className="mb-8 flex flex-col justify-between gap-4 border-l-[5px] border-[#22b573] pl-4 md:flex-row md:items-end">
        <div>
          <h1 className="mb-1.5 text-3xl font-extrabold tracking-tight text-[#2c2a3d] md:text-4xl">
            Gestión de usuarios
          </h1>
          <p className="text-[15px] font-medium text-[#8b889c]">
            Administre los usuarios y accesos del sistema.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3 rounded-full border border-[#ececf4] bg-white py-1.5 pl-1.5 pr-5 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#22b573] to-[#1a935c] text-sm font-bold text-white">
            AD
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-bold leading-tight text-[#2c2a3d]">
              Administración
            </span>
            <span className="mt-0.5 text-[11px] font-bold uppercase tracking-wider text-[#22b573]">
              Hospital Los Olivos
            </span>
          </div>
        </div>
      </div>

      {error && !modalAbierto && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
          <button
            onClick={() => void cargarUsuarios()}
            className="ml-2 font-bold underline"
          >
            Reintentar
          </button>
        </div>
      )}

      {mensaje && !modalAbierto && (
        <div className="mb-4 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
          {mensaje}
        </div>
      )}

      <div className="mb-6 flex flex-col items-start justify-between gap-4 xl:flex-row xl:items-center">
        <div className="flex w-full flex-col gap-3 md:flex-row xl:flex-1">
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={busqueda}
              onChange={(evento) => setBusqueda(evento.target.value)}
              placeholder="Buscar por nombre o correo..."
              className="w-full rounded-xl border border-[#ececf4] bg-white py-2.5 pl-10 pr-4 text-[14px] shadow-sm outline-none transition-colors focus:border-[#22b573]"
            />
            <Search
              size={16}
              className="absolute left-3.5 top-3 text-[#8b889c]"
            />
          </div>

          <select
            value={filtroRol}
            onChange={(evento) => setFiltroRol(evento.target.value)}
            className="cursor-pointer rounded-xl border border-[#ececf4] bg-white px-4 py-2.5 text-[14px] text-[#2c2a3d] shadow-sm outline-none focus:border-[#22b573]"
          >
            <option value="">Todos los roles</option>
            {roles.map((rol) => (
              <option key={rol.value} value={rol.value}>
                {rol.label}
              </option>
            ))}
          </select>

          <select
            value={filtroEstado}
            onChange={(evento) => setFiltroEstado(evento.target.value)}
            className="cursor-pointer rounded-xl border border-[#ececf4] bg-white px-4 py-2.5 text-[14px] text-[#2c2a3d] shadow-sm outline-none focus:border-[#22b573]"
          >
            <option value="">Todos los estados</option>
            <option value="activo">Activos</option>
            <option value="inactivo">Inactivos</option>
          </select>
        </div>

        <div className="flex w-full gap-3 xl:w-auto">
          <button
            onClick={exportarCSV}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#ececf4] bg-white px-5 py-2.5 text-[14px] font-bold text-[#2c2a3d] shadow-sm transition-colors hover:bg-[#f4f5fb] md:flex-none"
          >
            <Download size={16} />
            Exportar
          </button>

          <button
            onClick={abrirNuevoUsuario}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#22b573] px-5 py-2.5 text-[14px] font-bold text-white shadow-sm transition-colors hover:bg-[#1a935c] md:flex-none"
          >
            <Plus size={16} />
            Nuevo usuario
          </button>
        </div>
      </div>

      <div className="flex flex-col overflow-hidden rounded-2xl border border-[#ececf4] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-[#ececf4] bg-[#f9fafc]">
                <th className="py-4 pl-6 pr-2">
                  <input
                    type="checkbox"
                    onChange={toggleSeleccionarTodos}
                    checked={
                      usuariosFiltrados.length > 0 &&
                      usuariosFiltrados.every((usuario) =>
                        seleccionados.includes(usuario.id),
                      )
                    }
                    aria-label="Seleccionar usuarios visibles"
                    className="h-4 w-4 cursor-pointer rounded border-[#ececf4] text-[#22b573] focus:ring-[#22b573]"
                  />
                </th>
                <th className="px-4 py-4 text-[12px] font-bold uppercase tracking-wider text-[#8b889c]">
                  ID
                </th>
                <th className="px-4 py-4 text-[12px] font-bold uppercase tracking-wider text-[#8b889c]">
                  Nombre completo
                </th>
                <th className="px-4 py-4 text-[12px] font-bold uppercase tracking-wider text-[#8b889c]">
                  Correo electrónico
                </th>
                <th className="px-4 py-4 text-[12px] font-bold uppercase tracking-wider text-[#8b889c]">
                  Rol
                </th>
                <th className="px-4 py-4 text-[12px] font-bold uppercase tracking-wider text-[#8b889c]">
                  Estado
                </th>
                <th className="px-6 py-4 text-center text-[12px] font-bold uppercase tracking-wider text-[#8b889c]">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody>
              {cargando ? (
                <tr>
                  <td
                    colSpan={7}
                    className="py-10 text-center text-sm text-[#8b889c]"
                  >
                    <span className="inline-flex items-center gap-2">
                      <RefreshCw size={16} className="animate-spin" />
                      Cargando usuarios...
                    </span>
                  </td>
                </tr>
              ) : usuariosFiltrados.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="py-10 text-center text-[13px] text-[#8b889c]"
                  >
                    No se encontraron usuarios.
                  </td>
                </tr>
              ) : (
                usuariosFiltrados.map((usuario, indice) => (
                  <tr
                    key={usuario.id}
                    className="border-b border-[#ececf4] transition-colors hover:bg-[#f4f5fb]"
                  >
                    <td className="py-3 pl-6 pr-2">
                      <input
                        type="checkbox"
                        checked={seleccionados.includes(usuario.id)}
                        onChange={() => toggleSeleccion(usuario.id)}
                        aria-label={`Seleccionar ${usuario.full_name}`}
                        className="h-4 w-4 cursor-pointer rounded border-[#ececf4] text-[#22b573] focus:ring-[#22b573]"
                      />
                    </td>
                    <td className="px-4 py-3 text-[13px] text-[#8b889c]">
                      {usuario.id}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${coloresAvatar[indice % coloresAvatar.length]} text-[11px] font-bold text-white shadow-sm`}
                        >
                          {obtenerIniciales(usuario.full_name)}
                        </div>
                        <span className="text-[13px] font-medium text-[#2c2a3d]">
                          {usuario.full_name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[13px] text-[#22b573]">
                      {usuario.email}
                    </td>
                    <td className="px-4 py-3 text-[13px] text-[#8b889c]">
                      {nombreRol(usuario.role)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-3 py-1 text-[11px] font-bold ${
                          usuario.is_active
                            ? 'bg-[#e5f7ed] text-[#22b573]'
                            : 'bg-[#fee2e2] text-[#ef4444]'
                        }`}
                      >
                        {usuario.is_active ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => abrirEdicion(usuario)}
                          title="Editar usuario"
                          className="rounded-lg p-1.5 text-[#8b889c] transition-colors hover:bg-[#eafaf1] hover:text-[#22b573]"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => void cambiarEstado(usuario)}
                          disabled={procesandoId === usuario.id}
                          title={
                            usuario.is_active
                              ? 'Desactivar usuario'
                              : 'Activar usuario'
                          }
                          className="rounded-lg p-1.5 text-[#8b889c] transition-colors hover:bg-[#fef2f2] hover:text-[#e0525f] disabled:opacity-50"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-[#ececf4] bg-white p-5 md:flex-row">
          <div className="flex items-center gap-4">
            <span className="text-[13px] text-[#8b889c]">
              Mostrando {usuariosFiltrados.length} de {usuarios.length} usuarios
            </span>
            <div className="hidden h-4 w-px bg-[#ececf4] md:block" />
            <span className="text-[13px] font-medium text-[#22b573]">
              {seleccionados.length} seleccionados
            </span>
          </div>

          <button
            onClick={() => void cambiarEstadoSeleccionados()}
            disabled={
              seleccionados.length === 0 ||
              cargando
            }
            className="rounded-lg border border-[#fef2f2] bg-[#fef2f2] px-3 py-1.5 text-[12px] font-bold text-[#e0525f] transition-colors hover:bg-[#fee2e2] disabled:pointer-events-none disabled:opacity-50"
          >
            Desactivar seleccionados
          </button>
        </div>
      </div>

      {modalAbierto && (
        <div className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center bg-[#2c2a3d]/40 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white shadow-xl animate-slide-up">
            <form onSubmit={guardarUsuario}>
              <div className="flex items-start justify-between border-b border-[#ececf4] p-6">
                <div>
                  <h3 className="mb-1 text-[18px] font-extrabold text-[#2c2a3d]">
                    {usuarioEditando ? 'Editar usuario' : 'Nuevo usuario'}
                  </h3>
                  <p className="text-[13px] text-[#8b889c]">
                    Complete los datos de la cuenta.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={cerrarModal}
                  className="rounded-lg p-1.5 text-[#8b889c] transition-colors hover:bg-[#fef2f2] hover:text-[#e0525f]"
                  aria-label="Cerrar"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col gap-5 p-6">
                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-[#2c2a3d]">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    required
                    minLength={2}
                    maxLength={150}
                    value={formulario.full_name}
                    onChange={(evento) =>
                      actualizarCampo('full_name', evento.target.value)
                    }
                    placeholder="Ej. Pedro Ramírez"
                    className="w-full rounded-xl border border-[#ececf4] px-4 py-3 text-[14px] outline-none transition-all focus:border-[#22b573] focus:ring-1 focus:ring-[#22b573]"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-[#2c2a3d]">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    required
                    maxLength={254}
                    value={formulario.email}
                    onChange={(evento) =>
                      actualizarCampo('email', evento.target.value)
                    }
                    placeholder="usuario@hospital.com"
                    className="w-full rounded-xl border border-[#ececf4] px-4 py-3 text-[14px] outline-none transition-all focus:border-[#22b573] focus:ring-1 focus:ring-[#22b573]"
                  />
                </div>

                {!usuarioEditando && (
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-bold text-[#2c2a3d]">
                      Contraseña temporal
                    </label>
                    <input
                      type="password"
                      required
                      minLength={6}
                      maxLength={100}
                      autoComplete="new-password"
                      value={formulario.password}
                      onChange={(evento) =>
                        actualizarCampo('password', evento.target.value)
                      }
                      placeholder="Mínimo 6 caracteres"
                      className="w-full rounded-xl border border-[#ececf4] px-4 py-3 text-[14px] outline-none transition-all focus:border-[#22b573] focus:ring-1 focus:ring-[#22b573]"
                    />
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-[#2c2a3d]">
                    Rol del usuario
                  </label>
                  <select
                    value={formulario.role}
                    onChange={(evento) =>
                      actualizarCampo(
                        'role',
                        evento.target.value as RolUsuario,
                      )
                    }
                    className="w-full cursor-pointer rounded-xl border border-[#ececf4] bg-white px-4 py-3 text-[14px] text-[#2c2a3d] outline-none transition-all focus:border-[#22b573] focus:ring-1 focus:ring-[#22b573]"
                  >
                    {roles.map((rol) => (
                      <option key={rol.value} value={rol.value}>
                        {rol.label}
                      </option>
                    ))}
                  </select>
                </div>

                {usuarioEditando && (
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-bold text-[#2c2a3d]">
                      Estado de la cuenta
                    </label>
                    <select
                      value={formulario.is_active ? 'activo' : 'inactivo'}
                      onChange={(evento) =>
                        actualizarCampo(
                          'is_active',
                          evento.target.value === 'activo',
                        )
                      }
                      className="w-full cursor-pointer rounded-xl border border-[#ececf4] bg-white px-4 py-3 text-[14px] outline-none focus:border-[#22b573]"
                    >
                      <option value="activo">Activo</option>
                      <option value="inactivo">Inactivo</option>
                    </select>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 border-t border-[#ececf4] bg-[#f9fafc] p-6">
                <button
                  type="button"
                  onClick={cerrarModal}
                  disabled={guardando}
                  className="rounded-xl border border-[#ececf4] bg-white px-5 py-2.5 text-[13px] font-bold text-[#8b889c] transition-colors hover:bg-[#f4f5fb] hover:text-[#2c2a3d]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={guardando}
                  className="flex items-center gap-2 rounded-xl bg-[#22b573] px-5 py-2.5 text-[13px] font-bold text-white shadow-sm transition-colors hover:bg-[#1a935c] disabled:opacity-60"
                >
                  <Save size={16} />
                  {guardando ? 'Guardando...' : 'Guardar usuario'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
