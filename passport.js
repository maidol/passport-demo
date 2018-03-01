const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;

// 序列化
// ctx.login()触发
passport.serializeUser((user, done) => {
  console.log('serializeUser:', user);
  done(null, user.id);
});

// 反序列化
//（请求时，session中存在"passport":{"user":"1"}触发）
passport.deserializeUser(async (id, done) => {
  console.log('deserializeUser:', id);
  let user = { id, username: 'admin', password: '123456' };
  done(null, user);
});

// 提交数据(策略)
passport.use(new LocalStrategy({
  // usernameField: 'email',
  // passwordField: 'password',
}, (username, password, done)=>{
  console.log('LocalStrategy', username, password);
  let user = {id: 1, username, password};
  done(null, user, {msg: 'passport demo'});
}));

module.exports = passport;