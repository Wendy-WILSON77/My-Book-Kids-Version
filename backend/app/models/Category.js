import { sequelize } from "./dbClient.js";
import { Model, DataTypes } from "sequelize";

export class Category extends Model {}

Category.init({
    category_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
},
{
    sequelize, tableName:"category",
}
);