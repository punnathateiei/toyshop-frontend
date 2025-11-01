// Toyshop/client/src/pages/admin/Dashboard.jsx
import React, { useEffect, useState } from 'react'
import { getSummary, getSalesMonthly, getTopProducts, getLatestOrders } from '../../api/dashboard' 
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from 'recharts'

const Card = ({title, value, small}) => (
  <div className="bg-white rounded-lg shadow p-4 w-full">
    <div className="text-sm text-gray-500">{title}</div>
    <div className="text-2xl font-bold mt-1">{value}</div>
    {small && <div className="text-xs text-green-600 mt-1">{small}</div>}
  </div>
)

export default function Dashboard() {
  const [summary, setSummary] = useState({})
  const [monthly, setMonthly] = useState([])
  const [topProducts, setTopProducts] = useState([])
  const [latestOrders, setLatestOrders] = useState([])

  useEffect(() => {
    async function load(){
      try{
        const s = await getSummary()
        setSummary(s)
        const m = await getSalesMonthly()
        setMonthly(m)
        const tp = await getTopProducts()
        setTopProducts(tp)
        // เรายังคงใช้ getLatestOrders เหมือนเดิม (เพราะเราไปแก้ที่ backend ให้มันส่งมาทั้งหมดแล้ว)
        const lo = await getLatestOrders()
        setLatestOrders(lo)
      }catch(err){
        console.error(err)
      }
    }
    load()
  }, [])

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card title="Total Sales" value={`฿${Number(summary.totalSales || 0).toLocaleString()}`} small={`Stock: ${summary.totalStock || 0}`} />
        <Card title="Today's Orders" value={summary.totalOrdersToday || 0} small="" />
        <Card title="Today's Sales" value={`฿${Number(summary.totalSalesToday || 0).toLocaleString()}`} />
        <Card title="Total Stock" value={summary.totalStock || 0} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        
        <div className="col-span-2 bg-white rounded-lg p-4 shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Total Sales (Monthly)</h3>
          </div>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={monthly}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="total" stroke="#4f46e5" strokeWidth={2} dot />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow">
          <h3 className="font-semibold mb-3">Top Selling Products</h3>
          <div className="space-y-3">
            {topProducts.map((p, idx) => (
              <div key={p.id} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{p.title}</div>
                  <div className="text-sm text-gray-500">{p.qty} pcs</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">฿{Number(p.sales).toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1">
        <div className="bg-white rounded-lg p-4 shadow">
          {/* เปลี่ยนจาก "คำสั่งซื้อล่าสุด" เป็น "All Orders" */}
          <h3 className="font-semibold mb-3">All Orders</h3>
          <div className="overflow-x-auto">
            {/* 1. เพิ่ม 'table-fixed' เพื่อบังคับให้คอลัมน์มีความกว้างคงที่ */}
            <table className="min-w-full text-left table-fixed">
              <thead className="text-xs text-gray-500 uppercase">
                <tr>
                  {/* 2. กำหนดความกว้างของแต่ละคอลัมน์ (รวมกันได้ 12/12) */}
                  <th className="w-1/12 py-2 px-3">No.</th>
                  <th className="w-3/12 py-2 px-3">Customer</th>
                  <th className="w-4/12 py-2 px-3">Products</th>
                  <th className="w-2/12 py-2 px-3">Price</th>
                  <th className="w-2/12 py-2 px-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {latestOrders.map(o => (
                  <tr key={o.id} className="border-t">
                    {/* 3. เพิ่ม 'break-words' เพื่อให้ข้อความที่ยาวตัดคำขึ้นบรรทัดใหม่ */}
                    <td className="py-3 px-3 break-words">#{o.id}</td>
                    <td className="py-3 px-3 break-words">{o.orderedBy?.email || 'Guest'}</td>
                    <td className="py-3 px-3 break-words">
                      {o.products?.map(p => p.product?.title + ` x${p.count}`).join(', ')}
                    </td>
                    <td className="py-3 px-3 break-words">฿{Number(o.cartTotal).toLocaleString()}</td>
                    <td className="py-3 px-3 break-words">{o.orderStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}