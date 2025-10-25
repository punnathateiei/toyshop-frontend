import React from 'react'
import { ShoppingCart } from 'lucide-react';
import useEcomstore from '../../store/ecom';
import { numberFormat } from '../../utils/number';
import { motion } from 'framer-motion'

const ProductCard = ({ item }) => {
    const actionAddToCart = useEcomstore((state) => state.actionAddToCart)
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
        >
            <div className='border rounded-md p-4 mb-4 shadow-md w-48'>
                <div>
                    {
                        item.images && item.images.length > 0
                            ? <img src={item.images[0].url}
                                className='rounded-md w-full h-24 object-cover hover:scale-105 hover:duration-200' />

                            : <div className='w-full h-24 bg-gray-200 rounded-md text-center flex items-center justify-center shadow'>
                                No image
                            </div>
                    }
                </div>

                <div className='py-2'>
                    <p className='text-xl truncate'>{item.title}</p>
                    <p className='text-sm text-gray-500 truncate'>{item.descirption}</p>
                </div>

                <div className='flex justify-between items-center'>
                    <span className='text-sm font-bold'>{numberFormat(item.price)}</span>
                    <button
                        onClick={() => actionAddToCart(item)}
                        className='bg-blue-400 rounded-md p-2 hover:bg-blue-600 shadow-md'><ShoppingCart /></button>
                </div>
            </div>
        </motion.div>
    )
}

export default ProductCard