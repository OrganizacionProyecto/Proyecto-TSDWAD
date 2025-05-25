from rest_framework import serializers

class ProcesoPagotSerializer(serializers.Serializer):
    token = serializers.CharField(max_length=255) 
    valot_transaccion = serializers.DecimalField(max_digits=12, decimal_places=2) 
    id_etodo_pago = serializers.CharField(max_length=50)
    cuotas = serializers.IntegerField(min_value=1) 
    email = serializers.EmailField()
    # Si quieres enviar una referencia externa o una descripción:
    descripcion = serializers.CharField(max_length=255, required=False, allow_blank=True)
    referencia_externa = serializers.CharField(max_length=255, required=False, allow_blank=True)