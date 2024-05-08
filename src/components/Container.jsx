
import React, { useEffect, useState } from 'react'
import PostCard from './PostCard.jsx'
import appwriteService from '../appwrite/config.js'



function Container({tag=""}) {
    console.log(tag, "container");

    const [posts, setPosts]= useState([])
  
   
    useEffect(()=>{
        if(tag==""){
            appwriteService.getPosts([]).then((response)=> {
            if(response){
                setPosts(response.documents)
            }
            }
            )
        }else{
            appwriteService.getDeptPost(tag).then((response)=> {
                if(response){
                    setPosts(response.documents)
                }
                }
                )
        }
        },[tag])

        console.log(tag);
    
    
    

    posts.map((post)=>{
        console.log( post.featuredImage);
       
    })
    
  if(posts.length==0){
        return(
            <div>null</div>
        )
    }else{
        return(
            <div className="content  col-span-4  scroll text-white">
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
                            likes={post.likes} 
                            comments={post.comment.length} 
                            tag={post.department}
                            />

                            

                        </div>
                    )
                })
                    
                    
                }
            </div>
        )
    }
}


export default Container;




