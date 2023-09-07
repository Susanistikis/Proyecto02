const getDb = require('../../db/getDb');

async function filterExercises(req, res) {
    const user_id = req.user.id;

    const { name, muscleGroup, favorite, recommended } = req.query;

    let connection;
    try {
        connection = await getDb();
        let query = `
            SELECT e.*, 
               CASE WHEN f.user_id IS NOT NULL THEN true ELSE false END AS is_favorite,
               CASE WHEN r.user_id IS NOT NULL THEN true ELSE false END AS is_recommended
            FROM exercises e
            LEFT JOIN favorites f ON e.id = f.exercise_id AND f.user_id = ?
            LEFT JOIN recommended r ON e.id = r.exercise_id AND r.user_id = ?
        `;
        const queryParams = [user_id, user_id]; // Agrega user_id dos veces para ambos LEFT JOINs.

        if (name || muscleGroup || favorite || recommended) {
            query += ` WHERE`;

            if (name) {
                query += ` (e.name LIKE ? OR e.description LIKE ?)`;
                queryParams.push(`%${name}%`, `%${name}%`);
            }

            if (muscleGroup) {
                query += ` (e.muscleGroup LIKE ?)`;
                queryParams.push(`%${muscleGroup}%`);
            }

            if (favorite === 'true') {
                query += ` (f.user_id IS NOT NULL)`;
            } else if (favorite === 'false') {
                query += ` (f.user_id IS NULL)`;
            }

            if (recommended === 'true') {
                query += ` (r.user_id IS NOT NULL)`;
            } else if (recommended === 'false') {
                query += ` (r.user_id IS NULL)`;
            }
        }

        const [results] = await connection.query(query, queryParams);

        return res.status(200).json({
            status: 'ok',
            message: 'Lista de ejercicios filtrada',
            data: results,
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json('Error en la consulta a la base de datos');
    } finally {
        if (connection) connection.release();
    }
}

module.exports = filterExercises;
