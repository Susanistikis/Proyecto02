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

            // Recuperar el ejercicio existente
            const [
                currentExercise,
            ] = await db.query('SELECT * FROM exercises WHERE id = ?', [
                exerciseId,
            ]);

            if (currentExercise.length === 0) {
                db.release();
                return res
                    .status(404)
                    .json({ error: 'Ejercicio no encontrado' });
            }

            // Combinar los valores actuales con los nuevos valores
            const updatedExercise = {
                ...currentExercise[0],
                name: name !== undefined ? name : currentExercise[0].name,
                photoName:
                    photoName !== undefined
                        ? photoName
                        : currentExercise[0].photoName,
                description:
                    description !== undefined
                        ? description
                        : currentExercise[0].description,
                muscleGroup:
                    muscleGroup !== undefined
                        ? muscleGroup
                        : currentExercise[0].muscleGroup,
            };

            const updateQuery = `
                UPDATE exercises
                SET name = ?, photoName = ?, description = ?, muscleGroup = ?
                WHERE id = ?
            `;

            const updateValues = [
                updatedExercise.name,
                updatedExercise.photoName,
                updatedExercise.description,
                updatedExercise.muscleGroup,
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
