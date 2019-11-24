const jwt = require('koa-jwt')
const { secret } = require('../config')

const Router = require('koa-router')
const router = new Router({
  prefix: '/questions/:questionId/answers/:answerId/comments'
})

const {
  find,
  findById,
  update,
  create,
  checkCommentExist,
  checkCommentator,
  delete: del
} = require('../controllers/comments')

// 验证token的中间件
const auth = jwt({ secret })

router.get('/', find)
router.get('/:id', checkCommentExist, findById)
router.post('/', auth, create)
router.patch('/:id', auth, checkCommentExist, checkCommentator, update)
router.delete('/:id', auth, checkCommentExist, checkCommentator, del)

module.exports = router
