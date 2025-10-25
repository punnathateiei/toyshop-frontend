import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Resize from 'react-image-file-resizer'
import { removeFiles, uploadFiles } from '../../api/Product'
import useEcomstore from '../../store/ecom'
import { Loader } from 'lucide-react';

const Uploadfile = ({ form, setform }) => {
    const token = useEcomstore((state) => state.token)
    const [isLoading, setisLoading] = useState(false)
    const handleOnChange = (e) => {
        setisLoading(true)
        const files = e.target.files
        if (files) {
            setisLoading(true)
            let allFiles = form.images
            for (let i = 0; i < files.length; i++) {
                // console.log(files[i])
                //validate
                const file = files[i]
                if (!file.type.startsWith('image/')) {
                    toast.error(`File ${file.name} ไม่ใช่รูป`)
                    continue
                }
                //image resize
                Resize.imageFileResizer(
                    files[i],
                    720,
                    720,
                    "JPEG",
                    100,
                    0,
                    (data) => {
                        //endpoint backend
                        uploadFiles(token, data)
                            .then((res) => {
                                console.log(res)
                                allFiles.push(res.data)
                                setform({
                                    ...form,
                                    images: allFiles
                                })
                                setisLoading(false)
                                toast.success('Upload image success')
                            })
                            .catch((err) => {
                                console.log(err)
                                setisLoading(false)
                            })
                    },
                    "base64"
                )
            }
        }
    }
    console.log(form)

    const handleDelete = (public_id)=>{
        const images = form.images
        removeFiles(token,public_id)
        .then((res)=>{
            console.log(res)
            const filterImages = images.filter((item)=>{
                return item.public_id !== public_id
            })
            console.log('filterImages',filterImages)
            setform({
                ...form,
                images: filterImages
            })
            toast.error(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    return (
        <div className='my-4'>
            <div className='flex mx-4 gap-4 my-4'>
                {
                    isLoading && <Loader className='w-16 h-16 animate-spin'/>
                }
                { }
                {
                    form.images?.map((item,index)=>
                        <div className='relative' key={index}>
                            <img 
                            className='w-24 h-24 hover:scale-105'
                            src={item.url}/>
                            <span 
                            onClick={()=>handleDelete(item.public_id)}
                            className='absolute top-0 right-0 bg-red-500 p-1 rounded-md'>X</span>
                        </div>
                    )
                }
            </div>

            <div>
                <input
                    onChange={handleOnChange}
                    type='file'
                    name='images'
                    multiple
                />
            </div>
        </div>
    )
}

export default Uploadfile