# WorkOutGym 💪🏋️‍♀️

¡Bienvenido a WorkOutGym, la aplicación definitiva para gestionar tus entrenamientos en el gimnasio! 💪🏋️‍♀️

## Descripción 📝

Implementar una API que permita publicar ejercicios para la gestión de los mismos en un gimnasio.

**Hemos dado vida a un emocionante proyecto basado en Node.js**, donde hemos utilizado el potente framework Express.js como columna vertebral para crear una sólida infraestructura de aplicaciones web. Este proyecto es un testimonio del poder y la versatilidad de la tecnología Node.js.

**Nuestra base de datos MySQL** actúa como el cofre seguro donde almacenamos y gestionamos los datos esenciales de nuestra aplicación. Cada bit de información se cuida y se accede con precisión gracias a esta robusta base de datos.

**Para probar y validar nuestras rutas y endpoints**, hemos confiado en la confiable herramienta Postman. Con su ayuda, hemos garantizado que nuestras API funcionen sin problemas y cumplan con las expectativas.

**El código fuente de este proyecto ha cobrado vida en Visual Studio Code**, un entorno de desarrollo de primer nivel que ha facilitado la escritura, la depuración y la administración de nuestro código de manera eficiente.

**Hemos organizado meticulosamente nuestras dependencias** utilizando herramientas de gestión de paquetes como npm o Yarn, asegurándonos de que todas las bibliotecas y módulos necesarios estén disponibles y sean fácilmente mantenibles.

**Nuestro lenguaje de programación de elección es el elegante JavaScript**, que nos ha permitido expresar nuestras ideas y lógica de manera clara y concisa, llevando a cabo todas las operaciones de este proyecto con una fluidez asombrosa.

**Puedes explorar este apasionante proyecto en GitHub**, donde reside en su esplendor, disponible para que el mundo lo descubra. Visita nuestro repositorio en [GitHub](https://github.com/Susanistikis/Proyecto02) para sumergirte en el código, contribuir y seguir su evolución.

 ¡Esperamos que lo disfrutes tanto como nosotros disfrutamos creándolo!

## Usuarios Cliente 👥

Pueden registrarse o hacer login en la aplicación, explorar la lista de ejercicios disponibles y ver sus detalles como nombre, descripción o grupo muscular, también pueden marcar sus ejercicios como favoritos para verlos después o filtrar ejercicios según necesiten.

-   Pueden ver el listado de los ejercicios y entrar en el detalle de los mismos.
-   Podrán filtrarlos por algunas características (por ejemplo, tipología o grupo muscular).
-   Podrán poner o quitar un like a un ejercicio.

## Administrador 👤

-   Todas las funcionalidades de usuario cliente.
-   Será el único capaz de añadir un nuevo ejercicio con los siguientes detalles:
    -   Nombre
    -   Descripción
    -   Foto
    -   Tipología
    -   Grupo muscular.

## Opcional 🌟

-   Los usuarios y trabajadores pueden seleccionar algunos ejercicios para ponerlos entre los favoritos, útil para poder organizar una clase de entrenamiento.

### Bases de Datos 🗄️

#### Favorites

| Campo       | Tipo        | Descripción                                    |
| ----------- | ----------- | ---------------------------------------------- |
| Id          | TINYINT(50) | Identificador único del favorito               |
| user_id     | INT         | Identificador del usuario que puso el favorito |
| exercise_id | INT         | Identificador del ejercicio favorito           |
| created_at  | TIMESTAMP   | Fecha y hora de creación del favorito          |

#### Ejercicios

| Campo       | Tipo         | Descripción                             |
| ----------- | ------------ | --------------------------------------- |
| Id          | TINYINT(50)  | Identificador único del ejercicio       |
| Name        | VARCHAR(50)  | Nombre del ejercicio que realiza        |
| photoName   | VARCHAR(100) | Que describa él ejercicio               |
| musclegroup | VARCHAR(100) | Grupo muscular que trabaja el ejercicio |
| description | TEXT         | Descripción de ejercicio                |

#### Usuarios

| Campo     | Tipo         | Descripción                                     |
| --------- | ------------ | ----------------------------------------------- |
| id        | INT          | Identificador único del usuario                 |
| email     | VARCHAR(100) | Correo electrónico del usuario                  |
| Name      | VARCHAR(50)  | Nombre del usuario                              |
| lastName  | VARCHAR(100) | Apellidos del usuario                           |
| birthDate | DATETIME     | Fecha de nacimiento del usuario                 |
| photo     | CHAR(100)    | Foto de usuario                                 |
| userRole  | ENUM         | Rol del usuario ("Cliente") o ("Administrador") |

## Para arrancar nuestro proyecto de Node.js es necesario:

- Clona el repositorio desde GitHub y navega al directorio del proyecto en tu terminal.
- Configura la base de datos MySQL y crea la base de datos.
- Actualiza las credenciales en el archivo .env segun tus necesidades. (LocalHost, port...)
- Usar el comando en el terminal npm install, para instalar todas las dependencias necesarias.
- Arrancar el servidor con npm run dev.

## Extensiones NPM Usadas 📦

### Dependencias

### Dependencias de desarrollo

-   "eslint": "^8.45.0",
-   "fetch": "^1.1.0",
-   "nodemon": "^3.0.1",
-   "safe-buffer": "^5.2.1",
-   "safer-buffer": "^2.1.2"

### Dependencias

-   "bcrypt": "^5.1.0",
-   "cors": "^2.8.5",
-   "dotenv": "^16.3.1",
-   "express": "^4.18.2",
-   "express-fileupload": "^1.4.0",
-   "jsonwebtoken": "^9.0.1",
-   "morgan": "^1.10.0",
-   "mysql2": "^3.5.2",
-   "prettier": "^1.1.0",
-   "sharp": "^0.32.4",
-   "joi": "^17.9.2",
-   "uuid": "^9.0.0"

## Archivo principal

-   `app.js`

### CORS 🌐

Si deseas mostrar imágenes almacenadas en el directorio "uploads/fotos", puedes utilizar la siguiente URL como ejemplo para acceder a ellas:



http://localhost:8000/example.jpg" 


Recuerda reemplazar "example.jpg" con el nombre real de la imagen que deseas mostrar. Esto permitirá que las imágenes se carguen correctamente desde el directorio especificado en tu servidor.

### **Endpoints de Usuarios** 👥

-   **POST** - [/users/register] - Crea un nuevo usuario pidiendo todos los datos incluida la foto (body formData).
-   **POST** - [/users/login] - Logea a un usuario retornando un token, email, avatar y rol.
-   **GET** - [/users] - devuelve los datos del usuario del token (token)

### **Endpoints ejercicios** 🏋🏻‍♂️

-   **POST** - [/exercises] - Permite al administrador subir un ejercicio con foto (body formData). (TOKEN y rol admin)

-   **DELETE** - [/exercises/:exerciseId] - Permite al administrador eliminar un ejercicio (TOKEN y rol admin)

-   **GET** - [/exercises/] - devuelve todos los ejercicios (siempre devolvemos con ORDER BY nobre ejercicio)
-   [/exercises?search="sentadillas"] - devuelve todos los ejercicio que tengan en el nombre o desc "sentadillas"
-   [/exercises?grupo="inferior"] - devuelve todos los ejercicio del grupo inferior
-   [/exercises?grupo="inferior"&favoritos="no"] - devuelve todos los ejercicio del grupo inferior que no tengo en favoritos
-   [/exercises?favoritos="no"] - devuelve todos los ejercicio que no tengo en favoritos
    Permite buscar ejercicios por diferentes métodos de filtrado o mostralos todos. (TOKEN)

-   **GET** - [/exercises/favorite] - Retornar el listado del los ejercicios favoritos del usuario de token (TOKEN)

-   **POST** - [/exercises/:exerciseId] - Permite a un usuario dar o quitar de favoritos a un ejercicio (tenerlo o no en preferidos). (TOKEN)

-   **GET** - [/exercises/:exerciseId] - Retornar información de un ejercicio (incluida la description).
