const getDb = require('../../db/getDb');
const jwt = require('jsonwebtoken');

const updateUserRole = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res
                .status(401)
                .json({ error: 'Token de autenticación no proporcionado.' });
        }

        jwt.verify(token, process.env.SECRET, async err => {
            if (err) {
                return res
                    .status(401)
                    .json({ error: 'Token de autenticación inválido.' });
            }

            const adminUserId = req.user.id; // ID del administrador autenticado
            const { userId, userRole } = req.body; // ID del usuario y el nuevo rol

            const db = await getDb();

            // Verificar si el usuario autenticado es un administrador
            const [
                admin,
            ] = await db.query(
                'SELECT * FROM users WHERE id = ? AND userRole = ?',
                [adminUserId, 'admin']
            );

            if (!admin) {
                db.release();
                return res.status(401).json({
                    status: 'error',
                    message:
                        'No tienes permiso para cambiar el rol de otros usuarios.',
                });
            }

            const [user] = await db.query('SELECT * FROM users WHERE id = ?', [
                userId,
            ]);

            if (!user) {
                db.release();
                return res.status(404).json({
                    status: 'error',
                    message: 'Usuario no encontrado',
                });
            }

            const updateQuery = `
                UPDATE users
                SET userRole = ?
                WHERE id = ?
            `;

            const updateValues = [userRole, userId];

            await db.query(updateQuery, updateValues);

            db.release();

            return res.status(200).json({
                status: 'ok',
                message: 'userRole actualizado exitosamente',
            });
        });
    } catch (error) {
        next(error);
    }
};

module.exports = updateUserRole;
