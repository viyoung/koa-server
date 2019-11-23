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
  listQuestions,
  listLikingAnswers,
  likeAnswer,
  unlikeAnswer,
  listDislikingAnswers,
  dislikeAnswer,
  undislikeAnswer,
  listCollectingAnswers,
  collectingAnswer,
  unCollectingAnswer
} = require('./../controllers/users')
const { checkTopicExist } = require('./../controllers/topics')
const { checkAnswerExist } = require('./../controllers/answers')
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
router.get('/:id/collectingAnswers', listCollectingAnswers)
router.put('/collectingAnswers/:id', auth, checkAnswerExist, collectingAnswer)
router.delete(
  '/collectingAnswers/:id',
  auth,
  checkAnswerExist,
  unCollectingAnswer
)
//赞的相关接口
router.get('/:id/likingAnswers', listLikingAnswers)
router.put(
  '/likingAnswers/:id',
  auth,
  checkAnswerExist,
  likeAnswer,
  undislikeAnswer
)
router.delete('/likingAnswers/:id', auth, checkAnswerExist, unlikeAnswer)
//踩的相关接口
router.get('/:id/dislikingAnswers', listDislikingAnswers)
router.put(
  '/dislikingAnswers/:id',
  auth,
  checkAnswerExist,
  dislikeAnswer,
  unlikeAnswer
)
router.delete('/dislikingAnswers/:id', auth, checkAnswerExist, undislikeAnswer)
module.exports = router
