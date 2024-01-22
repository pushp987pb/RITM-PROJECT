import React, { useContext, useState } from 'react';
import axios from 'axios';
import {useForm} from 'react-hook-form'
import './TempleProfile.css';
import { TempleContext } from '../contexts/TempleContext';
import { userLoginContext } from '../contexts/userLoginContext';

function TempleProfile() {
  let {register , handleSubmit , setValue } = useForm();

  let [onRoomsUpdate] = useContext(TempleContext);

  let [currentUser] = useContext(userLoginContext);

  const [showRoomsForm, setShowRoomsForm] = useState(false);
  const [roomsData, setRoomsData] = useState({
    singleSeater: 0,
    doubleSeater: 0,
    tripleSeater: 0,
  });

  return (
    <section className="temple-profile-section">
      {/* Header Section - Name of Temple */}
      <div className="temple-header">
        <h1 className="temple-name">{currentUser.name}</h1>
      </div>

      {/* Three Cards Section */}
      <div className="temple-cards-row">
        <div className="temple-profile-card upcoming-events-card">
          <h3>Update Upcoming Event</h3>
          <p className='event-name'>Event Name: {currentUser.upcomingEventName || 'No upcoming event'}</p>
          <p className='event-start-date'>Start Date: {currentUser.upcomingEventStartDate || 'Not specified'}</p>
          <p className='event-duration'>Duration: {currentUser.upcomingEventDuration || 'Not specified'}</p>
          {/* Add form elements to update event details here */}
        </div>

        {/* Stay Facilities Card */}
        <div className="temple-profile-card stay-facilities-card">
          <h3>Stay Facilities</h3>
          <p>Single Seater: {currentUser.singleSeaterRooms}</p>
          <p>Double Seater: {currentUser.doubleSeaterRooms}</p>
          <p>Triple Seater: {currentUser.tripleSeaterRooms}</p>
          <button onClick={() => setShowRoomsForm(true)} className="update-rooms-button">
            Update Rooms
          </button>
        </div>

        <div className="temple-profile-card home-fund-card">
          <h3>Home Fund</h3>
          <p>Total Donations Received: ${currentUser.homeFund || 0}</p>
          {/* Add form elements to update donation details here */}
        </div>
      </div>

      {/* Temple Details Section - Two-Column Layout */}
      <div className="temple-details-row">
        <div className="temple-details-column">
        <p className='temple-detail'>Temple ID : {currentUser.id}</p>
          <p className='temple-detail'>Email: {currentUser.email}</p>
          <p className='temple-detail'>Mobile: {currentUser.mobNumber}</p>
          <p className='temple-detail'>DIETY: {currentUser.diety}</p>
          <p className='temple-detail'>State: {currentUser.state}</p>
          <p className='temple-detail'>District: {currentUser.district}</p>
        </div>

        <div className="temple-image-column">
          <img src={currentUser.image} alt='Temple Image' className='temple-image' />
        </div>
      </div>
    {/* Rooms Update Form */}
      {showRoomsForm && (
        <form  id='room-update-form' onSubmit={handleSubmit(onRoomsUpdate)}>
          <div className="rooms-update-form">
            <h3>Update Rooms Availability</h3>
            <div className="form-group mb-2">
            <label className='text-align-left' htmlFor="name">Temple ID</label>
            <input  value={currentUser.id}  type="text" className="form-control" disabled/>
            </div> 
            <div className="form-group mb-2">
            <label className='text-align-left' htmlFor="name">Single Seater Rooms</label>
            <input  {...register("single_seater")} type="text" className="form-control"placeholder="Number of rooms available" required/>
            </div>  
            <div className="form-group mb-2">
            <label className='text-align-left' htmlFor="name">Double Seater Rooms</label>
            <input  {...register("double_seater")} type="text" className="form-control"placeholder="Number of rooms available" required/>
            </div>  
            <div className="form-group mb-2">
            <label className='text-align-left' htmlFor="name">Tripe Seater Rooms</label>
            <input  {...register("triple_seater")} type="text" className="form-control"placeholder="Number of rooms available" required/>
            </div>  
            <div className="form-buttons">
              <button type="submit">Submit</button>
              <button onClick={() => setShowRoomsForm(false)}>Cancel</button>
            </div>
          </div>
          </form>)}
    </section>
  );
}

export default TempleProfile;





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