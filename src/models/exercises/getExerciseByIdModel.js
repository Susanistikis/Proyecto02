// Importamos la función que devuelve una conexión con la base de datos.
const getDb = require('../../db/getDb');

// Función que realiza una consulta a la base de datos para seleccionar a un ejercicio por su id.
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
