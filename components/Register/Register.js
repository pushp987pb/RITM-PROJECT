import React from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useState, useContext } from 'react';
import { hashSync } from 'bcryptjs';
import { userLoginContext } from '../contexts/userLoginContext';
import { TempleContext } from '../contexts/TempleContext';

function Register() {
  let [currentUser, setCurrentUser, userLoginStatus, setUserLoginStatus,onUserLogin,error,setError] = useContext(userLoginContext);
  let [isTemple,setIsTemple,currentTemple,setCurrentTemple,templeLoginStatus,setTempleLoginStatus,onTempleLogin]  = useContext(TempleContext)
  let {register,handleSubmit } = useForm();

  let navigate = useNavigate();// to navigate to login page

  async function onUserRegister(userObj){
  try {
        // search for duplicate username
        let res1 = await axios.get(
          isTemple ? `http://localhost:4000/temples?email=${userObj.email}`:`http://localhost:4000/users?username=${userObj.username}`
        );
        let userList = res1.data
        // userList is empty , it means no user existed with this username
        if(userList.length===0){
        // hash the password
        let hashedPassword = hashSync(userObj.password,5) 
        // replace plain password with hashedpassword 
        userObj.password = hashedPassword
          //store in local api
          let res = await axios.post(
            isTemple ? `http://localhost:4000/temples`:`http://localhost:4000/users`, userObj);
              if (res.status === 201) {
                //navigate to Login component
                navigate("/login");
              }
        }else{
          setError('User Already Existed!')
        }
  }catch(err){
    setError(err.message);
  }
  }

  return (
    <div>
       <h1 className="display-1 text-center text-info">
        { isTemple ? <span> Register as Temple </span>: <span> User Registration </span>} </h1>
       {error.length!==0&&<p className='fs-1 text-center text-danger'>{error}</p>}
       
       <form name='form1' onSubmit={handleSubmit(onUserRegister)}  className='w-50 p-3 border mx-auto mt-3'> 
         {
            isTemple ? (
              <div className="form-group mb-3">
              <label htmlFor="name">Name of Temple</label>
              <input {...register("name")} type="text" className="form-control" id="email" placeholder="Name of Temple"/>
              </div>):(
              <div className="form-group mb-2">
              <label htmlFor="username">Username </label>
              <input {...register("username")} type="text" className="form-control" id="username" placeholder="Username"/>
             </div>
           )
          }
            <div className="form-group mb-3">
              <label htmlFor="email">Email</label>
              <input {...register("email")} type="email" className="form-control" id="email" placeholder="Email"/>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password">Password</label>
              <input {...register("password")} type="password" className="form-control" id="password" placeholder="Password"/>
            </div>
            <button type="submit" className="btn btn-primary mx-auto">Register</button>
        </form> 
    </div>
  )
}

export default Register