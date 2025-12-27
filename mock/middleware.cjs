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

  /**
   * 上传图片
   */
  if (req.method === 'POST' && req.path === '/users/upload') {
    return res.status(200).json({
      code: 1,
      data: {
        file: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      msg: '上传成功',
    })
  }

  // 创建用户
  if (req.method === 'POST' && req.path === '/users/create') {
    return res.status(200).json({
      code: 1,
      data: {
        id: 1,
        username: req.body.username,
        password: req.body.password,
        avatar: req.body.avatar,
        phone: req.body.phone,
        email: req.body.email,
        createTime: Date.now(),
      },
      msg: '创建成功',
    })
  }

  // 编辑用户
  if (req.method === 'POST' && req.path === '/users/edit') {
    return res.status(200).json({
      code: 1,
      data: {
        id: req.body.id,
        username: req.body.username,
        password: req.body.password,
        avatar: req.body.avatar,
        phone: req.body.phone,
        email: req.body.email,
      },
      msg: '编辑成功',
    })
  }

  // 删除用户
  if (req.method === 'POST' && req.path === '/users/delete') {
    return res.status(200).json({
      code: 1,
      data: req.body.id,
      msg: '删除成功',
    })
  }

  if (req.method === 'POST' && req.path === '/dept/list') {
    return res.status(200).json({
      code: 1,
      data: [
        {
          _id: '1',
          userName: '张三',
          deptName: '研发部',
          parentId: '',
          createTime: Date.now(),
          updateTime: Date.now(),
          children: [
            {
              _id: '2',
              userName: '李四',
              deptName: '前端组',
              parentId: '1',
              createTime: Date.now(),
              updateTime: Date.now(),
            },
            {
              _id: '3',
              userName: '2王五',
              deptName: '后端组',
              parentId: '1',
              createTime: Date.now(),
              updateTime: Date.now(),
            }
          ]
        }
      ],
      msg: '删除成功',
    })
  }

  if (req.method === 'POST' && req.path === '/dept/create') {
    return res.status(200).json({
      code: 1,
      msg: '创建成功',
    })
  }

  if (req.method === 'POST' && req.path === '/dept/edit') {
    return res.status(200).json({
      code: 1,
      msg: '编辑成功',
    })
  }

  if (req.method === 'POST' && req.path === '/dept/edit') {
    return res.status(200).json({
      code: 1,
      msg: '编辑成功',
    })
  }

  if (req.method === 'POST' && req.path === '/dept/delete') {
    return res.status(200).json({
      code: 1,
      msg: '删除成功',
    })
  }
  next()
}
