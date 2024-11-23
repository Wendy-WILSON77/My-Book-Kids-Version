import { sequelize } from "./dbClient.js";
import { Model, DataTypes } from "sequelize";

export class List extends Model {}

List.init(
    {
        title: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        category_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
    {
        sequelize,
        tableName: 'list',
    }
);

