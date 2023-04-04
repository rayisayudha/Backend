"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SpkNota extends Model {
    static associate(models) {
      models.SpkNota.belongsTo(models.Users, {
        foreignKey: "idUser",
      });
    }
  }
  SpkNota.init(
    {
      idUser: DataTypes.INTEGER,
      project: DataTypes.STRING,
      category: DataTypes.STRING,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      bahan: DataTypes.STRING,
      tebal: DataTypes.STRING,
      ukuran: DataTypes.STRING,
      jumlah: DataTypes.STRING,
      ukuranJadi: DataTypes.STRING,
      ncrTop: DataTypes.STRING,
      ncrMid1: DataTypes.STRING,
      ncrMid2: DataTypes.STRING,
      ncrMid3: DataTypes.STRING,
      ncrBot: DataTypes.STRING,
      cetak: DataTypes.STRING,
      warna: DataTypes.STRING,
      finishing: DataTypes.STRING,
      catatan: DataTypes.STRING,
      status: DataTypes.STRING,
      approval: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "SpkNota",
    }
  );
  return SpkNota;
};
