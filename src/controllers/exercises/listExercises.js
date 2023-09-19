const getDb = require('../../db/getDb');

async function listExercises(req, res) {
    let connection;
    try {
        const {
            id,
            name,
            description,
            muscleGroup,
            created_at,
            updated_at,
            favorite,
            recommended,
        } = req.query;

        // Ahora puedes obtener el user_id del objeto req.user
        const user_id = req.user.id;

        connection = await getDb();
        let query = `
        SELECT e.*, 
           CASE WHEN f.user_id IS NOT NULL THEN true ELSE false END AS is_favorite,
           CASE WHEN r.user_id IS NOT NULL THEN true ELSE false END AS is_recommended
        FROM exercises e
        LEFT JOIN favorites f ON e.id = f.exercise_id AND f.user_id = ?
        LEFT JOIN recommended r ON e.id = r.exercise_id AND r.user_id = ?
        WHERE 1=1
    `;

        const queryParams = [user_id, user_id];

        if (favorite === 'true') {
            query += ` AND EXISTS (SELECT 1 FROM favorites WHERE exercise_id = e.id AND user_id = "${user_id}")`;
        } else if (favorite === 'false') {
            query += ` AND NOT EXISTS (SELECT 1 FROM favorites WHERE exercise_id = e.id AND user_id = "${user_id}")`;
        }

        if (recommended === 'true') {
            query += ` AND EXISTS (SELECT 1 FROM recommended WHERE exercise_id = e.id AND user_id = "${user_id}")`;
        } else if (recommended === 'false') {
            query += ` AND NOT EXISTS (SELECT 1 FROM recommended WHERE exercise_id = e.id AND user_id = "${user_id}")`;
        }

        if (
            id ||
            name ||
            description ||
            muscleGroup ||
            created_at ||
            updated_at ||
            user_id
        ) {
            if (id) {
                query += ` AND e.id = "${id}"`;
            }

            if (name) {
                query += ` AND (e.name LIKE ? OR e.description LIKE ?)`;
                queryParams.push(`%${name}%`, `%${name}%`);
            }
            if (description) {
                query += ` AND description = "${description}"`;
            }
            if (muscleGroup) {
                query += ` AND (e.muscleGroup LIKE ?)`;
                queryParams.push(`%${muscleGroup}%`);
            }
            if (created_at) {
                query += ` AND e.created_at = "${created_at}"`;
            }

            if (updated_at) {
                query += ` AND e.updated_at = "${updated_at}"`;
            }
        }

        const [results] = await connection.query(query, queryParams);

        // Convertir los valores de 0 y 1 a false y true
        results.forEach(result => {
            result.is_favorite = Boolean(result.is_favorite);
            result.is_recommended = Boolean(result.is_recommended);
        });

        // Ahora puedes enviar la respuesta
        return res.status(200).json({
            status: 'ok',
            message: 'Listado de ejercicios',
            data: results,
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Error en la consulta a la base de datos',
        });
    } finally {
        if (connection) connection.release();
    }
}

module.exports = listExercises;
