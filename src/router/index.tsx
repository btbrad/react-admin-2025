import { createHashRouter, Navigate } from 'react-router-dom'
import Login from '@/views/Login.tsx'
import Welcome from '@/views/Welcome.tsx'
import NoAuth from '@/views/403.tsx'
import NotFount from '@/views/404.tsx'

const routes = [
  {
    path: '/',
    element: <Welcome />
  },
  {
    path: '/login',
    element: <Login />
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
