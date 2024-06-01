import React from 'react'
import './Home.css'
import Sidebar from '../Sidebar.jsx'
import Container from '../Container.jsx'





function Home(tag="") {

 
  return (
    <div className='grid grid-cols-5 gap-4' style={{height:"91vh"}}>
   <Sidebar/>
    
   <Container tag={tag.tag}/>
   <div className='poster' style={{height:"91vh", color:"white", border:"1px solid grey"}} > 
    <img src="../../public/poster.jpg" alt="poster"  />
    </div>
   </div>
  )
}

export default Home