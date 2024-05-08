import React,{useId} from 'react'

const ImageInput = React.forwardRef(
    function ImageInput({
        onChange
        
    }, ref){
        const id = useId();
        return(
            <div>
                <input type="file" 
                id={id}
                ref={ref}
                onChange={onChange}
                />
            </div>
        )
    })

export default ImageInput