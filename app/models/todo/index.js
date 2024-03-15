const { DataTypes } = require('sequelize');
const sequelize = require("../../config/db");
const UserModel = require('../user');

const Todo = sequelize.define('Todo', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: UserModel,
            key: 'id'
        }
    }
}, {timestamps: true})

Todo.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'todo_belongsTo_user',
})

UserModel.hasMany(Todo, {
    foreignKey: 'userId',
    as: 'user_hasOne_todo'
})

// Todo.sync({ force: true })

// update Todo table if exist without delete
// await Todo.sync({ alter: true });
// drop and create Todo table
// await Todo.sync({ force: true });
// create Todo table if not exist
module.exports = Todo