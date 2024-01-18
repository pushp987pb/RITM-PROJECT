import React from "react";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import axios from "axios";
import { userLoginContext } from '../contexts/userLoginContext'
import { useNavigate } from "react-router-dom";

function EditProfile(){
    
    let navigate = useNavigate();
    let {register , handleSubmit } = useForm();
    let [currentUser,setCurrentUser]=useContext(userLoginContext)

    async function updateUserDetails(userObj) {
        try {
        const updatedData = {
            ...currentUser,
            ...userObj,
          };
      
          // // Updating local state
          setCurrentUser(updatedData);
      
          // Updating data in local API
          const updateResponse = await axios.put(`http://localhost:4000/temples/${currentUser.id}`, updatedData);
      
          // Check if the update was successful
          if (updateResponse.status === 200) {
            console.log('Updated Successfully');
          } else {
            console.error('Error updating user data:', updateResponse.statusText);
          }
          // navigate to user profile page
          navigate("/user-profile")

        } catch (error) {
          console.error('Error updating or fetching user data:', error.message);
        }
      }
      
      function openProfile(){
        console.log("came from cancel button")
        navigate("/user-profile")
      }

    return(
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
                  <button onClick={openProfile} type="button" className="btn btn-danger mx-auto">Cancel</button>
              </form> 
          </div>
    )
}

export default EditProfile