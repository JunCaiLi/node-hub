const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

// const userRouter = require('../router/user.router')
// const authRouter = require('../router/auth.router')
const userRoutes = require('../router');
const errorHandle = require('./error-handle')


const app = new Koa();
app.userRoutes = userRoutes;

app.use(bodyParser());
// app.use(userRouter.routes());
// app.use(userRouter.allowedMethods());
app.userRoutes();
app.on('error', errorHandle);

module.exports =  app;