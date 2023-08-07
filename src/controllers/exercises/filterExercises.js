require("dotenv").config();
const getDb = require("../../db/getDb");

async function filterExercises(req, res) {
  const { search, muscleGroup, favoritos } = req.query;
  const user_id = req.user.id;
  if (Object.keys(req.query).length === 0) {
    return res.status(400).json("No hay parámetros");
  }

  let connection;
  try {
    connection = await getDb();
    // Verificar si el usuario está registrado
    if (user_id) {
      const [user] = await connection.query(
        "SELECT * FROM users WHERE id = ?",
        [user]
      );
    }
    if (!user_id.length) {
      return res.status(400).json("El usuario no está registrado");
    }
    // Filtrar ejercicios
    let query = "SELECT * FROM exercises";
    let queryParams = [];
    // /exercises?search="sentadillas" filtrar por palabra que este en nombre y descripción.
    if (search) {
      query += " WHERE name LIKE ? OR description LIKE ?";
      queryParams.push(`%${search}%`);
      queryParams.push(`%${search}%`);
    }
    // /exercises?favoritos="no" filtrar por si no esta en favoritos.
    else if (favoritos === "si") {
      query =
        "SELECT e.* FROM exercises e LEFT JOIN favorites f ON e.id = f.exercise_id WHERE f.user_id IS NULL OR f.user_id != ?";
      queryParams.push(user_id);
    }
    // /exercises?grupo="inferior"&favoritos="no" que filtre por grupo muscular y si no esta en favoritos.
    else if (muscleGroup && favoritos === "no") {
      query =
        "SELECT e.* FROM exercises e LEFT JOIN favorites f ON e.id = f.exercise_id WHERE muscleGroup = ? AND (f.user_id IS NULL OR f.user_id != ?)";
      queryParams.push(muscleGroup);
      queryParams.push(user_id);
    }
    // /exercises?grupo="inferior" nos filtra por el grupo muscular al que pertenece.
    else if (muscleGroup) {
      query += " WHERE muscleGroup = ?";
      queryParams.push(muscleGroup);
    }

    query += " ORDER BY name";

    const [result] = await connection.query(query, queryParams);
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json("Hubo un error");
  } finally {
    if (connection) connection.release();
  }
}

module.exports = filterExercises;
