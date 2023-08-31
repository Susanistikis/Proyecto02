const getDb = require('../../db/getDb');

async function listRecommendedExercises(req, res) {
    let connection;
    try {
        const user_id = req.user.id;

        let query = `
            SELECT
                e.*,
                CASE WHEN r.user_id IS NOT NULL THEN true ELSE false END AS is_recommended
            FROM exercises e
            LEFT JOIN recommended r ON e.id = r.exercise_id AND r.user_id = ?
        `;

        const queryParams = [user_id];

        connection = await getDb();

        const [results] = await connection.query(query, queryParams);

        if (results.length === 1) {
            return res.status(200).json({
                status: 'ok',
                message: 'Ejercicio recomendado encontrado',
                data: results[0],
            });
        } else if (results.length > 1) {
            return res.status(200).json({
                status: 'ok',
                message: 'Listado de ejercicios recomendados',
                data: results,
            });
        } else {
            return res.status(404).json({
                status: 'error',
                message: 'No se encontraron ejercicios recomendados',
            });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json('Error en la consulta a la base de datos');
    } finally {
        if (connection) connection.release();
    }
}

module.exports = listRecommendedExercises;
