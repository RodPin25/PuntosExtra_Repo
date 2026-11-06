import React, { useState, useEffect } from 'react';
import { obtenerArticulos, eliminarArticulo } from '../config/api';

function ArticulosTable({ versionActualizacion, onSeleccionarArticulo }) {
  const [articulos, setArticulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArticulos = async () => {
    setLoading(true);
    try {
      const response = await obtenerArticulos();
      if (!response) {
        throw new Error('No se pudo obtener la lista de artículos.');
      }
      setArticulos(response);
      setError(null);
    } catch (err) {
      setError(err.message || 'Error al cargar los artículos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticulos();
  }, [versionActualizacion]);

  const handleBorrarDirecto = async (codigo, descripcion) => {
    const seguro = window.confirm(`¿Deseas eliminar el artículo "${descripcion}" (${codigo})?`);
    if (!seguro) return;
    try {
      await eliminarArticulo(codigo);
      fetchArticulos();
    } catch (err) {
      alert('Error al eliminar el artículo');
    }
  };

  return (
    <div className="articulos-container crud-card">
      <div className="header-flex">
        <h2>Listado de Artículos</h2>
        <button onClick={fetchArticulos} className="btn-secondary" title="Recargar lista">
          🔄 Refrescar
        </button>
      </div>

      {loading && <div className="loading">Cargando artículos...</div>}
      {error && <div className="alert error">Error: {error}</div>}

      {!loading && !error && (
        <table className="styled-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Descripción</th>
              <th>P. Compra</th>
              <th>P. Venta</th>
              <th>Ubicación</th>
              <th>Proveedor</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {articulos.length > 0 ? (
              articulos.map((art) => (
                <tr key={art.Codigo}>
                  <td><strong>{art.Codigo}</strong></td>
                  <td>{art.Descripcion}</td>
                  <td>Q. {parseFloat(art.Precio_Compra || 0).toFixed(2)}</td>
                  <td>Q. {parseFloat(art.Precio_Venta || 0).toFixed(2)}</td>
                  <td>{art.Ubicacion || '-'}</td>
                  <td>
                    {art.Proveedor_detalle
                      ? `${art.Proveedor_detalle.Nombre} (${art.Proveedor})`
                      : art.Proveedor}
                  </td>
                  <td>
                    <div className="acciones-fila">
                      {onSeleccionarArticulo && (
                        <button
                          type="button"
                          className="btn-sm btn-secondary"
                          onClick={() => onSeleccionarArticulo(art)}
                        >
                          Editar
                        </button>
                      )}
                      <button
                        type="button"
                        className="btn-sm btn-danger"
                        onClick={() => handleBorrarDirecto(art.Codigo, art.Descripcion)}
                      >
                        Borrar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-data">No hay artículos registrados.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ArticulosTable;
