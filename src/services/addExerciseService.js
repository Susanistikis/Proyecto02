// Importamos las dependencias.
const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');
const uuid = require('uuid');

// Importamos los errores.
const { saveFileError } = require('./errorService');
const UPLOADS_DIR = path.join(__dirname, './uploads');

const saveExerciseService = async (exercises, width) => {
    try {
        const uploadsPath = path.join(__dirname, UPLOADS_DIR);

        try {
            await fs.access(uploadsPath);
        } catch {
            // Si el método access lanza un error significa que la directorio no existe.
            // Lo creamos.
            await fs.mkdir(uploadsPath);
        }

        // Creamos un objeto de tipo Sharp con la ejercicio data.
        const sharpImg = sharp(exercises.data);

        // Redimensionamos la imagen. Width representa un tamaño en píxeles.
        sharpImg.resize(width);

        // Generamos un nombre único para la imagen dado que no podemos guardar dos imágenes
        // con el mismo nombre en la carpeta uploads.
        const imgName = `${uuid.v4()}.jpg`;

        // Ruta absoluta a la imagen.
        const imgPath = path.join(uploadsPath, imgName);

        // Guardamos la imagen.
        sharpImg.toFile(imgPath);

        // Retornamos el nombre de la imagen.
        return imgName;
    } catch (err) {
        console.error(err);
        saveFileError();
    }
};

module.exports = saveExerciseService;
