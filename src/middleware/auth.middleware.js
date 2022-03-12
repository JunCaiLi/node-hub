const jwt = require('jsonwebtoken')
const {
  USERNAME_PASSWORD_IS_REQUIRE,
  USER_PASSWORD_FAIL,
  USER_DOES_NOT_EXIST,
  UNAUTHORIZED,
  UNPERMISSION,
} = require('../constant/errorType')
const { PUBLIC_KEY } = require('../app/config')
const userService = require('../service/user.service')
const authService = require('../service/auth.service')
const md5password = require('../utils/password-handle');

const verifyLogin = async (ctx, next) => {
  const {
    name,
    password
  } = ctx.request.body;
  if (!name || !password) {
    const error = new Error(USERNAME_PASSWORD_IS_REQUIRE);

    return ctx.app.emit('error', error, ctx);
  }

  // determine whether user exist
  const result = await userService.getUserByName(name);
  const user = result[0];
  if (!user) {
    const error = new Error(USER_DOES_NOT_EXIST);
    return ctx.app.emit('error', error, ctx);
  }
  // md5 match passwore whether correct
  if (md5password(password) !== user.password) {
    const error = new Error(USER_PASSWORD_FAIL);
    return ctx.app.emit('error', error, ctx);
  }

  ctx.user = user

  await next()
}

const verifyAuthor = async (ctx, next) => {
  const authorization = ctx.header.authorization;
  const token = (authorization || '').split(' ')[1];
  console.log('toke:', token);
  try {
    const result = jwt.verify(token.trim(), PUBLIC_KEY, {
      algorithms: ['RS256']
    });
    // save user information in  context
    ctx.user = result;
    
    await next()
  } catch (err) {
    console.log("verifyAuthor:", err);
    const error = new Error(UNAUTHORIZED);
    return ctx.app.emit('error', error, ctx);
  }
}
/**
 * check whether the user has permission
 * @param {*} ctx 
 * @param {*} next 
 * @returns 
 */
const verifyPermission = async(ctx, next) => {
  const [resorceKey] = Object.keys(ctx.params)
  const tableName = resorceKey.replace("Id", "");
  const resourceId = ctx.params[resorceKey];
  const { id } = ctx.user;
  try {
    const isPermission = await authService.checkResource(tableName, resourceId, id);
    if (!isPermission) throw new Error();
    await next();
  } catch (err) {
    const error = new Error(UNPERMISSION);
    return ctx.app.emit('error', error, ctx);
  }
}

module.exports = {
  verifyLogin,
  verifyAuthor,
  verifyPermission
}