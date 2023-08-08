const jwt = require("jsonwebtoken");
const getDb = require("../../db/getDb");
const savePhotoService = require("../../services/savePhotoService");
const insertExerciseModel = require("../../models/exercises/addExercisesModel");

const addNewExercise = async (req, res) => {
  let connection;
  const user_role = req.user.role;
  // const user_id = req.user.id;

  // Comprobar si el usuario es administrador
  if (user_role !== "admin") {
    return res
      .status(403)
      .json({ message: "No tienes permiso para realizar esta acción" });
  }

  try {
    // Validate token
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      throw new Error("Authorization header is missing or invalid");
    }
    const token = authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      throw new Error("Invalid token");
    }

    connection = await getDb();

    const { name, description, muscleGroup } = req.body;

    let photoName;
    if (req.files) {
      photoName = await savePhotoService(req.files.photo, 500);
    }

    // comprobar que tenemos los campos obligatorios
    if (!name || !photoName || !description || !muscleGroup) {
      throw new Error("No estan todos los campos obligatorios");
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
    return res.status(500).json({
      error: "Hubo un error al agregar el ejercicio.",
    });
  } finally {
    if (connection) connection.release();
  }
};

module.exports = addNewExercise;
