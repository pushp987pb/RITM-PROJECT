import React from 'react'
import {useForm} from 'react-hook-form'
import { userLoginContext } from '../contexts/userLoginContext';
import { useEffect,useContext } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  let navigate = useNavigate();
  let {register , handleSubmit } = useForm();

  let [currentUser,setCurrentUser,userLoginStatus, setUserLoginStatus,onUserLogin,isTemple,setIsTemple,error] = useContext(userLoginContext);
  
  useEffect(()=>{
     if(userLoginStatus === true){
      isTemple ? navigate("/temple-profile") :navigate("/user-profile") ;
     }
  },[userLoginStatus]);



  return (
    <div className='d-flex flex-column justify-content-center m-3'>
       <h1 className="display-1 text-center text-info">{ isTemple ? <span> Login as Temple </span>: <span> User Login </span>}</h1>
       {error.length !== 0 && <p className='fs-2 text-center text-danger'>{error}</p>}
       {/* ussername */}
      
       <form onSubmit = {handleSubmit(onUserLogin)} name='form1' className='w-50 p-3 border mx-auto mt-3'>
          {
            isTemple ? (
              <div className="form-group mb-2">
              <label htmlFor="email">Email</label>
              <input {...register("email")} type="email" className="form-control" id="email" placeholder="Enter Email"/>
              </div>):(
              <div className="form-group mb-2">
              <label htmlFor="username">Username</label>
              <input {...register("username")} type="text" className="form-control" id="username" placeholder="Username"/>
             </div>
           )
          }
          
            
              {/* password */}
            <div className="form-group mb-3">
              <label htmlFor="password">Password</label>
              <input {...register("password")} type="password" className="form-control" id="password" placeholder="Password"/>
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>  
      </div>
  )
}

export default Login


  //function
  // async function onUserLogin(userCredObj){
  //   // make api call to verify credentials
  //   let res = await axios.get(`http://localhost:4000/users?username=${userCredObj.username}`)
  //   let userList = res.data

  //   //if user not existed
  //   if(userList.length === 0){
  //       setError('Invalid Username')
  //   }
  //   else{ // if username is matched , then camparing passwords
  //     let result = compareSync(userCredObj.password,userList[0].password)
  //      // if password are not matched
  //     if(result === false){
  //       setError('Invalid Password')
  //     }
  //     // if password is matched , navigate to userprofile
  //     else{
  //         navigate('/user-profile',{state:userList[0]})
  //     }
  //   }
  // }