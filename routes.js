const passport = require('./passport.js')
const Router = require('koa-router')

let r = new Router()
r.post('/login', (ctx, next) => {
  // 会调用策略
  return passport.authenticate('local',
    function(err, user, info, status) {
      ctx.body = {user, err, info, status}
      return ctx.login({id: 1, username: 'admin', password: '123456'})
    })(ctx, next)
})
r.get('/logout', ctx=>{
  ctx.logout()
  ctx.body = {auth: ctx.isAuthenticated(), user: ctx.state.user}
})
r.get('/api/userinfo', (ctx, next)=>{
  if (ctx.isAuthenticated()){
    ctx.body = ctx.state.user
  }else{
    ctx.status = 401
    ctx.body = {
      msg: 'auth fail'
    }
  }
})
r.all('404', '*', ctx=>{
  ctx.status = 404
  ctx.body = '404'
})

module.exports = r