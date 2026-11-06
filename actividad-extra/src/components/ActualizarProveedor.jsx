import { useState } from 'react';
import { actualizarProveedor, patchProveedor, obtenerProveedorPorId } from '../config/api';

export const ActualizarProveedor = ({ onProveedorActualizado, proveedorInicial }) => {
  const [buscarId, setBuscarId] = useState('');
  const [cargandoBusqueda, setCargandoBusqueda] = useState(false);
  const [tipoEdicion, setTipoEdicion] = useState('PUT'); // PUT o PATCH

  const [formData, setFormData] = useState({
    Codigo: '',
    Nombre: '',
    Domicilio: '',
    Poblacion: '',
    CPostal: '',
    Provincia: '',
    Tfno: '',
    Email: ''
  });

  const [proveedorCargado, setProveedorCargado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);

  const cargarDatos = (prov) => {
    setFormData({
      Codigo: prov.Codigo || '',
      Nombre: prov.Nombre || '',
      Domicilio: prov.Domicilio || '',
      Poblacion: prov.Poblacion || '',
      CPostal: prov.CPostal || '',
      Provincia: prov.Provincia || '',
      Tfno: prov.Tfno || '',
      Email: prov.Email || ''
    });
    setProveedorCargado(true);
    setError(null);
  };

  const handleBuscar = async (e) => {
    e.preventDefault();
    if (!buscarId.trim()) {
      setError('Ingresa el Código/ID del proveedor a editar.');
      return;
    }

    setCargandoBusqueda(true);
    setError(null);
    setMensaje(null);

    try {
      const data = await obtenerProveedorPorId(buscarId.trim());
      if (!data) throw new Error('No se encontró el proveedor');
      cargarDatos(data);
      setMensaje(`Proveedor ${data.Codigo} cargado para edición.`);
    } catch (err) {
      setError(`No se encontró el proveedor con código "${buscarId}".`);
      setProveedorCargado(false);
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
      let resultado;
      if (tipoEdicion === 'PATCH') {
        resultado = await patchProveedor(formData.Codigo, formData);
      } else {
        resultado = await actualizarProveedor(formData.Codigo, formData);
      }

      setMensaje(`Proveedor ${formData.Codigo} actualizado correctamente (${tipoEdicion}).`);
      if (onProveedorActualizado) {
        onProveedorActualizado(resultado);
      }
    } catch (err) {
      const detail = err.response?.data
        ? JSON.stringify(err.response.data)
        : err.message;
      setError(`Error al actualizar el proveedor: ${detail}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="crud-card">
      <h3>✏️ Actualizar Proveedor</h3>

      <form onSubmit={handleBuscar} className="acciones">
        <input
          type="text"
          placeholder="Código de proveedor a buscar (ej. PRV01)"
          value={buscarId}
          onChange={(e) => setBuscarId(e.target.value)}
        />
        <button type="submit" className="btn-secondary" disabled={cargandoBusqueda}>
          {cargandoBusqueda ? 'Buscando...' : 'Cargar Datos'}
        </button>
      </form>

      {mensaje && <div className="alert success">{mensaje}</div>}
      {error && <div className="alert error">{error}</div>}

      {proveedorCargado && (
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
              <label htmlFor="edit-Codigo">Código (No editable)</label>
              <input
                id="edit-Codigo"
                type="text"
                name="Codigo"
                value={formData.Codigo}
                disabled
              />
            </div>

            <div className="form-group">
              <label htmlFor="edit-Nombre">Nombre *</label>
              <input
                id="edit-Nombre"
                type="text"
                name="Nombre"
                value={formData.Nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="edit-Tfno">Teléfono</label>
              <input
                id="edit-Tfno"
                type="text"
                name="Tfno"
                value={formData.Tfno}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="edit-Email">Correo Electrónico</label>
              <input
                id="edit-Email"
                type="email"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="edit-Domicilio">Domicilio</label>
              <input
                id="edit-Domicilio"
                type="text"
                name="Domicilio"
                value={formData.Domicilio}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="edit-Poblacion">Población</label>
              <input
                id="edit-Poblacion"
                type="text"
                name="Poblacion"
                value={formData.Poblacion}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="edit-CPostal">Código Postal</label>
              <input
                id="edit-CPostal"
                type="text"
                name="CPostal"
                value={formData.CPostal}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="edit-Provincia">Provincia</label>
              <input
                id="edit-Provincia"
                type="text"
                name="Provincia"
                value={formData.Provincia}
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

export default ActualizarProveedor;
