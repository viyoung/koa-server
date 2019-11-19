const jwt = require('koa-jwt')
const { secret } = require('./../config')

const Router = require('koa-router')
const router = new Router({
  prefix: '/topics'
})

const { find, findById, update, create } = require('./../controllers/topics')

// 验证token的中间件
const auth = jwt({ secret })

router.get('/', find)
router.get('/:id', findById)
router.post('/', auth, create)
router.patch('/:id', auth, update)

module.exports = router
