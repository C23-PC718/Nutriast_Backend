import { DataTypes } from 'sequelize';
import db from '../configs/db.config.js';

export const IntakeUsers = db.define('intakeuser', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    healthStatus: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fatIntake: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    caloryIntake: {
        type: DataTypes.FLOAT,
    },
    fiberIntake: {
        type: DataTypes.FLOAT,
    },
    carbohidrateIntake: {
        type: DataTypes.FLOAT,
    },
    feedback: {
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