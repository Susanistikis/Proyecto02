const getDb = require("../../db/getDb");

async function getExerciseInfo(req, res) {
  let connection;
  try {
    connection = await getDb();
    const [exercises] = await connection.query("SELECT * FROM exercises");

    res.status(200).send({
      status: "ok",
      data: exercises,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: "error",
      message: "Error al obtener la lista de ejercicios",
    });
  } finally {
    if (connection) connection.release();
  }
}

module.exports = getExerciseInfo;
