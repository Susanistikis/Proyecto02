require("dotenv").config();

// Importamos la función que nos permite obtener una conexión libre con la base de datos.
const getDb = require("../../db/getDb");
const savePhotoService = require("../../services/savePhotoService");
// Importamos los modelos
const insertExerciseModel = require("../../models/exercises/addExercisesModel");
const { missingFieldsError } = require("../../services/errorService");

// Función controladora que crea un nuevo ejercicio desde administrador.
const addNewExercise = async (req, res, next) => {
  let connection;
  const user_role = req.userRole;
  const user_id = req.user.id;

  // Verificar si el usuario está registrado
  if (user_id) {
    const [user] = await connection.query("SELECT * FROM users WHERE id = ?", [
      user,
    ]);
  }
  // Comprobar si el usuario es administrador
  if (user_role !== "admin") {
    return res
      .status(403)
      .json({ message: "No tienes permiso para realizar esta acción" });
  }

  if (Object.keys(req.query).length === 0) {
    return res.status(400).json("No hay parámetros");
  }

  try {
    const { name, description, muscleGroup } = req.body;

    let photoName;
    if (req.files) {
      photoName = await savePhotoService(req.files.photo, 500);
    }

    // comprobar que tenemos los campos obligatorios
    if (!name || !photoName || !description || !muscleGroup) {
      missingFieldsError();
    }

    // Registramos el ejercicio en la base de datos.
    await insertExerciseModel({
      name,
      photoName,
      description,
      muscleGroup,
      user_id: req.user.id,
    });

    res.status(201).send({
      status: "ok",
      message: "Ejercicio creado",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = addNewExercise;
getDb();
