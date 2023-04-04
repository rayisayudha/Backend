'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SpkNota', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idUser: {
        type: Sequelize.INTEGER
      },
      project: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      startDate: {
        type: Sequelize.DATE
      },
      endDate: {
        type: Sequelize.DATE
      },
      bahan: {
        type: Sequelize.STRING
      },
      tebal: {
        type: Sequelize.STRING
      },
      ukuran: {
        type: Sequelize.STRING
      },
      jumlah: {
        type: Sequelize.STRING
      },
      ukuranJadi: {
        type: Sequelize.STRING
      },
      ncrTop: {
        type: Sequelize.STRING
      },
      ncrMid1: {
        type: Sequelize.STRING
      },
      ncrMid2: {
        type: Sequelize.STRING
      },
      ncrMid3: {
        type: Sequelize.STRING
      },
      ncrBot: {
        type: Sequelize.STRING
      },
      cetak: {
        type: Sequelize.STRING
      },
      warna: {
        type: Sequelize.STRING
      },
      finishing: {
        type: Sequelize.STRING
      },
      catatan: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      approval: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SpkNota');
  }
};