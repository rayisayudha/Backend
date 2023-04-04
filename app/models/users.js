"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      models.Users.belongsTo(models.TypeUsers, {
        foreignKey: "typeUser",
      });
    }
  }
  Users.init(
    {
      typeUser: DataTypes.INTEGER,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
