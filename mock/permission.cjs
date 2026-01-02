module.exports = [
        {
          _id: 1,
          menuName: "工作台",
          icon: "DesktopOutlined",
          path: "/dashboard",
          menuType: 1,
          menuState: 1,
          menuCode: 'dashboard',
          parentId: 0,
          component: "Dashboard",
          children: [
            {
              _id: 2,
              menuName: "分析页",
              icon: "bar-chart",
              path: "/dashboard/analysis",
              menuType: 1,
              menuState: 1,
              menuCode: 'dashboard',
              parentId: 1,
              component: "Dashboard",
            }
          ]
        },
        {
          _id: 3,
          menuName: "系统管理",
          icon: "SettingOutlined",
          path: "system",
          menuType: 1,
          menuState: 1,
          menuCode: '',
          parentId: 0,
          component: "",
          children: [
            {
              _id: 5,
              menuName: "用户管理",
              icon: "TeamOutlined",
              path: "/userList",
              menuType: 1,
              menuState: 1,
              menuCode: '',
              parentId: 3,
              component: "User",
              orderBy: 1
            },
            {
              _id: 6,
              menuName: "菜单管理",
              icon: "MenuOutlined",
              path: "/menuList",
              menuType: 1,
              menuState: 1,
              menuCode: '',
              parentId: 3,
              component: "Menu",
              orderBy: 2
            },
            {
              _id: 7,
              menuName: "角色管理",
              icon: "TrademarkCircleOutlined",
              path: "/roleList",
              menuType: 1,
              menuState: 1,
              menuCode: '',
              parentId: 3,
              component: "Role",
              orderBy: 2
            },
            {
              _id: 8,
              menuName: "部门管理管理",
              icon: "ProfileOutlined",
              path: "/deptList",
              menuType: 1,
              menuState: 1,
              menuCode: '',
              parentId: 3,
              component: "Dept",
              orderBy: 2
            },
          ]
        },
        {
          _id: 4,
          menuName: "订单管理",
          icon: "DatabaseOutlined",
          path: "",
          menuType: 1,
          menuState: 1,
          menuCode: '',
          parentId: 0,
          component: "",
          children: []
        },
      ]
