import { useState } from "react";
import LlamarArticulos from "./LlamarArticulos";
import LlamarArticuloId from "./LlamarArticuloId";
import CrearArticulo from "./CrearArticulo";
import ActualizarArticulo from "./ActualizarArticulo";
import EliminarArticulo from "./EliminarArticulo";

const VistaArticulos = () => {
  // Pestaña activa: 'todos' | 'buscar' | 'crear' | 'actualizar' | 'eliminar'
  const [tabActiva, setTabActiva] = useState('todos');
  const [version, setVersion] = useState(0);

  const recargarLista = () => {
    setVersion((v) => v + 1);
  };

  const handleArticuloCreado = () => {
    recargarLista();
    setTabActiva('todos');
  };

  const handleArticuloActualizado = () => {
    recargarLista();
  };

  const handleArticuloEliminado = () => {
    recargarLista();
  };

  return (
    <div className="crud-contenedor-principal">
      <header className="crud-header">
        <h1>Gestión de Artículos</h1>
        <p>Módulo CRUD completo para inventario y catálogo de productos</p>
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
          🔍 Buscar por Código
        </button>
        <button
          className={tabActiva === 'crear' ? 'tab-btn active' : 'tab-btn'}
          onClick={() => setTabActiva('crear')}
        >
          ➕ Nuevo Artículo
        </button>
        <button
          className={tabActiva === 'actualizar' ? 'tab-btn active' : 'tab-btn'}
          onClick={() => setTabActiva('actualizar')}
        >
          ✏️ Editar Artículo
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
          <LlamarArticulos
            versionActualizacion={version}
            onSeleccionarArticulo={() => setTabActiva('actualizar')}
          />
        )}

        {tabActiva === 'buscar' && (
          <LlamarArticuloId />
        )}

        {tabActiva === 'crear' && (
          <CrearArticulo onArticuloCreado={handleArticuloCreado} />
        )}

        {tabActiva === 'actualizar' && (
          <ActualizarArticulo onArticuloActualizado={handleArticuloActualizado} />
        )}

        {tabActiva === 'eliminar' && (
          <EliminarArticulo onArticuloEliminado={handleArticuloEliminado} />
        )}
      </main>
    </div>
  );
};

export default VistaArticulos;
