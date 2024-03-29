const Koa = require('koa')
const koaBody = require('koa-body')
const koaStatic = require('koa-static') //将静态资源文件夹变成一个外部可访问的服务
const error = require('koa-json-error')
const parameter = require('koa-parameter')
const mongoose = require('mongoose')
const path = require('path')
const app = new Koa()
const routing = require('./routers/index.js')
const { connectionStr } = require('./config')

mongoose.connect(
  connectionStr,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('mongodb 链接成功了')
  }
)
//监听MongoDB链接错误的信息
mongoose.connection.on('error', error => {
  console.log(error)
})
app.use(koaStatic(path.join(__dirname, 'public')))
app.use(
  error({
    postFormat: (e, { stack, ...rest }) =>
      process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }
  })
)
app.use(
  koaBody({
    multipart: true, //启用文件
    formidable: {
      uploadDir: path.join(__dirname, '/public/uploads'), //上传到的盘符
      keepExtensions: true //保留上传文件拓展名
    }
  })
)
app.use(parameter(app))
routing(app)

app.listen(3000, () => console.log('程序启动在3000端口'))
