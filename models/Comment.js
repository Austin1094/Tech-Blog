const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model { }

Comment.init(
    {
        body: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        sequelize
    }
);

module.exports = Comment;