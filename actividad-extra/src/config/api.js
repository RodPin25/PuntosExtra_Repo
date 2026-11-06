import axios from 'axios';

// Definiendo endpoints para la API]
const BASE_API_URL = process.env.BASE_API_URL;

// Endpoints de la API
// Getters
export const obtenerProveedores = async () => {
    try{
        const response = await axios.get(`${BASE_API_URL}/proveedores`);
        return response.data;
    } catch(error){
        console.error("Error al obtener proveedores:", error);
    }
}

export const obtenerProveedorPorId = async (id) => {
    try{
        const response = await axios.get(`${BASE_API_URL}/proveedores/${id}`);
        return response.data;
    }
    catch(error){
        console.error("Error al obtener proveedor por ID:", error);
    }
}



// Setters
export const crearProveedor = async (proveedor) => {
    try{
        const response = await axios.post(`${BASE_API_URL}/proveedores`, proveedor);
        return response.data; 
    } catch(error){
        console.error("Error al crear proveedor:", error);
    }
}