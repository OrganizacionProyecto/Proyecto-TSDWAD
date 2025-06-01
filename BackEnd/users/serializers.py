from rest_framework import serializers
from .models import CustomUser
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
import re
from rest_framework.exceptions import ValidationError

def validate_strong_password(value):
    if len(value) < 8:
        raise ValidationError("La contraseña debe tener al menos 8 caracteres.")
    if not re.search(r'[A-Z]', value):
        raise ValidationError("La contraseña debe contener al menos una letra mayúscula.")
    if not re.search(r'\d', value):
        raise ValidationError("La contraseña debe contener al menos un número.")
    return value 

class UserSerializer(serializers.ModelSerializer):
    
    password = serializers.CharField(
        write_only=True,
        required=False,  # No es obligatorio si no se quiere cambiar la contraseña
        validators=[validate_password, validate_strong_password],
        style={'input_type': 'password'}
    )

    password2 = serializers.CharField(
        write_only=True,
        required=False,  # No es obligatorio si no se quiere cambiar la contraseña
        style={'input_type': 'password'}
    )

    current_password = serializers.CharField(
        write_only=True,
        required=False,
        style={'input_type': 'password'}
    )

    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=CustomUser.objects.all(), 
                 message="Este email ya está registrado.")]
    )
    
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'direccion', 'is_staff', 'is_superuser', 'is_active', 'password', 'password2', 'current_password', 'app_role']
        extra_kwargs = {
            'password': {'write_only': True},
            'is_staff': {'read_only': True},
            'is_superuser': {'read_only': True},
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        request = self.context.get('request', None)

        # Si el usuario no está autenticado o no es admin, ocultar el campo app_role
        if not request or not request.user.is_authenticated or not (request.user.is_superuser or request.user.is_staff):
            self.fields.pop('app_role', None)    

    def create(self, validated_data):
        validated_data.pop('password2')
        request = self.context.get('request')
    
        # Solo permitir asignar un rol personalizado si el request.user es admin o staff
        if request and request.user and (request.user.is_superuser or request.user.is_staff):
            app_role = validated_data.pop('app_role', 'viewer')
        else:
            app_role = 'viewer'  # Siempre se fuerza a viewer para usuarios no admin

        direccion = validated_data.pop('direccion', 'Desconocido')

        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            password=validated_data['password'],
            app_role=app_role,
            direccion=direccion,
            is_staff=False,
            is_superuser=False,
            is_active=True,
        )
        return user

    def update(self, instance, validated_data):
        request = self.context.get('request', None)

        # Actualizar los campos de usuario
        instance.username = validated_data.get('username', instance.username)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)
        instance.direccion = validated_data.get('direccion', instance.direccion)
        instance.is_active = validated_data.get('is_active', instance.is_active)

        # Validar si se desea cambiar la contraseña
        current_password = validated_data.get('current_password', None)
        new_password = validated_data.get('password', None)
        if current_password and new_password:
            if not instance.check_password(current_password):
                raise serializers.ValidationError({"current_password": "La contraseña actual es incorrecta."})

            if new_password != validated_data.get('password2'):
                raise serializers.ValidationError({"password": "Las contraseñas no coinciden."})

            instance.set_password(new_password)

        # Validar si puede cambiar app_role
        if 'app_role' in validated_data:
            if request and request.user and (request.user.is_superuser or request.user.is_staff):
                instance.app_role = validated_data.get('app_role', instance.app_role)
            else:
                raise serializers.ValidationError({"app_role": "No tenés permisos para modificar este campo."})

        # Permitir solo a admin/staff cambiar is_staff y is_superuser
        if request and request.user and (request.user.is_superuser or request.user.is_staff):
            instance.is_staff = validated_data.get('is_staff', instance.is_staff)
            instance.is_superuser = validated_data.get('is_superuser', instance.is_superuser)

        instance.save()
        return instance

    def validate(self, attrs):
        # Validación de contraseña
        if 'password' in attrs and 'password2' in attrs:
            if attrs['password'] != attrs['password2']:
                raise serializers.ValidationError({"password": "Las contraseñas no coinciden."})

        # Validación de email en update (para evitar duplicado)
        if self.instance and 'email' in attrs:
            email = attrs['email']
            user_with_email = CustomUser.objects.filter(email=email).exclude(pk=self.instance.pk).first()
            if user_with_email:
                raise serializers.ValidationError({"email": "Este email ya está registrado por otro usuario."})

        return attrs
    
    from rest_framework import serializers

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_new_password(self, value):
        # Validación básica: al menos 8 caracteres (podés mejorar esto)
        if len(value) < 8:
            raise serializers.ValidationError("La nueva contraseña debe tener al menos 8 caracteres.")
        return value

