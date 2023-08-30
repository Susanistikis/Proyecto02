// Importamos las dependencias.
const fs = require("fs/promises");
const path = require("path");
const sharp = require("sharp");
const uuid = require("uuid");

// Importamos los errores.
const { saveFileError } = require("./errorService");

const savePhotoService = async (img, width) => {
  try {
    // Ruta absoluta al directorio de subida de archivos.
    const uploadsDir = path.join(
      __dirname,
      "..",
      "..",
      process.env.UPLOADS_DIR
    );

    // Creamos la carpeta uploads si no existe con la ayuda del método "access".
    try {
      await fs.access(uploadsDir);
    } catch {
      // Si el método anterior lanza un error quiere decir que el directorio no existe.
      // En ese caso entraríamos en el catch y lo crearíamos.
      await fs.mkdir(uploadsDir);
    }

    // Creamos un objeto de tipo Sharp con la imagen recibida.
    const sharpImg = sharp(img.data);

    // Redimensionamos la imagen. El parámetro "width" representa un ancho en píxeles.
    sharpImg.resize(width);

    // Generamos un nombre único para la imagen para evitar que haya dos imágenes con el
    // mismo nombre.
    const imgName = `${uuid.v4()}.jpg`;

    // Ruta absoluta a la imagen.
    const imgPath = path.join(uploadsDir, imgName);

    // Guardamos la imagen en la carpeta de subida de archivos.
    await sharpImg.toFile(imgPath);

    // Retornamos el nombre con el que hemos guardado la imagen.
    return imgName;
  } catch (err) {
    throw saveFileError(); // Lanza el error después de llamar a saveFileError()
  }
};

module.exports = savePhotoService;
