import React, {useId} from 'react'

function Select({
    options, titlClass, label, className,...props
}, ref){
    const id = useId()
    return(

        <div style={{display:"contents"}}>
            {label &&(
                    <label htmlFor={id}
                    className={titlClass}>
                        {label}
                    </label>
            )}
            <select
            {...props}
            id ={id}
            ref={ref}
            className={`${className}`}
            >
                {
                    options.map((option)=>(
                        <option key={option}
                        value={option}
                        >{option}</option>
                    ))
                }
            </select>

        </div>
    )
}

export default React.forwardRef(Select)