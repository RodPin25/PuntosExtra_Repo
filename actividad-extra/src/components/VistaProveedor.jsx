import { useState } from "react";
import Llamar from "./Llamar";
import LlamarId from "./LlamarId";
import CrearProveedor from "./CrearProveedor";
import ActualizarProveedor from "./ActualizarProveedor";
import EliminarProveedor from "./EliminarProveedor";

const VistaProveedor = () => {
  // Pestaña activa: 'todos' | 'buscar' | 'crear' | 'actualizar' | 'eliminar'
  const [tabActiva, setTabActiva] = useState('todos');
  const [version, setVersion] = useState(0);

  const recargarLista = () => {
    setVersion((v) => v + 1);
  };

  const handleProveedorCreado = () => {
    recargarLista();
    setTabActiva('todos');
  };

  const handleProveedorActualizado = () => {
    recargarLista();
  };

  const handleProveedorEliminado = () => {
    recargarLista();
  };

  return (
    <div className="crud-contenedor-principal">
      <header className="crud-header">
        <h1>Gestión de Proveedores</h1>
        <p>Módulo CRUD completo conectado a la API de Django REST</p>
      </header>

      {/* Navegación por pestañas */}
      <nav className="crud-tabs">
        <button
          className={tabActiva === 'todos' ? 'tab-btn active' : 'tab-btn'}
          onClick={() => setTabActiva('todos')}
        >
          📋 Ver Todos
        </button>
        <button
          className={tabActiva === 'buscar' ? 'tab-btn active' : 'tab-btn'}
          onClick={() => setTabActiva('buscar')}
        >
          🔍 Buscar por ID
        </button>
        <button
          className={tabActiva === 'crear' ? 'tab-btn active' : 'tab-btn'}
          onClick={() => setTabActiva('crear')}
        >
          ➕ Nuevo Proveedor
        </button>
        <button
          className={tabActiva === 'actualizar' ? 'tab-btn active' : 'tab-btn'}
          onClick={() => setTabActiva('actualizar')}
        >
          ✏️ Editar Proveedor
        </button>
        <button
          className={tabActiva === 'eliminar' ? 'tab-btn active' : 'tab-btn'}
          onClick={() => setTabActiva('eliminar')}
        >
          🗑️ Eliminar
        </button>
      </nav>

      {/* Vistas según la pestaña activa */}
      <main className="crud-content">
        {tabActiva === 'todos' && (
          <Llamar
            versionActualizacion={version}
            onSeleccionarProveedor={() => setTabActiva('actualizar')}
          />
        )}

        {tabActiva === 'buscar' && (
          <LlamarId />
        )}

        {tabActiva === 'crear' && (
          <CrearProveedor onProveedorCreado={handleProveedorCreado} />
        )}

        {tabActiva === 'actualizar' && (
          <ActualizarProveedor onProveedorActualizado={handleProveedorActualizado} />
        )}

        {tabActiva === 'eliminar' && (
          <EliminarProveedor onProveedorEliminado={handleProveedorEliminado} />
        )}
      </main>
    </div>
  );
};

export default VistaProveedor;
