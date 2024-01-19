import React from "react";
import './Header.css'
import { NavLink  } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";
import {userLoginContext} from '../contexts/userLoginContext'

function Header() {
  let [, setCurrentUser, userLoginStatus, setUserLoginStatus,,, setIsTemple,] = useContext(userLoginContext)
  
  function userLogout(){
    setCurrentUser({})
    setUserLoginStatus(false)
  }

  return (
    <ul className="">
      {userLoginStatus === false ? (
        <>
          <li className="nav-item">
            <Link className="nav-link"  to="">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link"to="view-temples">
              Views Temples
            </Link>
          </li>
          {/* Dropdown */}
          <li className="nav-item" >
            <span className="nav-link">Register</span>
             <div className="dropdown-content">
              <Link className="nav"   to="register" onClick={()=>{setIsTemple(true)}}>
                As Temple 
               </Link>
                <Link  className="nav"  to="register" onClick={()=>{setIsTemple(false)}}>
                  As Guest 
                </Link>
             </div>
          </li>
          {/* Dropdown */}
          <li className="nav-item" >
            <span className="nav-link">Login</span>
             <div className="dropdown-content">
              <Link className="nav"  to="login" onClick={()=>{setIsTemple(true)}}>
                As Temple 
               </Link>
                <Link className="nav"  to="login" onClick={()=>{setIsTemple(false)}}>
                 As Guest 
                </Link>
             </div>
          </li>
        </>
      ) : (
      <>
        <li className="nav-item"> <Link className="nav-link" to="edit-profile">Edit Profile</Link></li>
        <li className="nav-item"> <Link className="nav-link" onClick={userLogout}> Logout</Link> </li>
        
       </>
      )}
      
    </ul>
  );
}

export default Header;