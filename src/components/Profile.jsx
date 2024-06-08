import React from 'react'
// import authService from '../appwrite/auth.js'
import { useNavigate} from 'react-router-dom'
import appwriteService from '../appwrite/config.js'
import {useSelector} from 'react-redux'
import {useForm} from 'react-hook-form'
import Input from './Input.jsx'
import Button from './Button.jsx'
import Select from './Select.jsx'
import './home/Home.css'

function Profile() {
    
    const {register, handleSubmit} = useForm()
    const userData = useSelector((state)=> state.auth.userData);
    // console.log(userData);
    const navigate = useNavigate();

    const submit = async (data) => {
      try {
        
          const userProfile = await appwriteService.createProfile({...data, userId: userData.$id})
          if(userProfile){
          console.log(userProfile);
          navigate('/')
        
        }
            } catch (error) {
              console.log(error);
            }
    };

  return (
  

<div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
<div className="max-w-screen-xl shadow sm:rounded-lg flex justify-center flex-1">
    <div className="lg:w-1/2 xl:w-7/12 p-6 sm:p-12 text-black">
        <div className=" flex flex-col items-center">
          <div className="text-center">
            <h1 className="text-2xl xl:text-4xl font-extrabold" style={{color:"#f2410b"}}>
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
              className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white focus:color-black"
              label ="UserName"
             
              
              type="text"
              placeholder="Enter your username"
              {...register("userName", {
                required: true, 
              })}
              />
              <Input
              className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white focus:color-black"
              label ="bio"
              type="text"
             
              
              placeholder="Enter your bio"
              {...register("bio")}
              />
              <Select
                options = {["Teacher", "Student"]}
                label= 'Tag'
                className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white focus:color-black"
                {...register("tag", {required: true})}
                />
              
              
              <div className = "buttonBox" >
                <Button
                type="submit"
                className="buttonprof text-white bg-orange-700 w-19"
                
                
                >
                {"Submit"}
                </Button>
                </div>
            </form>
            
              
          </div>
        </div>
    </div>

</div>
</div>

  )
}

export default Profile
