from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Proveedor, Articulos


class ProveedorAPITests(APITestCase):
    def setUp(self):
        self.proveedor_data = {
            "Codigo": "PTEST1",
            "Nombre": "Proveedor de Prueba",
            "Domicilio": "Calle Falsa 123",
            "Poblacion": "Guatemala",
            "CPostal": "01001",
            "Provincia": "Guatemala",
            "Tfno": "12345678",
            "Email": "test@proveedor.com",
        }
        self.proveedor = Proveedor.objects.create(**self.proveedor_data)

    def test_listar_proveedores(self):
        response = self.client.get("/api/proveedores/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(response.data) >= 1)

    def test_obtener_proveedor(self):
        response = self.client.get(f"/api/proveedores/{self.proveedor.Codigo}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["Nombre"], "Proveedor de Prueba")

    def test_crear_proveedor(self):
        data = {
            "Codigo": "PTEST2",
            "Nombre": "Segundo Proveedor",
            "Domicilio": "Avenida Siempre Viva 742",
            "Poblacion": "Mixco",
            "CPostal": "01057",
            "Provincia": "Guatemala",
            "Tfno": "87654321",
            "Email": "segundo@proveedor.com",
        }
        response = self.client.post("/api/proveedores/", data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Proveedor.objects.filter(Codigo="PTEST2").exists())

    def test_actualizar_proveedor_put(self):
        updated_data = {
            "Codigo": self.proveedor.Codigo,
            "Nombre": "Proveedor Modificado",
            "Domicilio": "Nueva Calle 456",
            "Poblacion": "Antigua Guatemala",
            "CPostal": "03001",
            "Provincia": "Sacatepéquez",
            "Tfno": "99998888",
            "Email": "modificado@proveedor.com",
        }
        response = self.client.put(f"/api/proveedores/{self.proveedor.Codigo}/", updated_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.proveedor.refresh_from_db()
        self.assertEqual(self.proveedor.Nombre, "Proveedor Modificado")

    def test_actualizar_proveedor_patch(self):
        patch_data = {"Nombre": "Nombre Solo Patch"}
        response = self.client.patch(f"/api/proveedores/{self.proveedor.Codigo}/", patch_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.proveedor.refresh_from_db()
        self.assertEqual(self.proveedor.Nombre, "Nombre Solo Patch")

    def test_eliminar_proveedor(self):
        response = self.client.delete(f"/api/proveedores/{self.proveedor.Codigo}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Proveedor.objects.filter(Codigo=self.proveedor.Codigo).exists())


class ArticulosAPITests(APITestCase):
    def setUp(self):
        self.proveedor = Proveedor.objects.create(
            Codigo="PROV_ART",
            Nombre="Proveedor para Articulos",
            Domicilio="Calle Articulos 1",
            Poblacion="Guatemala",
            CPostal="01001",
            Provincia="Guatemala",
            Tfno="11223344",
            Email="articulos@prov.com",
        )
        self.articulo_data = {
            "Codigo": "ART_TEST1",
            "Descripcion": "Articulo Inicial",
            "Precio_Venta": "100.50",
            "Ubicacion": "Estanteria 1",
            "Proveedor": self.proveedor,
            "Precio_Compra": "75.25",
        }
        self.articulo = Articulos.objects.create(**self.articulo_data)

    def test_listar_articulos(self):
        response = self.client.get("/api/articulos/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(response.data) >= 1)

    def test_obtener_articulo(self):
        response = self.client.get(f"/api/articulos/{self.articulo.Codigo}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["Descripcion"], "Articulo Inicial")
        self.assertEqual(response.data["Proveedor"], self.proveedor.Codigo)
        self.assertEqual(response.data["Proveedor_detalle"]["Nombre"], self.proveedor.Nombre)

    def test_crear_articulo(self):
        data = {
            "Codigo": "ART_TEST2",
            "Descripcion": "Nuevo Articulo",
            "Precio_Venta": "250.00",
            "Ubicacion": "Vitrina Central",
            "Proveedor": self.proveedor.Codigo,
            "Precio_Compra": "180.00",
        }
        response = self.client.post("/api/articulos/", data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Articulos.objects.filter(Codigo="ART_TEST2").exists())

    def test_actualizar_articulo_put(self):
        updated_data = {
            "Codigo": self.articulo.Codigo,
            "Descripcion": "Articulo Modificado",
            "Precio_Venta": "150.00",
            "Ubicacion": "Bodega 2",
            "Proveedor": self.proveedor.Codigo,
            "Precio_Compra": "90.00",
        }
        response = self.client.put(f"/api/articulos/{self.articulo.Codigo}/", updated_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.articulo.refresh_from_db()
        self.assertEqual(self.articulo.Descripcion, "Articulo Modificado")

    def test_actualizar_articulo_patch(self):
        patch_data = {"Precio_Venta": "199.99"}
        response = self.client.patch(f"/api/articulos/{self.articulo.Codigo}/", patch_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.articulo.refresh_from_db()
        self.assertEqual(float(self.articulo.Precio_Venta), 199.99)

    def test_eliminar_articulo(self):
        response = self.client.delete(f"/api/articulos/{self.articulo.Codigo}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Articulos.objects.filter(Codigo=self.articulo.Codigo).exists())
