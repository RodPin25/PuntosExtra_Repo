from django.core.management.base import BaseCommand
from inventario.models import Proveedor, Articulos


class Command(BaseCommand):
    help = "Puebla la base de datos SQLite con datos iniciales de prueba para Proveedores y Artículos."

    def handle(self, *args, **kwargs):
        self.stdout.write("Poblando datos de prueba en la base de datos SQLite...")

        proveedores_data = [
            {
                "Codigo": "PRV01",
                "Nombre": "Tecnología Global S.A.",
                "Domicilio": "Av. Central 123",
                "Poblacion": "Ciudad de Guatemala",
                "CPostal": "01001",
                "Provincia": "Guatemala",
                "Tfno": "+502 2345-6789",
                "Email": "ventas@tecglobal.com",
            },
            {
                "Codigo": "PRV02",
                "Nombre": "Distribuidora Digital Express",
                "Domicilio": "Calle Real 456",
                "Poblacion": "Mixco",
                "CPostal": "01057",
                "Provincia": "Guatemala",
                "Tfno": "+502 2456-7890",
                "Email": "contacto@distdigital.com",
            },
            {
                "Codigo": "PRV03",
                "Nombre": "Suministros Informáticos del Sur",
                "Domicilio": "Boulevard Los Próceres 78",
                "Poblacion": "Villa Nueva",
                "CPostal": "01064",
                "Provincia": "Guatemala",
                "Tfno": "+502 2567-8901",
                "Email": "info@suminssur.com",
            },
        ]

        for p_data in proveedores_data:
            proveedor, created = Proveedor.objects.update_or_create(
                Codigo=p_data["Codigo"],
                defaults=p_data,
            )
            estado = "creado" if created else "actualizado"
            self.stdout.write(f"  - Proveedor {proveedor.Codigo} ({proveedor.Nombre}): {estado}")

        articulos_data = [
            {
                "Codigo": "ART01",
                "Descripcion": 'Monitor Gamer 24" 144Hz IPS',
                "Precio_Venta": "1450.00",
                "Ubicacion": "Pasillo 3, Estante A",
                "Proveedor_id": "PRV01",
                "Precio_Compra": "1100.00",
            },
            {
                "Codigo": "ART02",
                "Descripcion": "Teclado Mecánico RGB Switch Blue",
                "Precio_Venta": "380.00",
                "Ubicacion": "Pasillo 1, Estante B",
                "Proveedor_id": "PRV01",
                "Precio_Compra": "250.00",
            },
            {
                "Codigo": "ART03",
                "Descripcion": "Mouse Inalámbrico Ergonómico",
                "Precio_Venta": "195.50",
                "Ubicacion": "Pasillo 1, Estante C",
                "Proveedor_id": "PRV02",
                "Precio_Compra": "120.00",
            },
            {
                "Codigo": "ART04",
                "Descripcion": "Memoria RAM DDR4 16GB 3200MHz",
                "Precio_Venta": "420.00",
                "Ubicacion": "Vitrina 2",
                "Proveedor_id": "PRV02",
                "Precio_Compra": "310.00",
            },
            {
                "Codigo": "ART05",
                "Descripcion": "Disco Sólido SSD NVMe M.2 1TB",
                "Precio_Venta": "650.00",
                "Ubicacion": "Vitrina 2",
                "Proveedor_id": "PRV03",
                "Precio_Compra": "480.00",
            },
        ]

        for a_data in articulos_data:
            articulo, created = Articulos.objects.update_or_create(
                Codigo=a_data["Codigo"],
                defaults=a_data,
            )
            estado = "creado" if created else "actualizado"
            self.stdout.write(f"  - Artículo {articulo.Codigo} ({articulo.Descripcion}): {estado}")

        self.stdout.write(self.style.SUCCESS("Datos de prueba cargados exitosamente."))
