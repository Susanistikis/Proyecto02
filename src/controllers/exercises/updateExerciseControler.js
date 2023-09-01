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
        jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
            if (err) {
                return res
                    .status(401)
                    .json({ error: 'Token de autenticación inválido.' });
            }
            const idExercise = req.params.id;
            const { name, photoName, description, muscleGroup } = req.body;

            if (decodedToken.userRole === 'admin') {
                const db = await getDb();

                const exerciseExists = await db.query(
                    'SELECT * FROM exercises WHERE id = ?',
                    [idExercise]
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
                    idExercise,
                ];

                await db.query(updateQuery, updateValues);

                db.release();

                return res
                    .status(200)
                    .json({ message: 'Ejercicio actualizado con éxito' });
            } else {
                return res
                    .status(403)
                    .json({ error: 'Ejercicio no actualizado' });
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = updateExerciseController;
