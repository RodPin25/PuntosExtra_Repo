
## Instalación y Configuración

Para instalar o crear un nuevo entorno virtual desde cero:

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py poblar_datos
```

## ▶Iniciar el Servidor de Desarrollo

Desde la carpeta 'backend':

# Con el entorno virtual activado
python manage.py runserver 8000

```

El servidor estará disponible en `http://localhost:8000/`.

---

## Endpoints de la API

## Proveedores

GET / POST
Listar o crear
http://localhost:8000/api/proveedores/

GET / PUT / PATCH / DELETE
Consultar, actualizar o eliminar
http://localhost:8000/api/proveedores/<Codigo>/

---

## Articulos
GET / POST
Listar o crear
http://localhost:8000/api/articulos/

GET / PUT / PATCH / DELETE
Consultar, actualizar o eliminar
http://localhost:8000/api/articulos/<Codigo>/


---

## Base de Datos SQLite y Datos de Prueba

- **Base de datos:** Utiliza SQLite, la base de datos por defecto de Django, sin necesidad de instalar servidores de bases de datos adicionales.

---
