from django.urls import path
from .views import ProcesoPagoView

urlpatterns = [
    path('procesos_de_pago/', ProcesoPagoView.as_view(), name='procesos_de_pago'),
]