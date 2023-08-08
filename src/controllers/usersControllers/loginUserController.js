const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const selectUserByEmailModel = require("../../models/users/selectUserByEmailModel");
// Importamos los servicios.
const validateSchemaService = require("../../services/validateSchemaService");

// Importamos el esquema.
const loginUserSchema = require("../../schemas/loginUserSchema");

// Importamos los errores.
const { errorPasswordEmail } = require("../../services/errorService");

// Función controladora final que logea a un usuario retornando un token.
const loginUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validamos el body con Joi.
    await validateSchemaService(loginUserSchema, req.body);

    // Seleccionamos los datos del usuario que necesitamos utilizando el email.
    const user = await selectUserByEmailModel(email, password);

    // Variable que almacenará un valor booleano indicando si la contraseña es correcto o no.
    let validPass;

    // Si existe un usuario comprobamos si la contraseña coincide.
    if (user) {
      // Comprobamos si la contraseña es válida.
      validPass = await bcrypt.compare(password, user.password);
    }

    // Si las contraseña no coincide o no existe un usuario con el email proporcionado
    // lanzamos un error.
    if (!user || !validPass) {
      errorPasswordEmail();
    }

    // Objeto con la información que queremos almacenar en el token.
    const tokenInfo = {
      id: user.id,
      role: user.userRole,
    };

    // Creamos el token.
    const token = jwt.sign(tokenInfo, process.env.SECRET, {
      expiresIn: "7d",
    });

    res.send({
      status: "ok",
      data: {
        token,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = loginUserController;
