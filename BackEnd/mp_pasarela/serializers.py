from rest_framework import serializers

class ProcesoPagoSerializer(serializers.Serializer):
    token = serializers.CharField(max_length=255) 
    transaction_amount = serializers.DecimalField(max_digits=12, decimal_places=2) 
    payment_method_id = serializers.CharField(max_length=50)
    installments = serializers.IntegerField(min_value=1) 
    email = serializers.EmailField()
    # Si quieres enviar una referencia externa o una descripción:
    description = serializers.CharField(max_length=255, required=False, allow_blank=True)
    external_reference = serializers.CharField(max_length=255, required=False, allow_blank=True)
