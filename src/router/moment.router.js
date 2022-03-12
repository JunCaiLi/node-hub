const Router = require('koa-router');

const {
  create,
  momentDetail,
  momentList,
  updateMoment,
  deleteMoment,
} = require('../controller/moment.controller');
const {
  verifyAuthor,
  verifyPermission
} = require('../middleware/auth.middleware');
const momentRouter = new Router({
  prefix: '/moment'
});

momentRouter.post('/', verifyAuthor, create)
momentRouter.get('/', momentList)
momentRouter.get('/:momentId', momentDetail)
// must verifyAuthor -> verifyPermission
momentRouter.patch('/:momentId', verifyAuthor, verifyPermission, updateMoment)
momentRouter.delete('/:momentId', verifyAuthor, verifyPermission, deleteMoment)

module.exports = momentRouter;