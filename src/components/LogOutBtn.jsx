import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../appwrite/auth.js'
import {logout} from '../store/authSlice.js'
import { useNavigate } from 'react-router-dom'

function LogOutBtn({
  className=""
}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logoutHandler =() =>{
        authService.logout().then(()=>{
            dispatch(logout())
            
            navigate('/login')
        })
    }
   
  
      
  return (
    <button
    onClick={logoutHandler}
    className={className}
    >Logout</button>
  )
}

export default LogOutBtn