const getDb = require('../../db/getDb');

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
            'INSERT INTO exercises (name, photoName, description, muscleGroup, userId) VALUES (?, ?, ?, ?, ?)',
            [name, photoName, description, muscleGroup, userId]
        );

        // Devolver el ID del ejercicio insertado
        return result.insertId;
    } catch (error) {
        console.error('Error en addExercisesModel:', error);
    } finally {
        connection.release();
    }
}

module.exports = addExercisesModel;
