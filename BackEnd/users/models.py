from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth.base_user import BaseUserManager

# Manager personalizado
class CustomUserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('El email es obligatorio')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('El superusuario debe tener is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('El superusuario debe tener is_superuser=True.')

        return self.create_user(email, password, **extra_fields)


# Modelo CustomUser
class CustomUser(AbstractUser):
    email = models.EmailField(max_length=150, unique=True)
    direccion = models.CharField(max_length=200, blank=False, default="Desconocido")

    ROLES = (
        ('admin_app', 'Administrador de la Aplicación'),
        ('editor', 'Editor'),
        ('viewer', 'Visualizador'),
        # Agrega más roles según tus necesidades
    )
    app_role = models.CharField(max_length=20, choices=ROLES, default='viewer')

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "first_name", "last_name"]

    # Asociamos el CustomUserManager al modelo
    objects = CustomUserManager()
    
    def is_app_admin(self):
        return self.app_role == 'admin_app'

    def is_app_editor(self):
        return self.app_role == 'editor'

    def is_app_viewer(self):
        return self.app_role == 'viewer'

    def has_app_role(self, role_name):
        return self.app_role == role_name

    def can_edit(self):
        return self.is_superuser or self.is_staff or self.app_role == 'editor'

    def can_view(self):
        return True # Todos los usuarios registrados pueden ver (ejemplo)

    def can_manage_users(self):
        return self.is_superuser or self.is_staff

    def __str__(self):
        return self.username