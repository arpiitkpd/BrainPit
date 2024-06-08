import React, { useEffect, useState } from 'react'
import './pages.css'
import appwriteService from '../appwrite/config.js'
import { useSelector } from 'react-redux'
import Loader from '../components/loader/Loader.jsx'

function Profile() {

  const [user, setUser] = useState(null);
  const [load, setLoad] = useState(true)

  const userId = useSelector((state)=> state.auth.userData.$id);
  
  useEffect(()=>{
    appwriteService.getProfile(userId).then((response)=>{
    setUser(response)
    setLoad(false)
   })
   
   
},[userId]) 

if(!user){
  return(
    <Loader/>
  )
}else{
  return (
    <div className='text-white'>
      <div className="header"><span style={{paddingBottom:"2px"}}>Profile</span> </div>
        <div className="infoContainer flex">
          <div className="profilePic">
            <img src="https://avatar.iran.liara.run/public/job/teacher/male" alt="User Avatar" />
          </div>
          {
            <div className="info">
            
              <div className="userName">
                <span>b/{user.userName}</span>
                <span>{user.tag}</span>
              </div>
              <div className="fullName">{user.name}</div>
              <div className="bio">{user.bio}</div>
            
          </div>
          }
          
        </div>
    </div>
    
  )}
}

export default Profile