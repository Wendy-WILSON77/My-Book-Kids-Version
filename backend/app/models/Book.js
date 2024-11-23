import { sequelize } from "./dbClient.js";
import { Model, DataTypes } from "sequelize";

export class Book extends Model {}

Book.init({
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    date_of_publication: {
        type: DataTypes.DATE,
        allowNull: true
    },
    ISBN: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    cover_image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    author_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
},
{
    sequelize, tableName:"book",
}
);