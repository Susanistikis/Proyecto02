const getDb = require('../../db/getDb');

// Con esta función devolvemos la lista de recomendados de un usuario específico
async function getRecommendedExercises(req, res) {
    const user_id = req.user.id;
    let connection;
    try {
        connection = await getDb();
        const query = `
            SELECT e.*
            FROM exercises e
            JOIN recommended r ON e.id = r.exercise_id AND r.user_id = ?
        `;
        const [recommendedExercises] = await connection.query(query, [user_id]);

        return res.status(200).json({
            status: 'ok',
            message: 'Listado de ejercicios recomendados',
            data: recommendedExercises,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Error al obtener la lista de ejercicios recomendados',
        });
    } finally {
        if (connection) connection.release();
    }
}

module.exports = getRecommendedExercises;
