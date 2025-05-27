from django.db import models
from django.conf import settings 
from decimal import Decimal

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
    
    payment_id = models.CharField(max_length=100, unique=True, db_index=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    status_detail = models.CharField(max_length=255, blank=True, null=True)
    payment_type_id = models.CharField(max_length=50)
    method_id = models.CharField(max_length=50)
    email = models.EmailField()
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    mp_created_at = models.DateTimeField(null=True, blank=True)
    mp_approved_at = models.DateTimeField(null=True, blank=True) 
    currency_id = models.CharField(max_length=3, default='ARS')
    installments = models.IntegerField(default=1, null=True)
    external_reference = models.CharField(max_length=255, blank=True, null=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='pagos')

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Payment'
        verbose_name_plural = 'Payments'
        db_table = 'payment' 

    def __str__(self):
        return f'Pago {self.payment_id} - {self.status}'
