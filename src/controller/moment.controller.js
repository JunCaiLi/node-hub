const momentService = require('../service/moment.service');
const service = require('../service/moment.service')

class MomentController {
  async create(ctx, next) {
    const userId = ctx.user.id;
    const {
      content
    } = ctx.request.body;
    const result = await service.createContent(userId, content);
    ctx.body = result
  }

  async momentDetail(ctx, next) {
    const momentId = ctx.params.momentId
    const result = await service.getMomentById(momentId);
    ctx.body = result
  }

  async momentList(ctx, next) {
    const { offset, size } = ctx.query
    const result = await service.getMomentList(offset, size);
    ctx.body = result
  }

  async updateMoment(ctx, next) {
    const { momentId } = ctx.params;
    const { content } = ctx.request.body;
    const result = await momentService.upDateMoment(content, momentId);
    ctx.body = result;
  }

  async deleteMoment(ctx, next) {
    const { momentId } = ctx.params;
    const result = await momentService.deleteMoment(momentId);
    ctx.body = result;
  }

}

module.exports = new MomentController();