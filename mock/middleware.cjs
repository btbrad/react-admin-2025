module.exports = (req, res, next) => {
  if (req.method === 'POST' && req.path === '/login') {
    if (req.body.username === 'admin' && req.body.password === '123456') {
      return res.status(200).json({
        code: 1,
        data: 'this_is_a_token',
        msg: '登录成功',
      })
    } else {
      return res.status(200).json({
        code: 0,
        msg: '用户名或者密码错误',
      })
    }
  }
  if (req.method === 'POST' && req.path === '/register') {
    return res.status(200).json({
      code: 1,
      msg: '注册成功',
    })
  }
  next()
}
