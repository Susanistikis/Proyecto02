# Proyecto02

Aplicación para organizar internamente los entrenamientos en un gimnasio.

DESCRIPCIÓN
Implementar una API que permita publicar ejercicios para la gestión de los mismos en un
gimnasio. Los usuarios serán los trabajadores del gimnasio.

USUARIOS ANÓNIMOS
Pueden ver la landing de la plataforma donde podrán registrarse o hacer login.

ADMINISTRADOR
● Será el único a poder añadir un nuevo ejercicio:
○ nombre
○ descripción
○ foto
○ tipología
○ grupo muscular
○ ...
● Puede modificar o eliminar un entrenamiento

USUARIOS Y TRABAJADORES

- Puede ver el listado del los ejercicios y entrar en el detalle de los mismos.
- Podrá filtrarlos por algunas características (ej: tipología o grupo muscular).
- Podrá poner o quitar un like a un ejercicio.

OPCIONAL
● Los usuarios y trabajadores pueden seleccionar algunos ejercicios para ponerlos
entre los favoritos, útil para poder organizar una clase de entrenamiento.

● SEMÁFORO DE FLUJO DE TRABAJO
En proceso 🟡
Errores por corregir 🔴
Terminado 🟢

● BASES DE DATOS

### Ejercicios

| Campo       | Tipo         | Descripción                             |
| ----------- | ------------ | --------------------------------------- |
| Id          | TINYINT(50)  | Identificador único del ejercicio       |
| Name        | VARCHAR(50)  | Nombre del ejercicio que realiza        |
| photo       | VARCHAR(100) | Que describa él ejercicio               |
| musclegroup | VARCHAR(100) | Grupo muscular que trabaja el ejercicio |
| description | TEXT         | Descripción de ejercicio                |

### Ejercicios favoritos

| Campo       | Tipo        | Descripción                       |
| ----------- | ----------- | --------------------------------- |
| Id          | TINYINT(50) | Identificador único del ejercicio |
| user_id     | FOREIGN KEY | Id del usuario                    |
| exercise_id | FOREIGN KEY | Id del ejercicio                  |

### Usuarios

| Campo | Tipo         | Descripción                     |
| ----- | ------------ | ------------------------------- |
| id    | TINYINT(50)  | Identificador único del usuario |
| email | VARCHAR(100) | Correo electrónico del usuario  |

| password | VARCHAR(100) | contraseña del usuario |

| Name | VARCHAR(50) | Nombre del usuario |
| lastName | VARCHAR(100) | Apellidos del usuario |
| birthDate | DATETIME | Fecha de nacimiento del usuario |
| photo | VARCHAR(100) | foto de usuario |
| role | ENUM | Rol del usuario ("Cliente") |
| Listar | VARCHAR(100) | Ver listado y detalle de los ejercicios |
| select | VARCHAR(100) | Seleccionar ejercicios para ponerlos entre los favoritos |
| like | VARCHAR(100) | Podrá poner o quitar un like a un ejercicio |

● EXTENSIONES NPM USADAS

npm init -y
npm i express
npm nodemon -D
npm mysql2 dotenv
npm cors

### **Endpoints de Usuarios**

- **POST** - [/users/register] - Crea un nuevo usuario pidiendo todos los datos incluida la foto (body formData).
  🟠 Falta probar postman y revisar las rutas

- **POST** - [/users/login] - Logea a un usuario retornando un token, email, avatar y rol.
  🟠 Falta probar postman y revisar las rutas
- **GET** - [/users] - devuelve los datos del usuario del token (token)
  🟠 Falta probar postman y revisar las rutas

### **Endpoints ejercicios**

- **POST** - [/exercises/addNewExercise] - Permite al administrador subir un ejercicio con foto (body formData). (TOKEN y rol admin)
  🟠 Falta probar postman y revisar las rutas

- **DELETE** - [/exercises/:exerciseId/deleteExercise] - Permite al administrador eliminar un ejercicio (TOKEN y rol admin)
  🟠 Falta probar postman y revisar las rutas

- **GET** - [/exercises/filterExercises/:getAllExercises, :getExerciseById, :getExerciseByName, :getFavoriteExercises, :getExercisesByMuscleGroup] - Permite buscar ejercicios por diferentes métodos de filtrado o mostralos todos. (TOKEN)
  🟠 Falta probar postman y revisar las rutas

- **GET** - [/exercises/favorite] - Retornar el listado del los ejercicios favoritos del usuario de token (TOKEN)
  🟠 Falta probar postman y revisar las rutas

- **POST** - [/exercises/:exerciseId/addToFavorites,removeFromFavorites] - Permite a un usuario dar o quitar de favoritos a un ejercicio (tenerlo o no en preferidos). (TOKEN)
  🟠 Falta probar postman y revisar las rutas

- **GET** - [/exercises/getExerciseInfo] - Retornar información de un ejercicio (incluida la description).
  🟠 Falta probar postman y revisar las rutas

CORS
directorio uploads/fotos como static <img src="http://localhost:8000/43t4345tg3456g65.jpg">
