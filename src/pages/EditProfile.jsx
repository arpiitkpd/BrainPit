import React, { useEffect, useState } from 'react'
import Profile from '../components/Profile.jsx'
import { useSelector } from 'react-redux'
import appwriteService from '../appwrite/config.js'


function EditProfile() {
    const [profile, setProfile] = useState(null)
    const userData = useSelector((state)=> state.auth.userData)
    const id = userData.$id;
    console.log("edit", profile);
    

    useEffect(()=>{
        if(id){
            appwriteService.getProfile(id).then((prof)=>{
                if(prof){
                    setProfile(prof)
                }else{
                    setProfile(null)
                }
            })
        }
    }, [id])
  return (
    <div>
        <Profile profile={profile}/>
    </div>
  )
}

export default EditProfile