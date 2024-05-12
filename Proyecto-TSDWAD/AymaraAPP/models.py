from django.db import models

# Create your models here

class Categoria(models.Model):
    id_categoria = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100, blank=False)
    descripcion = models.TextField(max_length=1000, blank=False)
    class Meta:
        db_table = "Categoria"
        verbose_name = "Categoria"
        verbose_name_plural = "Categorias"
    def __unicode__(self):
        return self.nombre
    def __str__(self):
        return self.nombre
    
class Producto(models.Model):
    productoID = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=200, blank=False)
    descripcion = models.TextField(max_length=1000, blank=False)
    precio = models.DecimalField(blank=False, default=2000, decimal_places = 2, max_digits=10)
    disponibilidad = models.IntegerField(blank=False, default=2000)
    imagen = models.TextField(max_length=1000, blank=False)
    id_categoria = models.ForeignKey(Categoria, to_field="id_categoria", on_delete=models.CASCADE)
    

    class Meta:
        db_table = "Producto"
        verbose_name = "Producto"
        verbose_name_plural = "Productos"

    def __unicode__(self):
        return self.nombre
    def __str__(self):
        return self.nombre    