from django.urls import path 
from . import views

urlpatterns = [ 
    # Productos 
    path('productos/', views.ProductoListCreateView.as_view(), 
        name='producto-list-create'), 
    #Detalle para un producto específico    
    path('productos/<int:pk>/', views.ProductoDetailView.as_view(), 
        name='producto-detail'),

    # Categorías
    path('categorias/', views.CategoriaListCreateView.as_view(), 
        name='categoria-list-create'),
    # Detalle para una categoría específica
    path('categorias/<int:pk>/', views.CategoriaDetailView.as_view(), 
        name='categoria-detail'),

    # Favoritos
    path('favoritos/', views.FavoritoListCreateView.as_view(), name='favorito-list-create'),
    # Delete un favorito específico
    path('favoritos/<int:pk>/', views.FavoritoDeleteView.as_view(), name='favorito-delete'),
]
