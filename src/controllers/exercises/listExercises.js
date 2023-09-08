const getDb = require('../../db/getDb');

async function listExercises(req, res) {
    let connection;
    try {
        const query = `
            SELECT *
            FROM exercises
        `;

        connection = await getDb();

        const [results] = await connection.query(query);

        if (results.length >= 1) {
            return res.status(200).json({
                status: 'ok',
                message: 'Listado de ejercicios',
                data: results,
            });
        } else {
            return res.status(404).json({
                status: 'error',
                message: 'No se encontraron ejercicios',
            });
        }
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
