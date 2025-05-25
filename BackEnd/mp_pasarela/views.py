import mercadopago
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from decimal import Decimal 
from .serializers import ProcesoPagotSerializer
from .models import Pago

class ProcesoPagoView(APIView):
    def post(self, request):
        serializer = ProcesoPagotSerializer(data=request.data)
        if serializer.is_valid():
            sdk = mercadopago.SDK(settings.MERCADOPAGO_ACCESS_TOKEN)
            data = serializer.validated_data

            # Prepara los datos para la API de Mercado Pago
            payment_data = {
                "transaction_amount": float(data["transaction_amount"]), # MP SDK espera float, pero lo manejamos como Decimal internamente
                "token": data["token"],
                "description": "Pago de ejemplo desde Django API", # Puedes hacer esto dinámico
                "installments": data["installments"],
                "payment_method_id": data["payment_method_id"],
                "payer": {
                    "email": data["email"]
                },
                # Opcional: Puedes pasar una referencia externa de tu sistema
                # "external_reference": "tu_id_de_pedido_o_transaccion_interno" 
            }

            try:
                result = sdk.payment().create(payment_data)
                payment_response = result["response"]

                # Verifica si la respuesta contiene errores
                if result["status"] == 201 or result["status"] == 200: # 201 Created o 200 OK
                    # Guardamos el pago en tu modelo
                    Pago.objects.create(
                        payment_id=payment_response.get("id"),
                        status=payment_response.get("status"),
                        status_detail=payment_response.get("status_detail", ""), # Asegúrate de que no sea None
                        payment_type=payment_response.get("payment_type_id"),
                        method_id=payment_response.get("payment_method_id"),
                        email=payment_response.get("payer", {}).get("email", data["email"]), # Preferir el email de la respuesta de MP
                        amount=Decimal(payment_response.get("transaction_amount")), # ¡Importante! Convertir a Decimal
                        mp_created_at=payment_response.get("date_created"), # Guardar fecha de MP
                        mp_approved_at=payment_response.get("date_approved"), # Guardar fecha de aprobación de MP
                        currency_id=payment_response.get("currency_id", 'ARS'),
                        installments=payment_response.get("installments", 1),
                        transaction_amount=Decimal(payment_response.get("transaction_amount")), # Guardar el monto de la transacción de MP
                        # Si tienes un 'external_reference' en tu payment_data, guárdalo también
                        # external_reference=payment_response.get("external_reference"),
                    )
                    return Response(payment_response, status=status.HTTP_201_CREATED)
                else:
                    # Manejar errores específicos de la API de Mercado Pago
                    error_message = payment_response.get("message", "Error desconocido en Mercado Pago.")
                    return Response({"detail": error_message, "mp_error": payment_response}, 
                                    status=result["status"] or status.HTTP_400_BAD_REQUEST)

            except Exception as e:
                # Captura cualquier otra excepción inesperada
                return Response({"detail": f"Error interno al procesar el pago: {str(e)}"}, 
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


