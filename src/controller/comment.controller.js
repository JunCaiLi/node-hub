const service = require('../service/comment.service');

class CommentController {
  async createComment(ctx, next) {
    const { id } = ctx.user;
    const { content, momentId } = ctx.request.body;
    const result = await service.createComment(id, content, momentId);
    ctx.body = result
  }

  async replyComment (ctx, next) {
    const { id } = ctx.user;
    const { commentId } = ctx.params;
    const { content, momentId } = ctx.request.body;
    const result = await service.replyComment(id, content, momentId, commentId);
    ctx.body = result
  }

  async updateComment(ctx, next) {
    const { commentId } = ctx.params;
    const { content } = ctx.request.body;
    const result = await service.upDateComment(content, commentId);
    ctx.body = result;
  }

  async deleteComment(ctx, next) {
    const { commentId } = ctx.params;
    const result = await service.deleteComment(commentId);
    ctx.body = result;
  }

  async commentList(ctx, next) {
    const { momentId } = ctx.query
    const result = await service.getCommentByMomentId(momentId);
    ctx.body = result;
  }
}

module.exports = new CommentController();