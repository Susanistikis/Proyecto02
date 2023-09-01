const getDb = require('../../db/getDb');
const getExerciseByIdModel = async exercise_id => {
    let connection;

    try {
        connection = await getDb();

        const [
            exercise,
        ] = await connection.query('SELECT * FROM exercises WHERE id = ?', [
            exercise_id,
        ]);
        return exercise[0];
    } finally {
        if (connection) connection.release();
    }
};

getDb();
module.exports = getExerciseByIdModel;
