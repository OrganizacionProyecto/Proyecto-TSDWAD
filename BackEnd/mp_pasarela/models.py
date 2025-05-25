from django.db import models
from django.contrib.auth import get_user_model

class Pago(models.Model):
    STATUS_CHOICES = [
        ('approved', 'Aprobado'),
        ('pending', 'Pendiente'),
        ('rejected', 'Rechazado'),
        ('cancelled', 'Cancelado'),
        ('refunded', 'Devuelto'),
        ('charged_back', 'Contracargo'),
        ('in_process', 'En Proceso'),
    ]
    
    id_pago = models.CharField(max_length=100, unique=True, db_index=True)
    estado = models.CharField(max_length=20, choices=STATUS_CHOICES)
    detalle_estado = models.CharField(max_length=255, blank=True, null=True)
    tipo_pago = models.CharField(max_length=50)
    id_metodo = models.CharField(max_length=50)
    email = models.EmailField()
    valor = models.DecimalField(max_digits=12, decimal_places=2)
    fecha_pago = models.DateTimeField(auto_now_add=True)
    fecha_creacion_pago_mp = models.DateTimeField(null=True, blank=True)
    fecha_aprobacion_mp = models.DateTimeField(null=True, blank=True) 
    id_moneda = models.CharField(max_length=3, default='ARS')
    numero_cuotas = models.IntegerField(default=1, null=True, blank=True)
    monto_transaccion_mp = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True) 
    user = models.ForeignKey(get_user_model(), on_delete=models.SET_NULL, null=True, blank=True, related_name='pagos')


    def __str__(self):
        return f'Pago {self.id_pago} - {self.estado}'
