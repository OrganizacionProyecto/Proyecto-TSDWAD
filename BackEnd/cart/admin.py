from django.utils.html import format_html
from django.contrib import admin
from .models import Carrito, ItemCarrito, Pedido, ItemPedido

# Inline para ItemCarrito
class ItemCarritoInline(admin.TabularInline):
    model = ItemCarrito
    extra = 1
    fields = ['producto', 'cantidad']
    readonly_fields = ['producto', 'cantidad']

# Admin para Carrito
class CarritoAdmin(admin.ModelAdmin):
    list_display = ['usuario', 'id']
    search_fields = ['usuario__username']
    inlines = [ItemCarritoInline]
    ordering = ['usuario']

# Inline para ItemPedido
class ItemPedidoInline(admin.TabularInline):
    model = ItemPedido
    extra = 1
    fields = ['producto', 'cantidad']
    readonly_fields = ['producto', 'cantidad']

# Admin para Pedido
class PedidoAdmin(admin.ModelAdmin):
    list_display = ['usuario', 'direccion_entrega', 'telefono', 'metodo_pago', 'total', 'fecha_creacion']
    search_fields = ['usuario__username', 'direccion_entrega', 'telefono']
    inlines = [ItemPedidoInline]
    list_filter = ['metodo_pago', 'fecha_creacion']
    ordering = ['-fecha_creacion']


# Admin para ItemCarrito
class ItemCarritoAdmin(admin.ModelAdmin):
    list_display = ['carrito', 'producto', 'cantidad']
    search_fields = ['carrito__usuario__username', 'producto__nombre']
    list_filter = ['carrito']

# Admin para ItemPedido
class ItemPedidoAdmin(admin.ModelAdmin):
    list_display = ['pedido', 'producto', 'cantidad']
    search_fields = ['pedido__usuario__username', 'producto__nombre']
    list_filter = ['pedido']


admin.site.register(Carrito, CarritoAdmin)
admin.site.register(ItemCarrito, ItemCarritoAdmin)
admin.site.register(Pedido, PedidoAdmin)
admin.site.register(ItemPedido, ItemPedidoAdmin)
