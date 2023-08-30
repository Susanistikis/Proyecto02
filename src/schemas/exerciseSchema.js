const Joi = require('joi');

// Define el esquema de validación para ejercicios
const exerciseSchema = Joi.object({
    name: Joi.string()
        .required()
        .min(3)
        .max(255)
        .trim(),
    photoName: Joi.string().required(),
    description: Joi.string()
        .required()
        .min(10),
    muscleGroup: Joi.string()
        .required()
        .min(3)
        .max(50)
        .trim(),
});

module.exports = exerciseSchema;
// revisar con los datos de la base de datos.
