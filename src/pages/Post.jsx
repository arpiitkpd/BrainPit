import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams} from "react-router-dom"
import appwriteService from '../appwrite/config.js'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import Comment from '../components/Comment.jsx'
import Button from '../components/Button.jsx'
import Input from '../components/Input.jsx'
import LikeForm from '../components/LikeForm.jsx'



function Post() {

    const {register, handleSubmit} = useForm()

    const [isLike, setIsLike] = useState(false)
    const [isLikeId, setIsLikeId] = useState("")
    const [comment, setComment] = useState([])

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

            appwriteService.getCommentByPost(slug).then((response)=>{
                setComment(response.documents)
            })
         
        }
        else navigate("/");
    }, [slug, navigate, isLike,])


    
    const deletePost=()=>{
        appwriteService.deletePost(post.$id).then((status)=>{
            if(status){
                appwriteService.deleteFile(post.featuredImage);
                navigate("/")
            }
        })
    }

    const onClick = async()=>{
        console.log("like click");
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

            <LikeForm onClick={onClick} isLike={isLike} />
            
        <div className="like">
            {likeNum}
        </div>
       {/* comments section */}
                <form id='commentForm' onSubmit={handleSubmit(commentHandler)} style={{border:"2px solid green"}}>
        <Input type={"text"} label={"Add a comment"} {...register("content", {required: true})}/>
        <Button type='submit'> Add</Button>
                </form>
       <div>
            {
                comment.map((com)=>{
                    return <div key={com.$id}>
                      <Comment content={com.content}/>
                    </div>
                })
            }
        </div>
    </div>
  ): null;
}

export default Post