import React, { useEffect, useState } from 'react'
import useEcomstore from '../../store/ecom'
import { createProduct, deleteProduct } from '../../api/Product'
import { toast } from 'react-toastify'
import Uploadfile from './Uploadfile'
import { Link } from 'react-router-dom'
import { numberFormat } from '../../utils/number'
import { dateFormat } from '../../utils/date'

const initialState = {
    "title": "",
    "description": "",
    "price": 0,
    "quantity": 0,
    "categoryId": '',
    "images": []
}

const Formproduct = () => {
    const token = useEcomstore((state) => state.token)
    const getCategory = useEcomstore((state) => state.getCategory)
    const categories = useEcomstore((state) => state.categories)
    const getProduct = useEcomstore((state) => state.getProduct)
    const products = useEcomstore((state) => state.products)

    const [form, setform] = useState({
    "title": "",
    "description": "",
    "price": 0,
    "quantity": 0,
    "categoryId": '',
    "images": []
})
    // console.log(products)

    useEffect(() => {
        getCategory()
        getProduct(100)
    }, [])

    const handleOnChange = (e) => {
        console.log(e.target.name, e.target.value)
        setform({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await createProduct(token, form)
            console.log(res)
            setform(initialState)
            getProduct()
            toast.success(`Add ${res.data.title} Success`)
        } catch (err) {
            console.log(err)
        }
    }

    const handleDelete = async (id) => {
        if(window.confirm('Are you sure to delete this item?')){
            try{
                const res = await deleteProduct(token,id)
                console.log(res)
                toast.success('Delete Success')
                getProduct()
            }catch(err){
                console.log(err)
            }
        }
    }

    return (
        <div className='container mx-auto p-4 bg-white shadow-md'>
            <form onSubmit={handleSubmit}>
                {/* === CHANGED === */}
                <h1>Add Product Information</h1>
                <input
                    className='border'
                    value={form.title}
                    onChange={handleOnChange}
                    placeholder='Title'
                    name='title'
                />
                <input
                    className='border'
                    value={form.description}
                    onChange={handleOnChange}
                    placeholder='Description'
                    name='description'
                />
                <input
                    type='number'
                    className='border'
                    value={form.price}
                    onChange={handleOnChange}
                    placeholder='Price'
                    name='price'
                />
                <input
                    type='number'
                    className='border'
                    value={form.quantity}
                    onChange={handleOnChange}
                    placeholder='Quantity'
                    name='quantity'
                />
                <select
                    className='border'
                    name='categoryId'
                    onChange={handleOnChange}
                    required
                    value={form.categoryId}
                >
                    <option value="" disabled>Please Select</option>
                    {
                        categories.map((item, index) =>
                            <option key={index} value={item.id}>{item.name}</option>
                        )
                    }

                </select>
                <hr />
                
                <Uploadfile form={form} setform={setform}/>

                {/* === CHANGED === */}
                <button className='bg-blue-500 p-2 rounded-md shadow-md hover:scale-105 hover:translate-y-1 hover:duration-200'>Add Product</button>

                <hr />
                <br />
                <table className="table w-full border text-center">
                    <thead>
                        {/* === CHANGED HEADERS === */}
                        <tr className='bg-gray-200 border'>
                            <th scope="col">No</th>
                            <th scope="col">Image</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Sold</th>
                            <th scope="col">Last Updated</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((item,index)=>{
                                // console.log(item)
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index+1}</th>
                                        <td>
                                            {
                                                item.images.length > 0
                                                ? <img 
                                                className='w-24 h-24 rounded-lg shadow-md '
                                                src={item.images[0].url}/>
                                                : <div
                                                className='w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center shadow-md'> No Image</div>
                                            }
                                        </td>
                                        <td>{item.title}</td>
                                        <td>{item.description}</td>
                                        <td>{numberFormat(item.price)}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.sold}</td>
                                        <td>{dateFormat(item.updatedAt)}</td>
                                        <td className='flex gap-2 justify-center items-center py-4'>
                                            <p className='bg-gray-400 rounded-md p-1 hover:scale-105 hover:translate-y-1 hover:duration-200 shadow-md text-center'>
                                                <Link to={'/admin/product/'+item.id}> Edit</Link>
                                            </p >
                                            <p 
                                            className='bg-red-500 rounded-md p-1 hover:scale-105 hover:translate-y-1 hover:duration-200 shadow-md text-center'
                                            onClick={() => handleDelete(item.id)}>Delete</p>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        
                    </tbody>
                </table>

            </form>
        </div>
    )
}

export default Formproduct