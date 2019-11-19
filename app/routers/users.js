const jwt = require('koa-jwt')
const { secret } = require('./../config')

const Router = require('koa-router')
const router = new Router({ prefix: '/users' })
const {
  find,
  create,
  findById,
  update,
  delete: del, //原因是delete是js的关键字
  login,
  checkOwer,
  listFollowing,
  checkUserExist,
  follow,
  unfollow,
  listFollowers
} = require('./../controllers/users')
// 验证token的中间件
const auth = jwt({ secret })

router.get('/', find)
router.post('/', create)
router.get('/:id', findById)
router.patch('/:id', auth, checkOwer, update) // patch 是部分修改字段 put 是全部修改
router.delete('/:id', auth, checkOwer, del)
router.post('/login', login)
router.get('/:id/following', listFollowing)
router.get('/:id/followers', auth, listFollowers)
router.put('/following/:id', auth, checkUserExist, follow)
router.delete('/unfollowing/:id', auth, checkUserExist, unfollow)
module.exports = router
