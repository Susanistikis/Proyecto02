// Routes exercises
const express = require('express');
const router = express.Router();

// Rutas de usuarios

const { authUser, userExists, isAdmin } = require('../middlewares');

// Importamos las funciones controladoras requeridas.
const {
    loginUserController,
    registerController,
    getOwnUserController,
    updateProfileController,
    getUserProfileController,
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
router.get('/users/profile/:id', authUser, userExists, getUserProfileController);

// Actualizar el perfil privado de un usuario.
router.post('/users/profile', updateProfileController);
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
router.get(
    '/exercises/RecommendedExercise/:id',
    authUser,
    userExists,
    listRecommendedExercises
);
router.get(
    '/exercises/getRecommendedExercises/:id',
    authUser,
    userExists,
    getRecommendedExercises
);
router.get(
    '/exercises/recommendedExercises/:id',
    authUser,
    userExists,
    recommendedExercises
);
router.put(
    '/exercises/updateExerciseController/:id',
    authUser,
    userExists,
    isAdmin,
    updateExerciseController
);

module.exports = router;
