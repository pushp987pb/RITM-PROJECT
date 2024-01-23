import React from 'react';
import { useForm } from 'react-hook-form';
import { userLoginContext } from '../contexts/userLoginContext';
import { TempleContext } from '../contexts/TempleContext';
import { useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit } = useForm();

  const [,, userLoginStatus, , onUserLogin, error] = useContext(userLoginContext);
  const [isTemple,,,, templeLoginStatus,, onTempleLogin] = useContext(TempleContext);

  useEffect(() => {
    if (userLoginStatus === true || templeLoginStatus === true) {
      const targetPath = isTemple ? "/temple-profile" : "/user-profile";
      navigate(targetPath);
    }
  }, [userLoginStatus, templeLoginStatus, isTemple, navigate]);

  const handleUserLogin = (data) => {
    onUserLogin(data, location, navigate);
  };

  return (
    <div className='d-flex flex-column justify-content-center m-3'>
      <h1 className="display-1 text-center text-info">{ isTemple ? <span> Login as Temple </span>: <span> User Login </span>}</h1>
      {error.length !== 0 && <p className='fs-2 text-center text-danger'>{error}</p>}

      <form onSubmit={handleSubmit(isTemple ? onTempleLogin : handleUserLogin)} name='form1' className='w-50 p-3 border mx-auto mt-3'>
        {
          isTemple ? (
            <div className="form-group mb-2">
              <label htmlFor="email">Email</label>
              <input {...register("email")} type="email" className="form-control" id="email" placeholder="Enter Email"/>
            </div>
          ) : (
            <div className="form-group mb-2">
              <label htmlFor="username">Username</label>
              <input {...register("username")} type="text" className="form-control" id="username" placeholder="Username"/>
            </div>
          )
        }

        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input {...register("password")} type="password" className="form-control" id="password" placeholder="Password"/>
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default Login;
