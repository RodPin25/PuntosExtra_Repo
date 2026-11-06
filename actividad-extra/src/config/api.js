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
export const crearProveedor = async (nombre, domicilio, poblacion, cPostal, provincia, telefono, email) => {
    try{
        const url = `${BASE_API_URL}/proveedores/crear`;
        const payload = {
            nombre: nombre,
            domicilio: domicilio,
            poblacion: poblacion,
            cPostal: cPostal,
            provincia: provincia,
            telefono: telefono,
            email: email
        };
        const response = await axios.post(`${BASE_API_URL}/proveedores`, payload);
        return response.data;
    } catch(error){
        console.error("Error al crear proveedor:", error);
    }
}

//Updaters
export const actualizarProveedor = async (id,nombre, domiclio, poblacion, cPostal, provincia,telefono, email) => {
    try{
        const url = `${BASE_API_URL}/proveedores/${id}`;
        const payload = { 
            nombre: nombre,
            domicilio: domiclio,
            poblacion: poblacion,
            cPostal: cPostal,
            provincia: provincia,
            telefono: telefono,
            email: email
        };
        const response = await axios.put(url, payload);
        return response.data;
    } catch(error){
        console.error("Error al actualizar proveedor:", error);
    }
}

// Patchers
export const patchProveedor = async (id,nombre, domicilio, poblacion, cPostal, provincia, telefono, email) => {
    try{
        const url = `${BASE_API_URL}/proveedores/${id}`;
        const payload = { 
            nombre: nombre,
            domicilio: domicilio,
            poblacion: poblacion,
            cPostal: cPostal,
            provincia: provincia,
            telefono: telefono,
            email: email
        };
        const response = await axios.patch(url, payload);
        return response.data;
    } catch(error){
        console.error("Error al actualizar proveedor:",error);
    }
}

// Deleters
export const eliminarProveedor = async(id) => {
    try{
        const url = `${BASE_API_URL}/proveedores/${id}`;
        const response = await axios.delete(url);
        return response.data;
    } catch(error){
        console.error("Error al eliminar proveedor:", error);
    }
}