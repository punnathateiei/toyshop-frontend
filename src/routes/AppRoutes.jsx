import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../pages/Home'
import Shop from '../pages/Shop'
import Cart from '../pages/Cart'
import History from '../pages/user/History'
import Checkout from '../pages/Checkout'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Layout from '../layouts/Layout'
import Layoutadmin from '../layouts/Layoutadmin'
import Dashboard from '../pages/admin/Dashboard'
import Category from '../pages/admin/Category'
import Product from '../pages/admin/Product'
import Manage from '../pages/admin/Manage'
import Layoutuser from '../layouts/Layoutuser'
import Homeuser from '../pages/user/Homeuser'
import ProtectRouteUser from './ProtectRouteUser'
import ProtectRouteAdmin from './ProtectRouteAdmin'
import Editproduct from '../pages/admin/Editproduct'
import Payment from '../pages/user/Payment'
import Manageorder from '../pages/admin/Manageorder'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'shop', element: <Shop /> },
      { path: 'cart', element: <Cart /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
    ]
  },
  {
    path: '/admin',
    element: <ProtectRouteAdmin element={<Layoutadmin />} />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'category', element: <Category /> },
      { path: 'product', element: <Product /> },
      { path: 'product/:id', element: <Editproduct /> },
      { path: 'manage', element: <Manage /> },
      { path: 'orders', element: <Manageorder /> },
    ]
  },
  {
    path: '/user',
    // element: <Layoutuser/>,
    element: <ProtectRouteUser element={<Layoutuser />} />,
    children: [
      { index: true, element: <Homeuser /> },
      { path: 'payment', element: <Payment/> },
      { path: 'history', element: <History /> },
    ]
  },
])

const AppRoutes = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default AppRoutes