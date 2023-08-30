const getDb = require('../../db/getDb');

async function listExercises(req, res) {
    // Obtener el ID del usuario autenticado (debes asegurarte de que el usuario esté autenticado previamente)
    const user_id = req.user.id;

    const { name, muscleGroup, favorites } = req.query;
    let query = 'SELECT * FROM exercises WHERE 1 = 1'; // La cláusula 1 = 1 permite agregar condiciones dinámicamente

    if (name) {
        query += ` AND (name LIKE '%${name}%' OR description LIKE '%${name}%')`;
    }

    if (muscleGroup) {
        query += ` AND muscle_group = '${muscleGroup}'`;
    }

    if (favorites) {
        if (favorites === 'true') {
            query += ` AND id IN (SELECT exercise_id FROM user_favorites WHERE user_id = '${user_id}')`;
        } else {
            query += ` AND id NOT IN (SELECT exercise_id FROM user_favorites WHERE user_id = '${user_id}')`;
        }
    }

    const connection = await getDb();

    // Ejecutar la consulta y retornar los resultados
    try {
        const results = await connection.query(query);
        return res.status(200).json({
            status: 'ok',
            message: 'Listado ejercicios',
            data: results[0],
        });
    } catch (error) {
        return res.status(500).json('Error en la consulta a la base de datos');
    }
}

module.exports = listExercises;
