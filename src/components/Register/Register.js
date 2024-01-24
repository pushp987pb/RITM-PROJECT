import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { hashSync } from 'bcryptjs';
import { userLoginContext } from '../contexts/userLoginContext';
import { TempleContext } from '../contexts/TempleContext';
import './Register.css'; // Import the CSS file

function Register() {
  let [currentUser, setCurrentUser, userLoginStatus, setUserLoginStatus, onUserLogin, error, setError] = useContext(
    userLoginContext
  );
  let [isTemple, setIsTemple, currentTemple, setCurrentTemple, templeLoginStatus, setTempleLoginStatus, onTempleLogin] =
    useContext(TempleContext);
  let { register, handleSubmit } = useForm();

  let navigate = useNavigate(); // to navigate to login page

  async function onUserRegister(userObj) {
    try {
      // search for duplicate username
      let res1 = await axios.get(
        isTemple
          ? `http://localhost:4000/temples?email=${userObj.email}`
          : `http://localhost:4000/users?username=${userObj.username}`
      );
      let userList = res1.data;
      // userList is empty, it means no user existed with this username
      if (userList.length === 0) {
        // hash the password
        let hashedPassword = hashSync(userObj.password, 5);
        // replace plain password with hashedpassword
        userObj.password = hashedPassword;
        // store in local api
        let res = await axios.post(
          isTemple ? `http://localhost:4000/temples` : `http://localhost:4000/users`,
          userObj
        );
        if (res.status === 201) {
          // navigate to Login component
          navigate('/login');
        }
      } else {
        setError('User Already Existed!');
      }
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className='login-section'>
        <div className='wrapper'>
          <div className="title">
            {isTemple ? 'Temple Registration' : 'User Registraton'}
          </div>
          {error.length !== 0 && <p className='fs-2 text-center text-danger'>{error}</p>}

          <form onSubmit={handleSubmit(onUserRegister)} name='form1'>
            {
              isTemple ? (
            <div className="field">
              <input {...register('name')} type="text" required/>
              <label htmlFor="name">Name of Temple</label>
            </div>
            
          ) : (
            <div className="field">
              <input {...register('username')} type="text" required/>
              <label htmlFor="username">Username </label>
            </div>
          )}
          <div className="field">
            <input {...register('email')} type="email" required />
            <label htmlFor="email">Email Address</label>
          </div>
          <div className="field">
            <input {...register('password')} type="password" required />
            <label htmlFor="password">Password</label>
          </div>
            <div className="field">
              <input type="submit" value="Register"/>
            </div>
        </form>
      </div>
    </section>
  );
}

export default Register;