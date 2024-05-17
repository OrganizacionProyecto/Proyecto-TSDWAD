from django.contrib import admin

from .models import Categoria
from .models import Metodo_pago
from .models import Producto
from .models import Carrito
from .models import Pedido
from .models import Usuario

# Register your models here.

class CategoriaAdmin(admin.ModelAdmin):
    list_display = ("nombre", "descripcion")

class Metodo_pagoAdmin(admin.ModelAdmin):
    list_display = ("nombre",)

class ProductoAdmin(admin.ModelAdmin):
    list_display = ('id_producto', 'nombre', 'descripcion', 'precio', 'disponibilidad', 'imagen', 'id_categoria')

class CarritoAdmin(admin.ModelAdmin):
    list_display = ("id_carrito", "cantidad", "precio_unitario", "id_pedido", "id_producto")

class PedidoAdmin(admin.ModelAdmin):
    list_display = ("id_pedido", "fecha_pedido", "estado", "id_usuario", "id_metodo_pago", "direccion_envio", "total")
    	
class UsuarioAdmin(admin.ModelAdmin):
    list_display = ("id_usuario", "nombre", "apellido", "correo_electronico", "contrasena", "direccion", "tipo_usuario")


admin.site.register(Categoria, CategoriaAdmin)    
admin.site.register(Carrito, CarritoAdmin)
admin.site.register(Producto, ProductoAdmin)
admin.site.register(Metodo_pago, Metodo_pagoAdmin)
admin.site.register(Pedido, PedidoAdmin)
admin.site.register(Usuario, UsuarioAdmin)