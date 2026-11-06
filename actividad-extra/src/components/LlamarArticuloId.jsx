import { useState, useEffect } from 'react';
import { obtenerArticuloPorId } from '../config/api';

export const LlamarArticuloId = () => {
  const [articulo, setArticulo] = useState(null);
  const [input, setInput] = useState('');
  const [idBuscado, setIdBuscado] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleBuscar = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setIdBuscado(input.trim());
  };

  useEffect(() => {
    if (!idBuscado) return;

    let isMounted = true;

    const fetchArticulo = async () => {
      setLoading(true);
      setError(null);
      setArticulo(null);

      try {
        const response = await obtenerArticuloPorId(idBuscado);
        if (!response) {
          throw new Error('No se encontró el artículo con dicho código');
        }
        if (isMounted) {
          setArticulo(response);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err.response?.status === 404
              ? `No existe ningún artículo con el código "${idBuscado}".`
              : (err.message || 'Error al consultar el artículo')
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchArticulo();

    return () => {
      isMounted = false;
    };
  }, [idBuscado]);

  return (
    <div className="crud-card">
      <h2>🔍 Buscar Artículo por Código</h2>
      <form onSubmit={handleBuscar} className="acciones">
        <input
          type="text"
          placeholder="Ingrese Código del artículo (ej. ART01)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Consultando...' : 'Buscar Artículo'}
        </button>
      </form>

      {loading && <div className="loading">Cargando artículo...</div>}
      {error && <div className="alert error">{error}</div>}

      {articulo && (
        <div className="detalle-proveedor">
          <h3>📦 {articulo.Descripcion}</h3>
          <p><strong>Código:</strong> {articulo.Codigo}</p>
          <p><strong>Precio Compra:</strong> Q. {parseFloat(articulo.Precio_Compra || 0).toFixed(2)}</p>
          <p><strong>Precio Venta:</strong> Q. {parseFloat(articulo.Precio_Venta || 0).toFixed(2)}</p>
          <p><strong>Ubicación:</strong> {articulo.Ubicacion || 'Sin asignar'}</p>
          <p><strong>Proveedor asignado:</strong> {articulo.Proveedor}</p>
          {articulo.Proveedor_detalle && (
            <div style={{ marginTop: '8px', padding: '8px', background: 'var(--social-bg)', borderRadius: '6px' }}>
              <strong>Datos del Proveedor:</strong>
              <p>Nombre: {articulo.Proveedor_detalle.Nombre}</p>
              <p>Contacto: {articulo.Proveedor_detalle.Tfno} | {articulo.Proveedor_detalle.Email}</p>
            </div>
          )}
        </div>
      )}
      {!articulo && !loading && !error && (
        <p className="no-data">Ingresa un código para consultar la información del artículo.</p>
      )}
    </div>
  );
};

export default LlamarArticuloId;
