const getDb = require('../../db/getDb');

async function listUsers(req, res) {
    let connection;

    try {
        const user_id = req.user.id;

        let query = `
            SELECT *
            FROM users
        `;

        const queryParams = [user_id];

        connection = await getDb();

        const [results] = await connection.query(query, queryParams); // la query no usa el queryParams no hace falta

        if (results.length > 0) {
            return res.status(200).json({
                status: 'ok',
                message: 'Lista de usuarios',
                data: results,
            });
        } else {
            return res.status(404).json({
                status: 'error',
                message: 'No se encontraron usuarios',
            });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json('Error en la consulta a la base de datos');
    } finally {
        if (connection) connection.release();
    }
}

module.exports = listUsers;
