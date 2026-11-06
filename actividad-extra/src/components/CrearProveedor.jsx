import { useState } from 'react';
import { crearProveedor } from '../config/api';

export const CrearProveedor = ({ onProveedorCreado }) => {
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

  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.Codigo.trim() || !formData.Nombre.trim()) {
      setError('El Código y el Nombre son obligatorios.');
      return;
    }

    setLoading(true);
    setError(null);
    setMensaje(null);

    try {
      const nuevoProveedor = await crearProveedor(formData);
      setMensaje(`Proveedor "${formData.Nombre}" creado con éxito.`);
      setFormData({
        Codigo: '',
        Nombre: '',
        Domicilio: '',
        Poblacion: '',
        CPostal: '',
        Provincia: '',
        Tfno: '',
        Email: ''
      });
      if (onProveedorCreado) {
        onProveedorCreado(nuevoProveedor);
      }
    } catch (err) {
      const detail = err.response?.data
        ? JSON.stringify(err.response.data)
        : err.message;
      setError(`Error al registrar el proveedor: ${detail}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="crud-card">
      <h3>➕ Crear Nuevo Proveedor</h3>
      {mensaje && <div className="alert success">{mensaje}</div>}
      {error && <div className="alert error">{error}</div>}

      <form onSubmit={handleSubmit} className="crud-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="Codigo">Código *</label>
            <input
              id="Codigo"
              type="text"
              name="Codigo"
              placeholder="Ej. PRV04"
              value={formData.Codigo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="Nombre">Nombre / Razón Social *</label>
            <input
              id="Nombre"
              type="text"
              name="Nombre"
              placeholder="Ej. Comercializadora ABC"
              value={formData.Nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="Tfno">Teléfono</label>
            <input
              id="Tfno"
              type="text"
              name="Tfno"
              placeholder="Ej. +502 1234-5678"
              value={formData.Tfno}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="Email">Correo Electrónico</label>
            <input
              id="Email"
              type="email"
              name="Email"
              placeholder="correo@ejemplo.com"
              value={formData.Email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="Domicilio">Domicilio</label>
            <input
              id="Domicilio"
              type="text"
              name="Domicilio"
              placeholder="Dirección o calle"
              value={formData.Domicilio}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="Poblacion">Población / Municipio</label>
            <input
              id="Poblacion"
              type="text"
              name="Poblacion"
              placeholder="Ciudad o municipio"
              value={formData.Poblacion}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="CPostal">Código Postal</label>
            <input
              id="CPostal"
              type="text"
              name="CPostal"
              placeholder="01001"
              value={formData.CPostal}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="Provincia">Provincia / Departamento</label>
            <input
              id="Provincia"
              type="text"
              name="Provincia"
              placeholder="Guatemala"
              value={formData.Provincia}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Guardando...' : 'Registrar Proveedor'}
        </button>
      </form>
    </div>
  );
};

export default CrearProveedor;
