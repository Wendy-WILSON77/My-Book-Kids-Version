import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from './dbClient.js';

export class Notice extends Sequelize.Model {}

Notice.init(
    {
        like: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        commentary: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        book_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
    {
        sequelize,
        tableName: 'notice',
    }
);
