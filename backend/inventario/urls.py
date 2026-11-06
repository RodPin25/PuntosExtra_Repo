from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import ArticulosViewSet, ProveedorViewSet

router = DefaultRouter()
router.register(r"proveedores", ProveedorViewSet, basename="proveedor")
router.register(r"articulos", ArticulosViewSet, basename="articulo")

urlpatterns = [
    path("", include(router.urls)),
]
