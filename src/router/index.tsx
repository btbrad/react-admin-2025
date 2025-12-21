import { createHashRouter, Navigate } from 'react-router-dom'
import Login from '@/views/login/Login'
import Welcome from '@/views/welcome'
import NoAuth from '@/views/403.tsx'
import NotFount from '@/views/404.tsx'
import Layout from '@/layout/index'
import Dashboard from '@/views/dashboard'
import User from '@/views/system/user'
import Dept from '@/views/system/dept'

const routes = [
  {
    path: '/',
    element: <Navigate to='/welcome' />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    element: <Layout />,
    children: [
      {
        path: '/welcome',
        element: <Welcome />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/userList',
        element: <User />
      },
      {
        path: '/deptList',
        element: <Dept />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to='/404' />
  },
  {
    path: '/404',
    element: <NotFount />
  },
  {
    path: '/403',
    element: <NoAuth />
  }
]

const router = createHashRouter(routes)

export default router
