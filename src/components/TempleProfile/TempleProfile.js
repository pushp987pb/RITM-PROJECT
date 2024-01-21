import {useContext,useState} from 'react'
import './TempleProfile.css';
import {Link} from "react-router-dom";
import { userLoginContext } from '../contexts/userLoginContext'

function UserProfile() {
  let [currentUser,setCurrentUser]=useContext(userLoginContext)
  let [msg , setmsg]  = useState('')

  function userLogout(){
    // setCurrentUser({})
    // setUserLoginStatus(false)
  }


  return (
    <section className="section">
        <header className='templeProfile-header'>
            <ul>
             <li className="nav-item"> <Link className="link" to="edit-profile">Edit Profile</Link></li>
             <li className="nav-item"> <Link className="link" onClick={userLogout}> Logout</Link> </li>
            </ul>
        </header>
      <div className='user-profile mx-auto m-5 rounded w-50 p-3'>
        <p className="fs-1 text-primary fw-bold text-center">Welcome {currentUser.name}</p>
        <div className='user-details'>
          <img
            className='profile-image'
            src = 'https://images.unsplash.com/photo-1524443169398-9aa1ceab67d5?q=80&w=1448&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            // src={currentUser.profileImg}
            alt='Profile'
          />
          <div className='user-info'>
            <p className='fs-2 text-center w-75 rounded'>YOUR DETAILS</p>
            {currentUser.username && <p className=''>Username: {currentUser.username}</p>}
            {currentUser.email && <p className=''>Email: {currentUser.email}</p>}
            {currentUser.mobNumber && <p className=''>Mobile: {currentUser.mobNumber}</p>}
            {currentUser.dob && <p className=''>DOB: {currentUser.dob}</p>}
          </div>
        </div>
        {msg.length !== 0 && <p className='fs-5 text-center text-danger mt-3'>{msg}</p>}
      </div>
    </section>
  )
}

export default UserProfile




        {/* Edit form....... */}
        {/* {edit && (
          <div id="id01" className="modal">
              <form name='form1' onSubmit={handleSubmit(updateUserDetails)}  className='modal-content animate'>
                  <div className="form-group mb-2">
                    <label htmlFor="username">Username</label>
                    <input value={currentUser.username} type="text" className="form-control" id="username" placeholder="Username" disabled/>
                  </div>
                  <div className="form-group mb-2">
                    <label htmlFor="name">Name</label>
                    <input {...register("name")} type="text" className="form-control" id="name" placeholder="Full Name" required/>
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="email">Email</label>
                    <input {...register("email")} type="email" className="form-control" id="email" placeholder="Email" required/>
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="tel">Mobile</label>
                    <input {...register("mobNumber")} type="tel" className="form-control" id="tel" placeholder="Mobile" required/>
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="dob">Date of Birth</label>
                    <input {...register("dob")} type="date" className="form-control" id="tel" placeholder="Date of Birth" required/>
                  </div>
                  <button  type="submit" className="btn btn-success mx-auto">Save</button>
                  <button onClick={editUserDetails}  type="button" className="btn btn-danger mx-auto">Cancel</button>
              </form> 
          </div>
        )} */}