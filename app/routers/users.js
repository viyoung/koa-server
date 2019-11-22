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
  listFollowingTopics,
  checkUserExist,
  follow,
  unfollow,
  unfollowTopic,
  followTopic,
  listFollowers,
  listQuestions
} = require('./../controllers/users')
const { checkTopicExist } = require('./../controllers/topics')
// 验证token的中间件
const auth = jwt({ secret })

router.get('/', find)
router.post('/', create)
router.get('/:id', findById)
router.patch('/:id', auth, checkOwer, update) // patch 是部分修改字段 put 是全部修改
router.delete('/:id', auth, checkOwer, del)
router.post('/login', login)
router.get('/:id/following', listFollowing)
router.get('/:id/followingTopics', listFollowingTopics)
router.get('/:id/questions', listQuestions)
router.get('/:id/followers', auth, listFollowers)
router.put('/following/:id', auth, checkUserExist, follow)
router.delete('/unfollowing/:id', auth, checkUserExist, unfollow)
router.put('/followingTopics/:id', auth, checkTopicExist, followTopic)
router.delete('/unfollowingTopic/:id', auth, checkTopicExist, unfollowTopic)
module.exports = router
