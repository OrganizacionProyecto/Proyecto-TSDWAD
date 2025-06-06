from django.db import models
from django.conf import settings
from products.models import Producto
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from io import BytesIO
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions
from django.urls import reverse


class Carrito(models.Model):
    usuario = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='carrito')

    def __str__(self):
        return f"Carrito de {self.usuario}"

class ItemCarrito(models.Model):
    carrito = models.ForeignKey(Carrito, on_delete=models.CASCADE, related_name='items')
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField(default=1)

    class Meta:
        unique_together = ('carrito', 'producto')

    def __str__(self):
        return f"{self.cantidad} x {self.producto.nombre}"

class Pedido(models.Model):
    METODO_PAGO_CHOICES = [
        ('efectivo', 'Efectivo'),
        ('tarjeta', 'Tarjeta'),
        ('mercadopago', 'MercadoPago'),

    ]

    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='pedidos')
    direccion_entrega = models.CharField(max_length=255)
    telefono = models.CharField(max_length=20)
    metodo_pago = models.CharField(max_length=12, choices=METODO_PAGO_CHOICES)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    fecha_creacion = models.DateTimeField(auto_now_add=True)  
    
    
    # Campos para simular el pago con tarjeta
    numero_tarjeta = models.CharField(max_length=16, blank=True, null=True)
    fecha_expiracion = models.CharField(max_length=5, blank=True, null=True)
    codigo_seguridad = models.CharField(max_length=3, blank=True, null=True)

    def __str__(self):
        return f"Pedido #{self.id} de {self.usuario}"

    def agregar_items_desde_carrito(self, carrito):
        for item in carrito.items.all():
            producto = item.producto
            cantidad = item.cantidad
            self.items.create(producto=producto, cantidad=cantidad)
            self.total += producto.precio * cantidad
        self.save()
    

class ItemPedido(models.Model):
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE, related_name="items")
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.cantidad} x {self.producto.nombre}"


def generar_factura_pdf(pedido_id):
    pedido = get_object_or_404(Pedido, id=pedido_id)
    
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

class DescargarFacturaView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        pedido_id = kwargs.get('pedido_id')
        # Generar el PDF de la factura
        pdf_buffer = generar_factura_pdf(pedido_id)

        response = HttpResponse(pdf_buffer, content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="factura_{pedido_id}.pdf"'
        return response
