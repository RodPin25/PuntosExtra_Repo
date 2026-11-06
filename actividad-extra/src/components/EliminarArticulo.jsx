import { useState } from 'react';
import { eliminarArticulo } from '../config/api';

export const EliminarArticulo = ({ onArticuloEliminado }) => {
  const [codigo, setCodigo] = useState('');
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);

  const handleEliminar = async (e) => {
    e.preventDefault();
    const cleanCodigo = codigo.trim();
    if (!cleanCodigo) {
      setError('Por favor, introduce el código del artículo a eliminar.');
      return;
    }

    const confirmacion = window.confirm(
      `¿Estás seguro de que deseas eliminar permanentemente el artículo con código "${cleanCodigo}"?`
    );
    if (!confirmacion) return;

    setLoading(true);
    setError(null);
    setMensaje(null);

    try {
      await eliminarArticulo(cleanCodigo);
      setMensaje(`Artículo "${cleanCodigo}" eliminado exitosamente.`);
      setCodigo('');
      if (onArticuloEliminado) {
        onArticuloEliminado(cleanCodigo);
      }
    } catch (err) {
      const detail = err.response?.data
        ? JSON.stringify(err.response.data)
        : err.message;
      setError(`No se pudo eliminar el artículo: ${detail}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="crud-card card-danger">
      <h3>🗑️ Eliminar Artículo</h3>
      {mensaje && <div className="alert success">{mensaje}</div>}
      {error && <div className="alert error">{error}</div>}

      <form onSubmit={handleEliminar} className="acciones">
        <input
          type="text"
          placeholder="Código de artículo (ej. ART01)"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />
        <button type="submit" className="btn-danger" disabled={loading}>
          {loading ? 'Eliminando...' : 'Eliminar Artículo'}
        </button>
      </form>
    </div>
  );
};

export default EliminarArticulo;
