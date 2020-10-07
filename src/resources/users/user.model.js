const uuid = require('uuid');

class User {
  constructor({ name = 'USER', login = 'user', password = 'P@55w0rd' } = {}) {
    this.id = uuid();
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user) {
    const { id = uuid(), name = 'default', login = '' } = user;

    return { id, name, login };
  }
}

module.exports = User;
