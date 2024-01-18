import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";
import {userLoginContext} from '../contexts/userLoginContext'

function Header() {
  let [,setCurrentUser,userLoginStatus, setUserLoginStatus] = useContext(userLoginContext)
  
  function userLogout(){
    setCurrentUser({})
    setUserLoginStatus(false)
  }

  return (
    <ul className="nav shadow  justify-content-end fs-4 p-2">
      {userLoginStatus === false ? (
        <>
            <li className="nav-item">
            <Link className="nav-link" to="">
              Home
            </Link>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="register">
              Register
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="login">
              Login
            </NavLink>
          </li>
        </>
      ) : (
      <>
        <li className="nav-item">
            <NavLink className="nav-link" to="edit-profile">
              Edit Profile
            </NavLink>
        </li>
        <li className="nav-item"  onClick={userLogout}>
            <NavLink className="nav-link" to="">
              Logout
            </NavLink>
        </li>
        
       </>
      )}
      
    </ul>
  );
}

export default Header;