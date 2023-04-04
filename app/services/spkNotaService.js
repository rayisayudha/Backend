/* eslint-disable no-useless-catch */
const spkNotaRepository = require("../repositories/spkNotaRepository");

module.exports = {
  create(requestBody) {
    return spkNotaRepository.create(requestBody);
  },

  update(id, requestBody) {
    return spkNotaRepository.update(id, requestBody);
  },

  delete(id, idUser) {
    return spkNotaRepository.delete(id, idUser);
  },

  getById(id) {
    return spkNotaRepository.findById(id);
  },

  // getByKategori(Args) {
  //     return productsRepository.findByKategori(Args);
  // },

  // getByNama(namaProduk) {
  //     return productsRepository.findByNama(namaProduk);
  // },

  async list(Args) {
    return spkNotaRepository.findAll(Args);
  },

  // async listByStatus(idSeller, statusProduk) {
  //     return await productsRepository.findByStatus(idSeller, statusProduk);
  // },

  // async findByIdSeller(idSeller) {
  //     return await productsRepository.findByIdSeller(idSeller);
  // },
};
