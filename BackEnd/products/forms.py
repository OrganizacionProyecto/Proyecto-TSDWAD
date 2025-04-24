from django import forms

class FormularioPago(forms.Form):
    numero_tarjeta = forms.CharField(max_length=16, min_length=16, required=True, widget=forms.TextInput(attrs={'placeholder': 'Número de tarjeta'}))
    fecha_expiracion = forms.CharField(max_length=5, required=True, widget=forms.TextInput(attrs={'placeholder': 'MM/AA'}))
    codigo_seguridad = forms.CharField(max_length=3, min_length=3, required=True, widget=forms.TextInput(attrs={'placeholder': 'Código de seguridad'}))
