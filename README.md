# Proyecto-TSDWAD

---------

# PROGRAMADOR WEB

# INTEGRANTES Grupo Code Masters - Com1:

JoaquinCamino12 - Camino Alonso Joaquin Nicolas - joaquincamino09@gmail.com [Backend] [Scrum Master]

mrMartinOk - Nicolás Emanuel Martin - nicolas.emanuel.martin@gmail.com [Backend]

Nico2384 - Figueroa Damián Nicolás - damiannicolasfigueroa2024@gmail.com [Backend]

19021976maria - María Coronel - coronelsuarezmaria@gmail.com [Backend]

waltercamino - Camino Walter Daniel - waltercamino@hotmail.com [Frontend]

CeCogot - Cecilia Edith Cogot - ceciliacogot@gmail.com [Frontend]

xNachooox2442 - Gabriel Ignacio Bonzon - nachobonzon1@gmail.com [Frontend]

AntonellaAc - Antonella Acosta Gómez - antonellacosta_93@hotmail.com [Frontend]

sinistri - Sebastian Balestri - balestri@gmail.com [Frontend]

-----
-----

# Proyecto (Rellenar más)

## Características Principales
El objetivo principal de este documento es proporcionar una descripción completa y detallada del proyecto, dirigida a inspección por parte de profesores del ISPC, advirtiendo que el presente proyecto se trata de una tienda en línea especializada en la venta de productos naturales destinados al consumo. Contamos con un diseño integrado por clases que conectan tanto al administrador como al usuario con la base de datos para distintas finalidades ya sea de quien acceda. Entonces, el proyecto tiene como finalidad ofrecer a clientes, mediante una web, una plataforma intuitiva y segura para adquirir una amplia variedad de productos naturales, como alimentos orgánicos, suplementos dietéticos, productos de cuidado personal y más; y al administrador la seguridad en la recolección de datos.
```bash
Este proyecto se trata de una Pagina Web, la cual es una tienda virtual de la dietetica llamada Aymara ha sido diseñada para ser intuitiva y fácil de usar, permitiendo a los clientes navegar por el catálogo, realizar compras y gestionar sus pedidos de manera sencilla. Cuenta con la posibilidad de publicar un amplio catálogo de productos naturales cuidadosamente seleccionados para satisfacer las necesidades y preferencias de sus clientes.Tanto los clientes como el administrador de la tienda pueden confiar en que sus datos personales y transacciones están protegidos mediante protocolos de seguridad avanzados.El panel de administración de Aymara proporciona herramientas poderosas para gestionar el catálogo de productos, procesar pedidos, realizar análisis de ventas y mucho más, todo ello de forma rápida y eficiente.
```
## Tecnologías Utilizadas
 El desarrollo de Aymara se ha realizado utilizando una combinación de tecnologías de vanguardia tanto en el frontend como en el backend:
```bash
### Backend

- **Python y Django:** El backend de Aymara ha sido desarrollado utilizando el lenguaje de programación Python y el framework web Django, proporcionando una base sólida y escalable para la aplicación.

### Frontend

- **HTML, CSS y JavaScript:** La interfaz de usuario de Aymara se ha construido incluyendo HTML para la estructura, CSS para el diseño y JavaScript para la interactividad.

- **Bootstrap:** Se ha utilizado para facilitar el diseño responsivo y la creación de interfaces de usuario atractivas y consistentes en diferentes dispositivos y tamaños de pantalla.

- **Angular:** Además, se ha integrado Angular para la creación de componentes dinámicos y la gestión eficiente de la lógica del frontend.

Con estas tecnologías, Aymara ofrece una experiencia de compra adaptada a las necesidades y exigencias de los clientes que buscan una vida mas saludable.

```
-----
Requisitos

* Django 4.2
* Python 11
* Angular 17

# Instalación 
Para instalar y ejecutar este proyecto con Django APIRest localmente, sigue estos pasos:

Clona este repositorio en tu máquina local:
```bash
git clone https://github.com/OrganizacionProyecto/Proyecto-TSDWAD.git
```
Ve al directorio del proyecto:
```bash
cd BackEnd
```
Instala las dependencias necesarias. Asegúrate de tener Python y pip instalados. Luego, ejecuta:
```bash
pip install -r requirements.txt
```
Creacion de base de datos completa:
Para utilizar la BD con los datos de CustomUser, categoria y producto ya incluidos en las tablas, ver el archivo "Guia de importacion Base de datos.txt"
Este se encuentra en BackEnd/BD/

```

Configura tu entorno de desarrollo:
- Configura la base de datos en el archivo settings.py de la carpeta Aymara según tus preferencias.
- Realiza las migraciones (En caso de no usar el script "aymara_api_rest.sql"):
```bash
python manage.py makemigrations
python manage.py migrate
```
Para levantar el proyecto desde angular:

Instalar Node.js y npm
Angular necesita Node.js y npm (Node Package Manager) para funcionar.

Descargar Node.js: Ve a la página oficial de Node.js https://nodejs.org/ y descarga la versión LTS (Long Term Support).
Instalar Node.js: Sigue las instrucciones del instalador.
Después de la instalación, verifica la instalación abriendo una terminal y escribiendo:
node -v
npm -v
Deberías ver los números de versión de Node.js y npm.

 Instalar Angular CLI
Angular CLI (Command Line Interface) es una herramienta para crear y manejar proyectos Angular.

En la terminal, ejecuta:
npm install -g @angular/cli@17

Verifica la instalación de Angular CLI:
ng version

para levantar el proyecto simplemente se ejecuta 
ng serve


# Uso (Rellenar Front)

Para ejecutar el proyecto Django APIRest, sigue estos pasos:

Ejecuta el servidor Django:
```bash
python manage.py runserver
```
Abre tu navegador web y ve a la siguiente dirección:

```bash
http://localhost:8000/
```
Ahora deberías poder ver y usar Django APIRest 


# Casos de Uso

1-Registro de Usuario:

Actor Principal: Cliente.
Descripción: Un cliente nuevo desea registrarse en la plataforma para poder realizar compras en la tienda en línea.
Pasos:
El cliente accede al sitio web de la tienda en línea.
Selecciona la opción de registro.
Completa el formulario de registro con su información personal (user, email, password, nombre y apellido).
Envía el formulario y espera la confirmación de registro.

2-Agregando Productos al Carrito:

Actor Principal: Cliente.
Descripción: Un cliente ha encontrado uno o varios productos que le interesan y desea agregarlos al carrito de compras.
Pasos:
El cliente navega por las diferentes categorías de productos o utiliza la función de búsqueda para encontrar los productos deseados.
Para cada producto seleccionado, hace clic en el botón "Agregar al carrito".
Verifica que los productos se hayan agregado correctamente al carrito

3-Realizar un Pedido:

Actor Principal: Cliente.
Descripción: Un cliente ha seleccionado los productos que desea comprar y está listo para realizar el pedido.
Pasos:
El cliente accede al carrito de compras, donde puede revisar los productos seleccionados y sus cantidades.
Si es necesario, realiza ajustes en el carrito (agregar, eliminar o modificar cantidades).
Procede al proceso de pago, proporcionando la información de envío y facturación requerida.
Confirma el pedido y realiza el pago.

4-Gestión de Productos por parte del Administrador:

Actor Principal: Administrador.
Descripción: El administrador de la tienda necesita agregar, editar o eliminar productos del catálogo.
Pasos:
El administrador accede al panel de administración de la tienda en línea.
Navega hasta la sección de gestión de productos.
Agrega un nuevo producto completando un formulario con la información relevante (nombre, descripción, precio, etc.).
Edita la información de un producto existente si es necesario (por ejemplo, para actualizar el precio o la descripción).
Elimina un producto del catálogo si ya no está disponible o es discontinuado.

```bash

```

# Backend (Rellenar)
```bash
La estructura Backend del proyecto se compone de las siguientes carpetas y archivos:

BackEnd:
    Aymara: (Carpeta que contiene )
	__pycache__: (Carpeta   
		__init__.cpython-310.pyc
		__init__.cpython-311.pyc
		settings.cpython-310.pyc
		settings.cpython-311.pyc
		urls.cpython-310.pyc
		urls.cpython-311.pyc
		wsgi.cpython-310.pyc
		wsgi.cpython-311.pyc
	__init__.py
	asgi.py
	settings.py
	urls.py
	wsgi.py     
    AymaraAPP: 
	__pycache__:
		__init__.cpython-310.pyc
		__init__.cpython-311.pyc
		admin.cpython-310.pyc
		admin.cpython-311.pyc
		apps.cpython-310.pyc
		apps.cpython-311.pyc
		models.cpython-310.pyc
		models.cpython-311.pyc
		serializers.cpython-310.pyc
		urls.cpython-310.pyc
		views.cpython-310.pyc
	migrations:
		__pycache__:
			0001_initial.cpython-310.pyc
			0001_initial.cpython-311.pyc
			0002_metodo_pago_usuario_producto_pedido_carrito.cpython-310.pyc
			0003_customuser.cpython-310.pyc
			__init__.cpython-310.pyc
			__init__.cpython-311.pyc
		__init__.py
	admin.py
	apps.py
	models.py
	permissions.py
	serializers.py
	signals.py
	tests.py
	urls.py
	views.py
    BD (Base de datos y Diagramas): 
	Guia de importacion Base de datos.txt
	aymara_api_rest.sql
	bd aymaraapp.png
    db.sqlite3
    manage.py
    requirements.txt
```

# Frontend
```bash
La estructura frontend del proyecto se compone de las siguientes carpetas y archivos:
Frontend:
    .vscode: 
        settings.json
    Imag_contacto: (Carpeta que contiene las imagenes de redes sociales y de contacto)
        correo.png
        Face.webp
        inst.png
        tw.png
        wsp.png
    Imag_productos: (Carpeta que contiene las imagenes de productos)
        aceite_coco.jpeg
        cafe_verde.jpeg
        garcimax.jpeg
    Logos: (Logo de la marca)
        icono1.ico
        logoAymara.png
    contacto.html (Pagina de contacto)
    index.html (Landing page)
    productos.html (Pagina de productos)
    ingresar.html (Pagina de registro e inicio de sesion)
    eventos.js
    Proyecto.code-workspace
    style.css
    fondo.jpeg
```

#Base de datos
La estructura para la Base de datos del proyecto se compone de las siguientes carpetas y archivos:

    BD (Carpeta que contiene el Diseño Logico, guia de instalacion y script de la BD:
	Guia de importacion Base de datos.txt
	BD_Aymara_Logico.png
	aymara_api_rest.sql






