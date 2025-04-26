from rest_framework import viewsets, permissions
from rest_framework.permissions import BasePermission
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import CustomUser
from .serializers import UserSerializer

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
        elif self.action == 'me':  # Permitir la actualización de los datos del perfil propio
            return [permissions.IsAuthenticated()]
        elif self.action == 'deactivate_account':  # Acción para desactivar la cuenta
            return [permissions.IsAuthenticated()]
        else:
            return [permissions.IsAuthenticated()]

    @action(detail=False, methods=['get', 'put'])
    def me(self, request):
        """
        Devuelve el perfil del usuario autenticado o actualiza los datos del usuario autenticado.
        """
        user = request.user
        if request.method == 'GET':
            # Serializa y devuelve los datos del usuario
            serializer = self.get_serializer(user)
            return Response(serializer.data)
        
        if request.method == 'PUT':
            # Si la solicitud es PUT, actualizamos el perfil del usuario
            serializer = self.get_serializer(user, data=request.data)
            if serializer.is_valid():
                serializer.save()  # Guarda los cambios
                return Response(serializer.data)
            return Response(serializer.errors, status=400)

    @action(detail=False, methods=['delete'])
    def deactivate_account(self, request):
        """
        Desactiva la cuenta del usuario autenticado.
        """
        user = request.user
        user.is_active = False
        user.save()
        return Response({"detail": "Cuenta desactivada correctamente."})

    def get_queryset(self):
        """
        Solo devuelve los usuarios para admins/superusuarios, o el propio usuario si no es admin.
        """
        user = self.request.user
        if user.is_staff or user.is_superuser:
            return CustomUser.objects.all()  # Admin puede ver todos
        return CustomUser.objects.filter(id=user.id)  # Solo se muestra el perfil del usuario autenticado
