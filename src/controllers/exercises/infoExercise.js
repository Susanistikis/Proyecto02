const getDb = require("../../db/getDb");

async function getExerciseInfo(req, res) {
  const { id } = req.params;

  let connection;
  try {
    connection = await getDb();
    const [exercise] = await connection.query("SELECT * FROM exercises WHERE id = ?", [id]);

    if (exercise.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "El ejercicio no fue encontrado",
      });
    }

    res.status(200).json({
      status: "ok",
      data: exercise,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "Error al obtener la información del ejercicio",
    });
  } finally {
    if (connection) connection.release();
  }
}

module.exports = getExerciseInfo;
