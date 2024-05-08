import React, { useEffect, useState } from 'react'
import { Link, useParams} from "react-router-dom"
import appwriteService from '../appwrite/config.js'

import PostCard from '../components/PostCard.jsx'


function QueryPost() {

    
    const {query}= useParams();
    

    const [posts, setPosts]= useState([])
  
   
    useEffect(()=>{
        if(query){
        appwriteService.getQueryPost(query).then((response)=> {
            if(response){
              
                setPosts(response.documents)
            }else{
                console.log("no post mathced");
            }
            }
            )
        }
        
        },[query])

  

    
  
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


export default QueryPost