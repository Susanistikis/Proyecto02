// Importamos las dependencias.
const jwt = require("jsonwebtoken");

// Importamos los errores.
const {
  notAuthenticatedError,
  invalidCredentialsError,
} = require("../services/errorService");

const authUser = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      notAuthenticatedError();
    }

    // Variable que almacenará la info del token.
    let tokenInfo;

    try {
      tokenInfo = jwt.verify(authorization, process.env.SECRET);
    } catch (err) {
      invalidCredentialsError();
    }

    req.user = tokenInfo; // {id: 1 , role: "Admin"}

    // Pasamos el control a la siguiente función controladora.
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authUser;
