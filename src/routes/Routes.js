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
router.put('/users/profile', authUser, userExists, updateProfileController);

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

// Importamos las funciones controladoras requeridas de los ejercicios.

const {
    addNewExercise,
    deleteExercise,
    favoriteExercise,
    listExercises,
    getExerciseInfo,
    getFavoriteExercises,
    listRecommendedExercises,
    getRecommendedExercises,
    recommendedExercise,
    updateExerciseController,
    filterExercises,
} = require('../controllers/exercises');

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

// Marcar un ejercicio como favorito o desmarcarlo.
router.post(
    '/exercises/favoriteExercise/',
    authUser,
    userExists,
    favoriteExercise
);

// devolvemos la lista de ejercicios favoritos de un usuario específico.
router.post(
    '/exercises/favorite/:id',
    authUser,
    userExists,
    getFavoriteExercises
);

// lista de ejercicios
router.get('/exercises/listExercises', authUser, userExists, listExercises);

// Obtener información de los ejercicios.
router.get(
    '/exercises/infoExercise/:id',
    authUser,
    userExists,
    getExerciseInfo
);

// Filtrar los ejercicios.
router.post(
    '/exercises/filterExercises/:id',
    authUser,
    userExists,
    filterExercises
);

// Obtener la lista de los ejercicios recomendados.
router.get(
    '/exercises/listRecommendedExercises/:id',
    authUser,
    userExists,
    listRecommendedExercises
);

// Obtener la lista de recomendados de un usuario específico.
router.post(
    '/exercises/getRecommendedExercises/:id',
    authUser,
    userExists,
    getRecommendedExercises
);

// Marcar un ejercicio como recomendado o desmarcarlo.
router.post(
    '/exercises/recommendedExercise/',
    authUser,
    userExists,
    recommendedExercise
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
