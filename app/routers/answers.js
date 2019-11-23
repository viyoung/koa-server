const jwt = require('koa-jwt')
const { secret } = require('../config')

const Router = require('koa-router')
const router = new Router({
  prefix: '/questions/:questionId/answers'
})

const {
  find,
  findById,
  update,
  create,
  checkAnswerExist,
  checkAnswerer,
  delete: del
} = require('../controllers/answers')

// 验证token的中间件
const auth = jwt({ secret })

router.get('/', find)
router.get('/:id', checkAnswerExist, findById)
router.post('/', auth, create)
router.patch('/:id', auth, checkAnswerExist, checkAnswerer, update)
router.delete('/:id', auth, checkAnswerExist, checkAnswerer, del)

module.exports = router
