from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from .models import *


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'is_staff', 'is_superuser', 'is_active', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        request = self.context.get('request')
        is_staff = validated_data.pop('is_staff', False)
        is_superuser = validated_data.pop('is_superuser', False)
        is_active = validated_data.pop('is_active', True)
        if request and request.user and request.user.is_superuser:
                user = CustomUser.objects.create_user(
                username=validated_data['username'],
                email=validated_data['email'],
                password=validated_data['password'],
                is_staff=is_staff,
                is_superuser=is_superuser,
                is_active=is_active,
            )
        else:
            user = CustomUser.objects.create_user(
                username=validated_data['username'],
                email=validated_data['email'],
                password=validated_data['password'],
                is_staff=False,
                is_superuser=False,
                is_active=True,
            )
        return user
    
    def update(self, instance, validated_data):
        request = self.context.get('request')
        if request and request.user and request.user.is_superuser:
            instance.is_staff = validated_data.get('is_staff', instance.is_staff)
            instance.is_superuser = validated_data.get('is_superuser', instance.is_superuser)
            instance.is_active = validated_data.get('is_active', instance.is_active)

        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        
        password = validated_data.get('password', None)
        if password:
            instance.set_password(password)
        
        instance.save()
        return instance


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
        

