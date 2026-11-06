import { useState, useEffect } from 'react';
import { obtenerProveedorPorId } from '../config/api';

export const LlamarId = () => {
  const [proveedor, setProveedor] = useState(null);
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

    const fetchProveedor = async () => {
      setLoading(true);
      setError(null);
      setProveedor(null);

      try {
        const response = await obtenerProveedorPorId(idBuscado);
        if (!response) {
          throw new Error('No se encontró el proveedor con dicho ID/Código');
        }
        if (isMounted) {
          setProveedor(response);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.response?.status === 404
            ? `No existe ningún proveedor con el código "${idBuscado}".`
            : (err.message || 'Error al consultar el proveedor'));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProveedor();

    return () => {
      isMounted = false;
    };
  }, [idBuscado]);

  return (
    <div className="crud-card">
      <h2>🔍 Buscar Proveedor por ID / Código</h2>
      <form onSubmit={handleBuscar} className="acciones">
        <input
          type="text"
          placeholder="Ingrese Código del proveedor (ej. PRV01)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Consultando...' : 'Buscar Proveedor'}
        </button>
      </form>

      {loading && <div className="loading">Cargando proveedor...</div>}
      {error && <div className="alert error">{error}</div>}

      {proveedor && (
        <div className="detalle-proveedor">
          <h3>🏢 {proveedor.Nombre}</h3>
          <p><strong>Código:</strong> {proveedor.Codigo}</p>
          <p><strong>Teléfono:</strong> {proveedor.Tfno || 'Sin registrar'}</p>
          <p><strong>Correo:</strong> {proveedor.Email || 'Sin registrar'}</p>
          <p><strong>Domicilio:</strong> {proveedor.Domicilio || 'Sin registrar'}</p>
          <p><strong>Población:</strong> {proveedor.Poblacion || 'Sin registrar'}</p>
          <p><strong>Código Postal:</strong> {proveedor.CPostal || 'Sin registrar'}</p>
          <p><strong>Provincia:</strong> {proveedor.Provincia || 'Sin registrar'}</p>
        </div>
      )}
      {!proveedor && !loading && !error && (
        <p className="no-data">Ingresa un ID o Código para consultar la información del proveedor.</p>
      )}
    </div>
  );
};

export default LlamarId;
