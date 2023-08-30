const getDb = require('../../db/getDb');
const insertExerciseModel = require('../../models/exercises/addExercisesModel');
const savePhotoService = require('../../services/savePhotoService');
const exerciseSchema = require('../../models/exercises/addExercisesModel');

const addNewExercise = async (req, res, next) => {
    let connection;

    try {
        connection = await getDb();

        const { name, description, muscleGroup } = req.body;

        let photoName;

        if (req.files) {
            photoName = await savePhotoService(req.files.photoName, 500);
        }

        // Validar los datos de entrada con Joi usando el esquema importado
        const { error } = exerciseSchema.validate(req.body);

        if (error) {
            return res.status(400).send({
                status: 'error',
                message: 'Datos de entrada no válidos',
                error: error.details,
            });
        }

        // Registramos el ejercicio en la base de datos y obtenemos el ID.
        const exerciseId = await insertExerciseModel(
            name,
            photoName,
            description,
            muscleGroup,
            req.user.id
        );

        res.status(201).send({
            status: 'ok',
            message: 'Ejercicio creado',
            exerciseId: exerciseId, // Agregar el ID aquí
        });
    } catch (err) {
        next(err);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = addNewExercise;
