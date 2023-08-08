const getDb = require("../../db/getDb");

async function getExerciseInfo(req, res) {
  let connection;
  try {
    connection = await getDb();
    const { idExercise } = req.params;
    const [exercise] = await connection.query(
      "SELECT * FROM exercises WHERE id = ?",
      [idExercise]
    );

    res.status(200).send({
      status: "ok",
      data: exercise[0],
    });
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) connection.release();
  }
}
module.exports = getExerciseInfo;
