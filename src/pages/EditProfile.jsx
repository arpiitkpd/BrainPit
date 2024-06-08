import React, { useEffect, useState } from 'react'
import Profile from '../components/Profile.jsx'
import { useSelector } from 'react-redux'
import appwriteService from '../appwrite/config.js'


function EditProfile() {
    
    console.log("edit Profile");
  return (
    <div>
        <Profile/>
    </div>
  )
}

export default EditProfile