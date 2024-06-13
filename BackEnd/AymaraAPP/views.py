from rest_framework.authentication import SessionAuthentication
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from rest_framework import generics, status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from .serializers import *
from .models import *
from .permissions import *
from rest_framework.decorators import action
from django.middleware.csrf import get_token
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect
from django.db import transaction
from django.db import transaction
from rest_framework.exceptions import PermissionDenied

class GetCSRFToken(APIView):
    authentication_classes = [SessionAuthentication]  # Asegura la autenticación de sesión
    permission_classes = [IsAuthenticated]

    @method_decorator(csrf_protect)  # Protege la vista contra CSRF
    def get(self, request, format=None):
        # Obtener el token CSRF
        csrf_token = get_token(request)
        # Devolver el token CSRF en la respuesta
        return Response({'csrfToken': csrf_token})   
#-----------------------------------------------------------   

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
    authentication_classes = [SessionAuthentication]

    def post(self, request):
        email = request.data.get("email", None)
        password = request.data.get("password", None)
        user = authenticate(email=email, password=password)
        if user:
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            user_data = {
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
                # Incluye cualquier otro dato que necesites
            }
            return Response({'token': token.key, 'userData': user_data}, status=status.HTTP_200_OK)
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_404_NOT_FOUND)

class LogoutView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)

class SignupView(generics.CreateAPIView):
    authentication_classes = [SessionAuthentication]
    serializer_class = UserSerializer

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
    authentication_classes = [SessionAuthentication]

class MetodoPagoViewSet(viewsets.ModelViewSet):
    queryset = MetodoPago.objects.all()
    serializer_class = MetodoPagoSerializer
    permission_classes = [IsAdminOrReadOnly]
    authentication_classes = [SessionAuthentication]


class StockViewSet(viewsets.ModelViewSet):
    queryset = Stock.objects.all()
    serializer_class = StockSerializer
    permission_classes = [IsSuperAdminUser]
    authentication_classes = [SessionAuthentication]

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    permission_classes = [IsAdminOrReadOnly]
    authentication_classes = [SessionAuthentication]

class AgregarProductoViewSet(viewsets.ModelViewSet):
    queryset = AgregarProducto.objects.all()
    serializer_class = AgregarProductoSerializer
    permission_classes = [IsUserOrAdmin]
    authentication_classes = [SessionAuthentication]

class DatosEnvioViewSet(viewsets.ModelViewSet):
    queryset = DatosEnvio.objects.all()
    serializer_class = DatosEnvioSerializer
    permission_classes = [IsAdminOrReadOnly]
    authentication_classes = [SessionAuthentication]

class PedidoViewSet(viewsets.ModelViewSet):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer
    permission_classes = [IsUserOrAdminWithRestrictions]
    authentication_classes = [SessionAuthentication]

class CarritoViewSet(viewsets.ModelViewSet):
    queryset = Carrito.objects.all()
    serializer_class = CarritoSerializer
    authentication_classes = [SessionAuthentication]
    #permission_classes = [IsAuthenticated]

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
