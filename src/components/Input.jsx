import React,{useId, useState} from 'react'
import './home/Home.css'
const Input = React.forwardRef(
    function Input({
        label, 
        type="text",
        className ="",
        titlClass="text-white",
        value,
        
        ...props
        
    }, ref){

        
        const id = useId();    
        return(
            <div style={{width:"100%"}}>
                {label && (
                    <label
                    htmlFor={id}
                    className={titlClass}
                    >
                        {label}
                    </label>
                )}
                <input type={type}
                className={`${className}`}
                value={value}
                contentEditable="true"
                 
                id={id}
                ref={ref}
                {...props} 
                
                />
            </div>
        )
    })

 
export default Input