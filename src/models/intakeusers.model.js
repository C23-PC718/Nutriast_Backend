import { DataTypes } from 'sequelize';
import db from '../configs/db.config.js';

export const IntakeUsers = db.define('intakeuser', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    userid: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    healthstatus: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fatintake: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    caloryintake: {
        type: DataTypes.FLOAT,
    },
    fiberintake: {
        type: DataTypes.FLOAT,
    },
    carbohidrateintake: {
        type: DataTypes.FLOAT,
    },
    feedback: {
        type: DataTypes.TEXT,
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