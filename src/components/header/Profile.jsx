
    // <Link 
    // to={"/edit-profile"}
    // style={{background:"#d93a00",  borderRadius:"33px", border: "none", Onhover:{background:"#962900"}}}
    // type="button" className="text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 ">
    // <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
    // <path fillRule="evenodd" d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z" clipRule="evenodd"/>
    // </svg>
    // </Link>  
    
  import React, { useState, useRef, useEffect } from 'react';
  import { Link } from 'react-router-dom';
import './Profile.css';
import LogOutBtn from '../LogOutBtn';
import { useSelector } from 'react-redux';


const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  
  const userData = useSelector((state)=> state.auth.userData);
 

  return (
    <div className='prof'>
      <div className="text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2" onClick={handleToggleMenu}>
      <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z" clipRule="evenodd"/>
    </svg>
      </div>
      {isOpen && (
        <div className="dropdown-menu" ref={menuRef}>
          <ul>
            <li style={{cursor:'text', text:"#c0b6b3",fontWeight: "500"
            }}>{userData.name}</li>
            <li><Link to={"/edit-profile"}>Profile</Link></li>
           
            <li><Link to={"/about"}>Settings</Link></li>
            
            <li><LogOutBtn/></li>
            
          </ul>
        </div>
      )}
    </div>
  );
};


export default Profile