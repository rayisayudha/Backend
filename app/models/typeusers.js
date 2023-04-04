"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TypeUsers extends Model {
    static associate(models) {
      models.TypeUsers.hasMany(models.Users, {
        foreignKey: "typeUser",
      });
    }
  }
  TypeUsers.init(
    {
      typeUser: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TypeUsers",
    }
  );
  return TypeUsers;
};
