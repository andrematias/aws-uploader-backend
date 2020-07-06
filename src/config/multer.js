/**
 * Este arquivo de configuração gerencia o arquivo que vai ser recebido na requisição
 * Aqui configuramos o nome, o tamanho e os tipos permitidos
 */

const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

module.exports = {
  dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
  storage: multer.diskStorage({
    // Configurando o destino do upload
    destination: (req, file, callback) => {
      callback(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"));
    },

    //Configurando o novo nome do arquivo para não gerar duplicados
    filename: (req, file, callback) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) callback(err);

        const fileName = `${hash.toString("hex")}-${file.originalname}`;
        callback(null, fileName);
      });
    },
  }),

  //Definindo o tamanho do arquivo permitido
  limits: {
    fileSize: 2 * 1024 * 1024,
  },

  //Definindo o filtro de tipo de arquivos permitidos
  fileFilter: (req, file, callback) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/gif",
    ];

    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error("Invalid file type"));
    }
  },
};
