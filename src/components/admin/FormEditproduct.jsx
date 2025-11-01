import React, { useEffect, useState } from 'react'
import useEcomstore from '../../store/ecom'
import { createProduct, listProduct, readProduct, updateProduct } from '../../api/Product'
import { toast } from 'react-toastify'
import Uploadfile from './Uploadfile'
import { useParams, useNavigate } from 'react-router-dom'

const initialState = {
    "title": "green color",
    "description": "desc",
    "price": 200,
    "quantity": 20,
    "categoryId": '',
    "images": []
}

const FormEditproduct = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const token = useEcomstore((state) => state.token)
    const getCategory = useEcomstore((state) => state.getCategory)
    const categories = useEcomstore((state) => state.categories)
    const [form, setform] = useState(initialState)

    useEffect(() => {
        if (token && id) {
            getCategory()
            fetchProduct(token, id)
        }
    }, [token, id])

    const fetchProduct = async (token, id) => {
        try {
            const res = await readProduct(token, id)
            console.log('res from backend', res)
            let data = res.data

            // ถ้า backend ส่งเป็น array เช่น [ { ... } ]
            if (Array.isArray(res.data)) {
                data = res.data[0]
            }

            // ถ้า backend ซ้อนข้อมูลใน data.data
            if (res.data && res.data.data) {
                data = res.data.data
            }

            setform({
                ...initialState,
                ...data
            })
        } catch (err) {
            console.log('Err fetch data', err)
        }
    }
    console.log(form)

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
            const res = await updateProduct(token, id, form)
            console.log(res)
            navigate('/admin/product')
            toast.success(`Add ${res.data.title} Success`)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='container mx-auto p-4 bg-white shadow-md'>
            <form onSubmit={handleSubmit}>
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

                <Uploadfile form={form} setform={setform} />

                <button className='bg-blue-500 p-2 rounded-md shadow-md hover:scale-105 hover:translate-y-1 hover:duration-200'>Edit Product</button>

                <hr />
                <br />

            </form>
        </div>
    )
}

export default FormEditproduct