from django.contrib.auth.models import AbstractUser
from django.db import models


# Modelo de la tabla Categoria.
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


# Modelo de la tabla Metodo de Pago
class MetodoPago(models.Model):
    id_metodo_pago = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=45, blank=False)

    class Meta:
        db_table = "MetodoPago"
        verbose_name = "Metodo de Pago"
        verbose_name_plural = "Metodos de Pagos"

    def __unicode__(self):
        return self.nombre

    def __str__(self):
        return self.nombre


# Modelo de la tabla Producto
class Producto(models.Model):
    id_producto = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=200, blank=False)
    descripcion = models.TextField(max_length=1000, blank=False)
    precio = models.DecimalField(
        blank=False, default=2000, decimal_places=2, max_digits=10
    )
    disponibilidad = models.IntegerField(blank=False, default=2000)
    imagen = models.TextField(max_length=1000, blank=False)
    id_categoria = models.ForeignKey(
        Categoria, to_field="id_categoria", on_delete=models.CASCADE
    )

    class Meta:
        db_table = "Producto"
        verbose_name = "Producto"
        verbose_name_plural = "Productos"

    def __unicode__(self):
        return self.nombre

    def __str__(self):
        return self.nombre

# Modelo de la tabla Agregar_producto

class AgregarProducto(models.Model):
    id_agregar_producto = models.AutoField(primary_key=True)
    cantidad = models.IntegerField(blank=False, default=2000)
    precio_unitario = models.DecimalField(
        blank=False, default=2000, decimal_places=2, max_digits=10
    )
    id_producto = models.ForeignKey(Producto, to_field="id_producto", on_delete=models.CASCADE
    )
    
    class meta :
        db_table = "AgregarProducto"
        verbose_name = "Agregar Producto"
        verbose_name_plural = "Agregar Productos"

    def __unicode__(self):
        return f"Producto #{self.id_producto} (Cantidad agregada: {self.cantidad})"

    def __str__(self):
        return f"Producto #{self.id_producto} (Cantidad agregada: {self.cantidad})"
# Modelo de la tabla Stock
class Stock(models.Model): 
    id_stock = models.AutoField(primary_key=True)
    cantidad = models.IntegerField(blank=False, default=2000)
    id_producto = models.ForeignKey(Producto, to_field="id_producto", on_delete=models.CASCADE)

    class Meta:
        db_table = "Stock"
        verbose_name = "Stock"
        verbose_name_plural = "Stocks"

    def __str__(self):
        return f"Producto #{self.id_producto} (Stock agregado: {self.cantidad})"

# Modelo de la tabla Pedido
class Pedido(models.Model):
    id_pedido = models.AutoField(primary_key=True)
    fecha_pedido = models.DateField(blank=False)
    estado = models.CharField(max_length=45, blank=False)
    id_usuario = models.ForeignKey(
        "CustomUser", to_field="id", on_delete=models.CASCADE
    )

    class Meta:
        db_table = "Pedido"
        verbose_name = "Pedido"
        verbose_name_plural = "Pedidos"

    def __str__(self):
        return f"Pedido #{self.id_pedido} (Fecha: {self.fecha_pedido}, Estado: {self.estado})"


class CustomUser(AbstractUser):
    email = models.EmailField(max_length=150, unique=True)
    direccion = models.CharField(max_length=200, blank=False, default="Desconocido")

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "password"]


# Modelo de la tabla Carrito
class Carrito(models.Model):
    id_carrito = models.AutoField(primary_key=True)
    cantidad = models.IntegerField(blank=False)
    precio_unitario = models.DecimalField(
        blank=False, default=2000, decimal_places=2, max_digits=10
    )
    id_pedido = models.ForeignKey(
        Pedido, to_field="id_pedido", on_delete=models.CASCADE
    )
    id_producto = models.ForeignKey(
        Producto, to_field="id_producto", on_delete=models.CASCADE
    )
    id_usuario = models.ForeignKey(CustomUser, to_field="id", on_delete=models.CASCADE)

    class Meta:
        db_table = "Carrito"
        verbose_name = "Carrito"
        verbose_name_plural = "Carritos"

    def __unicode__(self):
        return self.id_carrito

    def __str__(self):
        return self.id_carrito

# Modelo de la tabla Datos_envio
class DatosEnvio (models.Model):
    id_datos_envio = models.AutoField(primary_key=True)
    empresa = models.CharField(max_length=45, blank=False)
    traking = models.CharField(max_length=45, blank=False)
    
    class meta:
        db_table = "DatosEnvio"
        verbose_name = "Dato de envio"
        verbose_name_plural = "Datos de envio"