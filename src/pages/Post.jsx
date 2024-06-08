import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams} from "react-router-dom"
import appwriteService from '../appwrite/config.js'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import Comment from '../components/Comment.jsx'
import Button from '../components/Button.jsx'
import Input from '../components/Input.jsx'
import LikeForm from '../components/LikeForm.jsx'
import Loader from '../components/loader/Loader.jsx'
import './pages.css'
import PostCard from '../components/PostCard.jsx'

function Post() {

    const {register, handleSubmit} = useForm({})

    const [isLike, setIsLike] = useState(false)
    const [isLikeId, setIsLikeId] = useState("")
    const [comment, setComment] = useState([])
    const [loading, setLoading] = useState(true)


    const [post, setPost]= useState(null);

    const[likeNum, setLikeNum] = useState(0)
   
    const {slug}= useParams();
    const navigate = useNavigate();

    const userData = useSelector((state)=> state.auth.userData);
    const isAuthor = post && userData? post.userId == userData.$id : false

   

    useEffect(()=>{
        if(slug){
            setLoading(true)
            appwriteService.getPost(slug).then((post)=>{
                if(post){
                    setPost(post)
                    setLoading(false)
                }  
                else navigate('/')
            })
            appwriteService.getPostLike(slug).then((like)=>{
                
                const userLike = like.documents;
                setLikeNum(like.documents.length)
                
                userLike.map((like)=>{
                    if(like.userId==userData.$id){
                        setIsLike(true)
                       
                        setIsLikeId(like.$id)
                    }
                })
               
            })  
         
        }
        else navigate("/");
    }, [slug,navigate, isLike])

    // console.log("hi");
    
        
        appwriteService.getCommentByPost(slug).then((response)=>{
            setComment(response.documents)
            setLoading(false)
            
        })
    
    
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

    const commentHandler=async(data)=>{
        console.log("comment like");
        if(slug && userData){
            await appwriteService.createComment(post.$id, userData.$id,data.content)
        }
    }

    if(loading){
        return <div className='load'><Loader/></div>
    }else return post? (
    <div className="grid grid-cols-5 gap-4 mt-2 text-white">
        <div className="col-span1"></div>
        <div className="col-span-3 w-full  mb-4 relative  rounded-xl p-2">
            
        <div key={post.$id} style={{borderBottom:"1px solid grey", marginRight: "23px"}}>
                            
                            <PostCard id={post.$id} 
                            userId={post.userId}
                            time={post.$createdAt}
                            imageUrl={post.featuredImage}  
                            title={post.title} 
                            content={post.content}
                            // comments={post.comment.length} 
                            tag={post.department}
                            />

                            

                        </div>
            
        <div className='likeForm flex'>
            
            {<LikeForm onClick={onClick} isLike={isLike}/>}   
            <div className="like">
                {likeNum}
            </div>
        
        </div>
       {/* comments section */}
        <form id='commentForm' onSubmit={handleSubmit(commentHandler)} style={{ marginTop:"11px"}}>
            <div className='label flex' style={{fontSize:"18px"}}>Add Comment:</div>
            <div className='mt-3 flex'><Input className={"comment"} type={"text"}{...register("content", {required: true})}/></div>
            <Button className='mt-3 likeBtn' style={{width:"56px"}} type='submit'> Add</Button>
        </form>
       <div>
            {
                comment.map((com)=>{
                    return <div key={com.$id}>
                       
                      <Comment userId={post.userId} content={com.content} id ={com.$id}/>
                    </div>
                })
            }
        </div>
            
        </div>
        <div className="col-span1 ">
        {isAuthor && (
                <div className=" text-white" style={{marginTop:"33px"}}>
                    <Link to={`/edit-post/${post.$id}`}>
                        <button bgColor="  bg-green-500" className="btn mr-3">
                            Edit
                        </button>
                    </Link>
                    <button bgColor=" bg-red-500" className='btn' onClick={deletePost}>
                        Delete
                    </button>
                </div>
            )}
        </div>
        
    </div>
  ): null;
}

export default Post