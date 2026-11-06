import axios from 'axios';

// Definiendo endpoints para la API
const BASE_API_URL = 'http://localhost:8000/api';

// URLs con slash final para DRF
const PROVEEDORES_URL = `${BASE_API_URL}/proveedores/`;
const ARTICULOS_URL = `${BASE_API_URL}/articulos/`;

/* ========================================================
   PROVEEDORES
   ======================================================== */

// Getters
export const obtenerProveedores = async () => {
    try {
        const response = await axios.get(PROVEEDORES_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener proveedores:", error);
        throw error;
    }
};

export const obtenerProveedorPorId = async (id) => {
    try {
        const cleanId = String(id).trim();
        const response = await axios.get(`${PROVEEDORES_URL}${cleanId}/`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener proveedor por ID:", error);
        throw error;
    }
};

// Setters (Crear)
export const crearProveedor = async (proveedorData) => {
    try {
        const payload = {
            Codigo: proveedorData.Codigo ?? proveedorData.codigo,
            Nombre: proveedorData.Nombre ?? proveedorData.nombre,
            Domicilio: proveedorData.Domicilio ?? proveedorData.domicilio ?? '',
            Poblacion: proveedorData.Poblacion ?? proveedorData.poblacion ?? '',
            CPostal: proveedorData.CPostal ?? proveedorData.cPostal ?? '',
            Provincia: proveedorData.Provincia ?? proveedorData.provincia ?? '',
            Tfno: proveedorData.Tfno ?? proveedorData.telefono ?? '',
            Email: proveedorData.Email ?? proveedorData.email ?? ''
        };
        const response = await axios.post(PROVEEDORES_URL, payload);
        return response.data;
    } catch (error) {
        console.error("Error al crear proveedor:", error);
        throw error;
    }
};

// Updaters (Actualizar PUT)
export const actualizarProveedor = async (id, proveedorData) => {
    try {
        const cleanId = String(id).trim();
        const payload = {
            Codigo: proveedorData.Codigo ?? proveedorData.codigo ?? cleanId,
            Nombre: proveedorData.Nombre ?? proveedorData.nombre,
            Domicilio: proveedorData.Domicilio ?? proveedorData.domicilio ?? '',
            Poblacion: proveedorData.Poblacion ?? proveedorData.poblacion ?? '',
            CPostal: proveedorData.CPostal ?? proveedorData.cPostal ?? '',
            Provincia: proveedorData.Provincia ?? proveedorData.provincia ?? '',
            Tfno: proveedorData.Tfno ?? proveedorData.telefono ?? '',
            Email: proveedorData.Email ?? proveedorData.email ?? ''
        };
        const response = await axios.put(`${PROVEEDORES_URL}${cleanId}/`, payload);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar proveedor:", error);
        throw error;
    }
};

// Patchers (Actualizar parcial)
export const patchProveedor = async (id, camposParciales) => {
    try {
        const cleanId = String(id).trim();
        const response = await axios.patch(`${PROVEEDORES_URL}${cleanId}/`, camposParciales);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar parcialmente proveedor:", error);
        throw error;
    }
};

// Deleters (Eliminar)
export const eliminarProveedor = async (id) => {
    try {
        const cleanId = String(id).trim();
        const response = await axios.delete(`${PROVEEDORES_URL}${cleanId}/`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar proveedor:", error);
        throw error;
    }
};


/* ========================================================
   ARTÍCULOS
   ======================================================== */

// Getters
export const obtenerArticulos = async () => {
    try {
        const response = await axios.get(ARTICULOS_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener artículos:", error);
        throw error;
    }
};

export const obtenerArticuloPorId = async (id) => {
    try {
        const cleanId = String(id).trim();
        const response = await axios.get(`${ARTICULOS_URL}${cleanId}/`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener artículo por ID:", error);
        throw error;
    }
};

// Setters (Crear)
export const crearArticulo = async (articuloData) => {
    try {
        const payload = {
            Codigo: articuloData.Codigo ?? articuloData.codigo,
            Descripcion: articuloData.Descripcion ?? articuloData.descripcion,
            Precio_Compra: articuloData.Precio_Compra ?? articuloData.precio_compra,
            Precio_Venta: articuloData.Precio_Venta ?? articuloData.precio_venta,
            Ubicacion: articuloData.Ubicacion ?? articuloData.ubicacion ?? '',
            Proveedor: articuloData.Proveedor ?? articuloData.proveedor
        };
        const response = await axios.post(ARTICULOS_URL, payload);
        return response.data;
    } catch (error) {
        console.error("Error al crear artículo:", error);
        throw error;
    }
};

// Updaters (Actualizar PUT)
export const actualizarArticulo = async (id, articuloData) => {
    try {
        const cleanId = String(id).trim();
        const payload = {
            Codigo: articuloData.Codigo ?? articuloData.codigo ?? cleanId,
            Descripcion: articuloData.Descripcion ?? articuloData.descripcion,
            Precio_Compra: articuloData.Precio_Compra ?? articuloData.precio_compra,
            Precio_Venta: articuloData.Precio_Venta ?? articuloData.precio_venta,
            Ubicacion: articuloData.Ubicacion ?? articuloData.ubicacion ?? '',
            Proveedor: articuloData.Proveedor ?? articuloData.proveedor
        };
        const response = await axios.put(`${ARTICULOS_URL}${cleanId}/`, payload);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar artículo:", error);
        throw error;
    }
};

// Patchers (Actualizar parcial)
export const patchArticulo = async (id, camposParciales) => {
    try {
        const cleanId = String(id).trim();
        const response = await axios.patch(`${ARTICULOS_URL}${cleanId}/`, camposParciales);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar parcialmente artículo:", error);
        throw error;
    }
};

// Deleters (Eliminar)
export const eliminarArticulo = async (id) => {
    try {
        const cleanId = String(id).trim();
        const response = await axios.delete(`${ARTICULOS_URL}${cleanId}/`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar artículo:", error);
        throw error;
    }
};
