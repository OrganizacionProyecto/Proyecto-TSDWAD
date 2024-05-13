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

#Modelo de la tabla Metodo de Pago 
class Producto(models.Model):
    id_producto = models.AutoField(primary_key=True)
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
    

#Modelo de la tabla Usuario
class Usuario(models.Model):
    id_usuario = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100, blank=False)
    apellido = models.CharField(max_length=100, blank=False)
    correo_electronico = models.CharField(max_length=200, blank=False)
    contrasena = models.CharField(max_length=20, blank=False)
    direccion =  models.CharField(max_length=200, blank=False)
    tipo_usuario = models.BooleanField(blank=False)
    class Meta:
        db_table = "Usuario"
        verbose_name = "Usuario"
        verbose_name_plural = "Usuarios"

    def __str__(self):
        return f"Usuario: {self.nombre} {self.apellido}" 
    
#Modelo de la tabla Pedido
class Pedido(models.Model):
    id_pedido = models.AutoField(primary_key=True)
    fecha_pedido = models.DateField(blank=False)
    estado = models.CharField(max_length=45, blank=False)
    direccion_envio = models.CharField(max_length=200, blank=False, default= "")
    total = models.DecimalField(blank=False, default=2000, decimal_places = 2, max_digits=10)
    id_usuario = models.ForeignKey('Usuario', to_field= "id_usuario", on_delete=models.CASCADE)
    id_metodo_pago = models.ForeignKey('Metodo_pago', to_field= "id_metodo_pago", on_delete=models.CASCADE, default= 1)

    class Meta:
        db_table = "Pedido"
        verbose_name = "Pedido"
        verbose_name_plural = "Pedidos"
    
    def __str__(self):
        return f"Pedido #{self.id_pedido} (Fecha: {self.fecha_pedido}, Estado: {self.estado})"


#Modelo de la tabla Carrito
class Carrito(models.Model):
    id_carrito = models.AutoField(primary_key=True)
    cantidad = models.IntegerField(blank=False)
    precio_unitario = models.DecimalField(blank=False, default=2000, decimal_places = 2, max_digits=10)
    id_pedido = models.ForeignKey(Pedido, to_field= "id_pedido", on_delete=models.CASCADE)
    id_producto = models.ForeignKey(Producto, to_field= "id_producto", on_delete=models.CASCADE)
    class Meta:
        db_table = "Carrito"
        verbose_name = "Carrito"
        verbose_name_plural = "Carritos"
    def __unicode__(self):
        return self.id_carrito
    def __str__(self):
        return self.id_carrito
    
