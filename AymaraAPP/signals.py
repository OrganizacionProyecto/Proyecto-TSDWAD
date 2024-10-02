from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Stock, Producto
from django.db import models

# Define una función que se ejecutará después de guardar un objeto Stock
@receiver(post_save, sender=Stock)
def actualizar_disponibilidad(sender, instance, created, **kwargs):
    if created:  # Verifica si se ha creado un nuevo registro de Stock
        producto = instance.id_producto
        cantidad_agregada = instance.cantidad
        # Actualiza la disponibilidad del producto sumando la cantidad agregada
        Producto.objects.filter(id_producto=producto.id_producto).update(
            disponibilidad=models.F('disponibilidad') + cantidad_agregada
        )
