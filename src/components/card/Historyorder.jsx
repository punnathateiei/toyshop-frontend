import React, { useEffect, useState } from 'react'
import { getOrders } from '../../api/user';
import useEcomstore from '../../store/ecom';
import { numberFormat } from '../../utils/number';
import { dateFormat } from '../../utils/date';

const Historyorder = () => {
  const [orders, setOrders] = useState([])
  const token = useEcomstore((state) => state.token)

  useEffect(() => {
    handleGet(token)
  }, [])

  const handleGet = (token) => {
    getOrders(token)
      .then((res) => {
        // console.log(res)
        setOrders(res.data.orders)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const Statuscolor = (status) => {
        switch (status) {
            case "Not Process":
                return 'bg-yellow-300';
            case "Processing":
                return 'bg-orange-300';
            case "Completed":
                return 'bg-green-300';
            case "Cancelled":
                return 'bg-red-300';
        }
    }

  return (
    <div className='space-y-2'>
      <h1 className='text-2xl font-bold '>Order History</h1>

      <div className='space-y-4'>
        {
          orders?.map((item, index) => {
            // console.log(item)
            return (
              <div key={index} className='bg-gray-100 p-4 rounded-md shadow-md'>
                <div className='flex justify-between mb-2'>
                  <div>
                    <p className='text-sm'>Order date</p>
                    <p className='font-bold'>{dateFormat(item.updatedAt)}</p>
                  </div>

                  <div>
                    <span className={`${Statuscolor(item.orderStatus)} px-2 py-1 rounded-full font-bold`}>{item.orderStatus}</span>
                  </div>
                </div>

                <div>
                  <table className='border w-full'>
                    <thead>
                      <tr className='bg-gray-200 text-left'>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                      </tr>
                    </thead>

                    <tbody>
                      {
                        item.products?.map((product, index) => {
                          // console.log(product)
                          return (
                            <tr key={index}>
                              <td>{product.product.title}</td>
                              <td>{numberFormat(product.product.price)}</td>
                              <td>{product.count}</td>
                              <td>{numberFormat(product.count * product.product.price)}</td>
                            </tr>
                          )
                        })
                      }

                    </tbody>

                  </table>
                </div>

                <div>
                  <div className='text-right'>
                    <p>Net total</p>
                    <p>{numberFormat(item.cartTotal)}</p>
                  </div>
                </div>
              </div>
            )
          })
        }

      </div>

    </div>
  )
}

export default Historyorder