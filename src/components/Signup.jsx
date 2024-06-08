import React, { useState } from 'react'
import authService from '../appwrite/auth.js'
import {  Link, useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice.js'
import {useDispatch, useSelector} from 'react-redux'
import {useForm} from 'react-hook-form'

import Button from './Button.jsx'
import Input from './Input.jsx'

function Signup() {

  const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const create = async(data)=>{
        setError('')
        try {
            const userData = await authService.createAccount(data);

            if(userData){
                const userData = await authService.getCurrentUser()
                if(userData){
                    dispatch(login(userData))
                    const user = useSelector((state)=> state.auth.userData);                    navigate('/edit-profile')
                    if(user){
                      navigate('/edit-profile')
                    }else{
                      console.log('not navigate');
                    }
                    
                }
            }
        } catch (error) {
            setError(error.message)
            
        }
    }

  return (
    
    <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
      <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 bg-blue-900 text-center hidden md:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(https://www.tailwindtap.com/assets/components/form/createaccount/login.svg)`,
            }}
          ></div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className=" flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
                Welcome to Family
              </h1>
              <p className="text-[12px] text-gray-500">
                Hey enter your details to create your account
              </p>
            </div>
            <div className="w-full flex-1 mt-8">
              <form onSubmit={handleSubmit(create)} className="mx-auto max-w-xs flex flex-col gap-4">
                <Input
                className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"

                type="text"
                placeholder="Enter your name"
                {...register("name", {
                  required: true, 
                })}
                />
                <Input
                className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"

                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: true, 
                })}
                />
                <Input
                className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"

                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: true, 
                })}
                />
                
                <Button type="submit" className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">Sign Up</span>
                </Button>
              </form>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  Already have an account?{" "}
                  <Link to="/login">
                    <span className="text-blue-900 font-semibold">Sign in</span>
                  </Link>
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  


  )
}

export default Signup;