import React from "react";
import './Header.css'
import { Link } from "react-router-dom";
import { useContext } from "react";
import {userLoginContext} from '../contexts/userLoginContext'
import { TempleContext } from '../contexts/TempleContext'

function Header() {
  let [currentUser, setCurrentUser, userLoginStatus, setUserLoginStatus,onUserLogin,error,setError] = useContext(userLoginContext)
  let [isTemple, setIsTemple,currentTemple, setCurrentTemple,templeLoginStatus, setTempleLoginStatus] = useContext(TempleContext)

  function userLogout(){
    if(isTemple){
      setCurrentTemple({});
      setTempleLoginStatus(false);
    }else{
      setCurrentUser({});
      setUserLoginStatus(false);
    }
  }

  return (
    <ul className='mb-0 shadow'>
      {(userLoginStatus === false)&&(templeLoginStatus === false) ? (
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