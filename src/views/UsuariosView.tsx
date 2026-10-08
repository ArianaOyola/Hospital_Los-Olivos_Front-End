import { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Download, Save, X } from 'lucide-react';

const datosIniciales = [
  { id: 1, usuario: 'admin', nombre: 'Camila Huancahuari', iniciales: 'CH', rol: 'Administrador', estado: 'Activo', ultimoAcceso: 'Hoy, 10:25 AM', avatarColor: 'from-[#22b573] to-[#1a935c]' },
  { id: 2, usuario: 'jorge.n', nombre: 'Jorge Necochea', iniciales: 'JN', rol: 'Analista', estado: 'Activo', ultimoAcceso: 'Ayer, 04:30 PM', avatarColor: 'from-[#4f6ef7] to-[#2c3e9e]' },
  { id: 3, usuario: 'evelyn.a', nombre: 'Evelyn Atlaya', iniciales: 'EA', rol: 'Registrador', estado: 'Activo', ultimoAcceso: 'Hoy, 08:15 AM', avatarColor: 'from-[#22b573] to-[#127a4a]' },
  { id: 4, usuario: 'maria.r', nombre: 'María Ramírez', iniciales: 'MR', rol: 'Registrador', estado: 'Activo', ultimoAcceso: 'Hace 2 días', avatarColor: 'from-[#f0a83c] to-[#b87c22]' },
  { id: 5, usuario: 'luis.g', nombre: 'Luis Gonzales', iniciales: 'LG', rol: 'Consultor', estado: 'Inactivo', ultimoAcceso: 'Hace 1 mes', avatarColor: 'from-[#8b889c] to-[#5b596d]' },
  { id: 6, usuario: 'carla.m', nombre: 'Carla Medina', iniciales: 'CM', rol: 'Consultor', estado: 'Activo', ultimoAcceso: 'Hoy, 09:45 AM', avatarColor: 'from-[#e0525f] to-[#9b343f]' },
];

export function UsuariosView() {
  // Estado para los usuarios de la tabla
  const [usuarios, setUsuarios] = useState(datosIniciales);
  // Estado para los IDs seleccionados
  const [seleccionados, setSeleccionados] = useState<number[]>([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState<any>(null);

  const cerrarModal = () => {
    setIsModalOpen(false);
    setUsuarioEditando(null);
  };

  const abrirModalEdicion = (usuario: any) => {
    setUsuarioEditando(usuario);
    setIsModalOpen(true);
  };

  // Función para eliminar un solo usuario
  const eliminarUsuario = (id: number) => {
    setUsuarios(usuarios.filter(u => u.id !== id));
    setSeleccionados(seleccionados.filter(selId => selId !== id));
  };

  // Función para seleccionar o deseleccionar todos
  const toggleSeleccionarTodos = () => {
    if (seleccionados.length === usuarios.length && usuarios.length > 0) {
      setSeleccionados([]);
    } else {
      setSeleccionados(usuarios.map(u => u.id));
    }
  };

  // Función para seleccionar un usuario individual
  const toggleSeleccion = (id: number) => {
    if (seleccionados.includes(id)) {
      setSeleccionados(seleccionados.filter(selId => selId !== id));
    } else {
      setSeleccionados([...seleccionados, id]);
    }
  };

  // Función para eliminar los seleccionados
  const eliminarSeleccionados = () => {
    setUsuarios(usuarios.filter(u => !seleccionados.includes(u.id)));
    setSeleccionados([]);
  };

  return (
    <div className="flex flex-col h-full animate-fade-in pb-8 relative">
      
      {/* Cabecera CON el perfil de usuario */}
      <div className="mb-8 border-l-[5px] border-[#22b573] pl-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#2c2a3d] tracking-tight mb-1.5">
            Gestión de usuarios
          </h1>
          <p className="text-[#8b889c] text-[15px] font-medium">
            Administre los usuarios y accesos del sistema.
          </p>
        </div>
        
        <div className="flex items-center gap-3 bg-white border border-[#ececf4] py-1.5 pl-1.5 pr-5 rounded-full shadow-sm cursor-pointer hover:border-[#22b573] transition-colors shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#22b573] to-[#1a935c] flex items-center justify-center text-white font-bold text-sm shadow-inner">
            CH
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-bold text-[#2c2a3d] leading-tight">Camila Huancahuari</span>
            <span className="text-[11px] font-bold text-[#22b573] leading-tight uppercase tracking-wider mt-0.5">Administrador</span>
          </div>
        </div>
      </div>

      {/* Barra de Acciones y Filtros Avanzados */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-6">
        <div className="flex flex-col md:flex-row gap-3 w-full xl:w-auto flex-1">
          <div className="relative w-full md:w-80">
            <input 
              type="text" 
              placeholder="Buscar usuario o nombre..." 
              className="w-full bg-white border border-[#ececf4] rounded-xl pl-10 pr-4 py-2.5 text-[14px] focus:border-[#22b573] outline-none shadow-sm transition-colors"
            />
            <Search size={16} className="absolute left-3.5 top-3 text-[#8b889c]" />
          </div>
          <select className="bg-white border border-[#ececf4] rounded-xl px-4 py-2.5 text-[14px] text-[#2c2a3d] focus:border-[#22b573] outline-none shadow-sm cursor-pointer transition-colors">
            <option value="">Todos los roles</option>
            <option>Administrador</option>
            <option>Analista</option>
            <option>Registrador</option>
            <option>Consultor</option>
          </select>
          <select className="bg-white border border-[#ececf4] rounded-xl px-4 py-2.5 text-[14px] text-[#2c2a3d] focus:border-[#22b573] outline-none shadow-sm cursor-pointer transition-colors">
            <option value="">Todos los estados</option>
            <option>Activos</option>
            <option>Inactivos</option>
          </select>
        </div>
        
        <div className="flex gap-3 w-full xl:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-[#ececf4] text-[#2c2a3d] px-5 py-2.5 rounded-xl text-[14px] font-bold hover:bg-[#f4f5fb] transition-colors shadow-sm">
            <Download size={16} /> Exportar
          </button>
          
          <button 
            onClick={() => {
              setUsuarioEditando(null); 
              setIsModalOpen(true);
            }}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#22b573] text-white px-5 py-2.5 rounded-xl text-[14px] font-bold hover:bg-[#1a935c] transition-colors shadow-sm"
          >
            <Plus size={16} /> Nuevo usuario
          </button>
        </div>
      </div>

      {/* Tarjeta de la Tabla */}
      <div className="bg-white border border-[#ececf4] rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f9fafc] border-b border-[#ececf4]">
                <th className="py-4 pl-6 pr-2">
                  <input 
                    type="checkbox" 
                    onChange={toggleSeleccionarTodos}
                    checked={usuarios.length > 0 && seleccionados.length === usuarios.length}
                    className="w-4 h-4 rounded border-[#ececf4] text-[#22b573] focus:ring-[#22b573] cursor-pointer" 
                  />
                </th>
                <th className="py-4 px-4 text-[12px] font-bold text-[#8b889c] uppercase tracking-wider">Usuario</th>
                <th className="py-4 px-4 text-[12px] font-bold text-[#8b889c] uppercase tracking-wider">Nombre completo</th>
                <th className="py-4 px-4 text-[12px] font-bold text-[#8b889c] uppercase tracking-wider">Rol</th>
                <th className="py-4 px-4 text-[12px] font-bold text-[#8b889c] uppercase tracking-wider">Estado</th>
                <th className="py-4 px-4 text-[12px] font-bold text-[#8b889c] uppercase tracking-wider">Último acceso</th>
                <th className="py-4 px-6 text-[12px] font-bold text-[#8b889c] uppercase tracking-wider text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((row) => (
                <tr key={row.id} className="border-b border-[#ececf4] hover:bg-[#f4f5fb] transition-colors">
                  <td className="py-3 pl-6 pr-2">
                    <input 
                      type="checkbox" 
                      onChange={() => toggleSeleccion(row.id)}
                      checked={seleccionados.includes(row.id)}
                      className="w-4 h-4 rounded border-[#ececf4] text-[#22b573] focus:ring-[#22b573] cursor-pointer" 
                    />
                  </td>
                  <td className="py-3 px-4 text-[13px] font-bold text-[#22b573]">{row.usuario}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${row.avatarColor} flex items-center justify-center text-white font-bold text-[11px] shadow-sm shrink-0`}>
                        {row.iniciales}
                      </div>
                      <span className="text-[13px] font-medium text-[#2c2a3d]">{row.nombre}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-[13px] text-[#8b889c]">{row.rol}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${row.estado === 'Activo' ? 'bg-[#e5f7ed] text-[#22b573]' : 'bg-[#fee2e2] text-[#ef4444]'}`}>
                      {row.estado}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[13px] text-[#8b889c]">{row.ultimoAcceso}</td>
                  <td className="py-3 px-6">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => abrirModalEdicion(row)}
                        className="text-[#8b889c] hover:text-[#22b573] transition-colors p-1.5 rounded-lg hover:bg-[#eafaf1]" 
                        title="Editar"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => eliminarUsuario(row.id)}
                        className="text-[#8b889c] hover:text-[#e0525f] transition-colors p-1.5 rounded-lg hover:bg-[#fef2f2]" 
                        title="Eliminar"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {usuarios.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-[13px] text-[#8b889c]">
                    Awan ti usuario a mabirukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-5 flex flex-col md:flex-row items-center justify-between border-t border-[#ececf4] bg-white gap-4">
          <div className="flex items-center gap-4">
            <span className="text-[13px] text-[#8b889c]">Mostrando {usuarios.length > 0 ? 1 : 0} a {usuarios.length} de {usuarios.length} usuarios</span>
            <div className="hidden md:block w-px h-4 bg-[#ececf4]"></div>
            <span className="text-[13px] text-[#22b573] font-medium cursor-pointer hover:underline">{seleccionados.length} seleccionados</span>
          </div>
          <div className={`flex gap-2 transition-opacity ${seleccionados.length === 0 ? 'opacity-50 pointer-events-none' : ''}`}>
            <button 
              onClick={eliminarSeleccionados}
              className="text-[12px] font-bold text-[#e0525f] bg-[#fef2f2] border border-[#fef2f2] hover:bg-[#fee2e2] px-3 py-1.5 rounded-lg transition-colors"
            >
              Eliminar seleccionados
            </button>
          </div>
        </div>
      </div>

      {/* ========================================= */}
      {/* VENTANA EMERGENTE (MODAL) DINÁMICA */}
      {/* ========================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#2c2a3d]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-slide-up">
            
            <div className="p-6 border-b border-[#ececf4] flex justify-between items-start">
              <div>
                <h3 className="text-[18px] font-extrabold text-[#2c2a3d] mb-1">
                  {usuarioEditando ? 'Editar usuario' : 'Nuevo usuario'}
                </h3>
                <p className="text-[#8b889c] text-[13px] m-0">Complete los datos del usuario</p>
              </div>
              <button 
                onClick={cerrarModal}
                className="text-[#8b889c] hover:text-[#e0525f] hover:bg-[#fef2f2] p-1.5 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div key={usuarioEditando ? usuarioEditando.id : 'nuevo'} className="p-6 flex flex-col gap-5">
              
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-[#2c2a3d]">Nombre completo</label>
                <input 
                  type="text" 
                  defaultValue={usuarioEditando ? usuarioEditando.nombre : ''}
                  placeholder="Ej. Pedro Ramírez" 
                  className="w-full border border-[#ececf4] rounded-xl px-4 py-3 text-[14px] focus:border-[#22b573] focus:ring-1 focus:ring-[#22b573] outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-[#2c2a3d]">Usuario</label>
                <input 
                  type="text" 
                  defaultValue={usuarioEditando ? usuarioEditando.usuario : ''}
                  placeholder="Ej. pedro.r" 
                  className="w-full border border-[#ececf4] rounded-xl px-4 py-3 text-[14px] focus:border-[#22b573] focus:ring-1 focus:ring-[#22b573] outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-[#2c2a3d]">Rol</label>
                  <select 
                    defaultValue={usuarioEditando ? usuarioEditando.rol : 'Registrador'}
                    className="w-full border border-[#ececf4] rounded-xl px-4 py-3 text-[14px] bg-white text-[#2c2a3d] focus:border-[#22b573] focus:ring-1 focus:ring-[#22b573] outline-none cursor-pointer transition-all"
                  >
                    <option>Registrador</option>
                    <option>Analista</option>
                    <option>Consultor</option>
                    <option>Administrador</option>
                  </select>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-[#2c2a3d]">Estado</label>
                  <select 
                    defaultValue={usuarioEditando ? usuarioEditando.estado : 'Activo'}
                    className="w-full border border-[#ececf4] rounded-xl px-4 py-3 text-[14px] bg-white text-[#2c2a3d] focus:border-[#22b573] focus:ring-1 focus:ring-[#22b573] outline-none cursor-pointer transition-all"
                  >
                    <option>Activo</option>
                    <option>Inactivo</option>
                  </select>
                </div>
              </div>

            </div>

            <div className="p-6 border-t border-[#ececf4] bg-[#f9fafc] flex justify-end gap-3">
              <button 
                onClick={cerrarModal}
                className="px-5 py-2.5 rounded-xl text-[13px] font-bold text-[#8b889c] bg-white border border-[#ececf4] hover:bg-[#f4f5fb] hover:text-[#2c2a3d] transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={cerrarModal}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold text-white bg-[#22b573] hover:bg-[#1a935c] shadow-sm transition-colors"
              >
                <Save size={16} /> Guardar usuario
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}