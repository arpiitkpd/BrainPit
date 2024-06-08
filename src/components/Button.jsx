import React from 'react'

function Button({
    children,
    type="button",
    
    className ="",
    ...props
    
}) {
  return (
    <button 
    style={{borderRadius: "7px"}}
    className={`${className} `}
    type={type}
    {...props}
    >
        {children}
    </button>
  )
}

export default Button