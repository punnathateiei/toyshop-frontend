import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import useEcomstore from '../store/ecom'
import UserIcon from '../assets/user.svg'
import { ChevronDown } from 'lucide-react';

function Mainnav() {
    const carts = useEcomstore((state) => state.carts)
    const user = useEcomstore((state) => state.user)
    const logout = useEcomstore((state) => state.logout)
    const [isopen, setIsopen] = useState(false)
    // console.log(Boolean(user))
    const toggleDropdown = () => {
        setIsopen(!isopen)
    }

    return (
        <nav className='bg-white shadow-sm relative z-50'>
            <div className='mx-auto px-4'>
                <div className='flex justify-between h-16'>
                    <div className='flex items-center gap-6'>
                        <Link to={'/'} className='text-2xl font-bold'>LOGO</Link>
                        <NavLink to={'/'} className={({ isActive }) =>
                            isActive
                                ? 'text-red-500 font-bold'
                                : 'hover:text-red-500'
                        }>Home</NavLink>
                        <NavLink to={'/shop'} className={({ isActive }) =>
                            isActive
                                ? 'text-red-500 font-bold'
                                : 'hover:text-red-500 '
                        }>Shop</NavLink>
                        <NavLink className={({ isActive }) =>
                            isActive
                                ? ' text-red-500 font-bold'
                                : ' hover:text-red-500'
                        } to={'/cart'}>
                            Cart {
                                carts.length > 0 && (<span className='absolute top-0 text-black bg-red-500 rounded-full px-2'>{carts.length}</span>)
                            }
                        </NavLink>
                    </div>

                    {
                        user
                            ? <div className="flex items-center gap-4">
                                <button
                                    onClick={toggleDropdown}
                                    className="flex items-center gap-2 hover:opacity-60 transition bg-red-200 px-2 py-1">
                                    <img src={UserIcon} alt="User Icon" className="w-6 h-6" />
                                    <ChevronDown />
                                </button>

                                {
                                    isopen && (
                                        <div className='absolute top-16 bg-white shadow-md'>
                                            <Link
                                                to={'/user/history'}
                                                className='block px-4 py-2 hover:bg-gray-200'>
                                                History
                                            </Link>
                                            <button
                                                onClick={() => logout()}
                                                className='block px-4 py-2 hover:bg-gray-200'>
                                                Logout
                                            </button>
                                        </div>
                                    )
                                }
                            </div>
                            : <div className='flex items-center gap-4'>
                                <NavLink className={({ isActive }) =>
                                    isActive
                                        ? ' text-red-500 font-bold'
                                        : ' hover:text-red-500'
                                } to={'/register'}>Register</NavLink>
                                <NavLink className={({ isActive }) =>
                                    isActive
                                        ? ' text-red-500 font-bold'
                                        : ' hover:text-red-500'
                                } to={'/login'}>Login</NavLink>



                            </div>
                    }





                </div>

            </div>
        </nav>
    )
}


export default Mainnav