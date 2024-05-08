import React from 'react'
import authService from '../appwrite/auth.js'
import { useNavigate, Link} from 'react-router-dom'
import appwriteService from '../appwrite/config.js'
import {useSelector} from 'react-redux'
import {useForm} from 'react-hook-form'
import Input from './Input.jsx'
import Button from './Button.jsx'
import Select from './Select.jsx'

function Profile() {

    const {register, handleSubmit} = useForm()
    const userData = useSelector((state) => state.auth.userData)
    const usr= useSelector((state)=> state.auth.status)
    const navigate = useNavigate();
    


    const submit = async (data) => {
      console.log(userData);
      console.log(usr);

            try {
              if (userData) {
                console.log(userData.$id);
                  const dbProfile = await appwriteService.createProfile({...data,userId: userData.$id });
  
                  if (dbProfile) {
                      navigate(`/`);
                  }
              }
            } catch (error) {
              console.log(error);
            }
    };

  return (
  

<div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
<div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
    <div className="lg:w-1/2 xl:w-7/12 p-6 sm:p-12">
        <div className=" flex flex-col items-center">
          <div className="text-center">
            <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
              Complete Your Profile
            </h1>
          </div>
          <div className="w-full flex-1 mt-8">
            <form onSubmit={handleSubmit(submit)} className="mx-auto max-w-xs flex flex-col gap-4">
              <Input
              className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
              label ="Full Name"
              type="text"
              placeholder="Enter your Fullname"
              {...register("name", {
                required: true, 
              })}
              />
              <Input
              className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
              label ="UserName"
              type="text"
              placeholder="Enter your username"
              {...register("userName", {
                required: true, 
              })}
              />
              <Input
              className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
              label ="bio"
              type="text"
              placeholder="Enter your bio"
              {...register("bio")}
              />
              <Select
                options = {["Teacher", "Student"]}
                label= 'Tag'
                className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                {...register("tag", {required: true})}
                />
              {/* <Select
                options = {["InfoTech", "Management", "Law", "Engineering", "Medical", "BioTechnology"]}
                label= 'Department'
                className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                {...register("department", {required: true})}
                /> */}
              
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
                <span className="ml-3">Complete your Journey</span>
              </Button>
            </form>
            
              
          </div>
        </div>
    </div>
    <div className="flex-1 bg-blue-900 text-center hidden md:flex">
    <div
      className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(https://www.tailwindtap.com/assets/components/form/createaccount/login.svg)`,
      }}
    ></div>
  </div>
</div>
</div>

  )
}

export default Profile
