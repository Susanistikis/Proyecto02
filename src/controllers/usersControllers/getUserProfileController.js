const getDb = require('../../db/getDb');

const getUserProfileController = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: 'Token de autenticación no proporcionado.' });
    }

    // Obtenemos el ID de la URL en lugar de decodificarlo desde el token.
    const userId = req.params.id;

    const db = await getDb();

    const query = 'SELECT id, name, biography, lastName, birthDate, address, phone_number, photo FROM users WHERE id = ?';

    const [user] = await db.query(query, [userId]);

    db.release();

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = getUserProfileController;
