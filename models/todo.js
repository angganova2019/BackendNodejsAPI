const { DataTypes } = require('sequelize');
const { db } = require('../config/mysql.config');

db.define('todos', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    activity_group_id: {
        type: DataTypes.INTEGER
    },
    title: {
        type: DataTypes.STRING
    },
    is_active: {
        type: DataTypes.STRING
    },
    priority: {
        type: DataTypes.STRING
    },
    created_at: {
        type: "TIMESTAMP",
        defaultValue: db.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
    },
    updated_at: {
        type: "TIMESTAMP",
        defaultValue: db.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
        allowNull: false,
    },
    deleted_at: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
},
    {
        freezeTableName: true,
        timestamps: true,
        updatedAt: 'updated_at',
        createdAt: 'created_at',
    });

module.exports = { dbtodo: db };