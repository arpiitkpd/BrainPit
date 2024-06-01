
import React, { useEffect, useState } from 'react'
import PostCard from './PostCard.jsx'
import appwriteService from '../appwrite/config.js'
import { useParams } from 'react-router-dom';

function Container({tag=""}) {
    

    const [posts, setPosts]= useState([])
    const {query} = useParams()
    
  
    useEffect(()=>{
        if(tag&& !query){
            appwriteService.getDeptPost(tag).then((response)=> {
                if(response){
                    setPosts(response.documents)
                }
                }
                )
        }else if(query){
            appwriteService.getQueryPost(query).then((response)=> {
                if(response){
                    setPosts(response.documents)
                }else{
                    console.log("no post mathced");
                }
                }
                )
        }else if(query==null){
                appwriteService.getPosts([]).then((response)=> {
                    if(response){
                        setPosts(response.documents)
                    }
                    }
                    )
            
        }else{
            appwriteService.getPosts([]).then((response)=> {
                if(response){
                    setPosts(response.documents)
                }
                }
                )
        
        }
        },[tag, query])

        console.log(posts);
    
  if(posts.length==0){
        return(
            <div style={{color: "white"}}>Please login or signup to check out all the posts</div>
        )
    }else{
        return(
            <>
            
            <div className="content  col-span-3  scroll text-white">
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


export default Container;




