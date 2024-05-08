import React , {useState}from 'react'
import {Link} from 'react-router-dom'
// import LogOutBtn from './LogOutBtn.jsx'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {Button , Input} from '../index.js'
import { useForm } from 'react-hook-form'
import { IoSearchOutline, } from "react-icons/io5";




function Header() {


    const authStatus = useSelector((state)=> state.auth.status)
    
   
    const {register, handleSubmit} = useForm()
    const navigate = useNavigate();

    const search= async(data)=>{
     
        try {
             if(data){
                navigate(`/queryPost/${data.search}`)
             }else navigate('/')

            } catch (error) {
             
              console.log(error);
            }
          }
    

  return (
    <header className=" fixed top-0 w-full " style={{ display: "contents",  background: "#0b1416"}}>
    <div className=" mx-auto px-3 py-1" style={{borderBottom: "1px solid gray"}}>
        <div className="flex justify-between items-center ">
            <div className='flex items-center'>
                <img style={{maxWidth:"14%"}} src='/brainPit.png'  alt="image description"/>
            
            <Link to="/" className="text-2xl font-bold text-white font-serif"  style={{marginLeft:"8px"}}>brainPit</Link>
           </div>
            <form  onSubmit={handleSubmit(search)}>
            <div className='my-2'>
                <div className="flex items-center space-x-2 mr-32">
                   
                    <Input type="text" placeholder="Search brainPit" style={{background:"#21454d" , borderRadius:"33px", border: "none", color:"white"}}className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-600 w-80"
                   {...register("search")}
                    />
                    <Button type='submit' className='rounded text-3xl'style={{color: "#21454d"}}>
                    <IoSearchOutline />
                    </Button>
                   
                </div>
            </div>
            </form>
        
            { !authStatus &&(<div className="hidden md:flex items-center space-x-4"  style={{marginRight:"20px"}}>
            
                <Link to="/signup" className=" text-white px-4 py-2 rounded-md" style={{background:"#21454d" }}>Sign Up</Link>
                <Link to="/login" className=" text-white px-4 py-2 rounded-md" style={{background:"#21454d"}}> Login</Link>
            </div>)
            }
            {
                authStatus && (
                    <div className='flex'>
                        <Link 
                        to={'/addpost'}
                        style={{background:"#21454d",  borderRadius:"33px", border: "none"}}
                        type="button" className="text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 ">
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z" clipRule="evenodd"/>
                        </svg>
                        Create
                        </Link>                    
                        <Link 
                        to={"/edit-profile"}
                        style={{background:"#d93a00",  borderRadius:"33px", border: "none", Onhover:{background:"#962900"}}}
                        type="button" className="text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 ">
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z" clipRule="evenodd"/>
                        </svg>
                        </Link>                    
                    </div> 
                    
                )
            }
            

           
        </div>
        
    </div>
</header>
  )
}

export default Header