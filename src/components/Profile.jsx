import React from 'react'
import authService from '../appwrite/auth.js'
import { useNavigate, Link} from 'react-router-dom'
import appwriteService from '../appwrite/config.js'
import {useSelector} from 'react-redux'
import {useForm} from 'react-hook-form'
import Input from './Input.jsx'
import Button from './Button.jsx'
import Select from './Select.jsx'

function Profile({profile}) {

  console.log("profp",profile);

    const {register, handleSubmit} = useForm({
      defaultValues:{
        name: profile?.name|| "",
        userName: profile?.userName ||"",
        bio: profile?.bio ||"",
        tag: profile?.tag ||"Student"
      }
    })
    const userData = useSelector((state) => state.auth.userData)
    // const usr= useSelector((state)=> state.auth.status)
    const navigate = useNavigate();
    
    console.log(profile);
    

    const submit = async (data) => {
      console.log(userData);


            try {
              
                if(profile){
                  console.log("userDatra",userData);
                  const dbProf = await appwriteService.updateProfile(userData.$id,{...data})
                  if(dbProf){
                    navigate("/")
                  
                }else{
                console.log(userData.$id);
                  const dbProfile = await appwriteService.createProfile({...data,userId: userData.$id });
  
                  if (dbProfile) {
                      navigate(`/`);
                  }
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
              
              value = {profile? profile.name: ""}
              
              placeholder="Enter your Fullname"
              {...register("name", {
                required: true, 
              })}
              />
              <Input
              className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
              label ="UserName"
              value={profile? profile.userName : ""}
              
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
              value={profile? profile.bio: ""}
              
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
              
              <div className = "buttonBox">
                <Button
                type="submit"
                className="button"
                
                >
                { profile?"Update":"Submit"}
                </Button>
                </div>
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
