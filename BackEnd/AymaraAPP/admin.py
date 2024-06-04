from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
from .models import Categoria
from .models import MetodoPago
from .models import Producto, AgregarProducto
from .models import Carrito, Stock
from .models import Pedido, DatosEnvio


# Se definen Modelos Administradores
@admin.register(get_user_model())
class CustomUserAdmin(UserAdmin):
    pass


admin.site.register(Categoria)
admin.site.register(Carrito)
admin.site.register(Producto)
admin.site.register(MetodoPago)
admin.site.register(Pedido)
admin.site.register(DatosEnvio)
admin.site.register(Stock)
admin.site.register(AgregarProducto)
