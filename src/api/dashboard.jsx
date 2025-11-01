import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:5000/api'
})

export const getSummary = () => api.get('/dashboard/summary').then(r => r.data)
export const getSalesMonthly = () => api.get('/dashboard/sales-monthly').then(r => r.data)
export const getTopProducts = () => api.get('/dashboard/top-products').then(r => r.data)
export const getLatestOrders = () => api.get('/dashboard/latest-orders').then(r => r.data)