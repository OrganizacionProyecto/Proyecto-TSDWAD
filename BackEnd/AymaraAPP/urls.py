from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *
#URLS.PY
from .views import CarritoViewSet

router = DefaultRouter()
router.register(r'categorias', CategoriaViewSet)
router.register(r'metodos_pago', MetodoPagoViewSet)
router.register(r'stocks', StockViewSet)
router.register(r'productos', ProductoViewSet)
router.register(r'agregar_productos', AgregarProductoViewSet)
router.register(r'datos_envio', DatosEnvioViewSet)
router.register(r'pedidos', PedidoViewSet)
router.register(r'carritos', CarritoViewSet)
#URLS.PY
router.register(r'carrito', CarritoViewSet, basename='carrito')


urlpatterns = [
    path('auth/get_csrf_token/', GetCSRFToken.as_view(), name='get_csrf_token'),
    path('auth/login/', LoginView.as_view(), name='auth_login'),
    path('auth/logout/', LogoutView.as_view(), name='auth_logout'),
    path('auth/signup/', SignupView.as_view(), name='auth_signup'),
    path('tablas/', include(router.urls)),
]






