from rest_framework import permissions

class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Solo admin/staff pueden crear/modificar/eliminar.
    Otros solo pueden leer.
    """
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_authenticated and request.user.is_staff
