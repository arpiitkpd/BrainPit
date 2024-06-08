import React from 'react'

function Button({
    children,
    type="button",
    
    className ="",
    
}) {
  return (
    <button
    style={{borderRadius: "7px"}}
    className={`${className} `}
    type={type}
    
    >
        {children}
    </button>
  )
}

export default Button