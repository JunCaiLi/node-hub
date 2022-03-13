const Router = require('koa-router');

const {
  createComment,
  replyComment,
  updateComment,
  deleteComment,
  commentList,
} = require('../controller/comment.controller');
const {
  verifyAuthor,
  verifyPermission
} = require('../middleware/auth.middleware');
const commentRouter = new Router({
  prefix: '/comment'
});

commentRouter.post('/', verifyAuthor, createComment)
// restful style
commentRouter.post('/:commentId/reply', verifyAuthor, replyComment)

// must verifyAuthor -> verifyPermission
commentRouter.patch('/:commentId', verifyAuthor, verifyPermission, updateComment)
commentRouter.delete('/:commentId', verifyAuthor, verifyPermission, deleteComment)

commentRouter.get('/', commentList)


module.exports = commentRouter;