import { DataTypes } from 'sequelize';
import db from '../configs/db.config.js';

export const Users = db.define('users', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    birthdate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    height: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fatneed: {
        type: DataTypes.FLOAT,
    },
    proteinneed: {
        type: DataTypes.FLOAT,
    },
    caloryneed: {
        type: DataTypes.FLOAT,
    },
    fiberneed: {
        type: DataTypes.FLOAT,
    },
    carbohidrateneed: {
        type: DataTypes.FLOAT,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
        },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
        },
    }, 
{
  freezeTableName: true
});