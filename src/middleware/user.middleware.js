const { USERNAME_PASSWORD_IS_REQUIRE, USER_ALREADY_EXIST } = require('../constant/errorType')
const service = require('../service/user.service')
const md5password = require('../utils/password-handle');

const verifyUser = async(ctx, next) => {
  const {name, password} = ctx.request.body;
  if (!name || !password) {
    const error = new Error(USERNAME_PASSWORD_IS_REQUIRE);

    return ctx.app.emit('error', error, ctx);
  }

  // determine whether user exist
  const result = await service.getUserByName(name);
  if (result.length) {
    const error = new Error(USER_ALREADY_EXIST);
    return ctx.app.emit('error', error, ctx);
  }

  await next()
}
// process crypto by md5
const handlePassword = async(ctx, next) => {
  const { password } = ctx.request.body;
  ctx.request.body.password = md5password(password);

  await next()
}

module.exports = {
  verifyUser,
  handlePassword,
}