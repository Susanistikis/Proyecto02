const getDb = require('../../db/getDb');

async function updateUserRole(req, res) {
    let connection;
    try {
        const user_id = req.user.id;
        const { userRole } = req.body;

        connection = await getDb();

        await connection.query(
            `
            UPDATE users
            SET userRole = ?
            WHERE id = ?
        `,
            [user_id, userRole]
        );

        return res.status(200).json({
            status: 'ok',
            message: 'userRole actualizado exitosamente',
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json('Error en la consulta a la base de datos');
    } finally {
        if (connection) connection.release();
    }
}

module.exports = updateUserRole;
