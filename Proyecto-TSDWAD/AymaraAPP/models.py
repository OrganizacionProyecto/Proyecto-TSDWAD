from django.db import models

# Create your models here  

#Modelo de la tabla Categoria.
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
    
#Modelo de la tabla Metodo de Pago
class Metodo_pago(models.Model):
    id_metodo_pago = models.AutoField(primary_key=True) 
    nombre = models.CharField(max_length=45, blank=False)
    class Meta:
        db_table = "Metodo_pago"
        verbose_name = "Metodo de Pago"
        verbose_name_plural = "Metodos de Pagos"
    def __unicode__(self):
        return self.nombre
    def __str__(self):
        return self.nombre 