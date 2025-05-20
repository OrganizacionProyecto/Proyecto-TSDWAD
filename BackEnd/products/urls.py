from django.urls import path 
from .views import (
    FavoritoListCreateView,
    FavoritoDeleteView,
    ProductoListCreateView,
    ProductoDetailView,
    CategoriaListCreateView,
    CategoriaDetailView,
)

urlpatterns = [ 
    # Productos 
    path('productos/', ProductoListCreateView.as_view(), 
        name='producto-list-create'), 
    #Detalle para un producto específico    
    path('productos/<int:pk>/', ProductoDetailView.as_view(), 
        name='producto-detail'),

    # Categorías
    path('categorias/', CategoriaListCreateView.as_view(), 
        name='categoria-list-create'),
    # Detalle para una categoría específica
    path('categorias/<int:pk>/', CategoriaDetailView.as_view(), 
        name='categoria-detail'),

    # Favoritos
    path('favoritos/', FavoritoListCreateView.as_view(), name='favorito-list-create'),
    path('favoritos/<int:producto_id>/', FavoritoDeleteView.as_view(), name='favorito-delete'),
]
