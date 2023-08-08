// Importamos las dependencias.
const getDb = require("../db/getDb");

// Importamos los errores.
const { notFoundError } = require("../services/errorService");

// Función controladora intermedia que lanza un error si no existe un usuario con un id dado.
const userExists = async (req, res, next) => {
  let connection;

  try {
    connection = await getDb();

    const userId = req.user.id;

    const [users] = await connection.query(
      `SELECT id FROM users WHERE id = ?`,
      [userId]
    );

    // Lanzamos un error si el usuario no existe.
    if (users.length < 1) {
      notFoundError();
    }

    // Pasamos el control a la siguiente función controladora.
    next();
  } catch (err) {
    next(err);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = userExists;
