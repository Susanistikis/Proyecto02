const getDb = require('../../db/getDb');
const addExerciseModel = require('../../models/exercises/addExercisesModel');
const savePhotoService = require('../../services/savePhotoService');

const addNewExercise = async (req, res, next) => {
    let connection;

    try {
        connection = await getDb();

        const { name, description, muscleGroup } = req.body;

        console.log('Received data:', name, description, muscleGroup);

        let photoName;

        if (req.files && req.files.photo) {
            console.log('Photo received:', req.files.photo);

            photoName = await savePhotoService(req.files.photo, 500);
            console.log('Photo saved with name:', photoName);
        }

        if (!name || !description || !muscleGroup || !photoName) {
            console.log('Missing fields:', name, description, muscleGroup, photoName);
            
            return res.status(400).send({
                status: 'error',
                message: 'Faltan campos requeridos',
            });
        }

        const exerciseId = await addExerciseModel(
            name,
            photoName,
            description,
            muscleGroup,
            req.user.id
        );

        console.log('Exercise ID:', exerciseId);

        res.status(201).send({
            status: 'ok',
            message: 'Ejercicio creado',
            exerciseId: exerciseId,
        });
    } catch (err) {
        console.error('Error:', err);
        next(err);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = addNewExercise;
