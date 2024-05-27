from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from .views import LoginView, LogoutView, SignupView, ProductoList, CategoriaList

# API router
router = routers.DefaultRouter()

urlpatterns = [
    path("admin/", admin.site.urls),
    # Auth views
    path("auth/login/", LoginView.as_view(), name="auth_login"),
    path("auth/logout/", LogoutView.as_view(), name="auth_logout"),
    path("auth/signup/", SignupView.as_view(), name="auth_signup"),
    path("productos/", ProductoList.as_view(), name="productos"),
    path("categorias/", CategoriaList.as_view(), name="categorias"),
]
