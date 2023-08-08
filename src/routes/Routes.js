// Routes exercises
const express = require("express");
const router = express.Router();

const authUser = require("../middlewares/authUser");
const userExists = require("../middlewares/userExists");
const isAdmin = require("../middlewares/isAdmin");

// Rutas de usuarios

// Importamos las funciones controladoras requeridas.
const {
  loginUserController,
  registerController,
  getOwnUserController,
} = require("../controllers/usersControllers");

const {
  addNewExercise,
  deleteExercises,
  favoriteExercises,
  filterExercises,
  getExerciseInfo,
} = require("../controllers/exercises");

// Ruta para el login de un usuario.
router.post("/users/login", loginUserController);

// Ruta para registrar un nuevo usuario.
router.post("/users/register", registerController);

// Obtener perfil privado de un usuario.
router.get("/users", authUser, userExists, getOwnUserController);

// Nuevo ejercicio
router.post(
  "/exercises/newExercises",
  authUser,
  userExists,
  isAdmin,
  addNewExercise
);
// Eliminar ejercicio
router.delete(
  "/exercises/deleteExercise",
  authUser,
  userExists,
  isAdmin,
  deleteExercises
);

// Ejercicios favoritos
router.get(
  "/exercises/favoriteExercises",
  authUser,
  userExists,
  favoriteExercises
);

// Filtrar ejercicios
router.get("/exercises/", authUser, userExists, filterExercises);

// Obtener información de los ejercicios
router.get("/exercises/infoExercises", authUser, userExists, getExerciseInfo);

module.exports = router;
