from django.contrib import admin
from .models import Categoria, Producto, Favorito


class ProductoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'precio', 'stock', 'id_categoria', 'imagen')  # Campos que se mostrarán en la lista
    list_filter = ('id_categoria',)  # Filtro por categoría
    search_fields = ('nombre', 'descripcion')  # Búsqueda por nombre y descripción
    list_per_page = 10  # Cantidad de elementos por página
    ordering = ('nombre',)  

class CategoriaAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'descripcion')  
    search_fields = ('nombre',)  

class FavoritoAdmin(admin.ModelAdmin):
    list_display = ('usuario', 'producto', 'fecha_agregado')  
    list_filter = ('usuario', 'producto')  
    search_fields = ('usuario__username', 'producto__nombre')  
admin.site.register(Producto, ProductoAdmin)
admin.site.register(Categoria, CategoriaAdmin)
admin.site.register(Favorito, FavoritoAdmin)
