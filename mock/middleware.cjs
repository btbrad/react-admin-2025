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
  /**
   * 用户列表参数转换
   */
  if (req.method === 'GET' && req.url.startsWith('/users/list')) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const params = url.searchParams;

    // 转换参数
    const newParams = new URLSearchParams();

    // 转换 state 参数
    if (params.has('state')) {
      newParams.append('state', params.get('state'));
    }

    // 转换 userId 参数
    if (params.has('userId')) {
      newParams.append('userId', params.get('userId'));
    }

    // 转换 userId 参数
    if (params.has('userName')) {
      newParams.append('userName', params.get('userName'));
    }

    // 转换分页参数
    if (params.has('pageNum')) {
      newParams.append('_page', params.get('pageNum'));
    } else {
      newParams.append('_page', '1'); // 默认值
    }

    if (params.has('pageSize')) {
      newParams.append('_limit', params.get('pageSize'));
    } else {
      newParams.append('_limit', '10'); // 默认值
    }

    // 保留其他查询参数
    params.forEach((value, key) => {
      if (!['pageNum', 'pageSize', 'state', 'userId', 'userName'].includes(key)) {
        newParams.append(key, value);
      }
    });

    // 重写 URL
    req.url = `/userList?${newParams.toString()}`;
  }
  next()
}
