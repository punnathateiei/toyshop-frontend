import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import useEcomstore from '../../store/ecom';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()
  const actionLogin = useEcomstore((state) => state.actionLogin)
  const user = useEcomstore((state) => state.user)
  console.log('user form zustand', user)
  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const roleRedirect = (role) => {
    if (role == 'admin') {
      navigate('/admin')
    } else {
      navigate(-1)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await actionLogin(form)
      const role = res.data.payload.role
      console.log('role', role)
      roleRedirect(role)
      toast.success('Welcome')
    } catch (err) {
      console.log(err)
      const errMsg = err.response?.data?.message
      toast.error(errMsg)
    }
  }
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='w-full shadow-md bg-white p-8 max-w-md'>
        <h1 className='text-2xl text-center font-bold my-4'>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className='space-y-4'>

            <div>
              <label htmlFor='email-input' className='block mb-1 text-sm font-medium'>
                Email
              </label>
              <input
                id='email-input'
                placeholder='Email'
                className='border w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                onChange={handleOnChange}
                name='email'
                type='email'
              />
            </div>

            <div>
              <label htmlFor='password-input' className='block mb-1 text-sm font-medium'>
                Password
              </label>
              <input
                id='password-input'
                placeholder='Password'
                className='border w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                onChange={handleOnChange}
                name='password'
                type='password'
              />
            </div>

            <button className='w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md'> {/* <<< แต่งปุ่มให้สวยขึ้น */}
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login