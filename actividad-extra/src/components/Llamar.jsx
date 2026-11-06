import React, { useState, useEffect } from 'react';

function ProveedoresTable() {
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        const response = await responseApiOrFetch(); 
        const responseData = await fetch('RUTA-API');
        
        if (!response.ok) {
          throw new Error('No se pudo obtener la lista de proveedores.');
        }
        
        const data = await response.json();
        setProveedores(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProveedores();
  }, []);

  if (loading) return <div className="loading">Cargando proveedores...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="proveedores-container">
      <h2>Listado de Proveedores</h2>
      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Contacto</th>
            <th>Correo</th>
            <th>Dirección</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.length > 0 ? (
            proveedores.map((prov) => (
              <tr key={prov.id}>
                <td>{prov.id}</td>
                <td>{prov.nombre}</td>
                <td>{prov.telefono}</td>
                <td>{prov.correo}</td>
                <td>{prov.direccion}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-data">No hay proveedores registrados.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProveedoresTable;