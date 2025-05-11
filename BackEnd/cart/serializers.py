from rest_framework import serializers
from .models import Carrito, ItemCarrito, Pedido, Producto
from products.serializers import ProductoPublicSerializer

class ItemCarritoSerializer(serializers.ModelSerializer):
    producto_id = serializers.PrimaryKeyRelatedField(
        queryset=Producto.objects.all(),
        write_only=True  
    )
    producto_detalle = ProductoPublicSerializer(source='producto', read_only=True)  

    class Meta:
        model = ItemCarrito
        fields = ['id', 'producto_id', 'producto_detalle', 'cantidad']

    def validate_producto_id(self, value):
        try:
            producto = Producto.objects.get(id_producto=value)
        except Producto.DoesNotExist:
            raise serializers.ValidationError("Producto no encontrado.")
        return producto

class PedidoSerializer(serializers.ModelSerializer):
    numero_tarjeta = serializers.CharField(write_only=True, required=False)
    nombre_titular = serializers.CharField(write_only=True, required=False)
    vencimiento = serializers.CharField(write_only=True, required=False)
    cvv = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Pedido
        fields = [
            'id',
            'usuario',
            'direccion_entrega',
            'telefono',
            'metodo_pago',
            'total',
            'fecha_creacion',
            'numero_tarjeta',
            'nombre_titular',
            'vencimiento',
            'cvv'
        ]
        read_only_fields = ['id', 'usuario', 'total', 'fecha_creacion']

    def validate(self, data):
        metodo = data.get("metodo_pago", "").lower()

        if metodo == "tarjeta":
            campos_tarjeta = ['numero_tarjeta', 'nombre_titular', 'vencimiento', 'cvv']
            faltantes = [campo for campo in campos_tarjeta if not data.get(campo)]
            if faltantes:
                raise serializers.ValidationError({
                    campo: "Este campo es obligatorio para pagos con tarjeta."
                    for campo in faltantes
                })

        elif metodo == "efectivo":
            if not data.get("direccion_entrega"):
                raise serializers.ValidationError({"direccion_entrega": "Este campo es obligatorio para pagos en efectivo."})
            if not data.get("telefono"):
                raise serializers.ValidationError({"telefono": "Este campo es obligatorio para pagos en efectivo."})
        else:
            raise serializers.ValidationError({"metodo_pago": "Debe ser 'tarjeta' o 'efectivo'."})

        return data

class CarritoSerializer(serializers.ModelSerializer):
    items = ItemCarritoSerializer(many=True, read_only=True)

    class Meta:
        model = Carrito
        fields = ['usuario', 'items']
