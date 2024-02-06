import React from 'react';
import { useForm } from 'react-hook-form';
import { userLoginContext } from '../contexts/userLoginContext';
import { TempleContext } from '../contexts/TempleContext';
import { useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "./login.css"

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit } = useForm();

  const [,,userLoginStatus,,onUserLogin, error] = useContext(userLoginContext);
  const [isTemple,,,,templeLoginStatus,, onTempleLogin,msg] = useContext(TempleContext);

    useEffect(() => {
      if (userLoginStatus === true || templeLoginStatus === true) {
        const targetPath = isTemple ? "/temple-profile" : "/user-profile";
        navigate(targetPath);
      }
    }, [userLoginStatus, templeLoginStatus, isTemple, navigate]);

    const handleUserLogin = (data) => {
      onUserLogin(data, location, navigate);
    };
    function toRegister(){
      navigate("/register");
    }

  return (
   <section className='login-section'>
      <div className='wrapper'>
        <div className="title">
          {isTemple ? 'Temple Login' : 'User Login'}
        </div>
        {error.length !== 0 && <p className='fs-4 text-center text-danger'>{error}</p>}
        {msg.length !== 0 && <p className='fs-4 text-center text-danger'>{msg}</p>}
        <form onSubmit={handleSubmit(isTemple ? onTempleLogin : handleUserLogin)} name='form1'>
          {
            isTemple ? (
              <div className="field">
                <input {...register("email")} type="email" id="email"  required/>
                <label htmlFor="email">Email Address</label>
              </div>
            ) : (
              <div className="field">
                <input {...register("username")} type="text" id="username" required/>
                <label htmlFor="username">Username</label>
              </div>
            )
          }

          <div className="field">
            <input {...register("password")} type="password" id="password" required/>
            <label htmlFor="password">Password</label>
          </div>
          <div className="field">
            <input type="submit" value="Login"/>
          </div>
           <div className="signup-link">
            Not a member? <span onClick={toRegister}>Register now</span>
          </div> 
        </form>
      </div>
   </section>
  );
}

export default Login;