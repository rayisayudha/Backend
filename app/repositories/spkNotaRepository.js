const { SpkNota, Users } = require("../models");
const { Op } = require("sequelize");
module.exports = {
  findAll(Args) {
    return SpkNota.findAll({
      include: Users,
    });
  },

  findById(id) {
    return SpkNota.findByPk(id, { include: Users });
  },

  //   findByNama(project) {
  //     return SpkNota.findAll({
  //       where: {
  //         project: {
  //           [Op.iLike]: `%${project}%`,
  //         },
  //       },
  //     });
  //   },

  //   findByKategori(Args) {
  //     return SpkNota.findAll({
  //       where: {
  //         [Op.and]: [
  //           {
  //             idSeller: {
  //               [Op.ne]: Args.id,
  //             },
  //           },
  //           { kategori: Args.kategori },
  //         ],
  //       },
  //     });
  //   },

  //   findByStatus(idSeller, statusProduk) {
  //     return SpkNota.findAll({
  //       where: {
  //         [Op.and]: [{ idSeller }, { statusProduk }],
  //       },
  //     });
  //   },

  //   findByIdSeller(idUser) {
  //     return SpkNota.findAll({
  //       where: {
  //         idUser,
  //       },
  //     });
  //   },

  create(createArgs) {
    return SpkNota.create(createArgs);
  },

  update(id, updateArgs) {
    return SpkNota.update(updateArgs, {
      where: {
        id,
      },
    });
  },

  async delete(id, idUser) {
    return SpkNota.destroy({ where: { id, idUser } });
  },
};
