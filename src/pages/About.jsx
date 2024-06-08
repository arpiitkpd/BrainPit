import React from 'react'
import './pages.css'

function About() {
  return (
    <div className='text-white'>
      <div className="creator aboutConatiner">
      <h2>Meet the Creator</h2>
      <div className='aboutContent'>
          <div className="profilePic" style={{width: "50%", overflow: "hidden", borderRadius: "112%"}}  >
            <img src="\creator.jpg" />
          </div>
          {
            <div className="info" style={{height: "auto"}}>
              <div className='flex items-baseline justify-between'>
                <div className="aboutFullName">Arpit Kumar</div>
                <span style={{color:"#21454d", fontSize:"16px", fontWeight:"700"}}>arpiitkumar02@gmail.com</span>
              </div>
              
              
              <div className='aboutCreator'>Hello! I'm Arpit Kumar, the creator of BrainPit. I understand the importance of having a dedicated platform for academic and social engagement within a college environment. My goal with Campus Connect is to provide a space where students and teachers can come together, share knowledge, and build a stronger college community.</div>
            
          </div>
          }
          
        </div>
     </div>
     
     <div className="about aboutConatiner">
      <h2>About Us</h2>
      <div className='aboutContent'>Welcome to BrainPit, the social media platform exclusively designed for college students and teachers! Our mission is to foster a vibrant and engaging community where academic and social interactions thrive.
      </div>
     </div>

     <div className="vision aboutConatiner">
      <h2>Our Vision</h2>
      <div className='aboutContent'>At BrainPit, we envision a connected campus environment where students and faculty can easily share ideas, discuss trending topics, and stay updated on the latest happenings in their respective fields. Whether it's academic news, extracurricular activities, or social events, our platform aims to be the go-to space for all campus-related interactions.</div>
     </div>

     

     <div className="features aboutConatiner">
      <h2>Features</h2>
      <ul className='aboutContent'>
        <div>
        <li>User Registration: Students and teachers can easily register and create profiles.</li>
        <li>Trending Topics:  Stay updated with the latest trends in various fields.</li>
        <li>Posts and Discussions:  Share posts, comment, and engage in meaningful discussions.</li>
        <li>Field-Specific Updates:  Follow topics and fields that interest you the most.</li>
        </div>
      </ul>
     </div>

    </div>
  )
}

export default About