import React, { useEffect, useState } from 'react'
import { listProductBy } from '../../api/Product'
import ProductCard from '../card/ProductCard'
import Showproduct from '../../utils/showproduct'
import { SwiperSlide } from 'swiper/react'

const Bestseller = () => {
    const [data, setdata] = useState([])

    useEffect(() => {
        loadData()
    }, [])

    const loadData = ()=>{
        listProductBy('sold','desc',10)
        .then((res)=>{
            console.log(res.data)
            setdata(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    console.log(data)

    return (
        <Showproduct>
            {
                data?.map((item,index)=>(
                    <SwiperSlide>
                        <ProductCard item={item} key={index}/>
                    </SwiperSlide>
                ))
            }
        </Showproduct>
    )
}

export default Bestseller