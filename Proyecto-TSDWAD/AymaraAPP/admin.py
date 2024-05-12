from django.contrib import admin

from .models import Categoria
from .models import Carrito

# Register your models here.

class CategoriaAdmin(admin.ModelAdmin):
    list_display = ("nombre", "descripcion")

class CarritoAdmin(admin.ModelAdmin):
    list_display = ("id_carrito", "cantidad", "precio_unitario", "id_pedido", "id_producto", "id_usuario")

class ProductoAdmin(admin.ModelAdmin):
    list_display = ('productoID', 'nombre', 'descripcion', 'precio', 'disponibilidad', 'imagen', 'id_categoria')
    
admin.site.register(Categoria, CategoriaAdmin)    
admin.site.register(Carrito, CarritoAdmin)
admin.site.register(Producto, ProductoAdmin) 