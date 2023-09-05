// Routes exercises
const express = require('express');
const router = express.Router();
const path = require('path');

// Rutas de usuarios

const { authUser, userExists, isAdmin } = require('../middlewares');

// Importamos las funciones controladoras requeridas.
const {
    loginUserController,
    registerController,
    getOwnUserController,
    updateProfileController,
    getUserProfileController,
    listUsers,
    updateUserRole,
} = require('../controllers/usersControllers');

const {
    addNewExercise,
    deleteExercise,
    favoriteExercise,
    listExercises,
    getExerciseInfo,
    getFavoriteExercises,
    listRecommendedExercises,
    getRecommendedExercises,
    recommendedExercises,
    updateExerciseController,
} = require('../controllers/exercises');

// Ruta para el login de un usuario.
router.post('/users/login', loginUserController);

// Ruta para registrar un nuevo usuario.
router.post('/users/register', registerController);

// Obtener perfil privado de un usuario.
router.get('/users', authUser, userExists, getOwnUserController);

// Ruta para obtener el perfil de un usuario por su ID
router.get(
    '/users/profile/:id',
    authUser,
    userExists,
    getUserProfileController
);

// Actualizar el perfil privado de un usuario.
router.post('/users/profile', updateProfileController);

router.use(
    '/uploads',
    express.static(path.join(__dirname, '..', '..', process.env.UPLOADS_DIR))
);
// Mostar la lista de todos los usuarios.
router.post('/users/listUsers/', authUser, userExists, isAdmin, listUsers);

// El usuario admin puede cambiar el rol de un usuario
router.put(
    '/users/updateUserRole/:id',
    authUser,
    userExists,
    isAdmin,
    updateUserRole
);

// Nuevo ejercicio
router.post(
    '/exercises/newExercise',
    authUser,
    userExists,
    isAdmin,
    addNewExercise
);
// Eliminar ejercicio
router.delete(
    '/exercises/deleteExercise/:id',
    authUser,
    userExists,
    isAdmin,
    deleteExercise
);

// Ejercicios favoritos
router.post(
    '/exercises/favoriteExercise/',
    authUser,
    userExists,
    favoriteExercise
);

// Marcar un ejercicio como favorito o quitarselo.
router.get('/exercises/favorite', authUser, userExists, getFavoriteExercises);

// Filtrar ejercicios
router.get('/exercises/listExercises', authUser, userExists, listExercises);

// Obtener información de los ejercicios
router.get(
    '/exercises/infoExercise/:id',
    authUser,
    userExists,
    getExerciseInfo
);

// Obtener la lista de los ejercicios recomendados.
router.get(
    '/exercises/RecommendedExercise/:id',
    authUser,
    userExists,
    listRecommendedExercises
);

// Recomendar un ejercicio.
router.get(
    '/exercises/getRecommendedExercises/:id',
    authUser,
    userExists,
    getRecommendedExercises
);

// Mostrar los ejercicios recomendados.
router.post(
    '/exercises/recommendedExercises/:id',
    authUser,
    userExists,
    recommendedExercises
);

// Editar un ejercicio.
router.put(
    '/exercises/updateExerciseController/:id',
    authUser,
    userExists,
    isAdmin,
    updateExerciseController
);

module.exports = router;
