import React from 'react'
import { Home as HomeComponent } from '../components/index.js'

function Home({tag=""}) {
  console.log(tag,"page");
  
  return (
   
      <HomeComponent tag={tag}/>
    
  )
}

export default Home