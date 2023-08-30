// Función controladora final que utilizaremos en el middleware de error.
const errorController = (err, req, res, next) => {
    res.status(err.httpStatus || 500).send({
        status: 'error',
        message: err.message,
    });
};

module.exports = errorController;
