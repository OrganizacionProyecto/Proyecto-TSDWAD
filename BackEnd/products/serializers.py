from rest_framework import serializers
from .models import Carrito, ItemCarrito, Pedido, Producto
from products.serializers import ProductoPublicSerializer

class ItemCarritoSerializer(serializers.ModelSerializer):
    producto_id = serializers.PrimaryKeyRelatedField(
        queryset=Producto.objects.all(),
        write_only=True  # Esto hace que solo se use para la escritura y no se devuelva
    )
    producto_detalle = ProductoPublicSerializer(source='producto', read_only=True)  # Relacionado para mostrar detalles del producto

    class Meta:
        model = ItemCarrito
        fields = ['id', 'producto_id', 'producto_detalle', 'cantidad']

    def validate_producto_id(self, value):
        # Aquí puedes agregar más validaciones si es necesario
        if not Producto.objects.filter(id_producto=value).exists():
            raise serializers.ValidationError("Producto no encontrado.")
        return value

class PedidoSerializer(serializers.ModelSerializer):
    # Campos extra para tarjeta (solo escritura)
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
        metodo = data.get("metodo_pago", "").lower()  # Convertir a minúsculas para evitar problemas de mayúsculas

        # Validación para el método de pago "tarjeta"
        if metodo == "tarjeta":
            campos_tarjeta = ['numero_tarjeta', 'nombre_titular', 'vencimiento', 'cvv']
            faltantes = [campo for campo in campos_tarjeta if not data.get(campo)]
            if faltantes:
                raise serializers.ValidationError({
                    campo: "Este campo es obligatorio para pagos con tarjeta."
                    for campo in faltantes
                })
        
        # Validación para el método de pago "efectivo"
        elif metodo == "efectivo":
            # Si el método de pago es efectivo, asegurarse de que direccion_entrega y telefono estén presentes
            if not data.get("direccion_entrega"):
                raise serializers.ValidationError({"direccion_entrega": "Este campo es obligatorio para pagos en efectivo."})
            if not data.get("telefono"):
                raise serializers.ValidationError({"telefono": "Este campo es obligatorio para pagos en efectivo."})
        
        else:
            raise serializers.ValidationError({"metodo_pago": "Debe ser 'tarjeta' o 'efectivo'."})

        return data

    
class CarritoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carrito
        fields = ['usuario', 'items']