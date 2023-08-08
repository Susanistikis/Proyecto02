// Importamos la función que nos permite obtener una conexión libre con la base de datos.
const getDb = require("../../db/getDb");

async function exercisesFavorite(req, res) {
  const { idExercise } = req.params;
  const user_id = req.user.id;

  //if (Object.keys(req.query).length === 0) {
  //  return res.status(400).json("No hay parámetros");
  //}

  let connection;
  try {
    connection = await getDb();
    const [result] = await connection.query(
      "SELECT * FROM favorites WHERE user_id = ? AND exercise_id = ?",
      [user_id, idExercise]
    );
    if (result.length > 0) {
      await connection.query(
        "DELETE FROM favorites WHERE user_id = ? AND exercise_id = ?",
        [user_id, idExercise]
      );
      return res.json({ message: "Ejercicio eliminado de favoritos" });
    } else {
      await connection.query(
        "INSERT INTO favorites (user_id, exercise_id) VALUES (?, ?)",
        [user_id, idExercise]
      );
      return res.json({ message: "Ejercicio añadido a favoritos" });
    }
  } catch (err) {
    return res.status(500).json({
      error: "Hubo un error al agregar o eliminar el ejercicio de favoritos",
    });
  } finally {
    if (connection) connection.release();
  }
}

module.exports = exercisesFavorite;
