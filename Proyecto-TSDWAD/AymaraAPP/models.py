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
    
class Carrito(models.Model):
    id_carrito = models.AutoField(primary_key=True)
    cantidad = models.IntegerField(blank=False)
    precio_unitario = models.IntegerField(blank=False)
    id_pedido = models.ForeignKey('Pedido', to_field= "id_pedido", on_delete=models.CASCADE)
    id_producto = models.ForeignKey('Producto', to_field= "id_producto", on_delete=models.CASCADE)
    id_usuario = models.ForeignKey('Usuario', to_field= "id_usuario", on_delete=models.CASCADE)
    class Meta:
        db_table = "Carrito"
        verbose_name = "Carrito"
        verbose_name_plural = "Carritos"
    def __unicode__(self):
        return self.id_carrito
    def __str__(self):
        return self.id_carrito