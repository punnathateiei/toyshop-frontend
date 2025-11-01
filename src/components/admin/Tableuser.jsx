import React, { useEffect, useState } from 'react'
import { listAlluser, changStatususer,changUserRole } from '../../api/admin'
import useEcomstore from '../../store/ecom'
import { toast } from 'react-toastify'

const Tableuser = () => {
    const token = useEcomstore((state) => state.token)
    const [user, setUser] = useState([])

    useEffect(() => {
        handleGetuser(token)
    }, [])

    const handleGetuser = (token) => {
        listAlluser(token)
            .then((res) => {
                setUser(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleChaneStatus = (userId, userStatus) => {
        console.log(userId, userStatus)
        const value = {
            id: userId,
            enabled: !userStatus
        }
        changStatususer(token, value)
            .then((res) => {
                console.log(res)
                handleGetuser(token)
                toast.success('Update Status Success')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleChaneRole = (userId, userRole) => {
        console.log(userId, userRole)
        const value = {
            id: userId,
            role: userRole
        }
        changUserRole(token, value)
            .then((res) => {
                console.log(res)
                handleGetuser(token)
                toast.success('Update Role Success')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const Statuscolor = (enabled) => {
        if (enabled) {
            return 'bg-red-500 hover:bg-red-600 text-white';   // ถ้า enabled = true → Disable ปุ่มแดง
        } else {
            return 'bg-green-500 hover:bg-green-600 text-white'; // ถ้า enabled = false → Enable ปุ่มเขียว
        }
    }

    return (
        <div className='container mx-auto p-4 bg-white shadow-md text-left'>
            <table className='w-full'>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Email</th>
                        <th>User Role</th>
                        <th>User Status</th>
                        <th>Manage</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        user?.map((item, index) =>
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.email}</td>

                                <td>
                                    <select 
                                    onChange={(e)=>handleChaneRole(item.id,e.target.value)}
                                    value={item.role}>
                                        <option>user</option>
                                        <option>admin</option>
                                    </select>
                                </td>

                                <td>{item.enabled ? 'Active' : 'Inactive'}</td>
                                <td>
                                    <button
                                        className={`${Statuscolor(item.enabled)} p-1 rounded-md shadow-md`}
                                        onClick={() => handleChaneStatus(item.id, item.enabled)}>
                                        {item.enabled ? 'Disable' : 'Enable'}
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Tableuser