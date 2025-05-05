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

Nacho-Bonzon2442 - Gabriel Ignacio Bonzon - nachobonzon1@gmail.com [Frontend]

AntonellaAc - Antonella Acosta Gómez - antonellacosta_93@hotmail.com [Frontend]

-----
-----

# Proyecto 

## Características Principales
El objetivo principal de este documento es proporcionar una descripción completa y detallada del proyecto, dirigida a inspección por parte de profesores del ISPC, advirtiendo que el presente proyecto se trata de una tienda en línea especializada en la venta de productos naturales destinados al consumo. Contamos con un diseño integrado por clases que conectan tanto al administrador como al usuario con la base de datos para distintas finalidades ya sea de quien acceda. Entonces, el proyecto tiene como finalidad ofrecer a clientes, mediante una web, una plataforma intuitiva y segura para adquirir una amplia variedad de productos naturales, como alimentos orgánicos, suplementos dietéticos, productos de cuidado personal y más; y al administrador la seguridad en la recolección de datos.
Este proyecto se trata de una Pagina Web, la cual es una tienda virtual de la dietetica llamada Aymara ha sido diseñada para ser intuitiva y fácil de usar, permitiendo a los clientes navegar por el catálogo, realizar compras y gestionar sus pedidos de manera sencilla. Cuenta con la posibilidad de publicar un amplio catálogo de productos naturales cuidadosamente seleccionados para satisfacer las necesidades y preferencias de sus clientes.Tanto los clientes como el administrador de la tienda pueden confiar en que sus datos personales y transacciones están protegidos mediante protocolos de seguridad avanzados.El panel de administración de Aymara proporciona herramientas poderosas para gestionar el catálogo de productos, procesar pedidos, realizar análisis de ventas y mucho más, todo ello de forma rápida y eficiente.

Tecnologías Utilizadas

**Backend**
Python: Lenguaje de programación de alto nivel, interpretado y multipropósito.
Django: Framework de desarrollo web de alto nivel, basado en Python.

La estructura Backend del proyecto se compone de las siguientes carpetas y archivos:
- BackEnd: Carpeta principal que contiene el backend de Django.
  - Aymara: Carpeta que contiene los archivos del backend de Django.
    - __pycache__ 
	- asgi.py
	- settings.py
	- urls.py
	- wsgi.py
  - AymaraAPP: Carpeta que contiene las aplicaciones específicas del proyecto.
    - __pycache__
	- migrations
	- __init__.py
	- admin.py
	- apps.py
	- models.py
	- permissions.py
	- serializers.py
	- signals.py
	- tests.py
	- urls.py
	- views.py	
  - BD: Carpeta que contiene el script de la base de datos y su documentación.
    - Guia de importacion Base de datos.txt
  	- BD_Aymara_Logico.png
  	- aymara_api_rest.sql
  - db.sqlite3
  - manage.py
  - requirements.txt

**Requisitos**
- Django 4.2
- Python 11

**Instalación**
Para instalar y ejecutar este proyecto con Django API Rest localmente, sigue estos pasos:
1. Clona este repositorio en tu máquina local:
   git clone https://github.com/OrganizacionProyecto/Proyecto-TSDWAD.git
2. Ve al directorio del proyecto:
   cd BackEnd
3. Crea y activa un entorno virtual:
   - En sistemas Unix o MacOS:
     - Crea el entorno virtual:	
	   python3 -m venv env
   	 - Activa el entorno virtual:
	   source env/bin/activate
   - En sistemas Windows:
     - Crea el entorno virtual:
	   python -m venv env
	 - Activa el entorno virtual:
	   .\env\Scripts\activate
4. Instala las dependencias necesarias:
   pip install -r requirements.txt
   - Django: Framework de desarrollo web de alto nivel basado en Python.
   - djangorestframework: Un potente y flexible kit de herramientas para construir API web.
   - coreapi: Una implementación de cliente y servidor para el lenguaje de descripción de API Core API.
   - django-cors-headers: Una biblioteca Django que agrega encabezados CORS a las respuestas HTTP.
   - asgiref: Un paquete para manejar múltiples protocolos de red en Python.
   - certifi: Un paquete Python que proporciona certificados raíz para verificar la autenticidad de conexiones HTTPS.
   - idna: Un paquete Python para la manipulación de nombres de dominio internacionales en aplicaciones de red.
   - itypes: Un conjunto de tipos abstractos de datos inmutables para Python.
   - Jinja2: Un motor de plantillas moderno y de diseño para Python.
   - MarkupSafe: Una biblioteca de utilidades de Python para trabajar con texto seguro.
   - mysqlclient: Un cliente Python para acceder a bases de datos MySQL/MariaDB.
   - requests: Una biblioteca HTTP para Python, permite enviar solicitudes HTTP fácilmente.
   - sqlparse: Un analizador de SQL para Python.
   - uritemplate: Implementación de Python de la especificación URI Template (RFC 6570).
   - urllib3: Una biblioteca HTTP para Python, con una API amigable y segura para el usuario.
5. Creacion de base de datos completa: Para utilizar la BD con los datos de CustomUser,categoria y producto ya incluidos en las tablas, ver el archivo "Guia de importacion Base de datos.txt" Este se encuentra en BackEnd/BD/    
6. Realiza las migraciones:
   python manage.py makemigrations
   python manage.py migrate
7. Crea un superusuario para acceder al panel de administración:
   python manage.py createsuperuser
   - Sigue las instrucciones en pantalla para proporcionar un nombre de usuario, una dirección de correo electrónico y una contraseña.

**Uso**
Para ejecutar el proyecto Django API Rest, sigue estos pasos:
1. Ejecuta el servidor Django:
   python manage.py runserver
2. Abre tu navegador web y ve a la siguiente dirección:
   http://localhost:8000/
   Ahora deberías poder ver y usar Django API Rest.
3. Una ves ejecutado el servidor, acceder a http://localhost:8000/docs/ para acceder a la documentacion de la api.    


### Frontend

- **HTML, CSS y JavaScript:** La interfaz de usuario de Aymara se ha construido incluyendo HTML para la estructura, CSS para el diseño y JavaScript para la interactividad.

- **Bootstrap:** Se ha utilizado para facilitar el diseño responsivo y la creación de interfaces de usuario atractivas y consistentes en diferentes dispositivos y tamaños de pantalla.

- **Angular:** Además, se ha integrado Angular para la creación de componentes dinámicos y la gestión eficiente de la lógica del frontend.

Con estas tecnologías, Aymara ofrece una experiencia de compra adaptada a las necesidades y exigencias de los clientes que buscan una vida mas saludable.

Requisitos
* Angular 17

La estructura frontend del proyecto se compone de las siguientes carpetas y archivos:
Frontend:
    .vscode: 
    src
	   pages
	        auth
			    login/login
				    login.component.css
					login.component.html
					login.component.ts
				registro/registro
				    registro.component.css
					registro.component.html
					registro.component.ts	
			carrito
			    carrito.component.css
				carrito.component.html
				carrito.component.ts	
		    contacto
			    contacto.component.css
				contacto.component.html
				contacto.component.ts
			dashboard/dashboard
			    dashboard.component.css
				dashboard.component.html
				dashboard.component.ts
			home
			    home.component.css
				home.component.html
				home.component.ts
			nosotros
			    nosotros.component.css
				nosotros.component.html
				nosotros.component.ts
			productos
			    productos.component.css
				productos.component.html
				productos.component.ts
			services
			    auth.guard.ts		
				auth.service.ts
		shared
		    footer
			    footer.component.css
				footer.component.html
				footer.component.ts
			header
			     header.component.css
				 header.component.html
				 header.component.ts
			app.component.css
			app.component.html
			app.component.ts
			app.config.ts
			app.routes.ts
...........
      services
	    api.service.ts
		carrito.service.ts
		productos.service.ts
	favicon.ico
	index.html
	main.ts
	styles.css				

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
