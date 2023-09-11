const getDb = require('../../db/getDb');
const jwt = require('jsonwebtoken');

const updateProfileController = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res
                .status(401)
                .json({ error: 'Token de autenticación no proporcionado.' });
        }
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, process.env.SECRET);
        } catch (err) {
            return res
                .status(401)
                .json({ error: 'Token de autenticación inválido.' });
        }
        const {
            name,
            biography,
            lastName,
            birthDate,
            address,
            phone_number,
            photo,
        } = req.body;
        const userId = decodedToken.id;
        if (
            !name &&
            !biography &&
            !lastName &&
            !birthDate &&
            !address &&
            !phone_number &&
            !photo
        ) {
            return res.status(400).json({
                error:
                    'Debes proporcionar al menos un campo para actualizar el perfil.',
            });
        }
        const db = await getDb();

        try {
            // Construimos la consulta SQL para actualizar el perfil en la base de datos.
            const updateQuery =
                'UPDATE users SET ' +
                (name ? 'name = ?, ' : '') +
                (biography ? 'biography = ?, ' : '') +
                (lastName ? 'lastName = ?, ' : '') +
                (birthDate ? 'birthDate = ?, ' : '') +
                (address ? 'address = ?, ' : '') +
                (phone_number ? 'phone_number = ?, ' : '') +
                (photo ? 'photo = ?, ' : '') +
                'updated_at = CURRENT_TIMESTAMP WHERE id = ?';

            // Construimos los valores para la consulta SQL.
            const updateValues = [
                name,
                biography,
                lastName,
                birthDate,
                address,
                phone_number,
                photo,
                userId,
            ].filter(value => value !== undefined);
            await db.query(updateQuery, updateValues);

            res.send({
                status: 'ok',
                message: 'Perfil actualizado correctamente',
            });
        } catch (err) {
            next(err);
        } finally {
            db.release();
        }
    } catch (err) {
        next(err);
    }
};

module.exports = updateProfileController;
