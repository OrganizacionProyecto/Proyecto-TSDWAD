from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse
from .models import Carrito, ItemCarrito, Pedido, ItemPedido, Producto
from .serializers import CarritoSerializer, ItemCarritoSerializer, PedidoSerializer
from products.models import Producto
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from io import BytesIO
from django.shortcuts import get_object_or_404
import random
import string
from rest_framework import viewsets
from django.db import transaction
from rest_framework.permissions import IsAuthenticated


# Vista para ver el carrito del usuario
class CarritoView(generics.RetrieveAPIView):
    serializer_class = CarritoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        carrito, _ = Carrito.objects.get_or_create(usuario=self.request.user)
        return carrito

    def retrieve(self, request, *args, **kwargs):
        carrito = self.get_object()

        # Calcular el total del carrito
        total_carrito = 0
        detalles_producto = []

        # Recorrer los items del carrito
        for item in carrito.items.all():
            producto = item.producto
            precio_total_producto = item.cantidad * producto.precio
            total_carrito += precio_total_producto

            detalles_producto.append({
                "id_producto": item.producto.id_producto,
                'nombre_producto': producto.nombre,
                'cantidad': item.cantidad,
                'precio_unitario': str(producto.precio),
                'total_producto': str(precio_total_producto)
            })
        
        # Obtenemos los datos del carrito y el total
        carrito_data = CarritoSerializer(carrito).data
        carrito_data['total_carrito'] = str(total_carrito)
        carrito_data['detalles_producto'] = detalles_producto
        
        return Response(carrito_data)

# Vista para agregar un producto al carrito
class AgregarProductoCarritoView(generics.CreateAPIView):
    serializer_class = ItemCarritoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        producto_id = request.data.get('producto_id')
        cantidad = int(request.data.get('cantidad', 1))

        # Verificar si el producto_id es válido
        if not producto_id:
            return Response({"error": "Debes proporcionar un producto_id."}, status=status.HTTP_400_BAD_REQUEST)

        # Manejo de errores si el producto no existe
        try:
            producto = Producto.objects.get(id_producto=producto_id)
        except Producto.DoesNotExist:
            return Response({"error": "Producto no encontrado."}, status=status.HTTP_400_BAD_REQUEST)

        # Verificar si hay suficiente stock antes de agregar al carrito
        if producto.stock < cantidad:
            return Response({"error": f"No hay suficiente stock de {producto.nombre}."}, status=status.HTTP_400_BAD_REQUEST)

        carrito, _ = Carrito.objects.get_or_create(usuario=request.user)

        # Buscar si ya existe el producto en el carrito
        item, created = ItemCarrito.objects.get_or_create(carrito=carrito, producto=producto)
        if not created:
            item.cantidad += cantidad
        else:
            item.cantidad = cantidad
        item.save()

        return Response({"success": "Producto agregado al carrito."}, status=status.HTTP_200_OK)
    serializer_class = ItemCarritoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        producto_id = request.data.get('producto_id')
        cantidad = int(request.data.get('cantidad', 1))

        # Verificar si el producto_id es válido
        if not producto_id:
            return Response({"error": "Debes proporcionar un producto_id."}, status=status.HTTP_400_BAD_REQUEST)

        # Manejo de errores si el producto no existe
        try:
            producto = Producto.objects.get(id_producto=producto_id)  # Usar id_producto
        except Producto.DoesNotExist:
            return Response({"error": "Producto no encontrado."}, status=status.HTTP_400_BAD_REQUEST)

        # Verificar si hay suficiente stock
        if producto.stock < cantidad:
            return Response({"error": f"No hay suficiente stock de {producto.nombre}."}, status=status.HTTP_400_BAD_REQUEST)

        carrito, _ = Carrito.objects.get_or_create(usuario=request.user)

        # Buscar si ya existe el producto en el carrito
        item, created = ItemCarrito.objects.get_or_create(carrito=carrito, producto=producto)
        if not created:
            item.cantidad += cantidad
        else:
            item.cantidad = cantidad
        item.save()

        # Restar el stock disponible del producto
        producto.stock -= cantidad
        producto.save()

        return Response({"success": "Producto agregado al carrito."}, status=status.HTTP_200_OK)
    
# Vista para crear un pedido
class CrearPedidoView(generics.CreateAPIView):
    serializer_class = PedidoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        usuario = request.user
        direccion = request.data.get("direccion_entrega")
        telefono = request.data.get("telefono")
        metodo_pago = request.data.get("metodo_pago")

        # Validación de campos obligatorios
        if not direccion or not telefono or not metodo_pago:
            return Response({"error": "Faltan campos obligatorios."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Validación del teléfono
        if not telefono.isdigit():
            return Response({"error": "El teléfono debe contener solo números."}, status=status.HTTP_400_BAD_REQUEST)

        if len(telefono) > 11:
            return Response({"error": "El teléfono no puede tener más de 11 dígitos."}, status=status.HTTP_400_BAD_REQUEST)

        # Validación de método de pago
        if metodo_pago == "tarjeta":
            numero_tarjeta = request.data.get("numero_tarjeta")
            nombre_titular = request.data.get("nombre_titular")
            vencimiento = request.data.get("vencimiento")
            cvv = request.data.get("cvv")

            if not all([numero_tarjeta, nombre_titular, vencimiento, cvv]):
                return Response({"error": "Faltan datos de la tarjeta."}, status=status.HTTP_400_BAD_REQUEST)

            if len(numero_tarjeta) != 16 or not numero_tarjeta.isdigit():
                return Response({"error": "Número de tarjeta inválido."}, status=status.HTTP_400_BAD_REQUEST)
            if len(cvv) != 3 or not cvv.isdigit():
                return Response({"error": "CVV inválido."}, status=status.HTTP_400_BAD_REQUEST)

            transaction_id = ''.join(random.choices(string.ascii_uppercase + string.digits, k=10))
            estado_pago = "pagado"
        elif metodo_pago == "efectivo":
            transaction_id = None
            estado_pago = "pendiente"
        else:
            return Response({"error": "Método de pago inválido."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            carrito = Carrito.objects.get(usuario=usuario)
        except Carrito.DoesNotExist:
            return Response({"error": "Carrito no encontrado."}, status=status.HTTP_404_NOT_FOUND)

        if not carrito.items.exists():
            return Response({"error": "El carrito está vacío."}, status=status.HTTP_400_BAD_REQUEST)

        total = sum(item.producto.precio * item.cantidad for item in carrito.items.all())

        # Crear el pedido
        pedido = Pedido.objects.create(
            usuario=usuario,
            direccion_entrega=direccion,
            telefono=telefono,
            metodo_pago=metodo_pago,
            total=total
        )

        # Crear los items del pedido y restar el stock
        for item in carrito.items.all():
            producto = item.producto

            # Verificar si hay stock suficiente
            if producto.stock < item.cantidad:
                return Response({"error": f"No hay suficiente stock de {producto.nombre}."}, status=status.HTTP_400_BAD_REQUEST)

            # Crear el item del pedido
            ItemPedido.objects.create(
                pedido=pedido,
                producto=producto,
                cantidad=item.cantidad
            )

            # Restar el stock del producto
            producto.stock -= item.cantidad
            producto.save()

        # Vaciar el carrito después de realizar el pedido
        carrito.items.all().delete()

        # Responder con los datos del pedido creado
        data = PedidoSerializer(pedido).data
        data["estado_pago"] = estado_pago
        if transaction_id:
            data["transaction_id"] = transaction_id

        return Response(data, status=status.HTTP_201_CREATED)

# Función para generar el PDF de la factura
def generar_factura_pdf(pedido_id):
    pedido = get_object_or_404(Pedido, id=pedido_id)
    
    # Crear un archivo PDF en memoria
    buffer = BytesIO()
    c = canvas.Canvas(buffer, pagesize=letter)
    
    c.setFont("Helvetica", 12)
    
    # Título
    c.drawString(100, 750, f"Factura - Pedido #{pedido.id}")
    
    # Datos del pedido
    c.drawString(100, 720, f"Cliente: {pedido.usuario.get_full_name()}")
    c.drawString(100, 700, f"Dirección de entrega: {pedido.direccion_entrega}")
    c.drawString(100, 680, f"Teléfono: {pedido.telefono}")
    c.drawString(100, 660, f"Método de pago: {pedido.metodo_pago.capitalize()}")
    
    # Detalles del pedido
    c.drawString(100, 620, "Productos:")
    y_position = 600
    for item in pedido.items.all():
        c.drawString(120, y_position, f"{item.producto.nombre} - {item.cantidad} x ${item.producto.precio}")
        y_position -= 20

    c.drawString(100, y_position - 20, f"Total: ${pedido.total}")
    
    # Finalizar el PDF
    c.showPage()
    c.save()
    
    buffer.seek(0)
    return buffer

# Descargar la factura como PDF
class DescargarFacturaView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        pedido_id = kwargs.get('pedido_id')
        # Generar el PDF de la factura
        pdf_buffer = generar_factura_pdf(pedido_id)

        # Crear una respuesta HTTP con el PDF
        response = HttpResponse(pdf_buffer, content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="factura_{pedido_id}.pdf"'
        return response


class ModificarProductoCarritoView(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    @transaction.atomic
    def update(self, request, producto_id):
        accion = request.data.get('accion')
        try:
            cantidad = int(request.data.get('cantidad', 1))
            if cantidad <= 0:
                return Response(
                    {'error': 'La cantidad debe ser mayor a 0'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        except (TypeError, ValueError):
            return Response(
                {'error': 'La cantidad debe ser un número válido'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            producto = Producto.objects.select_for_update().get(id_producto=producto_id)
        except Producto.DoesNotExist:
            return Response(
                {'error': 'Producto no encontrado'},
                status=status.HTTP_404_NOT_FOUND
            )

        carrito = get_object_or_404(Carrito, usuario=request.user)
        item = get_object_or_404(ItemCarrito, carrito=carrito, producto=producto)

        if accion == 'aumentar':
            if producto.stock < cantidad:
                return Response(
                    {'error': f'No hay suficiente stock disponible para agregar {cantidad} unidades'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            # Aumentar la cantidad del producto en el carrito
            item.cantidad += cantidad
            producto.stock -= cantidad  # Reducir el stock del producto en la tienda
        elif accion == 'disminuir':
            # Verificar que la cantidad a disminuir no sea mayor a la actual en el carrito
            if item.cantidad < cantidad:
                return Response(
                    {'error': f'No hay suficientes items en el carrito para disminuir {cantidad} unidades'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            item.cantidad -= cantidad
            producto.stock += cantidad
        else:
            return Response(
                {'error': 'Acción no válida'},
                status=status.HTTP_400_BAD_REQUEST
            )

        item.save()
        producto.save()

        serializer = ItemCarritoSerializer(item)
        return Response(serializer.data)
    permission_classes = [IsAuthenticated]

    @transaction.atomic
    def update(self, request, producto_id):
        accion = request.data.get('accion')
        try:
            cantidad = int(request.data.get('cantidad', 1))
            if cantidad <= 0:
                return Response(
                    {'error': 'La cantidad debe ser mayor a 0'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        except (TypeError, ValueError):
            return Response(
                {'error': 'La cantidad debe ser un número válido'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            producto = Producto.objects.select_for_update().get(id_producto=producto_id)
        except Producto.DoesNotExist:
            return Response(
                {'error': 'Producto no encontrado'},
                status=status.HTTP_404_NOT_FOUND
            )

        carrito = get_object_or_404(Carrito, usuario=request.user)
        item = get_object_or_404(ItemCarrito, carrito=carrito, producto=producto)

        if accion == 'aumentar':
            # Verificamos si el stock del producto es suficiente para agregar la unidad
            if producto.stock < 1:
                return Response(
                    {'error': 'No hay suficiente stock disponible para agregar una unidad'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            # Aumentar la cantidad del producto en el carrito
            item.cantidad += 1
            producto.stock -= 1  # Reducir el stock del producto en la tienda
        elif accion == 'disminuir':
            if item.cantidad < cantidad:
                return Response(
                    {'error': 'No hay suficientes items en el carrito'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            item.cantidad -= cantidad
            producto.stock += cantidad
        else:
            return Response(
                {'error': 'Acción no válida'},
                status=status.HTTP_400_BAD_REQUEST
            )

        item.save()
        producto.save()

        serializer = ItemCarritoSerializer(item)
        return Response(serializer.data)

class EliminarProductoCarritoView(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    @transaction.atomic
    def destroy(self, request, producto_id):
        try:
            producto = Producto.objects.select_for_update().get(id_producto=producto_id)
        except Producto.DoesNotExist:
            return Response(
                {'error': 'Producto no encontrado'},
                status=status.HTTP_404_NOT_FOUND
            )

        carrito = get_object_or_404(Carrito, usuario=request.user)
        item = get_object_or_404(ItemCarrito, carrito=carrito, producto=producto)

        producto.stock += item.cantidad
        producto.save()
        item.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

class HistorialPedidosView(generics.ListAPIView):
    serializer_class = PedidoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Pedido.objects.filter(usuario=self.request.user).order_by('-fecha_creacion')
