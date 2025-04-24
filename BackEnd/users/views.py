from rest_framework import viewsets, permissions
from rest_framework.permissions import BasePermission
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

class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        elif self.action in ['update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated(), IsAdminOrStaffUser()]
        elif self.action == 'retrieve':
            return [permissions.IsAuthenticated()]
        elif self.action == 'list':
            return [permissions.IsAuthenticated(), IsAdminOrStaffUser()] # Ajusta según necesites
        else:
            return [permissions.IsAuthenticated()]
        
    def get_queryset(self):
        user = self.request.user
        if user.is_staff or user.is_superuser:
            return CustomUser.objects.all()
        return CustomUser.objects.filter(id=user.id)