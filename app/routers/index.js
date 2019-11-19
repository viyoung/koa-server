const fs = require('fs')

module.exports = app => {
  fs.readdirSync(__dirname).forEach(file => {
    if (file === 'index.js') {
      //遍历时候排除自己
      return
    }
    const route = require(`./${file}`)
    // allowedMethods 是options方法返回当前框架支持的请求方式，返回405代表框架支持但是没有实现，501代表不支持此种方式的请求
    app.use(route.routes()).use(route.allowedMethods())
  })
}
