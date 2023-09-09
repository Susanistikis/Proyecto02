const getDb = require('../../db/getDb');

async function getExerciseInfo(req, res) {
    const { id } = req.params;

    let connection;
    try {
        connection = await getDb();
        const [exercise] = await connection.query(
            'SELECT e.*, ' +
                'CASE WHEN r.user_id IS NULL THEN false ELSE true END AS isRecommended, ' +
                'CASE WHEN f.user_id IS NULL THEN false ELSE true END AS isFavorite ' +
                'FROM exercises e ' +
                'LEFT JOIN recommended r ON e.id = r.exercise_id AND r.user_id = ? ' +
                'LEFT JOIN favorites f ON e.id = f.exercise_id AND f.user_id = ? ' +
                'WHERE e.id = ?',
            [req.user.id, req.user.id, id]
        );

        if (exercise.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'El ejercicio no fue encontrado',
            });
        }

        res.status(200).json({
            status: 'ok',
            message: 'Información del ejercicio',
            data: exercise[0],
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener la información del ejercicio',
        });
    } finally {
        if (connection) connection.release();
    }
}

module.exports = getExerciseInfo;
