from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Producto, Categoria, Favorito
from .serializers import (
    ProductoPublicSerializer,
    ProductoPrivateSerializer,
    CategoriaSerializer,
    FavoritoSerializer
)
from rest_framework.exceptions import ValidationError
from rest_framework.filters import SearchFilter

from .permissions import IsAdminOrReadOnly

class ProductoListCreateView(generics.ListCreateAPIView):
    queryset = Producto.objects.all()
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [SearchFilter]
    search_fields = ['nombre']  # Permitir la búsqueda por nombre

    def get_serializer_class(self):
        if self.request.user.is_authenticated:
            return ProductoPrivateSerializer
        return ProductoPublicSerializer
    
    def get_queryset(self):
        queryset = super().get_queryset()

        # Filtrar por id_categoria si se pasa el parámetro 'id_categoria'
        id_categoria = self.request.query_params.get('id_categoria', None)
        if id_categoria:
            queryset = queryset.filter(id_categoria=id_categoria)

        return queryset

class ProductoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Producto.objects.all()
    permission_classes = [IsAdminOrReadOnly]

    def get_serializer_class(self):
        if self.request.user.is_authenticated:
            return ProductoPrivateSerializer
        return ProductoPublicSerializer

class CategoriaListCreateView(generics.ListCreateAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [IsAdminOrReadOnly]

class CategoriaDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [IsAdminOrReadOnly]

class FavoritoListCreateView(generics.ListCreateAPIView):
    serializer_class = FavoritoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Favorito.objects.filter(usuario=self.request.user)

    def perform_create(self, serializer):
        producto_id = self.request.data.get('producto_id')

        # Verificar si el producto ya está en favoritos
        if Favorito.objects.filter(usuario=self.request.user, producto_id=producto_id).exists():
            raise ValidationError("Este producto ya está en tus favoritos.")

        # Si no está en favoritos, lo agregamos
        serializer.save(usuario=self.request.user)


class FavoritoDeleteView(generics.DestroyAPIView):
    serializer_class = FavoritoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Favorito.objects.filter(usuario=self.request.user)

    def perform_destroy(self, instance):
        if instance:
            super().perform_destroy(instance)
        else:
            raise ValidationError("Este producto no está en tus favoritos.")