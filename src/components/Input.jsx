import React,{useId} from 'react'

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
                 value={value?value:undefined}
                  id={id}
                  ref={ref}
                  {...props} />
            </div>
        )
    })

 
export default Input