const getDb = require("../../db/getDb");

async function getFavoriteExercises(req, res) {
  const user_id = req.user.id;
  let connection;
  try {
    connection = await getDb();
    const query = `
      SELECT e.* 
      FROM exercises e
      JOIN favorites f ON e.id = f.exercise_id AND f.user_id = ?
    `;
    const [favoriteExercises] = await connection.query(query, [user_id]);

    return res.status(200).json({
      status: "ok",
      message: "Listado de ejercicios favoritos",
      data: favoriteExercises,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Error al obtener la lista de ejercicios favoritos",
    });
  } finally {
    if (connection) connection.release();
  }
}

module.exports = getFavoriteExercises;
