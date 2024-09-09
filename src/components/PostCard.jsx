import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './home/Home.css'
import appwriteService from '../appwrite/config'
import parse from "html-react-parser"
import { BsHeartFill } from "react-icons/bs";
import { useSelector } from 'react-redux'


function PostCard({
    id,
    imageUrl,
    userId,
    time,
    title,
    content,
    likes,
    comments,
    tag
}) {

  const [user, setUser]= useState({})


  // const userStatus = useSelector((state)=> state.auth.status)

   
   appwriteService.getUserById(userId).then((response)=> {
      if(response){
        setUser(response.documents[0])
      }
      }
    )
  

  return (
    <>
  <Link to={`/post/${id}`}className="post-card">
    <div className="post-header">
      <div className="detail flex">
        <div className="user-avatar">
        <img src={user.tag =="teacher"?"https://avatar.iran.liara.run/public/job/teacher/male":"https://avatar.iran.liara.run/public/4"} alt="User Avatar"/>
        </div>
        <div className="user-info">
        
          <span className="username">b/{user.userName}</span>
          <span className="timestamp">{(new Date(time)).toLocaleDateString('en-GB')}</span>
        </div>
      </div>
      <div className="tag">
          {tag}
      </div>
    </div>
    <div className="post-content">
      <h2 className="post-title ">{title}</h2>
      <div className="post-body">
        <div style={{textAlign: "left"}}>{parse(content)} </div>
    </div>
    </div>
    <div className="imageConent flex justify-center ">
    <img className="featuredImage" src={ appwriteService.getFilePreview(imageUrl)} alt="post image"/>
    </div>
    <div className="post-footer">
      <div className="vote-buttons">
        <button className="upvote-button">
        <div style={{marginRight:"4px"}}>
        
        {<BsHeartFill />}
        </div>
        {likes?<span className="vote-count">{likes}</span>:0}
        
        </button>
      </div>
      <div className="comments-section">
        {likes?<span className="comments-count">{comments}</span>:null}
      </div>
    </div>
  </Link>
    </>
  )
}

export default PostCard