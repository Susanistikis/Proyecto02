require("dotenv").config();

// Importamos la función que nos permite obtener una conexión libre con la base de datos.
const getDb = require("../../db/getDb");

async function addExercisesModel(
  name,
  photoName,
  description,
  muscleGroup,
  user_id
) {
  let connection;
  try {
    connection = await getDb();
    //console.log(user_id);
    await connection.query(
      `INSERT INTO exercises (name, description, muscleGroup, photoName, user_id) VALUES (?,?,?,?,?)`,
      [name, description, muscleGroup, photoName, user_id]
    );
  } finally {
    if (connection) connection.release();
  }
}

module.exports = addExercisesModel;
