from django.urls import path
from . import views
from .views import ModificarProductoCarritoView, EliminarProductoCarritoView  # Asegúrate de importar la vista aquí

urlpatterns = [
    # Obtener carrito
    path('carrito/', views.CarritoView.as_view(), name='carrito'),

    # Agregar producto al carrito
    path('carrito/agregar/', views.AgregarProductoCarritoView.as_view(), name='carrito-agregar'),

    # Modificar producto en el carrito (Actualizar cantidad)
    path('carrito/modificar/<int:producto_id>/', ModificarProductoCarritoView.as_view({'put': 'update'}), name='modificar_producto_carrito'),
    ## Eliminar producto del carrito
    path('carrito/eliminar/<int:producto_id>/', EliminarProductoCarritoView.as_view({'delete': 'destroy'}), name='eliminar_producto_carrito'),

    # Crear un pedido (desde el carrito)
    path('pedido/crear/', views.CrearPedidoView.as_view(), name='crear-pedido'),

    # Descargar factura de un pedido
    path('pedido/<int:pedido_id>/factura/', views.DescargarFacturaView.as_view(), name='descargar-factura'),
]
