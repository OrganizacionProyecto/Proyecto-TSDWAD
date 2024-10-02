from rest_framework.permissions import BasePermission
from rest_framework import permissions 

class IsSuperAdminUser(permissions.BasePermission):
    #Permite el acceso solo a administradores
    def has_permission(self, request, view):
        return request.user and request.user.is_staff

class IsUserOrAdmin(BasePermission):
    """
    Permite el acceso a usuarios regulares y administradores para realizar operaciones CRUD completas.
    """

    def has_permission(self, request, view):
        # Permitir acceso si el usuario está autenticado y es un usuario regular o un administrador
        return request.user and request.user.is_authenticated and (request.user.is_staff or not request.user.is_staff)
    
class IsUsuarioAdminUser(BasePermission):
    #Permite el acceso solo a usuarios regulares (no administradores)
    def has_permission(self, request, view):
        return not request.user.is_staff

class IsUserOrAdminWithRestrictions(BasePermission):
    """
    Permite acceso de CRUD completo a administradores.
    Permite acceso de creación y lectura a usuarios regulares.
    """

    def has_permission(self, request, view):
        # Permitir acceso si el usuario está autenticado
        if not request.user or not request.user.is_authenticated:
            return False

        # Permitir CRUD completo a administradores
        if request.user.is_staff:
            return True

        # Permitir solo lectura y creación a usuarios regulares
        if request.method in SAFE_METHODS or request.method == 'POST':
            return True

        return False
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