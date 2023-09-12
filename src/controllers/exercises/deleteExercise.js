const deleteExerciseModel = require('../../models/exercises/deleteExerciseModel');
const getExerciseByIdModel = require('../../models/exercises/getExerciseByIdModel'); 

const deleteExerciseController = async (req, res) => {
    const exerciseId = req.params.id;

    try {
        
        const deletedExercise = await getExerciseByIdModel(exerciseId);
        if (!deletedExercise) {
            return res.status(404).json({
                status: 'error',
                message: 'No se encontró el ejercicio para eliminar',
            });
        }

        await deleteExerciseModel(exerciseId);
        res.status(200).json({
            status: 'ok',
            message: 'Ejercicio eliminado exitosamente',
            exercise: deletedExercise,
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
