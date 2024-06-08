import React, {useState} from 'react'
import './home/Home.css'
import { GoDotFill } from "react-icons/go";
import appwriteService from '../appwrite/config';
import { MdDelete } from "react-icons/md";

function Comment({
    content,
    userId,
    id
    // time, 
    // profile
}) {
  const [user, setUser]= useState({})
  // const [comId, setComId] = useState(null)
 
    
    
    appwriteService.getUserById(userId).then((response)=> {
      if(response){
        setUser(response.documents[0])
      }
      }
    )

    
    
    // console.log(id);

const dele=()=>{
  const response = appwriteService.deleteComment(id);
      if(response){
       
        console.log("done");
      }
}
    
  return (
    <div className='commentDiv flex align-middle justify-between'>
      <div className='flex items-center'>
        <div className='flex items-center mr-1'><GoDotFill /></div> 
        {content}
      </div>
      <div className="user flex justify-center items-center" style={{color:'#b7cad4', fontSize:"13px"}}>by/{user.userName}
      <span className='ml-2' onClick={dele} style={{cursor: "pointer"}}><MdDelete /></span>
      
      </div>
    </div>
  )
}

export default Comment