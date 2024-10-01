from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.contrib import admin

router = DefaultRouter()
router.register(r'categorias', CategoriaViewSet)
router.register(r'metodos_pago', MetodoPagoViewSet)
router.register(r'stocks', StockViewSet)
router.register(r'productos', ProductoViewSet)
router.register(r'agregar_productos', AgregarProductoViewSet)
router.register(r'datos_envio', DatosEnvioViewSet)
router.register(r'pedidos', PedidoViewSet)
router.register(r'carritos', CarritoViewSet)

#router.register(r'cargar_productos', CarritoViewSet.agregar_producto)

urlpatterns = [
    #Token JWT
    path('admin/', admin.site.urls),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),    
    # CRUD de usuarios
    path('users/<int:pk>/', UserRetrieveUpdateDestroyView.as_view(), name='user-detail'),
    
    # Autenticación (Login, Logout, Signup)
    path('auth/login/', LoginView.as_view(), name='auth_login'),
    path('auth/logout/', LogoutView.as_view(), name='auth_logout'),
    path('auth/signup/', SignupView.as_view(), name='auth_signup'),
    
    # Información de usuario autenticado
    path('auth/user/', UserDetailView.as_view(), name='user_detail'),
    
    # ViewSets para las tablas
    path('tablas/', include(router.urls)),
    
    # Eliminar cuenta
    path('auth/delete_account/', DeleteAccountView.as_view(), name='delete_account'),
    
    # Favoritos (añadir, eliminar, listar)
    path('add_to_favorites/', AddToFavoritesView.as_view(), name='add_to_favorites'),
    path('remove_from_favorites/', RemoveFromFavoritesView.as_view(), name='remove_from_favorites'),
    path('list_favorites/', ListFavoritesView.as_view(), name='list_favorites'),
    
    #Actualizar direccion y password
    path('update-direccion/', UpdateDireccionView.as_view(), name='update-direccion'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
]
