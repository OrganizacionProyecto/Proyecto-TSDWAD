from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('Admin/', admin.site.urls),
    path('api/', include('AymaraAPP.urls')),  # Ajusta 'tu_aplicacion' al nombre de tu aplicación
]
