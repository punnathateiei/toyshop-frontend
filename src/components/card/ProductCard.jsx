import React from 'react'
import { ShoppingCart } from 'lucide-react';
import useEcomstore from '../../store/ecom';
import { numberFormat } from '../../utils/number';
import { motion } from 'framer-motion'

const ProductCard = ({ item }) => {
    const actionAddToCart = useEcomstore((state) => state.actionAddToCart)
    
    // ตรวจสอบข้อมูล item ก่อนใช้งาน
    if (!item) return null

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
        >
            {/* - เปลี่ยน w-48 เป็น w-56 (กว้างขึ้น)
              - เปลี่ยน shadow-md เป็น shadow-lg
              - เพิ่ม hover:shadow-xl
              - เพิ่ม transition-shadow
              - เพิ่ม overflow-hidden (ป้องกันภาพล้นตอนซูม)
              - เปลี่ยน border เป็น border-gray-200
            */}
            <div className='border border-gray-200 rounded-lg p-4 mb-4 shadow-lg w-56 transition-shadow duration-300 hover:shadow-xl overflow-hidden'>
                
                {/* - เพิ่ม overflow-hidden และ rounded-lg ให้ div ที่ครอบรูป
                  - เปลี่ยน h-24 เป็น h-36 (สูงขึ้น)
                */}
                <div className='rounded-lg overflow-hidden'>
                    {
                        item.images && item.images.length > 0
                            ? <img src={item.images[0].url}
                                className='rounded-lg w-full h-36 object-cover transition-transform duration-300 hover:scale-110' />

                            : <div className='w-full h-36 bg-gray-200 rounded-lg text-center flex items-center justify-center shadow-inner'>
                                <span className='text-gray-500'>No image</span>
                            </div>
                    }
                </div>

                {/* - กำหนดความสูง h-24 เพื่อให้การ์ดทุกใบสูงเท่ากัน
                  - จัดเรียงโดยใช้ flex-col
                */}
                <div className='py-3 h-24 flex flex-col justify-between'>
                    <div>
                        <p className='text-lg font-semibold text-gray-800 truncate'>{item.title}</p>
                        <p className='text-sm text-gray-500 truncate'>{item.descirption || 'No description'}</p>
                    </div>
                </div>

                <div className='flex justify-between items-center pt-3 border-t border-gray-100'>
                    {/* - เพิ่มขนาดราคาเป็น text-lg 
                    */}
                    <span className='text-lg font-semibold text-gray-800'>{numberFormat(item.price)}</span>
                    <button
                        onClick={() => actionAddToCart(item)}
                        className='bg-blue-500 rounded-md p-2 shadow-md hover:bg-blue-600 transition-all duration-200'
                    >
                        <ShoppingCart size={20} />
                    </button>
                </div>
            </div>
        </motion.div>
    )
}

export default ProductCard