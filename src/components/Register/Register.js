import React from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { hashSync } from 'bcryptjs';

function Register() {
  let [error,setError] = useState("");

  let {register,handleSubmit } = useForm();

  let navigate = useNavigate();// to navigate to login page

  async function onUserRegister(userObj){
  try {
        // search for duplicate username
        let res1 = await axios.get(`http://localhost:4000/temples?username=${userObj.username}`)
        let userList = res1.data
        // userList is empty , it means no user existed with this username
        if(userList.length===0){
        // hash the password
        let hashedPassword = hashSync(userObj.password,5) 
        // replace plain password with hashedpassword 
        userObj.password = hashedPassword
          //store in local api
          let res = await axios.post("http://localhost:4000/temples", userObj);
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
       <h1 className="display-1 text-center text-info">Register</h1>
       {error.length!==0&&<p className='fs-1 text-center text-danger'>{error}</p>}
       
       <form name='form1' onSubmit={handleSubmit(onUserRegister)}  className='w-50 p-3 border mx-auto mt-3'>
            <div className="form-group mb-2">
              <label htmlFor="username">Username</label>
              <input {...register("username")} type="text" className="form-control" id="username" placeholder="Username"/>
             </div>
            <div className="form-group mb-3">
              <label htmlFor="password">Password</label>
              <input {...register("password")} type="password" className="form-control" id="password" placeholder="Password"/>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email">Email</label>
              <input {...register("email")} type="email" className="form-control" id="email" placeholder="Email"/>
            </div>
            <button type="submit" className="btn btn-primary mx-auto">Register</button>
        </form> 
    </div>
  )
}

export default Register