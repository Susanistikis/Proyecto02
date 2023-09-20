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
        // Verifica si se proporcionó al menos un campo para actualizar el perfil.
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
            let updateQuery = 'UPDATE users SET ';
            const updateValues = [];
            // Agregamos dinámicamente las columnas y valores a la consulta.
            if (name) {
                updateQuery += 'name = ?, ';
                updateValues.push(name);
            }
            if (biography) {
                updateQuery += 'biography = ?, ';
                updateValues.push(biography);
            }
            if (lastName) {
                updateQuery += 'lastName = ?, ';
                updateValues.push(lastName);
            }
            if (birthDate) {
                updateQuery += 'birthDate = ?, ';
                updateValues.push(birthDate);
            }
            if (address) {
                updateQuery += 'address = ?, ';
                updateValues.push(address);
            }
            if (phone_number) {
                updateQuery += 'phone_number = ?, ';
                updateValues.push(phone_number);
            }
            if (photo) {
                updateQuery += 'photo = ?, ';
                updateValues.push(photo);
            }
            // Agregamos la parte final de la consulta.
            updateQuery += 'updated_at = CURRENT_TIMESTAMP WHERE id = ?';
            updateValues.push(userId);
            console.log('updateQuery:', updateQuery);
            console.log('updateValues:', updateValues);
            await db.query(updateQuery, updateValues);
            res.send({
                status: 'ok',
                message: 'Perfil actualizado correctamente',
            });
        } catch (err) {
            console.error(err);
            next(err);
        } finally {
            db.release();
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};
module.exports = updateProfileController;
