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

# Proyecto 

## Características Principales
El objetivo principal de este documento es proporcionar una descripción completa y detallada del proyecto, dirigida a inspección por parte de profesores del ISPC, advirtiendo que el presente proyecto se trata de una tienda en línea especializada en la venta de productos naturales destinados al consumo. Contamos con un diseño integrado por clases que conectan tanto al administrador como al usuario con la base de datos para distintas finalidades ya sea de quien acceda. Entonces, el proyecto tiene como finalidad ofrecer a clientes, mediante una web, una plataforma intuitiva y segura para adquirir una amplia variedad de productos naturales, como alimentos orgánicos, suplementos dietéticos, productos de cuidado personal y más; y al administrador la seguridad en la recolección de datos.
Este proyecto se trata de una Pagina Web, la cual es una tienda virtual de la dietetica llamada Aymara ha sido diseñada para ser intuitiva y fácil de usar, permitiendo a los clientes navegar por el catálogo, realizar compras y gestionar sus pedidos de manera sencilla. Cuenta con la posibilidad de publicar un amplio catálogo de productos naturales cuidadosamente seleccionados para satisfacer las necesidades y preferencias de sus clientes.Tanto los clientes como el administrador de la tienda pueden confiar en que sus datos personales y transacciones están protegidos mediante protocolos de seguridad avanzados.El panel de administración de Aymara proporciona herramientas poderosas para gestionar el catálogo de productos, procesar pedidos, realizar análisis de ventas y mucho más, todo ello de forma rápida y eficiente.
```
## Tecnologías Utilizadas
 El desarrollo de Aymara se ha realizado utilizando una combinación de tecnologías de vanguardia tanto en el frontend como en el backend:
```bash
### Backend


### Frontend

- **HTML, CSS y JavaScript:** La interfaz de usuario de Aymara se ha construido incluyendo HTML para la estructura, CSS para el diseño y JavaScript para la interactividad.

- **Bootstrap:** Se ha utilizado para facilitar el diseño responsivo y la creación de interfaces de usuario atractivas y consistentes en diferentes dispositivos y tamaños de pantalla.

- **Angular:** Además, se ha integrado Angular para la creación de componentes dinámicos y la gestión eficiente de la lógica del frontend.

Con estas tecnologías, Aymara ofrece una experiencia de compra adaptada a las necesidades y exigencias de los clientes que buscan una vida mas saludable.

* Angular 17

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
