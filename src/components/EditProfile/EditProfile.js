import "./EditProfile.css";
import React from "react";
import { useForm } from "react-hook-form";
import { useContext , useEffect} from "react";
import axios from "axios";
import { userLoginContext } from '../contexts/userLoginContext'
import { TempleContext } from '../contexts/TempleContext'
import { useNavigate } from "react-router-dom";

function EditProfile(){
    
    let navigate = useNavigate();
    let {register , handleSubmit , setValue } = useForm();
    let [currentUser, setCurrentUser]=useContext(userLoginContext);
    let [isTemple,,currentTemple,setCurrentTemple] = useContext(TempleContext)

    useEffect(() => {
      // Set initial values for the form based on the current user's data
      if (isTemple) {
        setValue("name", currentTemple.name || "");
        setValue("diety", currentTemple.diety || "");
        setValue("mobNumber", currentTemple.mobNumber || "");
        setValue("state", currentTemple.state || "");
        setValue("district", currentTemple.district || "");
        setValue("about", currentTemple.about || "");
        setValue("image", currentTemple.image || "");
      } else {
        setValue("fullname", currentUser.fullname || "");
        setValue("email", currentUser.email || "");
        setValue("mobNumber", currentUser.mobNumber || "");
        setValue("dob", currentUser.dob || "");
        setValue("gender", currentUser.gender || "");
      }
    }, [currentUser,currentTemple,  isTemple, setValue]);

    async function updateUserDetails(userObj) {
        try {
          const updatedData = isTemple
          ? { ...currentTemple, ...userObj }
          : { ...currentUser, ...userObj };
      
          // // Updating local state
          isTemple ? setCurrentTemple(updatedData) : setCurrentUser(updatedData);
      
          // Updating data in local API
          const updateResponse = await axios.put( 
            isTemple ? `http://localhost:4000/temples/${currentTemple.id}`:`http://localhost:4000/users/${currentUser.id}`, updatedData);
            
      
          // Check if the update was successful
          if (updateResponse.status === 200) {
            console.log('Updated Successfully');
          } else {
            console.error('Error updating user data:', updateResponse.statusText);
          }
          // navigate to user profile page
          isTemple ? navigate("/temple-profile") : navigate("/user-profile") ;
          

        } catch (error) {
          console.error('Error updating or fetching user data:', error.message);
        }
      }
      
      function openProfile(){
        console.log("came from cancel button")
        isTemple ?  navigate("/temple-profile") :navigate("/user-profile")
      }

    return(
      <section className='edit-profile-container'>
         <div className='edit-profile-wrapper'>
            <div className="title">
              Edit Profile
            </div>
           {
            isTemple ? (
              <form name='form1' onSubmit={handleSubmit(updateUserDetails)}>
                <div className="field">
                  <label htmlFor="username">Email</label>
                  <input value={currentTemple.email} type="email"disabled/>
                </div>
                <div className="field">
                  <label htmlFor="name">Name of Temple</label>
                  <input {...register("name")} type="text" required/>
                </div>
                <div className="field">
                  <label htmlFor="diety">Diety</label>
                  <input {...register("diety")} type="text" required/>
                </div>
                <div className="field">
                  <label htmlFor="tel">Mobile</label>
                  <input {...register("mobNumber")} type="tel" required/>
                </div>
                <div className="field">
                  <label htmlFor="about">About Temple</label>
                  <textarea {...register("about")}> </textarea>
                </div>
                <div className="field">
                  <label htmlFor="image">Temple Image URL</label>
                  <input {...register("image")} type="text" />
                </div>
                <div className="field">
                  <label htmlFor="state">State</label>
                  <input {...register("state")} type="text" required/>
                </div>
                <div className="field">
                  <label htmlFor="district">District</label>
                  <input {...register("district")} type="text"  required/>
                </div>
                  <div className="field">
                    <button  type="submit" className="edit-btn save">Save</button>
                    <button onClick={openProfile} type="button" className="edit-btn cancel">Cancel</button>
                  </div> 
              </form> 
   
            ) : (
              <form name='form1' onSubmit={handleSubmit(updateUserDetails)} >
              <div className="field">
                <label htmlFor="username">Username</label>
                <input value={currentUser.username} type="text" disabled/>
              </div>
              <div className="field">
                <label htmlFor="fullname">Full Name</label>
                <input {...register("fullname")} type="text" required/>
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input {...register("email")} type="email"  required/>
              </div>
              <div className="field">
                <label htmlFor="tel">Mobile</label>
                <input {...register("mobNumber")} type="tel" required/>
              </div>
              <div className="field">
                <label htmlFor="dob">Date of Birth</label>
                <input {...register("dob")} type="date" required/>
              </div>
              <div className="field">
                <label htmlFor="gender">Genger</label>
                <input {...register("gender")} type="text" required/>
              </div>
               <div className="field">
                <button  type="submit" className="edit-btn save">Save</button>
                <button onClick={openProfile} type="button" className="edit-btn cancel">Cancel</button>
              </div>
            </form> )
          }
        </div>    
      </section>
   
   )
}

export default EditProfile