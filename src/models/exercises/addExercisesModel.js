const getDb = require('../../db/getDb');
const errorService = require('../../services/errorService');

async function addExercisesModel(
    name,
    photoName,
    description,
    muscleGroup,
    userId
) {
    const connection = await getDb();

    try {
        const result = await connection.query(
            'INSERT INTO exercises (name, photoName, description, muscleGroup, user_id) VALUES (?, ?, ?, ?, ?)',
            [name, photoName, description, muscleGroup, userId]
        );

        return result.insertId;
    } catch (error) {
        console.error('Error en addExercisesModel:', error);
        throw errorService.saveFileError();
    } finally {
        connection.release();
    }
}

module.exports = addExercisesModel;
