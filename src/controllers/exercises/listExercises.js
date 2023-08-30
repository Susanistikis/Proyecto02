const getDb = require('../../db/getDb');

async function listExercises(req, res) {
    let connection;
    try {
        const user_id = req.user.id;
        const { name } = req.query;

        console.log('Valor del parámetro "name":', name);

        let query = `
            SELECT
                e.*,
                CASE WHEN f.user_id IS NOT NULL THEN true ELSE false END AS is_favorite
            FROM exercises e
            LEFT JOIN favorites f ON e.id = f.exercise_id AND f.user_id = ?
        `;

        const queryParams = [user_id];

        if (name) {
            query += ` WHERE (e.name LIKE ? OR e.description LIKE ?)`;
            queryParams.push(`%${name}%`, `%${name}%`);
        }

        console.log('Consulta SQL:', query);
        console.log('Parámetros de la consulta:', queryParams);

        connection = await getDb();

        const [results] = await connection.query(query, queryParams);

        return res.status(200).json({
            status: 'ok',
            message: 'Listado ejercicios',
            data: results,
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json('Error en la consulta a la base de datos');
    } finally {
        if (connection) connection.release();
    }
}

module.exports = listExercises;
