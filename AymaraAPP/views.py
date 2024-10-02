from rest_framework.authentication import SessionAuthentication
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from rest_framework import generics, status, viewsets
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .serializers import *
from .models import *
from .permissions import *
from rest_framework.decorators import action
from django.middleware.csrf import get_token
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect
from django.db import transaction
from rest_framework.exceptions import PermissionDenied
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
"""class UserProfileView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        user = request.user

        user_data = {

            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'username': user.username,
            'direccion': user.direccion,
        }

        return Response(user_data, status=200) """

class UserListCreateView(generics.ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsSuperAdminUser]

class UserRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsSuperAdminUser]
    
    def update(self, request, *args, **kwargs):
        if not request.user.is_superuser:
            raise PermissionDenied("You are not allowed to perform this action.")
        return super().update(request, *args, **kwargs)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(email=email, password=password)

        if user:
            refresh = RefreshToken.for_user(user)
            user_data = {
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
            }
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'userData': user_data
            }, status=status.HTTP_200_OK)
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_404_NOT_FOUND)

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)

# Signup con JWT
class SignupView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        request = self.request
        if request.user.is_superuser:
            serializer.save()
        else:
            serializer.save(is_staff=False, is_superuser=False)

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [IsAdminOrReadOnly]
    authentication_classes = [JWTAuthentication]

class MetodoPagoViewSet(viewsets.ModelViewSet):
    queryset = MetodoPago.objects.all()
    serializer_class = MetodoPagoSerializer
    permission_classes = [IsAdminOrReadOnly]
    authentication_classes = [JWTAuthentication]


class StockViewSet(viewsets.ModelViewSet):
    queryset = Stock.objects.all()
    serializer_class = StockSerializer
    permission_classes = [IsSuperAdminUser]
    authentication_classes = [JWTAuthentication]

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    permission_classes = [IsAdminOrReadOnly]
    authentication_classes = [JWTAuthentication]

class AgregarProductoViewSet(viewsets.ModelViewSet):
    queryset = AgregarProducto.objects.all()
    serializer_class = AgregarProductoSerializer
    permission_classes = [IsUserOrAdmin]
    authentication_classes = [JWTAuthentication]

class DatosEnvioViewSet(viewsets.ModelViewSet):
    queryset = DatosEnvio.objects.all()
    serializer_class = DatosEnvioSerializer
    permission_classes = [IsAdminOrReadOnly]
    authentication_classes = [JWTAuthentication]

class PedidoViewSet(viewsets.ModelViewSet):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer
    permission_classes = [IsUserOrAdminWithRestrictions]
    authentication_classes = [JWTAuthentication]

class CarritoViewSet(viewsets.ModelViewSet):
    queryset = Carrito.objects.all()
    serializer_class = CarritoSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=['post'])
    def agregar_producto(self, request, pk=None):
        try:
            carrito = self.get_object()
        except Carrito.DoesNotExist:
            return Response({'error': 'Carrito no encontrado'}, status=status.HTTP_404_NOT_FOUND)

        producto_id = request.data.get('producto_id')
        cantidad = request.data.get('cantidad', 1)

        try:
            producto = Producto.objects.get(id_producto=producto_id)
        except Producto.DoesNotExist:
            return Response({'error': 'Producto no encontrado'}, status=status.HTTP_404_NOT_FOUND)

        # Calcular el precio unitario
        precio_unitario = producto.precio

        # Calcular el total del producto
        total_producto = precio_unitario * cantidad

        agregar_producto, created = AgregarProducto.objects.get_or_create(carrito=carrito, id_producto=producto)

        if created:
            agregar_producto.cantidad = cantidad
        else:
            agregar_producto.cantidad += cantidad
        agregar_producto.precio_unitario = precio_unitario
        agregar_producto.save()

        # Actualizar el total del carrito
        carrito.total += total_producto
        carrito.save()

        serializer = CarritoSerializer(carrito)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UserDetailView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        user_data = {
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'user_type': 'Tipo de Usuario',  
        }
        return Response(user_data)

class DeleteAccountView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        user = request.user
        user.delete()
        return Response({'detail': 'Cuenta eliminada con éxito.'}, status=status.HTTP_204_NO_CONTENT)
    
    
# Vista para añadir a favoritos
class AddToFavoritesView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self, request, *args, **kwargs):
        id_producto = request.data.get('producto_id')
        user = request.user
        producto = Producto.objects.get(id_producto=id_producto)
        favorito, created = Favorito.objects.get_or_create(usuario=user, producto=producto)
        if created:
            return Response({'message': 'Producto añadido a favoritos'}, status=status.HTTP_201_CREATED)
        return Response({'message': 'Producto ya está en favoritos'}, status=status.HTTP_200_OK)

# Vista para eliminar de favoritos
class RemoveFromFavoritesView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self, request, *args, **kwargs):
        producto_id = request.data.get('producto_id')
        user = request.user
        producto = Producto.objects.get(id_producto=producto_id)
        favorito = Favorito.objects.get(usuario=user, producto=producto)
        favorito.delete()
        return Response({'message': 'Producto eliminado de favoritos'}, status=status.HTTP_200_OK)
#{
#  "producto_id": 1  // Reemplaza con el ID del producto que deseas sacar de favoritos
#}


class ChangeDireccionView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def patch(self, request, *args, **kwargs):
        user = request.user
        new_direccion = request.data.get('direccion')

        if not new_direccion:
            return Response({'error': 'El campo "direccion" es requerido.'}, status=status.HTTP_400_BAD_REQUEST)

        user.direccion = new_direccion
        user.save()
        return Response({'message': 'Dirección actualizada con éxito.'}, status=status.HTTP_200_OK)

#Json
#{
# "direccion": "Nueva Dirección Actualizada"
#}

class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self, request, *args, **kwargs):
        user = request.user
        
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')

        if not old_password or not new_password:
            return Response({'error': 'Debes proporcionar la contraseña antigua y la nueva.'}, status=status.HTTP_400_BAD_REQUEST)

        if not user.check_password(old_password):
            return Response({'old_password': 'Contraseña antigua incorrecta'}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()
        
        return Response({'message': 'Contraseña cambiada con éxito.'}, status=status.HTTP_200_OK)

#Json
#{
#  "old_password": "tu_contraseña_antigua",
#  "new_password": "tu_nueva_contraseña"
#}

class ListFavoritesView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request, *args, **kwargs):
        user = request.user
        favoritos = Favorito.objects.filter(usuario=user).select_related('producto')
        serializer = ProductoSerializer([favorito.producto for favorito in favoritos], many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

#{
#  "producto_id": 1  // Reemplaza con el ID del producto que deseas agregar a favoritos
#}

class ChangeUsernameView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def patch(self, request, *args, **kwargs):
        user = request.user
        new_username = request.data.get('username')

        if not new_username:
            return Response({'error': 'El campo "username" es requerido.'}, status=status.HTTP_400_BAD_REQUEST)

        if CustomUser.objects.filter(username=new_username).exclude(id=user.id).exists():
            return Response({'error': 'Este nombre de usuario ya está en uso.'}, status=status.HTTP_400_BAD_REQUEST)

        user.username = new_username
        user.save()
        return Response({'message': 'Nombre de usuario actualizado con éxito.'}, status=status.HTTP_200_OK)

#{
# "username": "nuevo_username"
#}

class ChangeEmailView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def patch(self, request, *args, **kwargs):
        user = request.user
        new_email = request.data.get('email')

        if not new_email:
            return Response({'error': 'El campo "email" es requerido.'}, status=status.HTTP_400_BAD_REQUEST)

        if CustomUser.objects.filter(email=new_email).exclude(id=user.id).exists():
            return Response({'error': 'Este email ya está en uso.'}, status=status.HTTP_400_BAD_REQUEST)

        user.email = new_email
        user.save()
        return Response({'message': 'Email actualizado con éxito.'}, status=status.HTTP_200_OK)

#{
#  "email": "nuevoemail@example.com"
#}