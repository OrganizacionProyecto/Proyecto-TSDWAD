from rest_framework import viewsets, permissions, status
from rest_framework.permissions import BasePermission
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import CustomUser
from .serializers import UserSerializer, ChangePasswordSerializer

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

    def get_serializer_class(self):
        if self.action == 'change_password':
            return ChangePasswordSerializer
        return super().get_serializer_class()

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
        elif self.action == 'me':
            return [permissions.IsAuthenticated()]
        elif self.action == 'deactivate_account':
            return [permissions.IsAuthenticated()]
        elif self.action == 'change_password':
            return [permissions.IsAuthenticated()]
        else:
            return [permissions.IsAuthenticated()]

    def get_queryset(self):
        """
        Solo devuelve los usuarios para admins/superusuarios, o el propio usuario si no es admin.
        """
        user = self.request.user
        if user.is_staff or user.is_superuser:
            return CustomUser.objects.all()
        return CustomUser.objects.filter(id=user.id)

    @action(detail=False, methods=['get', 'put'])
    def me(self, request):
        """
        Devuelve o actualiza el perfil del usuario autenticado.
        """
        user = request.user
        if request.method == 'GET':
            serializer = self.get_serializer(user)
            return Response(serializer.data)
        elif request.method == 'PUT':
            serializer = self.get_serializer(user, data=request.data)
            if serializer.is_valid():
                serializer.save()
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

    @action(detail=False, methods=['post'], url_path='change_password')
    def change_password(self, request):
        """
        Permite a un usuario autenticado cambiar su contraseña.
        """
        user = request.user
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        old_password = serializer.validated_data['old_password']
        new_password = serializer.validated_data['new_password']

        if not user.check_password(old_password):
            return Response({'old_password': 'Contraseña antigua incorrecta'}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()

        return Response({'message': 'Contraseña cambiada con éxito.'}, status=status.HTTP_200_OK)
