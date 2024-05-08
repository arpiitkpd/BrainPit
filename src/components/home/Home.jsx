import React from 'react'
import './Home.css'
import Sidebar from '../Sidebar.jsx'
import Container from '../Container.jsx'





function Home(tag="") {

 
  return (
    <div className='grid grid-cols-5 gap-4' style={{height:"91vh"}}>
   <Sidebar/>
    
   <Container tag={tag.tag}/>
   </div>
  )
}

export default Home