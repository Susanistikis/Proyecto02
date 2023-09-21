const getDb = require('../../db/getDb');
const jwt = require('jsonwebtoken');
const updateProfileController = async (req, res, next) => {
  try {
    console.log("Iniciando el controlador updateProfileController");

    const token = req.headers.authorization;

    if (!token) {
      return res
        .status(401)
        .json({ error: 'Token de autenticación no proporcionado.' });
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.SECRET);
    } catch (err) {
      return res
        .status(401)
        .json({ error: 'Token de autenticación inválido.' });
    }

    const {
      name,
      biography,
      lastName,
      birthDate,
      address,
      phone_number,
    } = req.body;
    const userId = decodedToken.id;

    console.log("Datos del usuario:", { userId, name, biography, lastName, birthDate, address, phone_number });

    // Verifica si se proporcionó al menos un campo para actualizar el perfil.
    if (!name && !biography && !lastName && !birthDate && !address && !phone_number) {
      return res.status(400).json({
        error: 'Debes proporcionar al menos un campo para actualizar el perfil.',
      });
    }

    const db = await getDb();

    try {
      // Construimos la consulta SQL para actualizar el perfil en la base de datos.
      let updateQuery = 'UPDATE users SET ';
      const updateValues = [];

      // Agregamos dinámicamente las columnas y valores a la consulta.
      if (name) {
        updateQuery += 'name = ?, ';
        updateValues.push(name);
      }
      
      if (biography) {
        updateQuery += 'biography = ?, ';
        updateValues.push(biography);
      }

      if (lastName) {
        updateQuery += 'lastName = ?, ';
        updateValues.push(lastName);
      }

      if (birthDate) {
        updateQuery += 'birthDate = ?, ';
        updateValues.push(birthDate);
      }

      if (address) {
        updateQuery += 'address = ?, ';
        updateValues.push(address);
      }

      if (phone_number) {
        updateQuery += 'phone_number = ?, ';
        updateValues.push(phone_number);
      }

      // Eliminamos la coma final y completamos la consulta.
      updateQuery = updateQuery.slice(0, -2);

      // Agregamos la parte final de la consulta.
      updateQuery += ' WHERE id = ?';
      updateValues.push(userId);

      console.log('Consulta SQL para actualizar el perfil:', updateQuery);
      console.log('Valores para la consulta:', updateValues);

      await db.query(updateQuery, updateValues);

      res.send({
        status: 'ok',
        message: 'Perfil actualizado correctamente',
      });
    } catch (err) {
      console.error(err);
      next(err);
    } finally {
      db.release();
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};
module.exports = updateProfileController;
