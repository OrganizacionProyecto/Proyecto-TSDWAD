from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from .models import Producto, Categoria, DatosEnvio, Stock, Pedido
from .models import MetodoPago, Carrito, AgregarProducto


class UserSerializer(serializers.ModelSerializer):
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
    producto = ProductoSerializer(source='id_producto', read_only=True)

    class Meta:
        model = AgregarProducto
        fields = ['id_agregar_producto', 'cantidad', 'precio_unitario', 'producto']

class DatosEnvioSerializer(serializers.ModelSerializer):
    class Meta:
        model = DatosEnvio
        fields = '__all__'

class PedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pedido
        fields = '__all__'

class CarritoSerializer(serializers.ModelSerializer):
    productos = AgregarProductoSerializer(many=True, source='agregarproducto_set', read_only=True)
    
    class Meta:
        model = Carrito
        fields = '__all__'
        

