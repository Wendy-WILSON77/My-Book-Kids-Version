import multer from "multer";
import path from "path";

// Configuration du storage (stockage)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
  
  // Configuration de Multer
  export const upload = multer({ 
    storage: storage,
    limits : { fileSize: 2 * 1024 * 1024 }, // Limiter la taille du fichier à 2MB
    // Accepter que les types de fichier webp
    fileFilter: (req, file, cb) => {
      const fileTypes = /webp|jpeg|png|jpg/;
      const mimetype = fileTypes.test(file.mimetype);
      const extname = fileTypes.test(
        path.extname(file.originalname).toLowerCase()
      );
  
      if (mimetype && extname) {
        return cb(null, true);
      }
      cb(new Error("Erreur : Seuls les fichiers images sont autorisés!"));
    }
   })