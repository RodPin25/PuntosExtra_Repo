from rest_framework import serializers
from .models import Proveedor, Articulos


class ProveedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proveedor
        fields = [
            "Codigo",
            "Nombre",
            "Domicilio",
            "Poblacion",
            "CPostal",
            "Provincia",
            "Tfno",
            "Email",
        ]


class ArticulosSerializer(serializers.ModelSerializer):
    Proveedor_detalle = ProveedorSerializer(source="Proveedor", read_only=True)

    class Meta:
        model = Articulos
        fields = [
            "Codigo",
            "Descripcion",
            "Precio_Venta",
            "Ubicacion",
            "Proveedor",
            "Proveedor_detalle",
            "Precio_Compra",
        ]
