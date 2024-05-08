import React from 'react'
import { Home as HomeComponent } from '../components/index.js'

function Home({tag=""}) {
  
  
  return (
   
      <HomeComponent tag={tag}/>
    
  )
}

export default Home