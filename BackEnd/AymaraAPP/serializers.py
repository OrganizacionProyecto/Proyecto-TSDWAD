from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from .models import Producto, Categoria, DatosEnvio, Stock, Pedido
from .models import MetodoPago, Carrito, AgregarProducto


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8)

    class Meta:
        model = get_user_model()
        fields = ("username", "first_name", "last_name", "email", "password")

    def validate_password(self, value):
        return make_password(value)


class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = "__all__"


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = "__all__"

class MetodoPagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MetodoPago
        fields = '__all__'

class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = '__all__'

class AgregarProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = AgregarProducto
        fields = '__all__'

class DatosEnvioSerializer(serializers.ModelSerializer):
    class Meta:
        model = DatosEnvio
        fields = '__all__'

class PedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pedido
        fields = '__all__'

class CarritoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carrito
        fields = '__all__'
