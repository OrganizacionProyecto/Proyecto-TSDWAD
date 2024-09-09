from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings


class CustomUser(AbstractUser):
    email = models.EmailField(max_length=150, unique=True)
    direccion = models.CharField(max_length=200, blank=False, default="Desconocido")

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "password", "first_name", "last_name"]

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

class MetodoPago(models.Model):
    id_metodo_pago = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=45, blank=False)

    class Meta:
        db_table = "MetodoPago"
        verbose_name = "Metodo de Pago"
        verbose_name_plural = "Metodos de Pago"

    def __str__(self):
        return self.nombre

class Producto(models.Model):
    id_producto = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=200, blank=False)
    descripcion = models.TextField(max_length=1000, blank=False)
    precio = models.DecimalField(blank=False, default=0, decimal_places=2, max_digits=10)
    disponibilidad = models.PositiveIntegerField(blank=False, default=0)  # Asegura que la disponibilidad no sea negativa
    imagen = models.TextField(max_length=1000, blank=False)  # Uso de ImageField para almacenar imágenes
    id_categoria = models.ForeignKey(Categoria, to_field="id_categoria", on_delete=models.CASCADE, related_name="productos")

    class Meta:
        db_table = "Producto"
        verbose_name = "Producto"
        verbose_name_plural = "Productos"

    def __str__(self):
        return self.nombre


class Stock(models.Model):
    id_stock = models.AutoField(primary_key=True)
    cantidad = models.PositiveIntegerField(blank=False, default=0)  # Asegura que la cantidad no sea negativa
    id_producto = models.ForeignKey(Producto, to_field="id_producto", on_delete=models.CASCADE, related_name="stocks")

    class Meta:
        db_table = "Stock"
        verbose_name = "Stock"
        verbose_name_plural = "Stocks"

    def __str__(self):
        return f"Producto #{self.id_producto} (Stock agregado: {self.cantidad})"

class Pedido(models.Model):
    id_pedido = models.AutoField(primary_key=True)
    fecha_pedido = models.DateField(auto_now_add=True)
    estado = models.CharField(max_length=45, blank=False)
    id_carrito = models.OneToOneField("Carrito", on_delete=models.CASCADE, related_name="pedido", null=True)  # Relaciona el pedido con un carrito

    class Meta:
        db_table = "Pedido"
        verbose_name = "Pedido"
        verbose_name_plural = "Pedidos"

    def __str__(self):
        return f"Pedido #{self.id_pedido} (Fecha: {self.fecha_pedido}, Estado: {self.estado})"

class Carrito(models.Model):
    id_carrito = models.AutoField(primary_key=True)
    direccion_envio = models.CharField(max_length=200, default="Desconocido", blank=False)
    telefono = models.CharField(max_length=15, blank=False)
    total = models.DecimalField(blank=True, null=True, default=None, decimal_places=2, max_digits=10)
    id_usuario = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="carritos")
    id_datos_envio = models.ForeignKey("DatosEnvio", on_delete=models.CASCADE, related_name="carritos")
    id_metodo_pago = models.ForeignKey(MetodoPago, on_delete=models.CASCADE, related_name="carritos")

    class Meta:
        db_table = "Carrito"
        verbose_name = "Carrito"
        verbose_name_plural = "Carritos"

    def __str__(self):
        return str(self.id_carrito)
class AgregarProducto(models.Model):
    id_agregar_producto = models.AutoField(primary_key=True)
    cantidad = models.PositiveIntegerField(blank=False, default=0)  # Asegura que la cantidad no sea negativa
    precio_unitario = models.DecimalField(blank=True, null=True, decimal_places=2, max_digits=10)
    id_producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name="agregados")
    carrito = models.ForeignKey(Carrito, on_delete=models.CASCADE, related_name="productos_agregados")  # Relaciona el producto agregado con un carrito

    class Meta:
        db_table = "AgregarProducto"
        verbose_name = "Agregar Producto"
        verbose_name_plural = "Agregar Productos"

    def __str__(self):
        return f"Producto #{self.id_producto} (Cantidad agregada: {self.cantidad})"
class DatosEnvio(models.Model):
    id_datos_envio = models.AutoField(primary_key=True)
    empresa = models.CharField(max_length=45, blank=False)
    traking = models.CharField(max_length=45, blank=False)

    class Meta:
        db_table = "DatosEnvio"
        verbose_name = "Dato de envio"
        verbose_name_plural = "Datos de envio"

    def __str__(self):
        return f"{self.empresa} - {self.traking}"

class Favorito(models.Model):
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='favoritos')
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name='favoritos')
    
    class Meta:
        unique_together = ('usuario', 'producto')
        db_table = 'Favorito'
        verbose_name = 'Favorito'
        verbose_name_plural = 'Favoritos'

    def __str__(self):
        return f"Usuario {self.usuario} - Producto {self.producto}"