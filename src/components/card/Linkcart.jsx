import React from 'react'
import { List } from 'lucide-react';
import useEcomstore from '../../store/ecom';
import { Link, useNavigate } from 'react-router-dom';
import { createUserCart } from '../../api/user';
import { toast } from 'react-toastify';
import { numberFormat } from '../../utils/number';

const Linkcart = () => {
  const cart = useEcomstore((state) => state.carts)
  const user = useEcomstore((state) => state.user)
  const token = useEcomstore((state) => state.token)
  const getTotalPrice = useEcomstore((state) => state.getTotalPrice)
  const navigate = useNavigate()

  const handleSavecart = async () => {
    await createUserCart(token, { cart })
      .then((res) => {
        console.log(res)
        toast.success('Add to cart success')
        navigate('/checkout')
      })
      .catch((err) => {
        console.log(err)
        toast.warning(err.response.data.message)
      })
  }

  return (
    <div className='bg-gray-100 rounded-sm p-4'>
      <div className='flex gap-4 mb-4'>
        <List size={36} />
        <p className='text-2xl font-bold'>Product list</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div className='col-span-2'>
          {
            cart.map((item, index) =>
              <div key={index} className='bg-white p-2 rounded-md shadow-sm mb-4'>
                <div className='flex justify-between mb-2'>
                  <div className='flex gap-2 items-center'>

                    {
                      item.images && item.images.length > 0
                        ? <img
                          className='w-16 h-16 rounded-md'
                          src={item.images[0].url} />
                        : <div className='w-16 h-16 bg-gray-200 rounded-md flex text-center items-center'>
                          No Image
                        </div>
                    }

                    <div>
                      <p className='font-bold'>{item.title}</p>
                      <p className='text-sm'>{numberFormat(item.price)} x {item.count}</p>
                    </div>
                  </div>

                  <div>
                    <div className='font-bold '>{numberFormat(item.price * item.count)}</div>
                  </div>
                </div>

              </div>
            )
          }
        </div>

        <div className='bg-white p-4 rounded-md shadow-sm space-y-4'>
          <p className='text-xl font-bold'>Subtotal</p>
          <div className='flex justify-between'>
            <span>Net total:</span>
            <span className='text-2xl font-bold'>{numberFormat(getTotalPrice())}</span>
          </div>

          <div className='flex flex-col gap-2'>
            {
              user
                ? (<Link>
                  <button
                    disabled={cart.length < 1}
                    onClick={handleSavecart}
                    className='bg-red-600 w-full rounded-md text-white py-2 shadow-md hover:bg-red-700'>Buy</button>
                </Link>
                ) : (<Link to={'/login'}>
                  <button className='bg-blue-600 w-full rounded-md text-white py-2 shadow-md hover:bg-blue-700'>Login</button>
                </Link>
                )}
            <Link to={'/shop'}>
              <button className='bg-gray-500 w-full rounded-md text-white py-2 shadow-md hover:bg-gray-600'>Edit item</button>
            </Link>
          </div>

        </div>

      </div>

    </div>
  )
}

export default Linkcart