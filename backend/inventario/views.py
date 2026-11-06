from rest_framework import viewsets
from .models import Proveedor, Articulos
from .serializers import ProveedorSerializer, ArticulosSerializer


class ProveedorViewSet(viewsets.ModelViewSet):
    queryset = Proveedor.objects.all()
    serializer_class = ProveedorSerializer


class ArticulosViewSet(viewsets.ModelViewSet):
    queryset = Articulos.objects.select_related("Proveedor").all()
    serializer_class = ArticulosSerializer
