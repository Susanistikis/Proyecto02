// Importamos los errores.
const invalidCredentialsError = require("../services/errorService");
const selectUserByEmailModel = require("../controllers/usersControllers/loginUserController");

// Función controladora intermedia que lanza un error si no existe un usuario con un id dado.
const userExists = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await selectUserByEmailModel(email, password);
    const userRole = user.role;

    if (userRole != "admin") {
      invalidCredentialsError();
    }

    // Pasamos el control a la siguiente función controladora.
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = userExists;
