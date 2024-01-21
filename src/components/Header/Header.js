import React from "react";
import './Header.css'
import { Link } from "react-router-dom";
import { useContext } from "react";
import {userLoginContext} from '../contexts/userLoginContext'

function Header() {
  let [, setCurrentUser, userLoginStatus, setUserLoginStatus,onUserLogin,isTemple, setIsTemple,error,setError] = useContext(userLoginContext)
  
  function userLogout(){
    setCurrentUser({})
    setUserLoginStatus(false)
  }

  return (
    <ul className='mb-0 shadow'>
      {userLoginStatus === false ? (
        <>
          <li className="nav-item">
            <Link className="link"  to="">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="link"to="view-temples">
              Views Temples
            </Link>
          </li>
          {/* Dropdown */}
          <li className="nav-item" >
            <span className="link">Register</span>
             <div className="dropdown-content">
              <Link className="nav"   to="register" onClick={()=>{setIsTemple(true);setError('')}}>
                As Temple 
               </Link>
                <Link  className="nav"  to="register" onClick={()=>{setIsTemple(false);setError('')}}>
                  As Guest 
                </Link>
             </div>
          </li>
          {/* Dropdown */}
          <li className="nav-item" >
            <span className="link">Login</span>
             <div className="dropdown-content">
              <Link className="nav"  to="login" onClick={()=>{setIsTemple(true);setError('')}}>
                As Temple 
               </Link>
                <Link className="nav"  to="login" onClick={()=>{setIsTemple(false);setError('')}}>
                 As Guest 
                </Link>
             </div>
          </li>
        </>
      ) : (
      <>
        <li className="nav-item"> <Link className="link" to="edit-profile">Edit Profile</Link></li>
        <li className="nav-item"> <Link className="link" onClick={userLogout}> Logout</Link> </li>
        
       </>
      )}
      
    </ul>
  );
}

export default Header;