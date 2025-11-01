import React from 'react'
import { Trash2, Minus, Plus } from 'lucide-react';
import useEcomstore from '../../store/ecom';
import { Link } from 'react-router-dom';
import { numberFormat } from '../../utils/number';

const Cartcard = () => {
    const carts = useEcomstore((state) => state.carts)
    const actionUpdateQuantity = useEcomstore((state) => state.actionUpdateQuantity)
    const actionDeleteProduct = useEcomstore((state) => state.actionDeleteProduct)
    const getTotalPrice = useEcomstore((state) => state.getTotalPrice)

    return (
        // - ปรับปรุง card หลักให้ดูนุ่มนวลขึ้น
        <div className='bg-white rounded-lg shadow-xl border border-gray-100'>
            {/* - เปลี่ยน h1 เป็น "Shopping Cart" 
              - เพิ่ม padding และเส้นขอบล่าง
            */}
            <h1 className='text-xl font-bold p-4 border-b border-gray-200'>Shopping Cart</h1>

            {/* - เพิ่ม max-h-80 (จำกัดความสูง) และ overflow-y-auto (ให้เลื่อนได้)
              - แบ่งโซน content ด้วย p-4
            */}
            <div className='p-4 max-h-80 overflow-y-auto'>
                {
                    carts.length === 0 
                    ? <p className='text-center text-gray-500 py-8'>Your cart is empty.</p>
                    : carts.map((item, index) => (
                        // - ลบเงา (shadow-md) ของแต่ละ item ออก
                        // - ใช้เส้นขอบ (border-b) แบ่งแทน
                        <div key={index} className='flex gap-3 py-3 border-b border-gray-100 last:border-b-0'>
                            {/* Image */}
                            <div>
                            {
                                item.images && item.images.length > 0
                                    ? <img
                                        className='w-16 h-16 rounded-md object-cover'
                                        src={item.images[0].url} />
                                    : <div className='w-16 h-16 bg-gray-200 rounded-md flex text-center items-center justify-center shadow-inner'>
                                        <span className='text-xs text-gray-500'>No Img</span>
                                      </div>
                            }
                            </div>
                            
                            {/* Info & Controls */}
                            <div className='flex-grow flex flex-col justify-between'>
                                <div className='flex justify-between items-start'>
                                    <span className='font-semibold text-gray-800'>{item.title}</span>
                                    <button 
                                      onClick={() => actionDeleteProduct(item.id)}
                                      className='text-gray-400 hover:text-red-500 transition-colors'
                                    >
                                      <Trash2 size={16} />
                                    </button>
                                </div>
                                <div className='flex justify-between items-center mt-2'>
                                    {/* - ปรับปุ่ม เพิ่ม-ลด ให้นุ่มนวลขึ้น */}
                                    <div className='border border-gray-200 rounded-md px-2 py-1 flex items-center'>
                                        <button
                                            onClick={() => actionUpdateQuantity(item.id, item.count - 1)}
                                            className='px-1 text-gray-500 rounded-sm hover:bg-gray-100'><Minus size={14} /></button>
                                        <span className='px-3 text-sm font-semibold'>{item.count}</span>
                                        <button
                                            onClick={() => actionUpdateQuantity(item.id, item.count + 1)}
                                            className='px-1 text-gray-500 rounded-sm hover:bg-gray-100'><Plus size={14} /></button>
                                    </div>
                                    <div className='font-bold text-gray-800'>{numberFormat(item.price * item.count)}</div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            
            {/* - จัดรูปแบบส่วน Total และ Button ใหม่
              - เพิ่ม padding และเส้นขอบบน
            */}
            {carts.length > 0 && (
                <div className='p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg'>
                    <div className='flex justify-between px-2 text-lg font-semibold text-gray-800'>
                        <span>Total</span>
                        <span>{numberFormat(getTotalPrice())}</span>
                    </div>

                    <Link to='/cart'>
                        <button className='mt-4 bg-green-500 hover:bg-green-600 text-white w-full py-2.5 rounded-md shadow-md transition-all duration-200 hover:shadow-lg'>
                            Proceed to Payment
                        </button>
                    </Link>
                </div>
            )}

        </div>
    )
}

export default Cartcard