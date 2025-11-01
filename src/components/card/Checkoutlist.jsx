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

  // ====== ฟอร์มชื่อ + ที่อยู่ (แยกช่อง) ======
  const [fullName, setFullName] = useState('')
  const [addr, setAddr] = useState({
    detail: '',       // บ้านเลขที่/หมู่/ซอย/ถนน
    subdistrict: '',  // ตำบล/แขวง
    district: '',     // อำเภอ/เขต
    province: '',     // จังหวัด
    zipcode: ''       // รหัสไปรษณีย์
  })

  const [addressSave, setaddressSave] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    handleGet(token)
  }, [])

  const handleGet = (token) => {
    listUserCart(token)
      .then((res) => {
        setProducts(res.data.products)
        setCartTotal(res.data.cartTotal)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const formatThaiAddress = (name, a) =>
    `${name} | ${a.detail} ต.${a.subdistrict} อ.${a.district} จ.${a.province} ${a.zipcode}`.trim()

  const handleSaveaddress = () => {
    const { detail, subdistrict, district, province, zipcode } = addr
    if (!fullName || !detail || !subdistrict || !district || !province || !zipcode) {
      return toast.warning('Please fill address')
    }
    const addressString = formatThaiAddress(fullName, addr) // รวมเป็นสตริงเดียวเพื่อเข้ากับ API เดิม
    saveAddress(token, addressString)
      .then((res) => {
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
      <div className='flex flex-wrap justify-between gap-y-6'>
        {/* ====== ซ้าย: ฟอร์มชื่อ + ที่อยู่ ====== */}
        <div className='w-[49%] min-w-[320px]'>
          <div className='bg-gray-200 p-4 rounded-md border shadow-md space-y-3'>
            <h1 className='font-bold text-2xl'>Address</h1>

            <input
              type="text"
              placeholder="ชื่อผู้รับ"
              className="w-full px-2 py-2 rounded-md"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <input
              type="text"
              placeholder="บ้านเลขที่ / หมู่ / ซอย / ถนน"
              className="w-full px-2 py-2 rounded-md"
              value={addr.detail}
              onChange={(e) => setAddr({ ...addr, detail: e.target.value })}
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="ตำบล / แขวง"
                className="w-full px-2 py-2 rounded-md"
                value={addr.subdistrict}
                onChange={(e) => setAddr({ ...addr, subdistrict: e.target.value })}
              />
              <input
                type="text"
                placeholder="อำเภอ / เขต"
                className="w-full px-2 py-2 rounded-md"
                value={addr.district}
                onChange={(e) => setAddr({ ...addr, district: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="จังหวัด"
                className="w-full px-2 py-2 rounded-md"
                value={addr.province}
                onChange={(e) => setAddr({ ...addr, province: e.target.value })}
              />
              <input
                type="text"
                placeholder="รหัสไปรษณีย์"
                className="w-full px-2 py-2 rounded-md"
                value={addr.zipcode}
                onChange={(e) => {
                  const v = e.target.value.replace(/[^\d]/g, '').slice(0, 5) // รับเฉพาะตัวเลข 5 หลัก
                  setAddr({ ...addr, zipcode: v })
                }}
              />
            </div>

            {/* Preview ที่อยู่ที่จะถูกบันทึก */}
            <div className="text-sm text-gray-700">
              <span className="font-medium">Preview:</span>{' '}
              {formatThaiAddress(fullName, addr)}
            </div>

            <button
              onClick={handleSaveaddress}
              className='bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 hover:scale-105 hover:translate-y-1 hover:duration-200 disabled:opacity-60'
            >
              Save Address
            </button>
          </div>
        </div>

        {/* ====== ขวา: Summary ====== */}
        <div className='w-[49%] min-w-[320px]'>
          <div className='bg-gray-200 p-4 rounded-md border shadow-md space-y-4'>
            <h1 className='font-bold text-2xl'>Summary list</h1>

            {products?.map((item, index) =>
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
            )}

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
                className='bg-green-400 w-full p-2 rounded-md shadow-md text-white hover:bg-green-500'
              >
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
