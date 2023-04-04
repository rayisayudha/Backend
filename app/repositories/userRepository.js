const { Users } = require("../models");

module.exports = {
  create(createArgs) {
    return Users.create(createArgs);
  },

  update(id, updateArgs) {
    return Users.update(updateArgs, {
      where: {
        id,
      },
    });
  },

  delete(email) {
    return Users.destroy({ where: { email } });
  },

  findByEmail(email) {
    return Users.findOne({ where: { email } });
  },
  findByUsername(username) {
    return Users.findOne({ where: { username } });
  },
};
