require("dotenv").config();

// Importamos la función que nos permite obtener una conexión libre con la base de datos.
const getDb = require("../../db/getDb");
// Importamos el modelo necesario.
const deleteExerciseModel = require("../../models/exercises/deleteExerciseModel");

// Función controladora  que elimina un ejercicio desde el id del ejercicio.
const deleteExercise = async (req, res, next) => {
  try {
    const { idExercise } = req.params;

    // Eliminar el ejercicio por su ID
    await deleteExerciseModel(idExercise);

    res.status(200).send({
      status: "ok",
      message: "Ejercicio eliminado",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = deleteExercise;
getDb();
