const getDb = require('../../db/getDb');

async function favoriteExercise(req, res) {
    const idExercise = req.query.idExercise;
    const user_id = req.user.id;

    if (idExercise) {
        let connection;
        try {
            connection = await getDb();
            const [
                result,
            ] = await connection.query(
                'SELECT * FROM favorites WHERE user_id = ? AND exercise_id = ?',
                [user_id, idExercise]
            );
            if (result.length > 0) {
                await connection.query(
                    'DELETE FROM favorites WHERE user_id = ? AND exercise_id = ?',
                    [user_id, idExercise]
                );
                return res.status(200).json({
                    status: 'ok',
                    message: 'Ejercicio eliminado de favoritos',
                    data: result,
                });
            } else {
                await connection.query(
                    'INSERT INTO favorites (user_id, exercise_id) VALUES (?, ?)',
                    [user_id, idExercise]
                );

                const [
                    newResult,
                ] = await connection.query(
                    'SELECT * FROM favorites WHERE user_id = ? AND exercise_id = ?',
                    [user_id, idExercise]
                );
                return res.status(200).json({
                    status: 'ok',
                    message: 'Ejercicio añadido a favoritos',
                    data: newResult,
                });
            }
        } catch (err) {
            return res.status(500).json({
                error: 'error',
                message:
                    'Hubo un error al agregar o eliminar el ejercicio de favoritos',
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

module.exports = favoriteExercise;
