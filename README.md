# React Admin 2025

一个基于 React 19 + TypeScript + Vite 7 构建的现代化后台管理系统。

## 技术栈

### 核心框架
- **React 19.2.0** - 采用最新的 React 版本
- **TypeScript 5.9.3** - 类型安全
- **Vite 7.2.2** - 快速的构建工具

### 路由与状态管理
- **React Router DOM 7.9.6** - 路由管理，支持 Hash 模式
- **Zustand 5.0.9** - 轻量级状态管理方案

### UI 组件库
- **Ant Design 5.29.1** - 企业级 UI 组件库
- **@ant-design/icons 6.1.0** - Ant Design 图标库
- **ECharts 6.0.0** - 数据可视化图表库

### 工具库
- **Axios** - HTTP 请求库
- **ahooks 3.9.6** - React Hooks 工具库
- **dayjs** - 轻量级日期处理库
- **Less** - CSS 预处理器

### 开发工具
- **json-server** - Mock 数据服务器
- **ESLint** - 代码质量检查
- **Prettier** - 代码格式化
- **concurrently** - 并行运行多个命令

## 项目功能

- 用户登录 / 权限认证
- 仪表盘（Dashboard）数据展示
- 系统管理：
  - 用户管理（User）
  - 部门管理（Department）
  - 菜单管理（Menu）
- 路由权限控制（基于 React Router v7 Loader）
- 响应式布局

## 项目结构

```
react-admin-2025/
├── src/
│   ├── api/           # API 接口定义
│   ├── assets/        # 静态资源
│   ├── components/    # 公共组件
│   │   ├── Menu/      # 菜单组件
│   │   ├── NavHeader/ # 顶部导航
│   │   └── NavFooter/ # 底部导航
│   ├── hook/          # 自定义 Hooks
│   ├── layout/        # 布局组件
│   ├── router/        # 路由配置
│   ├── store/         # Zustand 状态管理
│   ├── types/         # TypeScript 类型定义
│   ├── utils/         # 工具函数
│   │   ├── request.ts # Axios 封装
│   │   ├── storage.ts # 本地存储封装
│   │   └── loading/   # Loading 组件
│   ├── views/         # 页面视图
│   │   ├── dashboard/ # 仪表盘
│   │   ├── login/     # 登录页
│   │   ├── system/    # 系统管理
│   │   └── welcome/   # 欢迎页
│   ├── App.tsx        # 根组件
│   └── main.tsx       # 应用入口
├── mock/              # Mock 数据
├── public/            # 公共静态资源
└── vite.config.ts     # Vite 配置
```

## 开始使用

### 环境要求

- Node.js >= 18
- pnpm >= 8

### 安装依赖

```bash
pnpm install
```

### 开发模式

启动开发服务器（不包含 Mock 数据）：

```bash
pnpm dev
```

启动开发服务器 + Mock 服务器：

```bash
pnpm dev:mock
```

### 构建打包

生产环境构建：

```bash
pnpm build
```

预发布环境构建：

```bash
pnpm build:staging
```

### 预览构建结果

```bash
pnpm preview
```

### 代码检查

```bash
pnpm lint
```

### Mock 服务器

单独启动 Mock 服务器（运行在 3001 端口）：

```bash
pnpm mock
```

## 环境配置

项目支持多环境配置：

- `.env.development` - 开发环境
- `.env.staging` - 预发布环境
- `.env.production` - 生产环境

## 特色功能

1. **路由权限控制** - 使用 React Router v7 的 Loader 功能实现路由级别的权限控制
2. **状态管理** - 使用 Zustand 进行轻量级状态管理
3. **类型安全** - 全面的 TypeScript 类型定义
4. **Mock 数据** - 集成 json-server，支持前后端分离开发
5. **ECharts 集成** - 封装了 ECharts 的自定义 Hook

## 浏览器支持

- Chrome (推荐)
- Firefox
- Edge
- Safari

## License

MIT
