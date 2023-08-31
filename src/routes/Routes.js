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
} = require('../controllers/usersControllers');

const {
    addNewExercise,
    deleteExercises,
    favoriteExercises,
    listExercises,
    getExerciseInfo,
    getFavoriteExercises,
    listRecommendedExercises,
    getRecommendedExercises,
    recommendedExercises,
} = require('../controllers/exercises');

// Ruta para el login de un usuario.
router.post('/users/login', loginUserController);

// Ruta para registrar un nuevo usuario.
router.post('/users/register', registerController);

// Obtener perfil privado de un usuario.
router.get('/users', authUser, userExists, getOwnUserController);

// Nuevo ejercicio
router.post(
    '/exercises/newExercises',
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
    deleteExercises
);

// Ejercicios favoritos
router.post(
    '/exercises/favoriteExercises/',
    authUser,
    userExists,
    favoriteExercises
);
router.get('/exercises/favorite', authUser, userExists, getFavoriteExercises);

// Filtrar ejercicios
router.get('/exercises/listExercises', authUser, userExists, listExercises);

// Obtener información de los ejercicios
router.get(
    '/exercises/infoExercises/:id',
    authUser,
    userExists,
    getExerciseInfo
);
router.get(
    '/exercises/RecommendedExercises/:id',
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
module.exports = router;
