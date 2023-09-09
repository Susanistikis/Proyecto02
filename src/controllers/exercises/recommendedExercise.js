const getDb = require('../../db/getDb');

async function recommendedExercises(req, res) {
    const idExercise = req.query.idExercise;
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
                return res.status(200).json({
                    status: 'ok',
                    message: 'Ejercicio eliminado de recomendados',
                    data: result,
                });
            } else {
                await connection.query(
                    'INSERT INTO recommended (user_id, exercise_id) VALUES (?, ?)',
                    [user_id, idExercise]
                );
                return res.status(200).json({
                    status: 'ok',
                    message: 'Ejercicio añadido a recomendados',
                    data: result,
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
