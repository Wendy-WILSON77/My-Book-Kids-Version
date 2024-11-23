import cron from "node-cron";
import { Router } from "express";
import { authController } from "../controllers/authController.js";
import { isConnected, isAdmin } from "../middleware/authUtils.js";
import { getRandomBook, getOneBook, deleteOneBook, updateOneBook, addOneBook, getAllBooks } from "../controllers/booksController.js";
import { getBookList, toggleBookList } from "../controllers/listController.js";
import { deleteMonProfil, getMonProfil, updateMonProfil } from "../controllers/userMonProfilController.js";
import { addNotice, deleteNotice, getNotice } from "../controllers/noticeController.js";
import { toggleLikeBook } from "../controllers/userLikeBookController.js";
import { getAllCategories } from "../controllers/categoriesController.js";
import { getAllAuthor } from "../controllers/authorController.js";
import { toggleReadBook } from "../controllers/userReadBookController.js";
import { upload } from "../utils/multerConfig.js";

// en cours de test
// const  multer   =  require ( 'multer' ) 
// const upload = multer({ dest: 'public/uploads/'}) // stockage des fichiers téléchargés via le form-data
// const  cpUpload  =  upload . fields ( [ {  name : 'avatar' ,  maxCount : 1  } ,  {  name : 'gallery' ,  maxCount : 8  } ] ) 
// const  upload  =  multer ( {  dest : 'uploads/'  } )
export const router = Router();

// Authentification
router.post('/login', authController.loginUser);
router.post('/signup', authController.registerUser);
router.get('/logout', isConnected, authController.logoutUser);

//Route test middleware connexion.
router.get('/testSession', isConnected, isAdmin, (req,res) => {res.json('Super, tu as bien les accès à cette page ! ')})

// Route pour check les session
// éviter la déconnexion au rechargement de la page
router.get('/checkAuth', authController.checkAuth);

// Route book random => homepage
router.get('/randomBooks', getRandomBook);
// Route book allBooks => la bibliothèque MBI
router.get('/allBooks', getAllBooks);
// Route book detailBook => détail d'un livre
router.get('/book/:id', getOneBook);
// Route book deleteDetailBook => suppression d'un livre (rôle admin) ==> bouton poubelle
router.delete('/book/:id', isConnected, isAdmin, deleteOneBook);
// Route book updateDetailBook => modification d'un livre (rôle admin) ==> bouton crayon
router.put('/book/:id', isConnected, isAdmin, updateOneBook);
// Route book addBook => ajout d'un nouveau livre (rôle admin)
router.post('/book', isConnected, upload.single('cover_image'), addOneBook );


// app.post('/book', cpUpload, function(req, res) { 
//   res.send('Profile uploaded successfully');
// });


// Route pour ajouter/retirer un livre dans la liste ==> bouton coeur
router.post('/toggleList', isConnected, toggleBookList);
// Route list affichage des livres de la liste de l'user => ma liste
router.get('/list', isConnected, getBookList);
 
// Route user mon profil ==> mon profil
router.get('/mon-profil', isConnected, getMonProfil);
// Route user update ==> modifier les informations de son profil
router.put('/mon-profil', isConnected, updateMonProfil);
// Route user delete ==> supprimer son profil
router.delete('/mon-profil', isConnected, deleteMonProfil);

// Route notice all commentaires ==> détail d'un livre (commentaire)
router.get('/notice/:id', isConnected, getNotice);
// Route notice create commentaires ==> détail d'un livre (commentaire)
router.post('/notice/:id', isConnected, addNotice);

//
// J'ajoute un log pour vérifier si la session de l'utilisateur est bien présente avant de passer à la logique du contrôleur.
router.post('/notice/:id', (req, res, next) => {
    console.log('Session utilisateur:', req.session);
    next();
  }, isConnected, addNotice);

// Route notice deleteCommentary ==> détail d'un livre (commentaire)(rôle admin)
router.delete('/notice/:id', isConnected, isAdmin, deleteNotice);

// Route pour avoir toutes les catégories ==>
router.get('/allCategory', getAllCategories );


// Route pour avoir tous les auteurs ==>
router.get('/allAuthor', getAllAuthor);

// Route like sur un livre ==>
router.post('/book/:id/like', isConnected, toggleLikeBook);

// Route read lu ou non lu ==> 
router.post('/book/:id/read', isConnected, toggleReadBook);

// Planification de la tâche cron pour obtenir un livre au hasard toutes les 5 minutes
cron.schedule('*/5 * * * *', () => {
    getRandomBook().then((book) => {
        console.log(`Aller chercher un livre dans ${new Date()}:`, book);
    }).catch((error) => {
        console.log('erreur axios pour affichage palme dOr en random:', error);
    });
});