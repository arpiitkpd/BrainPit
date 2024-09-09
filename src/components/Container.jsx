
import React, { useEffect, useState } from 'react'
import PostCard from './PostCard.jsx'
import appwriteService from '../appwrite/config.js'
import { useParams } from 'react-router-dom';
import Loader from './loader/Loader.jsx';


function Container({tag=""}) {
    const [posts, setPosts]= useState([])
    const [loading, setLoading]= useState(true)
    const {query} = useParams()

    
    useEffect(()=>{
        
        if(tag&& !query){
            setLoading(true)
            appwriteService.getDeptPost(tag).then((response)=> {
                if(response){
                    setPosts(response.documents)
                    setLoading(false)
                }
            }
        )
    }else if(query){
        appwriteService.getQueryPost(query).then((response)=> {
            setLoading(true)
            if(response){
                setPosts(response.documents)
                setLoading(false)
            }else{
                console.log("no post mathced");
            }
        }
    )
}else if(query==null){
    appwriteService.getPosts([]).then((response)=> {
        if(response){
            setPosts(response.documents)
            setLoading(false)
        }
                    }
                    )
            
        }else{
            appwriteService.getPosts([]).then((response)=> {
                if(response){
                    setPosts(response.documents)
                    setLoading(false)
                }
            }
        )
        
    }
    
},[tag, query])


        
        
    
  if(loading){
        return(
            <div className=' top'><Loader/></div>
            
        )
    }else{
        if(posts.length==0){
            return(
                <div className='text-white'>There is no post to show be the first one to create a post </div>
            )
        }else{
        return(
            <>
            
            <div className="content  text-white" >
                {
                posts.map((post)=>{
                   
                    return(
                        <div key={post.$id} style={{borderBottom:"1px solid grey", marginRight: "23px"}}>
                           
                            <PostCard id={post.$id} 
                            userId={post.userId}
                            time={post.$createdAt}
                            imageUrl={post.featuredImage}  
                            title={post.title} 
                            content={post.content} 
                            likes={post.likes.length} 
                            // comments={post.comment.length} 
                            tag={post.department}
                            />

                             

                        </div>
                    )
                })
                    
                    
                }
            </div>
            
        </>
        )
    }
    }
}


export default Container;




