import { useState, useEffect } from 'react';
import { actualizarArticulo, patchArticulo, obtenerArticuloPorId, obtenerProveedores } from '../config/api';

export const ActualizarArticulo = ({ onArticuloActualizado }) => {
  const [buscarId, setBuscarId] = useState('');
  const [cargandoBusqueda, setCargandoBusqueda] = useState(false);
  const [tipoEdicion, setTipoEdicion] = useState('PUT');

  const [formData, setFormData] = useState({
    Codigo: '',
    Descripcion: '',
    Precio_Compra: '',
    Precio_Venta: '',
    Ubicacion: '',
    Proveedor: ''
  });

  const [proveedores, setProveedores] = useState([]);
  const [articuloCargado, setArticuloCargado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        const lista = await obtenerProveedores();
        if (lista && Array.isArray(lista)) {
          setProveedores(lista);
        }
      } catch (err) {
        console.error('Error al cargar proveedores:', err);
      }
    };
    fetchProveedores();
  }, []);

  const cargarDatos = (art) => {
    setFormData({
      Codigo: art.Codigo || '',
      Descripcion: art.Descripcion || '',
      Precio_Compra: art.Precio_Compra || '',
      Precio_Venta: art.Precio_Venta || '',
      Ubicacion: art.Ubicacion || '',
      Proveedor: art.Proveedor || (art.Proveedor_detalle ? art.Proveedor_detalle.Codigo : '')
    });
    setArticuloCargado(true);
    setError(null);
  };

  const handleBuscar = async (e) => {
    e.preventDefault();
    if (!buscarId.trim()) {
      setError('Ingresa el Código del artículo a editar.');
      return;
    }

    setCargandoBusqueda(true);
    setError(null);
    setMensaje(null);

    try {
      const data = await obtenerArticuloPorId(buscarId.trim());
      if (!data) throw new Error('No se encontró el artículo');
      cargarDatos(data);
      setMensaje(`Artículo ${data.Codigo} cargado para edición.`);
    } catch (err) {
      setError(`No se encontró el artículo con código "${buscarId}".`);
      setArticuloCargado(false);
    } finally {
      setCargandoBusqueda(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.Codigo.trim()) {
      setError('El código es necesario para actualizar.');
      return;
    }

    setLoading(true);
    setError(null);
    setMensaje(null);

    try {
      const payload = {
        ...formData,
        Precio_Compra: parseFloat(formData.Precio_Compra).toFixed(2),
        Precio_Venta: parseFloat(formData.Precio_Venta).toFixed(2)
      };

      let resultado;
      if (tipoEdicion === 'PATCH') {
        resultado = await patchArticulo(formData.Codigo, payload);
      } else {
        resultado = await actualizarArticulo(formData.Codigo, payload);
      }

      setMensaje(`Artículo ${formData.Codigo} actualizado correctamente (${tipoEdicion}).`);
      if (onArticuloActualizado) {
        onArticuloActualizado(resultado);
      }
    } catch (err) {
      const detail = err.response?.data
        ? JSON.stringify(err.response.data)
        : err.message;
      setError(`Error al actualizar el artículo: ${detail}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="crud-card">
      <h3>✏️ Actualizar Artículo</h3>

      <form onSubmit={handleBuscar} className="acciones">
        <input
          type="text"
          placeholder="Código de artículo a buscar (ej. ART01)"
          value={buscarId}
          onChange={(e) => setBuscarId(e.target.value)}
        />
        <button type="submit" className="btn-secondary" disabled={cargandoBusqueda}>
          {cargandoBusqueda ? 'Buscando...' : 'Cargar Datos'}
        </button>
      </form>

      {mensaje && <div className="alert success">{mensaje}</div>}
      {error && <div className="alert error">{error}</div>}

      {articuloCargado && (
        <form onSubmit={handleSubmit} className="crud-form">
          <div className="modo-edicion">
            <label>
              <strong>Método: </strong>
            </label>
            <label style={{ marginRight: '1rem' }}>
              <input
                type="radio"
                value="PUT"
                checked={tipoEdicion === 'PUT'}
                onChange={() => setTipoEdicion('PUT')}
              />{' '}
              PUT (Completo)
            </label>
            <label>
              <input
                type="radio"
                value="PATCH"
                checked={tipoEdicion === 'PATCH'}
                onChange={() => setTipoEdicion('PATCH')}
              />{' '}
              PATCH (Parcial)
            </label>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="edit-art-Codigo">Código (No editable)</label>
              <input
                id="edit-art-Codigo"
                type="text"
                name="Codigo"
                value={formData.Codigo}
                disabled
              />
            </div>

            <div className="form-group">
              <label htmlFor="edit-art-Descripcion">Descripción *</label>
              <input
                id="edit-art-Descripcion"
                type="text"
                name="Descripcion"
                value={formData.Descripcion}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="edit-art-Proveedor">Proveedor *</label>
              <select
                id="edit-art-Proveedor"
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
            </div>

            <div className="form-group">
              <label htmlFor="edit-art-PrecioCompra">Precio Compra (Q.) *</label>
              <input
                id="edit-art-PrecioCompra"
                type="number"
                step="0.01"
                name="Precio_Compra"
                value={formData.Precio_Compra}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="edit-art-PrecioVenta">Precio Venta (Q.) *</label>
              <input
                id="edit-art-PrecioVenta"
                type="number"
                step="0.01"
                name="Precio_Venta"
                value={formData.Precio_Venta}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="edit-art-Ubicacion">Ubicación</label>
              <input
                id="edit-art-Ubicacion"
                type="text"
                name="Ubicacion"
                value={formData.Ubicacion}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Guardando Cambios...' : `Guardar Cambios (${tipoEdicion})`}
          </button>
        </form>
      )}
    </div>
  );
};

export default ActualizarArticulo;
