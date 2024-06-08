import React from 'react'
import { Controller } from 'react-hook-form'
import {Editor} from '@tinymce/tinymce-react'

function RTE({name, input, control, label,value, defaultValue='', titlClass}) {
  return (
    <div className='w-full mb-4' > 
      {label && <label className={titlClass}>{label}</label>}
  
      <Controller 
      name={name || "content"}
      control={control}
      render={({field: {onChange}}) => (
          <Editor
          apiKey='az119jn2w3mjdp690dmneq9gdhjowiycmfc5gh1z6scdxss2'
          className={input}
          disabled={false}
          initialValue= {value}
         
          init={{
              initialValue: value,
              height: 200,
              menubar: false,
              statusbar: false,
              toolbar: false,
              convert_urls: true,
              placeholder:true
              
              
          }}
          onEditorChange={onChange}
          />
      )}
      />
       </div>
  )
}

export default RTE