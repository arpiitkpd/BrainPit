import React from 'react'
import { useForm } from 'react-hook-form'
import Button from './Button'

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
                   className={isLike?"button":"unlike"}
                   
                   >
                   {isLike?"unlike":"like"}
                   </Button>
               </form>
               
    </div>
  )
}

export default LikeForm