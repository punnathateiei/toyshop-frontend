import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, UserRoundCog, ChartBarStacked, ListOrdered, ShoppingBasket, LogOut } from 'lucide-react';
import useEcomstore from '../../store/ecom';
import { toast } from 'react-toastify';

const SidebarAdmin = () => {
  const navigate = useNavigate();
  const logout = useEcomstore((state) => state.logout);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    toast.success('Log out Success')
    navigate('/');
  }

  return (
    <div className='bg-gray-600 w-64 text-gray-100 flex flex-col h-screen'>
      <div className='h-24 bg-gray-800 flex items-center justify-center text-2xl font-bold'>
        Admin Panel
      </div>

      <nav className='flex-1 px-4 py-4 space-y-2'>
        <NavLink to={'/admin'} end className={(isActive) =>
          isActive
            ? 'bg-gray-700 rounded-md text-white px-4 py-2 flex items-center'
            : 'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center'
        }>
          <LayoutDashboard className='mr-2' />
          Dashboard
        </NavLink>

        <NavLink to={'manage'} className={(isActive) =>
          isActive
            ? 'bg-gray-700 rounded-md text-white px-4 py-2 flex items-center'
            : 'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center'
        }>
          <UserRoundCog className='mr-2' />
          Manage
        </NavLink>

        <NavLink to={'category'} className={(isActive) =>
          isActive
            ? 'bg-gray-700 rounded-md text-white px-4 py-2 flex items-center'
            : 'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center'
        }>
          <ChartBarStacked className='mr-2' />
          Category
        </NavLink>

        <NavLink to={'product'} className={(isActive) =>
          isActive
            ? 'bg-gray-700 rounded-md text-white px-4 py-2 flex items-center'
            : 'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center'
        }>
          <ShoppingBasket className='mr-2' />
          Product
        </NavLink>

        <NavLink to={'orders'} className={(isActive) =>
          isActive
            ? 'bg-gray-700 rounded-md text-white px-4 py-2 flex items-center'
            : 'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center'
        }>
          <ListOrdered className='mr-2' />
          Order
        </NavLink>
      </nav>

      <div>
        <NavLink
          onClick={handleLogout}
          className={(isActive) =>
            isActive
              ? 'bg-gray-700 rounded-md text-white px-4 py-2 flex items-center'
              : 'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center'
          }>
          <LogOut className='mr-2' />
          Logout
        </NavLink>
      </div>

    </div>
  )
}

export default SidebarAdmin