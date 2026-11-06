from django.contrib import admin
from .models import Proveedor, Articulos


@admin.register(Proveedor)
class ProveedorAdmin(admin.ModelAdmin):
    list_display = ('Codigo', 'Nombre', 'Poblacion', 'Provincia', 'Tfno', 'Email')
    search_fields = ('Codigo', 'Nombre', 'Poblacion', 'Provincia', 'Email')
    list_filter = ('Provincia', 'Poblacion')


@admin.register(Articulos)
class ArticulosAdmin(admin.ModelAdmin):
    list_display = ('Codigo', 'Descripcion', 'Precio_Venta', 'Precio_Compra', 'Ubicacion', 'Proveedor')
    search_fields = ('Codigo', 'Descripcion', 'Ubicacion', 'Proveedor__Nombre')
    list_filter = ('Proveedor', 'Ubicacion')
