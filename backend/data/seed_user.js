import "dotenv/config";
import { authController } from "../app/controllers/authController.js";
import { User } from "../app/models/User.js";
import bcrypt from "bcrypt";
// fichier servant à hacher les mots de passe des utilisateurs avant de les enregistrer en base de données
const users = [
    {
        email: "test1@gmail.com",
        password: "Testtest11",
        surname: "Test", 
        name: "TESTE", 
        pseudo: " test-signup", 
        isAdmin: true,
        confirmation: "Testtest11"
    },
    {
        email: "test2@gmail.com",
        password: "Testtest22",
        surname: "test", 
        name: "test", 
        pseudo: " test-signup", 
        confirmation: "Testtest22"
    },
    {
        email: "test3@gmail.com",
        password: "Testtest33",
        surname: "Test", 
        name: "TESTE", 
        pseudo: " test-signup", 
        confirmation: "Testtest33"
    }
];

const seedUsers = async (users) => {
    await users.forEach(async (user) => {
         // Récupérer le body : surname, name, email, password, confirm
         const { surname, name, pseudo, isAdmin, email, password, confirmation } = user;
         // Hasher le mot de passe avant de l'enregistrer en base de données
         const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
         const hashedPassword = await bcrypt.hash(password, saltRounds);
   
         // Créer l'utilisateur en BDD en utilisant Sequelize (donc protège des injections SQL)
         await User.create({
           surname,
           name,
           pseudo,
           isAdmin,
           email,
           password: hashedPassword,
         });
         console.log(`User : ${user.email}, créer en bdd. Next user`);
    })
}

await seedUsers(users); 