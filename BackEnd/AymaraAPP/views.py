from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from rest_framework import generics, status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import *
from .models import *
from .permissions import *
from rest_framework.decorators import action


class LoginView(APIView):
    
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
    serializer_class = UserSerializer


class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [IsAdminOrReadOnly]

class MetodoPagoViewSet(viewsets.ModelViewSet):
    queryset = MetodoPago.objects.all()
    serializer_class = MetodoPagoSerializer
    permission_classes = [IsAdminOrReadOnly]

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
    permission_classes = [IsUserOrAdmin]

class DatosEnvioViewSet(viewsets.ModelViewSet):
    queryset = DatosEnvio.objects.all()
    serializer_class = DatosEnvioSerializer
    permission_classes = [IsSuperAdminUser]

class PedidoViewSet(viewsets.ModelViewSet):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer
    permission_classes = [IsUserOrAdminWithRestrictions]

class CarritoViewSet(viewsets.ModelViewSet):
    queryset = Carrito.objects.all()
    serializer_class = CarritoSerializer
    permission_classes = [IsUserOrAdminWithRestrictions]
    
    def agregar_producto(self, request):
        productos = request.data.get('productos')

        if not productos or not isinstance(productos, list):
            return Response({"detail": "A list of products is required."}, status=status.HTTP_400_BAD_REQUEST)

        user = request.user

        for producto_data in productos:
            id_producto = producto_data.get('id_producto')
            cantidad = producto_data.get('cantidad')

            if not id_producto or not cantidad:
                return Response({"detail": "Product ID and quantity are required for each product."},
                                status=status.HTTP_400_BAD_REQUEST)

            try:
                producto = Producto.objects.get(id_producto=id_producto)
            except Producto.DoesNotExist:
                return Response({"detail": f"Product with ID {id_producto} does not exist."},
                                status=status.HTTP_404_NOT_FOUND)

            # Verificar disponibilidad del producto
            if cantidad > producto.disponibilidad:
                return Response({"detail": f"Not enough stock available for product {producto.nombre}."},
                                status=status.HTTP_400_BAD_REQUEST)

            # Calcular precio unitario y total
            precio_unitario = producto.precio
            total = precio_unitario * cantidad

            # Crear o actualizar el elemento del carrito
            carrito_item, created = Carrito.objects.get_or_create(
                id_producto=producto,
                id_usuario=user,
                defaults={'cantidad': cantidad, 'precio_unitario': precio_unitario, 'total': total}
            )

            if not created:
                carrito_item.cantidad += cantidad
                carrito_item.total = carrito_item.cantidad * carrito_item.precio_unitario
                carrito_item.save()

        return Response({"detail": "Products added to cart successfully."}, status=status.HTTP_200_OK)

    
