const mongoose = require('mongoose')
const { Schema, model } = mongoose

const questionsSchema = new Schema(
  {
    __v: {
      type: Number,
      select: false
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    questioner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      select: false
    },
    topics: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Topic'
        }
      ],
      select: false
    }
  },
  { timestamps: true } //给字段改变添加时间戳
)

module.exports = model('Question', questionsSchema)
