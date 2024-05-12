from django.contrib import admin

from .models import Categoria

# Register your models here.

class CategoriaAdmin(admin.ModelAdmin):
    list_display = ("nombre", "descripcion")

class ProductoAdmin(admin.ModelAdmin):
    list_display = ('productoID', 'nombre', 'descripcion', 'precio', 'disponibilidad', 'imagen', 'id_categoria')
    
admin.site.register(Categoria, CategoriaAdmin)    
admin.site.register(Producto, ProductoAdmin) 