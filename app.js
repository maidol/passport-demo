const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')
const app = new Koa()
const passport = require('./passport.js')

app.keys = ['passport-demo']
app.use(session({key: "SESSIONID"}, app))
app.use(bodyParser())
app.use(passport.initialize())
app.use(passport.session())

let router = require('./routes.js')

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(8000, ()=>{
  console.log('listen on 8000')
})