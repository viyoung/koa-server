const jwt = require('koa-jwt')
const { secret } = require('./../config')

const Router = require('koa-router')
const router = new Router({
  prefix: '/topics'
})

const {
  find,
  findById,
  update,
  create,
  checkTopicExist,
  listTopicFollowers,
  listQuestions
} = require('./../controllers/topics')

// 验证token的中间件
const auth = jwt({ secret })

router.get('/', find)
router.get('/:id', checkTopicExist, findById)
router.post('/', auth, create)
router.patch('/:id', auth, checkTopicExist, update)
router.get('/:id/topicFollowers', checkTopicExist, listTopicFollowers)
router.get('/:id/questions', checkTopicExist, listQuestions)

module.exports = router
