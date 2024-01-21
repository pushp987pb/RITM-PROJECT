import "./EditProfile.css";
import React from "react";
import { useForm } from "react-hook-form";
import { useContext , useEffect} from "react";
import axios from "axios";
import { userLoginContext } from '../contexts/userLoginContext'
import { useNavigate } from "react-router-dom";

function EditProfile(){
    
    let navigate = useNavigate();
    let {register , handleSubmit , setValue } = useForm();
    let [currentUser, setCurrentUser, , ,,isTemple, setIsTemple,error,setError]=useContext(userLoginContext);

    useEffect(() => {
      // Set initial values for the form based on the current user's data
      if (isTemple) {
        setValue("name", currentUser.name || "");
        setValue("diety", currentUser.diety || "");
        setValue("mobNumber", currentUser.mobNumber || "");
        setValue("state", currentUser.state || "");
        setValue("district", currentUser.district || "");
      } else {
        setValue("fullname", currentUser.fullname || "");
        setValue("email", currentUser.email || "");
        setValue("mobNumber", currentUser.mobNumber || "");
        setValue("dob", currentUser.dob || "");
        setValue("gender", currentUser.gender || "");
      }
    }, [currentUser, isTemple, setValue]);

    async function updateUserDetails(userObj) {
        try {
        const updatedData = {
            ...currentUser,
            ...userObj,
          };
      
          // // Updating local state
          setCurrentUser(updatedData);
      
          // Updating data in local API
          const updateResponse = await axios.put( 
            isTemple ? `http://localhost:4000/temples/${currentUser.id}`:`http://localhost:4000/users/${currentUser.id}`, updatedData);
            
      
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
        <div className='model'>
          {
            isTemple ? (
              <form name='form1' onSubmit={handleSubmit(updateUserDetails)}  className='modal-content'>
                <div className="form-group mb-2">
                  <label htmlFor="username">Email</label>
                  <input value={currentUser.email} type="email" className="form-control" id="username" placeholder="" disabled/>
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="name">Name of Temple</label>
                  <input {...register("name")} type="text" className="form-control" id="name" placeholder="Name of Temple" required/>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="diety">Diety</label>
                  <input {...register("diety")} type="text" className="form-control" id="diety" placeholder="Name of God whose temple is......." required/>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="tel">Mobile</label>
                  <input {...register("mobNumber")} type="tel" className="form-control" id="tel" placeholder="Mobile" required/>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="state">State</label>
                  <input {...register("state")} type="text" className="form-control" id="state" placeholder="State" required/>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="district">District</label>
                  <input {...register("district")} type="text" className="form-control" id="district" placeholder="District" required/>
                </div>
                <button  type="submit" className="btn btn-success mx-auto">Save</button>
                <button onClick={openProfile} type="button" className="btn btn-danger mx-auto">Cancel</button>
          </form> 
   
            ) : (
              <form name='form1' onSubmit={handleSubmit(updateUserDetails)}  className='modal-content'>
              <div className="form-group mb-2">
                <label htmlFor="username">Username</label>
                <input value={currentUser.username} type="text" className="form-control" id="username" placeholder="Username" disabled/>
              </div>
              <div className="form-group mb-2">
                <label htmlFor="fullname">Full Name</label>
                <input {...register("fullname")} type="text" className="form-control" id="name" placeholder="Full Name" required/>
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
                <input {...register("dob")} type="date" className="form-control" id="dob" placeholder="Date of Birth" required/>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="gender">Genger</label>
                <input {...register("gender")} type="text" className="form-control" id="dob" placeholder="Male/Female" required/>
              </div>
              <button  type="submit" className="btn btn-success mx-auto">Save</button>
              <button onClick={openProfile} type="button" className="btn btn-danger mx-auto">Cancel</button>
          </form> )
          }
              
        </div>
   
   )
}

export default EditProfile