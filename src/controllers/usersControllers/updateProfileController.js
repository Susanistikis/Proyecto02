const getDb = require('../../db/getDb');
const jwt = require('jsonwebtoken');

const updateProfileController = async (req, res, next) => {
  try {
    // Verificamos si el token está presente en la solicitud.
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: 'Token de autenticación no proporcionado.' });
    }

    // Verificamos y descodificamos el token para obtener la información del usuario.
    jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ error: 'Token de autenticación inválido.' });
      }

      // Obtenemos los datos enviados en el cuerpo de la solicitud.
      const {
        name,
        biography,
        lastName,
        birthDate,
        address,
        phone_number,
        photo,
      } = req.body;

      // Obtenemos el ID del usuario desde el token.
      const userId = decodedToken.id;

      // Verificamos que al menos un campo de perfil se esté actualizando.
      if (
        !name &&
        !biography &&
        !lastName &&
        !birthDate &&
        !address &&
        !phone_number &&
        !photo
      ) {
        return res
          .status(400)
          .json({ error: 'Debes proporcionar al menos un campo para actualizar el perfil.' });
      }

      // Obtener una conexión de la base de datos
      const db = await getDb();

      // Construimos la consulta SQL para actualizar el perfil en la base de datos.
      const updateQuery = 'UPDATE users SET ' +
        (name ? 'name = ?, ' : '') +
        (biography ? 'biography = ?, ' : '') +
        (lastName ? 'lastName = ?, ' : '') +
        (birthDate ? 'birthDate = ?, ' : '') +
        (address ? 'address = ?, ' : '') +
        (phone_number ? 'phone_number = ?, ' : '') +
        (photo ? 'photo = ?, ' : '') +
        'updated_at = CURRENT_TIMESTAMP WHERE id = ?';

      // Construimos los valores para la consulta SQL.
      const updateValues = [
        name,
        biography,
        lastName,
        birthDate,
        address,
        phone_number,
        photo,
        userId,
      ].filter(value => value !== undefined); // Filtramos los valores no definidos.

      // Ejecutamos la consulta SQL para actualizar el perfil del usuario.
      await db.query(updateQuery, updateValues);

      // Liberar la conexión de la base de datos cuando hayas terminado.
      db.release();

      res.send({
        status: 'ok',
        message: 'Perfil actualizado correctamente',
      });
    });
  } catch (err) {
    next(err);
  }
};

module.exports = updateProfileController;
