const mongoose = require('mongoose')
const { Schema, model } = mongoose

const commentchema = new Schema(
  {
    __v: {
      type: Number,
      select: false
    },
    content: {
      type: String,
      required: true
    },
    commentator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      select: false
    },
    questionId: {
      type: String,
      required: true
    },
    answerId: {
      type: String,
      required: true
    },
    rootCommentId: {
      type: String,
      required: false
    },
    replyTo: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false
    }
  },
  { timestamps: true } //给字段改变添加时间戳
)

module.exports = model('Comment', commentchema)
