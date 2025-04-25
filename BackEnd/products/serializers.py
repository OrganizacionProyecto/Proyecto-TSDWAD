from rest_framework import serializers
from .models import Producto, Categoria, Favorito

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

class ProductoPublicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        exclude = ['stock']

class ProductoPrivateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'

class FavoritoSerializer(serializers.ModelSerializer):
    producto_id = serializers.PrimaryKeyRelatedField(
        queryset=Producto.objects.all(),
        source='producto',
        write_only=True
    )
    producto = ProductoPublicSerializer(read_only=True)

    class Meta:
        model = Favorito
        fields = ['producto_id', 'producto']