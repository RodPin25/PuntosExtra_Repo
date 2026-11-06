from django.db import models


class Proveedor(models.Model):
    Codigo = models.CharField(max_length=50, primary_key=True, verbose_name="Código")
    Nombre = models.CharField(max_length=150, verbose_name="Nombre")
    Domicilio = models.CharField(max_length=255, blank=True, null=True, verbose_name="Domicilio")
    Poblacion = models.CharField(max_length=100, blank=True, null=True, verbose_name="Población")
    CPostal = models.CharField(max_length=10, blank=True, null=True, verbose_name="Código Postal")
    Provincia = models.CharField(max_length=100, blank=True, null=True, verbose_name="Provincia")
    Tfno = models.CharField(max_length=20, blank=True, null=True, verbose_name="Teléfono")
    Email = models.EmailField(blank=True, null=True, verbose_name="Correo Electrónico")

    class Meta:
        db_table = "Proveedor"
        verbose_name = "Proveedor"
        verbose_name_plural = "Proveedores"
        ordering = ["Codigo"]

    def __str__(self):
        return f"{self.Codigo} - {self.Nombre}"


class Articulos(models.Model):
    Codigo = models.CharField(max_length=50, primary_key=True, verbose_name="Código")
    Descripcion = models.CharField(max_length=255, verbose_name="Descripción")
    Precio_Venta = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Precio de Venta")
    Ubicacion = models.CharField(max_length=100, blank=True, null=True, verbose_name="Ubicación")
    Proveedor = models.ForeignKey(
        Proveedor,
        on_delete=models.CASCADE,
        related_name="articulos",
        db_column="Proveedor",
        verbose_name="Proveedor",
    )
    Precio_Compra = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Precio de Compra")

    class Meta:
        db_table = "Articulos"
        verbose_name = "Artículo"
        verbose_name_plural = "Artículos"
        ordering = ["Codigo"]

    def __str__(self):
        return f"{self.Codigo} - {self.Descripcion}"
