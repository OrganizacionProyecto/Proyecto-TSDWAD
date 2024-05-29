from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from .views import LoginView, LogoutView, SignupView
from .views import CategoriaViewSet, ProductoViewSet, AgregarProductoViewSet, PedidoViewSet
from .views import DatosEnvioViewSet, MetodoPagoViewSet, CarritoViewSet, StockViewSet

# API router
router = routers.DefaultRouter()
router.register(r'categorias', CategoriaViewSet)
router.register(r'metodos-pago', MetodoPagoViewSet)
router.register(r'stocks', StockViewSet)
router.register(r'productos', ProductoViewSet)
router.register(r'agregar-productos', AgregarProductoViewSet)
router.register(r'datos-envio', DatosEnvioViewSet)
router.register(r'pedidos', PedidoViewSet)
router.register(r'carritos', CarritoViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    # Auth views
    path("auth/login/", LoginView.as_view(), name="auth_login"),
    path("auth/logout/", LogoutView.as_view(), name="auth_logout"),
    path("auth/signup/", SignupView.as_view(), name="auth_signup"),
    path('tablas/', include(router.urls)),
    
]
