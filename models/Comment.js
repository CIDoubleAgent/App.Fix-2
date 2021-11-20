const { DataTypes, Model } = require("sequelize");
const sequelize = require('../config/connection');

class Comment extends Model {};

Comment.init({
    id: {
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },

    contents: {
        allowNull: false,
        type: DataTypes.STRING
    }
}, { sequelize, modelName: "comment" })

module.exports = Comment

