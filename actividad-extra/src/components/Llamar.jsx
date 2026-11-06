import React, { useState, useEffect } from 'react';
import { obtenerProveedores, eliminarProveedor } from '../config/api';

function ProveedoresTable({ versionActualizacion, onSeleccionarProveedor }) {
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProveedores = async () => {
    setLoading(true);
    try {
      const response = await obtenerProveedores(); 
      if (!response) {
        throw new Error('No se pudo obtener la lista de proveedores.');
      }
      setProveedores(response);
      setError(null);
    } catch (err) {
      setError(err.message || 'Error al cargar los proveedores');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProveedores();
  }, [versionActualizacion]);

  const handleBorrarDirecto = async (codigo, nombre) => {
    const seguro = window.confirm(`¿Deseas eliminar el proveedor ${nombre} (${codigo})?`);
    if (!seguro) return;
    try {
      await eliminarProveedor(codigo);
      fetchProveedores();
    } catch (err) {
      alert('Error al eliminar el proveedor');
    }
  };

  return (
    <div className="proveedores-container crud-card">
      <div className="header-flex">
        <h2>Listado de Proveedores</h2>
        <button onClick={fetchProveedores} className="btn-secondary" title="Recargar lista">
          🔄 Refrescar
        </button>
      </div>

      {loading && <div className="loading">Cargando proveedores...</div>}
      {error && <div className="alert error">Error: {error}</div>}

      {!loading && !error && (
        <table className="styled-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Contacto</th>
              <th>Correo</th>
              <th>Dirección / Ubicación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proveedores.length > 0 ? (
              proveedores.map((prov) => (
                <tr key={prov.Codigo}>
                  <td><strong>{prov.Codigo}</strong></td>
                  <td>{prov.Nombre}</td>
                  <td>{prov.Tfno || '-'}</td>
                  <td>{prov.Email || '-'}</td>
                  <td>
                    {prov.Domicilio ? `${prov.Domicilio}, ` : ''}
                    {prov.Poblacion ? `${prov.Poblacion}, ` : ''}
                    {prov.Provincia || ''}
                  </td>
                  <td>
                    <div className="acciones-fila">
                      {onSeleccionarProveedor && (
                        <button
                          type="button"
                          className="btn-sm btn-secondary"
                          onClick={() => onSeleccionarProveedor(prov)}
                        >
                          Editar
                        </button>
                      )}
                      <button
                        type="button"
                        className="btn-sm btn-danger"
                        onClick={() => handleBorrarDirecto(prov.Codigo, prov.Nombre)}
                      >
                        Borrar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">No hay proveedores registrados.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProveedoresTable;
