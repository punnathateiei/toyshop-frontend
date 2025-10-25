import React, { useEffect, useState } from 'react'
import { getOrderadmin, changeOrderStatus } from '../../api/admin'
import useEcomstore from '../../store/ecom'
import { toast } from 'react-toastify'
import { numberFormat } from '../../utils/number'
import { dateFormat } from '../../utils/date'


const Tableorder = () => {
    const token = useEcomstore((state) => state.token)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        handleGetorder(token)
    }, [])

    const handleGetorder = (token) => {
        getOrderadmin(token)
            .then((res) => {
                setOrders(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleChangeOrderStatus = (token, orderId, orderStatus) => {
        console.log(orderId, orderStatus)
        changeOrderStatus(token, orderId, orderStatus)
            .then((res) => {
                console.log(res)
                toast.success('Update Status Success')
                handleGetorder(token)
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
        <div className='container mx-auto p-4 bg-white shadow-md'>
            <div>
                <table className="w-full border-collapse border">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="px-3 py-2 border-b">Order</th>
                            <th>User</th>
                            <th>Date</th>
                            <th>Product</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Manage</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders?.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-5 py-2 border-b">{index + 1}</td>
                                <td className="py-2 border-b">
                                    <p>{item.orderedBy.email}</p>
                                    <p>{item.orderedBy.address}</p>
                                </td>

                                <td>
                                    {dateFormat(item.createdAt)}
                                </td>

                                <td className="py-2 border-b">
                                    {item.products?.map((product, i) => (
                                        <li key={i}>
                                            {product.product.title}{" "}
                                            <span>
                                                {product.count} x {numberFormat(product.product.price)}
                                            </span>
                                        </li>
                                    ))}
                                </td>
                                <td className="py-2 border-b">{numberFormat(item.cartTotal)}</td>

                                <td className="py-2 border-b">
                                    <span className={`${Statuscolor(item.orderStatus)} px-2 py-1 rounded-full`}>
                                        {item.orderStatus}
                                    </span>
                                </td>

                                <td className="py-2 border-b">
                                    <select
                                        value={item.orderStatus}
                                        onChange={(e) => handleChangeOrderStatus(token, item.id, e.target.value)}
                                    >
                                        <option value={0}>Not Process</option>
                                        <option>Processing</option>
                                        <option>Completed</option>
                                        <option>Cancelled</option>
                                    </select>
                                </td>

                            </tr>
                        )
                        )
                        }
                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default Tableorder