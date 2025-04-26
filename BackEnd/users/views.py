from rest_framework import viewsets, permissions
from rest_framework.permissions import BasePermission
from .models import CustomUser
from .serializers import UserSerializer
from rest_framework.decorators import action
from rest_framework.response import Response



class IsAdminOrStaffUser(BasePermission):
    """
    Permite a superusuarios y usuarios con is_staff=True realizar cualquier acción.
    """
    def has_permission(self, request, view):
        return request.user and (request.user.is_superuser or request.user.is_staff)

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_superuser or request.user.is_staff

class IsSelfOrAdmin(BasePermission):
    """
    Permite al usuario borrar su propia cuenta o a un admin borrar cualquier cuenta.
    """
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj == request.user or request.user.is_staff or request.user.is_superuser

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        elif self.action in ['update', 'partial_update']:
            return [permissions.IsAuthenticated(), IsAdminOrStaffUser()]
        elif self.action == 'destroy':
            return [permissions.IsAuthenticated(), IsSelfOrAdmin()]
        elif self.action == 'retrieve':
            return [permissions.IsAuthenticated()]
        elif self.action == 'list':
            return [permissions.IsAuthenticated(), IsAdminOrStaffUser()]
        elif self.action == 'me':  # Nueva acción para ver el perfil propio
            return [permissions.IsAuthenticated()]
        elif self.action == 'deactivate_account':  # Nueva acción para desactivar la cuenta
            return [permissions.IsAuthenticated()]
        else:
            return [permissions.IsAuthenticated()]

    @action(detail=False, methods=['get'])
    def me(self, request):
        """
        Devuelve el perfil del usuario autenticado.
        """
        # Serializa el usuario autenticado (request.user)
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

    @action(detail=False, methods=['delete'])
    def deactivate_account(self, request):
        """
        Desactiva la cuenta del usuario autenticado.
        """
        user = request.user  # El usuario autenticado
        user.is_active = False  # Cambia el estado de la cuenta a inactiva
        user.save()

        return Response({"detail": "Cuenta desactivada correctamente."})

    def get_queryset(self):
        """
        Solo se devuelven los usuarios para admins/superusuarios, o el propio usuario si no es admin.
        """
        user = self.request.user
        if user.is_staff or user.is_superuser:
            return CustomUser.objects.all()  # Admin puede ver todos
        return CustomUser.objects.filter(id=user.id) 