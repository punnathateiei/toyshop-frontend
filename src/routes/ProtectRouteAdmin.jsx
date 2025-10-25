import React, {useState, useEffect} from 'react'
import useEcomstore from '../store/ecom'
import { currentAdmin } from '../api/auth'
import LoadingtoRedirect from './LoadingtoRedirect'

const ProtectRouteAdmin = ({element}) => {
    const [ok, setok] = useState(false)
    const user =useEcomstore((state)=> state.user)
    const token =useEcomstore((state)=> state.token)
    
    useEffect(()=>{
        if(user && token){
            currentAdmin(token)
            .then((res)=>setok(true))
            .catch((err)=>setok(false))
        }
    },[])

    return ok ? element: <LoadingtoRedirect />
}

export default ProtectRouteAdmin