const Comment = require('../models/comments')

class CommentsCtl {
  async find(ctx) {
    const { per_page = 10 } = ctx.query
    const perPage = Math.max(per_page * 1, 1)
    const page = Math.max(ctx.query.page * 1, 1) - 1
    const q = new RegExp(ctx.query.q)
    const { questionId, answerId } = ctx.params
    const { rootCommentId } = ctx.query
    ctx.body = await Comment.find({
      $or: [{ content: q, questionId, answerId, rootCommentId }]
    })
      .limit(perPage)
      .skip(page * perPage)
      .populate('commentator replyTo')
  }
  async checkCommentator(ctx, next) {
    const { comment } = ctx.state
    if (comment.commentator.toString() !== ctx.state.user._id) {
      ctx.throw(403, '无权限')
    }
    await next()
  }
  async checkCommentExist(ctx, next) {
    const comment = await Comment.findById(ctx.params.id).select('+commentator')
    if (!comment) {
      ctx.throw(404, '评论不存在')
    }
    //只有路由中包含问题id的时候才校验问题是否有这个答案，赞和踩不检查
    if (
      ctx.params.questionId &&
      comment.questionId.toString() !== ctx.params.questionId
    ) {
      ctx.throw(404, '该问题下没有此评论')
    }
    //只有答案存在的时候，才能评论
    if (
      ctx.params.answerId &&
      comment.answerId.toString() !== ctx.params.answerId
    ) {
      ctx.throw(404, '该答案下没有此评论')
    }

    ctx.state.comment = comment
    await next()
  }
  async findById(ctx) {
    const { fields = '' } = ctx.query
    const selectFields = fields
      .split(';')
      .filter(f => f)
      .map(f => ` +${f}`)
      .join('')
    const comment = await Comment.findById(ctx.params.id)
      .select(selectFields)
      .populate('commentator')
    ctx.body = comment
  }
  async create(ctx) {
    ctx.verifyParams({
      content: {
        type: 'string',
        required: true
      },
      rootCommentId: {
        type: 'string',
        required: false
      },
      replyTo: {
        type: 'string',
        required: false
      }
    })
    const comment = await new Comment({
      ...ctx.request.body,
      commentator: ctx.state.user._id,
      answerId: ctx.params.answerId,
      questionId: ctx.params.questionId
    }).save()
    ctx.body = comment
  }
  async update(ctx) {
    ctx.verifyParams({
      content: {
        type: 'string',
        required: false
      }
    })
    const { content } = ctx.request.body
    await ctx.state.comment.update({ content })
    ctx.body = ctx.state.comment
  }
  async delete(ctx) {
    await Comment.findByIdAndRemove(ctx.params.id)
    ctx.status = 204
  }
}

module.exports = new CommentsCtl()
