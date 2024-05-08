import React,{useId, useState} from 'react'

const Input = React.forwardRef(
    function Input({
        label, 
        type="text",
        className ="",
        titlClass="",
        value,
        
        ...props
        
    }, ref){

        
        const id = useId();    
        return(
            <div>
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
                
                 defaultValue={null}
              
                 
                 
                contentEditable="true"
                 
                  id={id}
                  ref={ref}
                  {...props} />
            </div>
        )
    })

 
export default Input