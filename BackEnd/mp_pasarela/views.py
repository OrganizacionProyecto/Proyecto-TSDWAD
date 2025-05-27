import mercadopago
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from decimal import Decimal
from .serializers import ProcesoPagoSerializer
from .models import Pago
from dateutil.parser import parse
from django.db import IntegrityError
import logging

logger = logging.getLogger(__name__)

class ProcesoPagoView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ProcesoPagoSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            transaction_amount = data["transaction_amount"]

            if transaction_amount <= 0:
                return Response(
                    {"detail": "El monto debe ser mayor a cero."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            sdk = mercadopago.SDK(settings.MERCADOPAGO_ACCESS_TOKEN)

            payment_data = {
                "transaction_amount": float(transaction_amount),
                "token": data["token"],
                "description": data.get("description", "Pago desde Django"),
                "installments": data["installments"],
                "payment_method_id": data["payment_method_id"],
                "payer": {
                    "email": data["email"]
                },
                "external_reference": data.get("external_reference", ""),
            }

            try:
                result = sdk.payment().create(payment_data)
                payment_response = result.get("response", {})

                if result.get("status") in [200, 201]:
                    payment_id = payment_response.get("id")
                    if not payment_id:
                        return Response(
                            {"detail": "No se recibió un ID de pago válido", "mp_error": payment_response},
                            status=status.HTTP_400_BAD_REQUEST
                        )

                    if Pago.objects.filter(payment_id=payment_id).exists():
                        return Response(
                            {"detail": "Este pago ya fue registrado."},
                            status=status.HTTP_409_CONFLICT
                        )

                    mp_created_at_str = payment_response.get("date_created")
                    mp_approved_at_str = payment_response.get("date_approved")

                    mp_created_at = parse(mp_created_at_str) if mp_created_at_str else None
                    mp_approved_at = parse(mp_approved_at_str) if mp_approved_at_str else None

                    Pago.objects.create(
                        user=request.user,
                        payment_id=payment_id,
                        status=payment_response.get("status"),
                        status_detail=payment_response.get("status_detail", ""),
                        payment_type_id=payment_response.get("payment_type_id"),
                        method_id=payment_response.get("payment_method_id"),
                        email=payment_response.get("payer", {}).get("email", data["email"]),
                        amount=Decimal(payment_response.get("transaction_amount")),
                        mp_created_at=mp_created_at,
                        mp_approved_at=mp_approved_at,
                        currency_id=payment_response.get("currency_id", 'ARS'),
                        installments=payment_response.get("installments", 1),
                        external_reference=payment_response.get("external_reference"),
                    )

                    logger.info(f"Pago registrado exitosamente para {request.user} - ID: {payment_id}")
                    return Response(payment_response, status=status.HTTP_201_CREATED)

                else:
                    error_message = payment_response.get("message", "Error desconocido en Mercado Pago.")
                    logger.warning(f"Error de MP - Usuario: {request.user} - Respuesta: {payment_response}")
                    return Response({"detail": error_message, "mp_error": payment_response},
                                    status=result.get("status") or status.HTTP_400_BAD_REQUEST)

            except Exception as e:
                logger.error(f"Error inesperado al procesar pago para {request.user}: {str(e)}")
                return Response({"detail": f"Error interno al procesar el pago: {str(e)}"},
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)