import React from 'react'
import Contenthome from '../components/home/Contenthome'
import Bestseller from '../components/home/Bestseller'
import Newprodcut from '../components/home/Newproduct'

const Home = () => {
  return (
    <div>
      <Contenthome />

      <p className='font-bold text-center text-2xl mt-4 mb-4'>Best Seller</p>
      <Bestseller />
      <p className='font-bold text-center text-2xl mt-4 mb-4'>New Product</p>
      <Newprodcut />

    </div>
  )
}

export default Home