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
        type: String
      }
    ],
    select: false
  },
  business: {
    type: String,
    select: false
  },
  employments: {
    type: [
      {
        company: {
          type: String
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
        school: { type: String },
        major: { type: String },
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
  }
})

module.exports = model('User', userSchema)
