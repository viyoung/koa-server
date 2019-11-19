const path = require('path')

class HomeCtl {
  index(ctx) {
    ctx.body = '<h3 style="color:pink">这是主页</h3>'
  }
  upload(ctx) {
    const file = ctx.request.files.file
    const basename = path.basename(file.path)
    ctx.body = { url: `${ctx.origin}/uploads/${basename}` }
  }
}

module.exports = new HomeCtl()
