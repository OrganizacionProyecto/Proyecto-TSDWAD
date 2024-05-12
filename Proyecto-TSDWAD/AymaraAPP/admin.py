from django.contrib import admin

from .models import Categoria
from .models import Metodo_pago
from .models import Producto

# Register your models here.

class CategoriaAdmin(admin.ModelAdmin):
    list_display = ("nombre", "descripcion")

class Metodo_pagoAdmin(admin.ModelAdmin):
    list_display = ("nombre",)


admin.site.register(Metodo_pago, Metodo_pagoAdmin)
admin.site.register(Categoria, CategoriaAdmin)    