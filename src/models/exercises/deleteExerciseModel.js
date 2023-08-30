const getDb = require('../../db/getDb');
const deletePhotoService = require('../../services/deletePhotoService');

async function deleteExerciseModel(exerciseId) {
    let connection;
    try {
        connection = await getDb();

        console.log('Checking exercise with ID:', exerciseId);

        const [exercise] = await connection.query(
            'SELECT id, photoName FROM exercises WHERE id = ?',
            [exerciseId]
        );

        if (exercise.length === 0) {
            throw new Error('El ejercicio que intentas eliminar no existe.');
        }

        console.log('Exercise found:', exercise[0]);

        await deletePhotoService(exercise[0].photoName);

        console.log('Photo deleted');

        await connection.query('DELETE FROM exercises WHERE id = ?', [exerciseId]);

        console.log('Exercise deleted from database');
    } finally {
        if (connection) connection.release();
    }
}

module.exports = deleteExerciseModel;
