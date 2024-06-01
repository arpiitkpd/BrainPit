import React, {useState} from 'react'
import authService from '../appwrite/auth'
import {Link, useNavigate} from 'react-router-dom'
import Button from './Button.jsx'
import Input from './Input.jsx'

import { useForm } from 'react-hook-form'
import {useDispatch, useSelector} from 'react-redux'
import {login as authLogin} from '../store/authSlice.js'
import appwriteService from '../appwrite/config.js'



function Login() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    

    const login = async(data)=>{
      setError("")
      try {
        const session =await authService.login(data)
            if(session){
                const user = await authService.getCurrentUser()
                
                if(user){
                  dispatch(authLogin({user}))
                  const userProfile = await appwriteService.getProfile(user.$id)
                  if(userProfile){
                    navigate("/")
                  }else{
                    navigate('/profile')
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
              backgroundImage: `url(https://www.tailwindtap.com/assets/common/marketing.svg)`,
            }}
          ></div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className=" flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
                Welcome Back
              </h1>
              {
                error && <h1>{error}</h1>
              }
            </div>
            <div className="w-full flex-1 mt-8">
              <form onSubmit={handleSubmit(login)} className="mx-auto max-w-xs flex flex-col gap-4">
                <Input
                className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                label= "Email"
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: true, 
                })}
                />
                <Input
                className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                label = "Password"
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
                  <span className="ml-3">Login</span>
                </Button>
              </form>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  Don't have any Account?{" "}
                  <Link to="/signup">
                    <span className="text-blue-900 font-semibold">Create Account</span>
                  </Link>
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Login