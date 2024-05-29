from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from rest_framework import generics, status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import *
from .models import *
from .permissions import *


class LoginView(APIView):
    permission_classes=[IsUsuarioUser, IsSuperAdminUser, IsUsuarioAdminUser]
    
    def post(self, request):
        email = request.data.get("email", None)
        password = request.data.get("password", None)
        user = authenticate(
            email=email, password=password
        )

        if user:
            login(request, user)
            return Response(UserSerializer(user).data, status=status.HTTP_200_OK)

        return Response(status=status.HTTP_404_NOT_FOUND)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        # Borrar request
        logout(request)
        return Response(status=status.HTTP_200_OK)


class SignupView(generics.CreateAPIView):
    permission_classes = [IsSuperAdminUser]
    serializer_class = UserSerializer

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [IsAdminOrReadOnly]

class MetodoPagoViewSet(viewsets.ModelViewSet):
    queryset = MetodoPago.objects.all()
    serializer_class = MetodoPagoSerializer
    permission_classes = [IsSuperAdminUser]

class StockViewSet(viewsets.ModelViewSet):
    queryset = Stock.objects.all()
    serializer_class = StockSerializer
    permission_classes = [IsSuperAdminUser]

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    permission_classes = [IsAdminOrReadOnly]

class AgregarProductoViewSet(viewsets.ModelViewSet):
    queryset = AgregarProducto.objects.all()
    serializer_class = AgregarProductoSerializer
    permission_classes = [IsUsuarioAdminUser]

class DatosEnvioViewSet(viewsets.ModelViewSet):
    queryset = DatosEnvio.objects.all()
    serializer_class = DatosEnvioSerializer
    permission_classes = [IsSuperAdminUser]

class PedidoViewSet(viewsets.ModelViewSet):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer
    permission_classes = [IsSuperAdminUser, IsUsuarioAdminUser, IsUsuarioUser]

class CarritoViewSet(viewsets.ModelViewSet):
    queryset = Carrito.objects.all()
    serializer_class = CarritoSerializer
    permission_classes = [IsSuperAdminUser, IsUsuarioAdminUser, IsUsuarioUser]

