# Aymara - Ecommerce

Este proyecto es un ecommerce para una tienda dietética llamada **Aymara**, desarrollado con **Django** en el backend y **Angular** en el frontend. La aplicación permite realizar compras en línea, gestionar productos y categorías, y administrar pedidos de manera eficiente.

## 🚀 **Funcionalidades Principales**

* Registro de usuarios con validaciones y autenticación.
* Edición de perfil y eliminación de cuenta.
* Listado de productos con búsqueda y filtrado por categorías.
* Carrito de compras funcional con actualización de cantidades y eliminación de productos.
* Pasarela de pago con tarjetas o efectivo.
* Historial de pedidos con opción de descarga de facturas en PDF.

## 🛠️ **Tecnologías Utilizadas**

* Backend: Django, Django REST Framework, SQL
* Frontend: Angular, TypeScript, HTML, CSS
* Base de datos: SQLite (local), PostgreSQL (producción en aymara.pythonanywhere.com)
* Autenticación: JWT

## 🌐 **Entornos de Desarrollo y Producción**

* Local: Backend ejecutado localmente con SQLite.
* Producción: Backend desplegado en [aymara.pythonanywhere.com](https://aymara.pythonanywhere.com), con frontend conectado a dicho backend.
* Frontend desplegado en [aymara.netlify.app](https://aymara.netlify.app)


## 📦 **Instalación y Configuración**

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/OrganizacionProyecto/Proyecto-TSDWAD.git
   cd Proyecto-TSDWAD
   ```

2. Configurar el backend:

   ```bash
   cd backend
   python -m venv env
   source env/bin/activate
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver
   ```

3. Configurar el frontend:

   ```bash
   cd ../frontend
   npm install
   ng serve
   ```

4. Acceder a la aplicación en:

   * **Backend (local):** [http://127.0.0.1:8000](http://127.0.0.1:8000)
   * **Frontend (local):** [http://localhost:4200](http://localhost:4200)

## ✅ **Casos de Uso Clave**

* Usuario se registra, inicia sesión, navega productos, agrega al carrito y realiza una compra.
* Administrador gestiona categorías y productos mediante CRUDs completos.
* Usuario visualiza su historial de pedidos y descarga facturas en PDF.

