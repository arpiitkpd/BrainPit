
import './App.css'
import React,  { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch , useSelector} from "react-redux";
import { login, logout } from "./store/authSlice";
import authService from './appwrite/auth'
import {Header} from '../src/components/index.js'
import { Sidebar } from '../src/components/index.js';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const authStatus = useSelector((state)=> state.auth.status);
    useEffect(() => {
        authService
            .getCurrentUser()
            .then((userData) => {
                if (userData) dispatch(login({ userData }));
                else dispatch(logout());
            })
            .finally(() => setLoading(false));
    }, [dispatch]);
  return !loading ?<div className='block'>
            
            <main>
                <Header authStatus={authStatus}/>
                <div className='grid grid-cols-5 gap-4' style={{height:"91vh"}}>
                  <Sidebar/>
                  <div className="col-span-3 scroll"><Outlet /></div> 
                  
                  <div className='poster' style={{height:"91vh", color:"white", border:"1px solid grey"}} > 
                  <img src="/poster.jpg" alt="poster"  />
                  </div>
                </div>
               
            </main>


</div> : null
}

export default App
