import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams} from "react-router-dom"
import appwriteService from '../appwrite/config.js'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

import Button from '../components/Button.jsx'



function Post() {

    const {register, handleSubmit, control, getValues} = useForm()

    const [isLike, setIsLike] = useState(false)
    const [isLikeId, setIsLikeId] = useState("")

    const [post, setPost]= useState(null);

    const[likeNum, setLikeNum] = useState(0)
   
    const {slug}= useParams();
    const navigate = useNavigate();

    const userData = useSelector((state)=> state.auth.userData);
    const isAuthor = post && userData? post.userId == userData.$id : false

    useEffect(()=>{
      
    
      
        if(slug){
            appwriteService.getPost(slug).then((post)=>{
                if(post) setPost(post);
                else navigate('/')
            })
            appwriteService.getPostLike(slug).then((like)=>{
               
                const userLike = like.documents;
                setLikeNum(like.documents.length)
                
                userLike.map((like)=>{
                    if(like.userId==userData.$id){
                        setIsLike(true)
                        setIsLikeId(like.$id)
                    }else{
                        setIsLike(false)
                    }
                })
               
            })
         
        }
        else navigate("/");
    }, [slug, navigate, isLike])

    
    const deletePost=()=>{
        appwriteService.deletePost(post.$id).then((status)=>{
            if(status){
                appwriteService.deleteFile(post.featuredImage);
                navigate("/")
            }
        })
    }

    
    const onClick = async()=>{
        
        if(isLike == false){
        await appwriteService.createLike(post.$id, userData.$id).then((response)=>{
           
            setIsLike(true)
                
            })
          
        }else{
            
            await appwriteService.deleteLike(isLikeId)
           
            setIsLike(false)
            
        }
    }

 
    
   


    // console.log(post.likes);


  return post? (
    <div className='text-white'>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
            <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="rounded-xl"
            />

            {isAuthor && (
                <div className="absolute right-6 top-6">
                    <Link to={`/edit-post/${post.$id}`}>
                        <button bgColor="bg-green-500" className="mr-3">
                            Edit
                        </button>
                    </Link>
                    <button bgColor="bg-red-500" onClick={deletePost}>
                        Delete
                    </button>
                </div>
            )}
        </div>
        <div className="w-full mb-6">
            <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">
            {parse(post.content)}
            </div>
            <form onSubmit={handleSubmit(onClick)}>
            <Button
                type="submit"
                className={isLike?"button":"unlike"}
                
                >
                {isLike?"unlike":"like"}
                </Button>
            </form>
            
        <div className="like">
            {likeNum}
        </div>
        {/* <div>{like}</div> */}
    </div>
  ): null;
}

export default Post