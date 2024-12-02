import "dotenv/config";
import pg from "pg";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(process.env.PG_URL, {
  // dialect: "postgres",
  // dialectModule: pg,
  define: {
    timestamps: false,
  },
});

// // test séquelize de la connexion à la bdd
// async function checkConnection() {
//   try {
//     // Vérifie la connexion
//     await sequelize.authenticate();
//     console.log('############################ La connexion à la base de données a été établie avec succès.');
//   } catch (error) {
//     console.error('############################ Impossible de se connecter à la base de données :', error);
//   } finally {
//     // Ferme la connexion proprement après le test
//     await sequelize.close();
//   }
// }

// checkConnection();

