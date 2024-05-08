
import './App.css'
import React,  { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch , useSelector} from "react-redux";
import { login, logout } from "./store/authSlice";
import authService from './appwrite/auth'
import {Header} from '../src/components/index.js'

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
            { authStatus? <Header/>: null}
            <main>
                <Outlet />
            </main>


</div> : null
}

export default App
