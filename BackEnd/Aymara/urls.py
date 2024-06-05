from django.contrib import admin
from django.urls import path, include
from rest_framework.documentation import include_docs_urls

urlpatterns = [
    path('Admin/', admin.site.urls),
    path('api/', include('AymaraAPP.urls')),  # Ajusta 'tu_aplicacion' al nombre de tu aplicación
    path('docs/', include_docs_urls(title='Documentacion de la AymaraAPP'))
]
