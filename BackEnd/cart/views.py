from rest_framework import generics, permissions, status, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse
from django.db import transaction
from django.shortcuts import get_object_or_404
from io import BytesIO
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import random
import string
import mercadopago
from decouple import config

from .models import Carrito, ItemCarrito, Pedido, ItemPedido
from .serializers import CarritoSerializer, ItemCarritoSerializer, PedidoSerializer
from products.models import Producto


# -------------------- CARRITO --------------------

class CarritoView(generics.RetrieveAPIView):
    serializer_class = CarritoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        carrito, _ = Carrito.objects.get_or_create(usuario=self.request.user)
        return carrito

    def retrieve(self, request, *args, **kwargs):
        carrito = self.get_object()
        total = sum(item.cantidad * item.producto.precio for item in carrito.items.all())
        detalles = [{
            "id_producto": item.producto.id_producto,
            "nombre_producto": item.producto.nombre,
            "cantidad": item.cantidad,
            "precio_unitario": str(item.producto.precio),
            "total_producto": str(item.cantidad * item.producto.precio)
        } for item in carrito.items.all()]

        data = CarritoSerializer(carrito).data
        data['total_carrito'] = str(total)
        data['detalles_producto'] = detalles
        return Response(data)


class AgregarProductoCarritoView(generics.CreateAPIView):
    serializer_class = ItemCarritoSerializer
    permission_classes = [permissions.IsAuthenticated]

    @transaction.atomic
    def post(self, request):
        producto_id = request.data.get('producto_id')
        cantidad = int(request.data.get('cantidad', 1))

        if not producto_id:
            return Response({"error": "Debes proporcionar un producto_id."}, status=400)

        try:
            producto = Producto.objects.select_for_update().get(id_producto=producto_id)
        except Producto.DoesNotExist:
            return Response({"error": "Producto no encontrado."}, status=400)

        if producto.stock < cantidad:
            return Response({"error": f"No hay suficiente stock de {producto.nombre}."}, status=400)

        carrito, _ = Carrito.objects.get_or_create(usuario=request.user)
        item, created = ItemCarrito.objects.get_or_create(carrito=carrito, producto=producto)

        item.cantidad = item.cantidad + cantidad if not created else cantidad
        item.save()

        producto.stock -= cantidad
        producto.save()

        return Response({"success": "Producto agregado al carrito."}, status=200)


class ModificarProductoCarritoView(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    @transaction.atomic
    def update(self, request, producto_id):
        accion = request.data.get('accion')
        try:
            cantidad = int(request.data.get('cantidad', 1))
        except (ValueError, TypeError):
            return Response({'error': 'Cantidad inválida.'}, status=400)

        producto = get_object_or_404(Producto.objects.select_for_update(), id_producto=producto_id)
        carrito = get_object_or_404(Carrito, usuario=request.user)
        item = get_object_or_404(ItemCarrito, carrito=carrito, producto=producto)

        if accion == 'aumentar':
            if producto.stock < 1:
                return Response({'error': f'Sin stock. Disponible: {producto.stock}'}, status=400)
            item.cantidad += 1
            producto.stock -= 1

        elif accion == 'disminuir':
            if item.cantidad <= 1:
                return Response({'error': 'No puedes disminuir más.'}, status=400)
            item.cantidad -= 1
            producto.stock += 1

        else:
            return Response({'error': 'Acción inválida.'}, status=400)

        item.save()
        producto.save()
        return Response(ItemCarritoSerializer(item).data, status=200)


class EliminarProductoCarritoView(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    @transaction.atomic
    def destroy(self, request, producto_id):
        producto = get_object_or_404(Producto.objects.select_for_update(), id_producto=producto_id)
        carrito = get_object_or_404(Carrito, usuario=request.user)
        item = get_object_or_404(ItemCarrito, carrito=carrito, producto=producto)

        producto.stock += item.cantidad
        producto.save()
        item.delete()

        return Response(status=204)


# -------------------- PEDIDOS --------------------

class CrearPedidoView(generics.CreateAPIView):
    serializer_class = PedidoSerializer
    permission_classes = [permissions.IsAuthenticated]

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        usuario = request.user
        data = request.data
        direccion = data.get("direccion_entrega")
        telefono = data.get("telefono")
        metodo_pago = data.get("metodo_pago")

        if not direccion or not telefono or not metodo_pago:
            return Response({"error": "Faltan campos obligatorios."}, status=400)

        if not telefono.isdigit() or len(telefono) > 11:
            return Response({"error": "Teléfono inválido."}, status=400)

        carrito = get_object_or_404(Carrito, usuario=usuario)

        if not carrito.items.exists():
            return Response({"error": "Carrito vacío."}, status=400)

        for item in carrito.items.all():
            if item.producto.stock < item.cantidad:
                return Response({"error": f"Sin stock de {item.producto.nombre}."}, status=400)

        total = sum(item.producto.precio * item.cantidad for item in carrito.items.all())
        estado_pago = "pendiente"
        transaction_id = None
        mercadopago_url = None

        if metodo_pago == "tarjeta":
            if not all([data.get("numero_tarjeta"), data.get("fecha_expiracion"), data.get("codigo_seguridad")]):
                return Response({"error": "Faltan datos de la tarjeta."}, status=400)
            transaction_id = ''.join(random.choices(string.ascii_uppercase + string.digits, k=10))
            estado_pago = "pagado"

        elif metodo_pago == "mercadopago":
            sdk = mercadopago.SDK(config("MP_ACCES_TOKEN"))
            preference_data = {
                "items": [{
                    "title": item.producto.nombre,
                    "quantity": item.cantidad,
                    "unit_price": float(item.producto.precio),
                    "currency_id": "ARS"
                } for item in carrito.items.all()],
                "back_urls": {
                    "success": "https://aymara.netlify.app/",
                    "failure": "https://aymara.netlify.app/",
                    "pending": "https://aymara.netlify.app/"
                },
                "auto_return": "approved"
            }
            response = sdk.preference().create(preference_data)
            mercadopago_url = response.get("response", {}).get("init_point")
            if not mercadopago_url:
                return Response({"error": "Error generando URL de MercadoPago"}, status=400)

        pedido = Pedido.objects.create(
            usuario=usuario,
            direccion_entrega=direccion,
            telefono=telefono,
            metodo_pago=metodo_pago,
            total=total
        )

        for item in carrito.items.all():
            ItemPedido.objects.create(pedido=pedido, producto=item.producto, cantidad=item.cantidad)
            item.producto.stock -= item.cantidad
            item.producto.save()

        carrito.items.all().delete()

        response_data = PedidoSerializer(pedido).data
        response_data["estado_pago"] = estado_pago
        if transaction_id:
            response_data["transaction_id"] = transaction_id
        if mercadopago_url:
            response_data["mercadopago_url"] = mercadopago_url

        return Response(response_data, status=201)


class AprobarPagoView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @transaction.atomic
    def get(self, request):
        if request.query_params.get('status') != 'approved':
            return Response({'error': 'Pago no aprobado'}, status=400)

        usuario = request.user
        carrito = get_object_or_404(Carrito, usuario=usuario)
        total = sum(item.producto.precio * item.cantidad for item in carrito.items.all())

        pedido = Pedido.objects.create(
            usuario=usuario,
            direccion_entrega="Desde preferencia o front",
            telefono="Desde preferencia o front",
            metodo_pago="mercadopago",
            total=total
        )

        for item in carrito.items.all():
            ItemPedido.objects.create(pedido=pedido, producto=item.producto, cantidad=item.cantidad)
            item.producto.stock -= item.cantidad
            item.producto.save()

        carrito.items.all().delete()

        return Response({"success": "Pedido confirmado y creado"}, status=201)


class HistorialPedidosView(generics.ListAPIView):
    serializer_class = PedidoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Pedido.objects.filter(usuario=self.request.user).order_by('-fecha_creacion')


# -------------------- PDF FACTURA --------------------

def generar_factura_pdf(pedido_id):
    pedido = get_object_or_404(Pedido, id=pedido_id)
    buffer = BytesIO()
    c = canvas.Canvas(buffer, pagesize=letter)
    c.setFont("Helvetica", 12)

    c.drawString(100, 750, f"Factura - Pedido #{pedido.id}")
    c.drawString(100, 720, f"Cliente: {pedido.usuario.get_full_name()}")
    c.drawString(100, 700, f"Dirección de entrega: {pedido.direccion_entrega}")
    c.drawString(100, 680, f"Teléfono: {pedido.telefono}")
    c.drawString(100, 660, f"Método de pago: {pedido.metodo_pago.capitalize()}")
    c.drawString(100, 620, "Productos:")

    y = 600
    for item in pedido.items.all():
        c.drawString(120, y, f"{item.producto.nombre} - {item.cantidad} x ${item.producto.precio}")
        y -= 20

    c.drawString(100, y - 20, f"Total: ${pedido.total}")
    c.showPage()
    c.save()
    buffer.seek(0)
    return buffer


class DescargarFacturaView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        pdf_buffer = generar_factura_pdf(kwargs.get('pedido_id'))
        response = HttpResponse(pdf_buffer, content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="factura_{kwargs["pedido_id"]}.pdf"'
        return response
