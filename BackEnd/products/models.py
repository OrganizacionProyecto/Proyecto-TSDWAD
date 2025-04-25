from django.db import models
from django.conf import settings
from django.utils import timezone
from django.core.exceptions import ValidationError

class Categoria(models.Model):
    id_categoria = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100, blank=False)
    descripcion = models.TextField(max_length=1000, blank=False)

    class Meta:
        db_table = "Categoria"
        verbose_name = "Categoria"
        verbose_name_plural = "Categorias"

    def __str__(self):
        return self.nombre


class Producto(models.Model):
    id_producto = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=200, blank=False)
    descripcion = models.TextField(max_length=1000, blank=False)
    precio = models.DecimalField(decimal_places=2, max_digits=10, blank=False, default=0.0)
    stock = models.PositiveIntegerField(blank=False, default=0)
    imagen = models.ImageField(upload_to='productos/', blank=True, null=True)
    id_categoria = models.ForeignKey(Categoria, to_field="id_categoria", on_delete=models.CASCADE, related_name="productos")

    def clean(self):
        if self.stock < 0:
            raise ValidationError({'stock': 'El stock no puede ser negativo.'})
        if self.precio < 0:
            raise ValidationError({'precio': 'El precio no puede ser negativo.'})

    def __str__(self):
        return self.nombre

class Favorito(models.Model):
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='favoritos')
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name='favoritos')
    fecha_agregado = models.DateTimeField(default=timezone.now)

    class Meta:
        unique_together = ('usuario', 'producto')
        db_table = 'Favorito'
        verbose_name = 'Favorito'
        verbose_name_plural = 'Favoritos'

    def __str__(self):
        return f"Usuario {self.usuario} - Producto {self.producto}"