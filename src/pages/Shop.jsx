import React, { useEffect } from 'react'
import ProductCard from '../components/card/ProductCard'
import  useEcomstore from '../store/ecom'
import SearchCard from '../components/card/SearchCard'
import Cartcard from '../components/card/Cartcard'

const Shop = () => {
  const getProduct = useEcomstore((state) => state.getProduct)
  const products = useEcomstore((state) => state.products)

  useEffect(() => {
    getProduct(9)
  }, [])

  return (
    <div className='flex'>
      {/*Search*/}
      <div className='w-1/4 p-4 bg-gray-100 h-screen'>
       <SearchCard />
      </div>

      {/*Product*/}
      <div className='w-1/2 p-4 h-screen overflow-y-auto'>
        <p className='text-2xl font-bold mb-4'>All Products</p>
        <div className='flex flex-wrap gap-4'>
          {
            products.map((item, index) =>
              <ProductCard key={index} item={item}/>
            )
          }
        </div>
      </div>
      {/*Cart*/}
      <div className='w-1/4 p-4 bg-gray-100 h-screen  overflow-y-auto'>
        <Cartcard />
      </div>
    </div>
  )
}

export default Shop