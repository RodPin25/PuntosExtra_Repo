import { useState, useEffect } from 'react';
import { crearArticulo, obtenerProveedores } from '../config/api';

export const CrearArticulo = ({ onArticuloCreado }) => {
  const [formData, setFormData] = useState({
    Codigo: '',
    Descripcion: '',
    Precio_Compra: '',
    Precio_Venta: '',
    Ubicacion: '',
    Proveedor: ''
  });

  const [proveedores, setProveedores] = useState([]);
  const [loadingProveedores, setLoadingProveedores] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);

  // Cargar lista de proveedores para el select
  useEffect(() => {
    const fetchProveedores = async () => {
      setLoadingProveedores(true);
      try {
        const lista = await obtenerProveedores();
        if (lista && Array.isArray(lista)) {
          setProveedores(lista);
          if (lista.length > 0) {
            setFormData((prev) => ({ ...prev, Proveedor: prev.Proveedor || lista[0].Codigo }));
          }
        }
      } catch (err) {
        console.error('Error cargando lista de proveedores:', err);
      } finally {
        setLoadingProveedores(false);
      }
    };

    fetchProveedores();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.Codigo.trim() || !formData.Descripcion.trim() || !formData.Proveedor) {
      setError('El Código, la Descripción y el Proveedor son obligatorios.');
      return;
    }

    if (isNaN(parseFloat(formData.Precio_Compra)) || isNaN(parseFloat(formData.Precio_Venta))) {
      setError('Los precios de compra y venta deben ser números válidos.');
      return;
    }

    setLoading(true);
    setError(null);
    setMensaje(null);

    try {
      const nuevoArticulo = await crearArticulo({
        ...formData,
        Precio_Compra: parseFloat(formData.Precio_Compra).toFixed(2),
        Precio_Venta: parseFloat(formData.Precio_Venta).toFixed(2)
      });

      setMensaje(`Artículo "${formData.Descripcion}" registrado con éxito.`);
      setFormData({
        Codigo: '',
        Descripcion: '',
        Precio_Compra: '',
        Precio_Venta: '',
        Ubicacion: '',
        Proveedor: proveedores.length > 0 ? proveedores[0].Codigo : ''
      });

      if (onArticuloCreado) {
        onArticuloCreado(nuevoArticulo);
      }
    } catch (err) {
      const detail = err.response?.data
        ? JSON.stringify(err.response.data)
        : err.message;
      setError(`Error al registrar el artículo: ${detail}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="crud-card">
      <h3>➕ Crear Nuevo Artículo</h3>
      {mensaje && <div className="alert success">{mensaje}</div>}
      {error && <div className="alert error">{error}</div>}

      <form onSubmit={handleSubmit} className="crud-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="art-codigo">Código *</label>
            <input
              id="art-codigo"
              type="text"
              name="Codigo"
              placeholder="Ej. ART06"
              value={formData.Codigo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="art-descripcion">Descripción *</label>
            <input
              id="art-descripcion"
              type="text"
              name="Descripcion"
              placeholder="Ej. Laptop HP 15.6 pulgadas"
              value={formData.Descripcion}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="art-proveedor">Proveedor *</label>
            {loadingProveedores ? (
              <span>Cargando proveedores...</span>
            ) : (
              <select
                id="art-proveedor"
                name="Proveedor"
                className="select-custom"
                value={formData.Proveedor}
                onChange={handleChange}
                required
              >
                <option value="">-- Selecciona un proveedor --</option>
                {proveedores.map((prov) => (
                  <option key={prov.Codigo} value={prov.Codigo}>
                    {prov.Nombre} ({prov.Codigo})
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="art-precio-compra">Precio de Compra (Q.) *</label>
            <input
              id="art-precio-compra"
              type="number"
              step="0.01"
              name="Precio_Compra"
              placeholder="0.00"
              value={formData.Precio_Compra}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="art-precio-venta">Precio de Venta (Q.) *</label>
            <input
              id="art-precio-venta"
              type="number"
              step="0.01"
              name="Precio_Venta"
              placeholder="0.00"
              value={formData.Precio_Venta}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="art-ubicacion">Ubicación en Bodega / Tienda</label>
            <input
              id="art-ubicacion"
              type="text"
              name="Ubicacion"
              placeholder="Ej. Pasillo 2, Estante 4"
              value={formData.Ubicacion}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Guardando...' : 'Registrar Artículo'}
        </button>
      </form>
    </div>
  );
};

export default CrearArticulo;
