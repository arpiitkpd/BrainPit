import React from 'react'
import { Link } from 'react-router-dom'

function SlideComponent({
    slug,
    children,
   path
})


{
  return (
 
            <Link to={slug} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                   <path d={path} />
               </svg>
               <span className="ms-3">{children}</span>
            </Link>
  
  )
}

export default SlideComponent