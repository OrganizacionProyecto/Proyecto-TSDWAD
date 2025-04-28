from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password
from django.core.validators import validate_email
from .models import User

User = get_user_model()

class CustomUserTests(TestCase):
    def setUp(self):
        self.user_data = {
            'email': 'test@example.com',
            'password': 'TestPassword123',
            'username': 'testuser',
            'first_name': 'Test',
            'last_name': 'User'
        }

    def test_crear_usuario(self):
        user = User.objects.create_user(**self.user_data)
        self.assertEqual(user.email, self.user_data['email'])
        self.assertEqual(user.username, self.user_data['username'])
        self.assertTrue(user.check_password(self.user_data['password']))
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)

    def test_crear_superusuario(self):
        admin_data = {
            'email': 'admin@example.com',
            'password': 'AdminPassword123',
            'username': 'admin',
            'first_name': 'Admin',
            'last_name': 'User'
        }
        admin = User.objects.create_superuser(**admin_data)
        self.assertEqual(admin.email, admin_data['email'])
        self.assertEqual(admin.username, admin_data['username'])
        self.assertTrue(admin.check_password(admin_data['password']))
        self.assertTrue(admin.is_staff)
        self.assertTrue(admin.is_superuser)

    def test_validacion_password(self):
        with self.assertRaises(ValidationError):
            validate_password('short')

    def test_validacion_email(self):
        with self.assertRaises(ValidationError):
            validate_email('invalid-email')

class UserViewSetTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.admin = User.objects.create_superuser(
            username='admin',
            email='admin@example.com',
            password='admin123',
            first_name='Admin',
            last_name='User'
        )
        self.usuario = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123',
            first_name='Test',
            last_name='User'
        )
        self.otro_usuario = User.objects.create_user(
            username='otheruser',
            email='other@example.com',
            password='other123',
            first_name='Other',
            last_name='User'
        )

    def test_crear_usuario_admin(self):
        self.client.force_authenticate(user=self.admin)
        response = self.client.post('/api/users/', {
            'username': 'newuser',
            'email': 'new@example.com',
            'password': 'newpass123',
            'first_name': 'New',
            'last_name': 'User'
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 4)

    def test_crear_usuario_regular_sin_permiso(self):
        self.client.force_authenticate(user=self.usuario)
        response = self.client.post('/api/users/', {
            'username': 'newuser',
            'email': 'new@example.com',
            'password': 'newpass123',
            'first_name': 'New',
            'last_name': 'User'
        })
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(User.objects.count(), 3)

    def test_listar_usuarios_admin(self):
        self.client.force_authenticate(user=self.admin)
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 3)

    def test_listar_usuarios_regular_sin_permiso(self):
        self.client.force_authenticate(user=self.usuario)
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_actualizar_usuario_propio(self):
        self.client.force_authenticate(user=self.usuario)
        response = self.client.patch(f'/api/users/{self.usuario.id}/', {
            'first_name': 'Test',
            'last_name': 'User'
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.usuario.refresh_from_db()
        self.assertEqual(self.usuario.first_name, 'Test')
        self.assertEqual(self.usuario.last_name, 'User')

    def test_actualizar_usuario_otro_sin_permiso(self):
        self.client.force_authenticate(user=self.usuario)
        response = self.client.patch(f'/api/users/{self.otro_usuario.id}/', {
            'first_name': 'Other',
            'last_name': 'User'
        })
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.otro_usuario.refresh_from_db()
        self.assertEqual(self.otro_usuario.first_name, 'Other')
        self.assertEqual(self.otro_usuario.last_name, 'User')

    def test_cambiar_password(self):
        self.client.force_authenticate(user=self.usuario)
        response = self.client.post(f'/api/users/{self.usuario.id}/change_password/', {
            'old_password': 'testpass123',
            'new_password': 'newpass123'
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.usuario.refresh_from_db()
        self.assertTrue(self.usuario.check_password('newpass123'))
