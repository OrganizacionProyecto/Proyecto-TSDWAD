from rest_framework.permissions import BasePermission
from rest_framework import permissions 

class IsSuperAdminUser(permissions.BasePermission):
    #Permite el acceso solo a administradores
    def has_permission(self, request, view):
        return request.user and request.user.is_staff
    
class IsUsuarioAdminUser(BasePermission):
    #Permite el acceso solo a usuarios regulares (no administradores)
    def has_permission(self, request, view):
        return not request.user.is_staff

class IsUsuarioUser(BasePermission):
    #Permite el acceso solo a usuarios observadores (no administradores ni usuarios regulares)
    def has_permission(self, request, view):
        return not (request.user.is_staff or request.user.is_regular_user)   


class IsAdminOrReadOnly(permissions.BasePermission):
   
    def has_permission(self, request, view):
        # Permite solicitudes GET, HEAD, u OPTIONS
        if request.method in permissions.SAFE_METHODS:
            return True

        # Solo permite solicitudes de escritura para usuarios administradores
        return request.user and request.user.is_staff  