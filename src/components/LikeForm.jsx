import React from 'react'
import { useForm } from 'react-hook-form'
import Button from './Button'
import './home/Home.css'

function LikeForm({
    onClick,
    isLike
}) {
    const { handleSubmit} = useForm()
  return (
    <div>
       
       
        <form onSubmit={handleSubmit(onClick)}>
               
               <Button
                   type="submit"
                   className={isLike?"likeBtn":"unlikeBtn"}
                   
                   >
                   {isLike?"Unlike":"Like"}
                   </Button>
               </form>
               
    </div>
  )
}

export default LikeForm