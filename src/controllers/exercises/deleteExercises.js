const deleteExerciseModel = require('../../models/exercises/deleteExerciseModel');

const deleteExerciseController = async (req, res) => {
    const exerciseId = req.params.id;

    try {
        await deleteExerciseModel(exerciseId);
        res.status(200).json({
            status: 'ok',
            message: 'Ejercicio eliminado exitosamente',
        });
    } catch (error) {
        console.error('Error al eliminar el ejercicio:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error al eliminar el ejercicio',
        });
    }
};

module.exports = deleteExerciseController;
