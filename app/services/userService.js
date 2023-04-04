const userRepository = require("../repositories/userRepository");

module.exports = {
  findByEmail(email) {
    return userRepository.findByEmail(email);
  },
  findByUsername(username) {
    return userRepository.findByUsername(username);
  },

  create(user) {
    return userRepository.create(user);
  },

  update(id, user) {
    return userRepository.update(id, user);
  },

  delete(email) {
    return userRepository.delete(email);
  },
};
