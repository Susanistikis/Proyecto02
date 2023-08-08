// Importamos las dependencias.
const jwt = require("jsonwebtoken");

// Importamos los errores.
const {
  notAuthenticatedError,
  //invalidCredentialsError,
} = require("../services/errorService");
const { error } = require("../schemas/loginUserSchema");

const authUser = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      notAuthenticatedError();
    }

    // Variable que almacenará la info del token.
    let tokenInfo;
    // función que desencripta el token
    try {
      tokenInfo = jwt.verify(authorization, process.env.SECRET);
    } catch (err) {
      throw error("error al desencriptar");
    }

    req.user = tokenInfo; // {id: 1 , role: "Admin"}

    // Pasamos el control a la siguiente función controladora.
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authUser;
