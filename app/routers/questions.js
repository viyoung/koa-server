const jwt = require('koa-jwt')
const { secret } = require('./../config')

const Router = require('koa-router')
const router = new Router({
  prefix: '/questions'
})

const {
  find,
  findById,
  update,
  create,
  checkQuestionExist,
  checkQuestioner,
  delete: del
} = require('./../controllers/questions')

// 验证token的中间件
const auth = jwt({ secret })

router.get('/', find)
router.get('/:id', checkQuestionExist, findById)
router.post('/', auth, create)
router.patch('/:id', auth, checkQuestionExist, checkQuestioner, update)
router.delete('/:id', auth, checkQuestionExist, checkQuestioner, del)

module.exports = router
