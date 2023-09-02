const getDb = require('../../db/getDb');
const jwt = require('jsonwebtoken');

const updateExerciseController = async (req, res, next) => {
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

            const exerciseId = req.params.id;
            const { name, photoName, description, muscleGroup } = req.body;

            const db = await getDb();

            const exerciseExists = await db.query(
                'SELECT * FROM exercises WHERE id = ?',
                [exerciseId]
            );

            if (exerciseExists.length === 0) {
                db.release();
                return res
                    .status(404)
                    .json({ error: 'Ejercicio no encontrado' });
            }

            const updateQuery = `
                UPDATE exercises
                SET name = ?, photoName = ?, description = ?, muscleGroup = ?
                WHERE id = ?
            `;

            const updateValues = [
                name,
                photoName,
                description,
                muscleGroup,
                exerciseId,
            ];

            await db.query(updateQuery, updateValues);

            db.release();

            return res
                .status(200)
                .json({ message: 'Ejercicio actualizado con éxito' });
        });
    } catch (error) {
        next(error);
    }
};

module.exports = updateExerciseController;
