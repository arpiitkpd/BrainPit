import React, { useEffect, useState } from 'react'
import {useParams , useNavigate} from 'react-router-dom'
import appwriteService from '../appwrite/config.js'
import PostForm from '../components/post-form/PostForm.jsx'


function EditPost() {
    const [post, setPost]= useState(null)
    const {slug}= useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        if(slug){
            appwriteService.getPost(slug).then((post)=>{
                if(post){
                    setPost(post)
                }else{
                    navigate("/")
                }
            })
        }
    }, [slug, navigate])
    
  return (
    <div>
        <PostForm post={post} />
    </div>
  )
}

export default EditPost