import { useState } from 'react';
import { eliminarProveedor } from '../config/api';

export const EliminarProveedor = ({ onProveedorEliminado }) => {
  const [codigo, setCodigo] = useState('');
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);

  const handleEliminar = async (e) => {
    e.preventDefault();
    const cleanCodigo = codigo.trim();
    if (!cleanCodigo) {
      setError('Por favor, introduce el código del proveedor a eliminar.');
      return;
    }

    const confirmacion = window.confirm(
      `¿Estás seguro de que deseas eliminar permanentemente el proveedor con código "${cleanCodigo}"?`
    );
    if (!confirmacion) return;

    setLoading(true);
    setError(null);
    setMensaje(null);

    try {
      await eliminarProveedor(cleanCodigo);
      setMensaje(`Proveedor "${cleanCodigo}" eliminado exitosamente.`);
      setCodigo('');
      if (onProveedorEliminado) {
        onProveedorEliminado(cleanCodigo);
      }
    } catch (err) {
      const detail = err.response?.data
        ? JSON.stringify(err.response.data)
        : err.message;
      setError(`No se pudo eliminar el proveedor: ${detail}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="crud-card card-danger">
      <h3>🗑️ Eliminar Proveedor</h3>
      {mensaje && <div className="alert success">{mensaje}</div>}
      {error && <div className="alert error">{error}</div>}

      <form onSubmit={handleEliminar} className="acciones">
        <input
          type="text"
          placeholder="Código de proveedor (ej. PRV01)"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />
        <button type="submit" className="btn-danger" disabled={loading}>
          {loading ? 'Eliminando...' : 'Eliminar Proveedor'}
        </button>
      </form>
    </div>
  );
};

export default EliminarProveedor;
