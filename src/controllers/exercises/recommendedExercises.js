const getDb = require('../../db/getDb');

async function recommendedExercises(req, res) {
    const idExercise = req.query.idExercise; // Obtener el ID del ejercicio desde la consulta
    const user_id = req.user.id;

    if (idExercise) {
        let connection;
        try {
            connection = await getDb();
            const [
                result,
            ] = await connection.query(
                'SELECT * FROM recommended WHERE user_id = ? AND exercise_id = ?',
                [user_id, idExercise]
            );
            if (result.length > 0) {
                await connection.query(
                    'DELETE FROM recommended WHERE user_id = ? AND exercise_id = ?',
                    [user_id, idExercise]
                );
                return res.json({
                    message: 'Ejercicio eliminado de recomendados',
                });
            } else {
                await connection.query(
                    'INSERT INTO recommended (user_id, exercise_id) VALUES (?, ?)',
                    [user_id, idExercise]
                );
                return res.json({
                    message: 'Ejercicio añadido a recomendados',
                });
            }
        } catch (err) {
            return res.status(500).json({
                error:
                    'Hubo un error al agregar o eliminar el ejercicio de recomendados',
            });
        } finally {
            if (connection) connection.release();
        }
    } else {
        return res
            .status(400)
            .json('No se proporcionó el parámetro idExercise');
    }
}

module.exports = recommendedExercises;
