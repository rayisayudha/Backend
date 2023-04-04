/* eslint-disable no-unused-vars */
"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "TypeUsers",
      [
        {
          id: 1,
          typeUser: "Produksi",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          typeUser: "Manager",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("TypeUsers", null, {});
  },
};
