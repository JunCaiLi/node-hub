const jwt = require('jsonwebtoken');

const { PRIVATE_KEY } = require('../app/config')

class AuthController {
  async login(ctx , next) {
    const { id, name } = ctx.user;
    // jwt genration sign
    const token = jwt.sign({id, name}, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 60 * 24,
      algorithm: 'RS256'
    });

    ctx.body = token;
    ctx.body = {
      id,
      name,
      token
    }
  }

  async success(ctx) {
    ctx.body = {
      message: 'auhor success'
    }
  }
}

module.exports = new AuthController();