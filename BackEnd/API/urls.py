from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView
from users.views import UserViewSet

urlpatterns = [
    path('admin/', admin.site.urls),

    # Autenticación de usuarios
    path('api/auth/', include('users.urls')),  
    
    # JWT
    path('api/auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # API de productos (u otra app)
    path('api/products/', include('products.urls')),

    # API de carrito
    path('api/cart/', include('cart.urls')),

    # Usuarios
    path('api/users/', include('users.urls')),
    path('api/users/me/', UserViewSet.as_view({'get': 'me'}), name='user-me'),  


    # Documentación automática con drf-spectacular
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)