from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'', views.UserViewSet, basename='user')  # Añadir el 'basename'

urlpatterns = [
    path('', include(router.urls)),
]
