import {useContext,useState} from 'react'
import './UserProfile.css'
import axios from 'axios'
import {useForm} from 'react-hook-form'
import { userLoginContext } from '../contexts/userLoginContext'

function UserProfile() {
  let [currentUser,setCurrentUser]=useContext(userLoginContext)
  let [edit , setEdit]  = useState(false)
  let [msg , setmsg]  = useState('')

  
  let {register , handleSubmit } = useForm();

    // async function updateUserDetails(userObj){
    //   try{
    //     // fetching user data from api
    //     await axios.get(`http://localhost:4000/users?username=${currentUser.username}`)
    //     .then(response => {
    //       let userData = response.data
    //       let updatedData = {...userData , name : userObj.name , mobNumber: userObj.mobNumber , email : userObj.email , dob : userObj.dob, }
    //       // updating local state
    //       setCurrentUser(updatedData);

    //       //updating data at local api
    //       let res = axios.put(`http://localhost:4000/users/${currentUser.id}`,updatedData)
    //       .then()
    //       .catch(error => console.error('Error updating user data:',error));
           
    //         if (res.status === 200) {
    //             setmsg('Updated Successfully')
    //           }

    //     })
    //     .catch(error => console.error('Error Fetching in  user data:',error))
    //      setEdit(false)    
    //   }catch(error){
    //     console.error('Error Fetching in  user data:',error.message);
    //   }
    // }

    async function updateUserDetails(userObj) {
      try {
        // Fetching user data from API
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
          setmsg('Updated Successfully');
        } else {
          console.error('Error updating user data:', updateResponse.statusText);
        }
      } catch (error) {
        console.error('Error updating or fetching user data:', error.message);
      }
      setEdit(false)
    }

    async function editUserDetails(){
        if(edit){
          setEdit(false)
        }else{
          setEdit(true)
        }
          
    }


  return (
    <section>
        <div className='user-profile mx-auto m-5 rounded w-50 p-3'>
          <p className="fs-1 text-primary fw-bold text-center">Welcome ,{currentUser.name}</p> 

            <div className='user-details'>
                {/* <img src={currentUser.profileImg} width='60px'  alt="" /> */}
                <div className='user-info'>
                  <p className='fs-2 text-center w-75 rounded'>YOUR DETAILS</p>
                  { currentUser.name && <p className="" >Username  : {currentUser.username}</p>}
                  { currentUser.email && <p className="">Email  : {currentUser.email}</p> }
                  { currentUser.mobNumber && <p className="">Mobile  : {currentUser.mobNumber}</p> }
                  { currentUser.dob && <p className="">DOB  : {currentUser.dob}</p> }
                </div>
              {/* <div className='user-img'>
                <img style={{ }}  src='https://cdn.vox-cdn.com/thumbor/qA-TzEAfAehxFNMqgf_z_Y9d5jo=/0x0:1500x1000/1200x800/filters:focal(689x369:929x609)/cdn.vox-cdn.com/uploads/chorus_image/image/51709613/westworld1.6maninblack.0.jpg' />
              </div> */}
            </div>
            <button onClick={editUserDetails} className='btn btn-primary mt-3'>Update</button>
            {msg.length!==0&&<p className='fs-5 text-center text-danger mt-3'>{msg}</p>}
        </div>
        
        {/* Edit form....... */}
        {edit && (
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
        )}
      
      </section>
  )
}

export default UserProfile



// import React from "react";
// import { useLocation } from "react-router-dom";


// function UserProfile(){
//     let {state} = useLocation()
    
//     return(
//         <div className="text-center ">
//             <p className="lead display-3 text-center text-primary">Welcome {state.username}</p>
//             <p className="lead display-2 text-center text-primary">Welcome {state.email}</p>
            
//         </div>
//     )
// }

// export default  UserProfile