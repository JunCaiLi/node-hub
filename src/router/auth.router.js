const Router = require('koa-router');

const { login, success } = require('../controller/auth.controller');
const { verifyLogin, verifyAuthor } = require('../middleware/auth.middleware');
const authRouter = new Router();

authRouter.post('/login', verifyLogin, login)

authRouter.get('/testAuthor', verifyAuthor, success)

module.exports = authRouter;