// Importamos la función del token.

// Importamos la base de datos.
const getDb = require("../../db/getDb");
// Importamos los modelos.
const insertExerciseModel = require("../../models/exercises/addExercisesModel");
// Importamos los servicios.
const savePhotoService = require("../../services/savePhotoService");
//const validateSchemaService = require("../../services/validateSchemaService");
// Importamos el esquema.
//const addExercisesService = require("../../services/addExerciseService");

const addNewExercise = async (req, res, next) => {
  let connection;

  try {
    connection = await getDb();

    const { name, description, muscleGroup } = req.body;
    // Validamos el body con Joi. Fusionamos en un solo objeto las propiedades de body y de files.

    console.log(name, description, muscleGroup);
    console.log(req.files);

    //await validateSchemaService(
    //  addExercisesService,
    //  Object.assign(req.body, req.files)
    //);

    let photoName;

    if (req.files) {
      photoName = await savePhotoService(req.files.photoName, 500);
    }

    //  Quitar si ponemos validacin con JOI
    // comprobar que tenemos los campos obligatorios
    if (!name || !photoName || !description || !muscleGroup) {
      throw new Error("No estan todos los campos obligatorios");
    }

    // Registramos el ejercicio en la base de datos.
    await insertExerciseModel(
      name,
      photoName,
      description,
      muscleGroup,
      req.user.id
    );

    res.status(201).send({
      status: "ok",
      message: "Ejercicio creado",
    });
  } catch (err) {
    next(err);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = addNewExercise;
