import { sequelize } from "./dbClient.js";
import { Model, DataTypes } from "sequelize";

export class Author extends Model {}

Author.init({
    surname: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
            const value = this.getDataValue('surname'); // récupérer la valeur brut de surname via la méthode sequelize 'getDataValue'
            return value ? value.toUpperCase() : null; // conversion de la valeur en MAJ si elle n'est pas null, sinon retourne null
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
},
{
    sequelize, tableName:"author",
}
);