const mongoose = require('mongoose')
const { Schema, model } = mongoose

const userSchema = new Schema({
  __v: { type: Number, select: false }, //隐藏此字段
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false //当前字段不能被查询返回
  },
  avatar_url: {
    type: String
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    default: 'male',
    select: false,
    required: true
  },
  headline: { type: String },
  locations: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Topic'
      }
    ],
    select: false
  },
  business: {
    type: Schema.Types.ObjectId,
    ref: 'Topic',
    select: false
  },
  employments: {
    type: [
      {
        company: {
          type: Schema.Types.ObjectId,
          ref: 'Topic'
        },
        job: {
          type: String
        }
      }
    ],
    select: false
  },
  educations: {
    type: [
      {
        school: { type: Schema.Types.ObjectId, ref: 'Topic' },
        major: { type: Schema.Types.ObjectId, ref: 'Topic' },
        diploma: {
          type: Number,
          enum: [1, 2, 3, 4, 5]
        },
        entrance_year: { type: Number },
        graducation_year: { type: Number }
      }
    ],
    select: false
  },
  following: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User' //和用户_id关联
      }
    ],
    select: false
  },
  followingTopics: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
    select: true
  },
  likingAnswers: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Answer'
      }
    ],
    select: false
  },
  dislikingAnswers: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Answer'
      }
    ],
    select: false
  },
  collectingAnswers: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Answer'
      }
    ],
    select: false
  }
})

module.exports = model('User', userSchema)
