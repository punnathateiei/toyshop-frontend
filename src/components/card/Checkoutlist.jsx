import React, { useEffect, useState } from 'react'
import { listUserCart, saveAddress } from '../../api/user'
import useEcomstore from '../../store/ecom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { numberFormat } from '../../utils/number';

const Checkoutlist = () => {
    const token = useEcomstore((state) => state.token)
    const [products, setProducts] = useState([])
    const [cartTotal, setCartTotal] = useState(0)
    const [address, setaddress] = useState('')
    const [addressSave, setaddressSave] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        handleGet(token)
    }, [])

    const handleGet = (token) => {
        listUserCart(token)
            .then((res) => {
                // console.log(res)
                setProducts(res.data.products)
                setCartTotal(res.data.cartTotal)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleSaveaddress = () => {
        if (!address) {
            return toast.warning('Please fill address')
        }
        saveAddress(token, address)
            .then((res) => {
                console.log(res)
                toast.success(res.data.message)
                setaddressSave(true)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handlePayment = () => {
        if (!addressSave) {
            return toast.warning('Please fill in your address first')
        }
        navigate('/user/payment')
    }

    return (
        <div className='mx-auto'>
            <div className='flex flex-wrap justify-between'>
                <div className='w-[49%]'>
                    <div className='bg-gray-200 p-4 rounded-md border shadow-md space-y-4'>
                        <h1 className='font-bold text-2xl'>Address</h1>
                        <textarea
                            required
                            onChange={(e) => setaddress(e.target.value)}
                            placeholder='Please fill in your address'
                            className='w-full px-2' />
                        <button
                            onClick={handleSaveaddress}
                            className='bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 hover:scale-105 hover:translate-y-1 hover:duration-200'>
                            Save Address
                        </button>
                    </div>
                </div>

                <div className='w-[49%]'>
                    <div className='bg-gray-200 p-4 rounded-md border shadow-md space-y-4'>
                        <h1 className='font-bold text-2xl'>Summary list</h1>

                        {
                            products?.map((item, index) =>
                                <div key={index}>
                                    <div className='flex justify-between items-end'>
                                        <div>
                                            <p className='font-bold'>{item.product.title}</p>
                                            <p className='text-sm'>Price: {item.count} x {numberFormat(item.product.price)}</p>
                                        </div>

                                        <div>
                                            <p className='font-bold'>{numberFormat(item.count * item.product.price)}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                        <div>
                            <div className='flex justify-between '>
                                <p>Shipping:</p>
                                <p>0.00</p>
                            </div>
                            <div className='flex justify-between '>
                                <p>Discount:</p>
                                <p>0.00</p>
                            </div>
                        </div>

                        <div>
                            <div className='flex justify-between'>
                                <p className='font-bold'>Net total:</p>
                                <p className='text-red-500 font-bold text-lg'>{numberFormat(cartTotal)}</p>
                            </div>
                        </div>

                        <div>
                            <button
                                onClick={handlePayment}
                                // disabled={!addressSave}
                                className='bg-green-400 w-full p-2 rounded-md shadow-md text-white hover:bg-green-500'>
                                Proceed to checkout
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Checkoutlist