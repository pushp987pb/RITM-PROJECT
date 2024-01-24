import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import './TempleProfile.css';
import { TempleContext } from '../contexts/TempleContext';

function TempleProfile() {
  const { register, handleSubmit, setValue } = useForm();

  const [, , currentTemple, setCurrentTemple] = useContext(TempleContext);

  const [showRoomsForm, setShowRoomsForm] = useState(false);
  const [eventForm, setEventForm] = useState(false);

  const onRoomUpdate = async (data) => {
    try {
      let updatedData = { ...currentTemple, roomData: { ...data } };
      const updateResponse = await axios.put(`http://localhost:4000/temples/${currentTemple.id}`, updatedData);
      if (updateResponse.status === 200) {
        setCurrentTemple(updatedData);
        console.log('Updated Successfully');
      }
      setShowRoomsForm(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error if necessary
    }
  };
  async function onEventUpdate(data){
    let updatedData = { ...currentTemple, eventData: { ...data } };
    const updateResponse = await axios.put(`http://localhost:4000/temples/${currentTemple.id}`, updatedData);
      if (updateResponse.status === 200) {
        setCurrentTemple(updatedData);
      }
      setEventForm(false);
  }

  useEffect(() => {
    // Set form values when showRoomsForm is true and currentTemple.roomData is defined
    if (showRoomsForm && currentTemple.roomData) {
      setValue("single_seater", currentTemple.roomData.single_seater || '');
      setValue("double_seater", currentTemple.roomData.double_seater || '');
      setValue("triple_seater", currentTemple.roomData.triple_seater || '');
    }
  }, [showRoomsForm, currentTemple]);

  return (
    <section className="temple-profile-section">
      {/* Header Section - Name of Temple */}
      <div className="temple-header">
        <h1 className="temple-name">{currentTemple.name}</h1>
      </div>

      {/* Three Cards Section */}
      <div className="temple-cards-row">
        {/* Stay Upcoming event Card */}
        <div className="temple-profile-card upcoming-events-card">
          <h3>Update Upcoming Event</h3>
          <p className='event-name'>Event Name: {currentTemple.eventData?.event_name || 'No upcoming event'}</p>
          <p className='event-start-date'>Start Date: {currentTemple.eventData?.event_date || 'Not specified'}</p>
          <p className='event-duration'>Duration: {currentTemple.eventData?.event_duration || 'Not specified'}</p>
          <button onClick={() => setEventForm(true)} className="update-rooms-button">
            Update Event
          </button>
        </div>

        {/* Stay Facilities Card */}
        <div className="temple-profile-card stay-facilities-card">
          <h3>Stay Facilities</h3>
          <p>Single Seater: {currentTemple.roomData && currentTemple.roomData.single_seater}</p>
          <p>Double Seater: {currentTemple.roomData && currentTemple.roomData.double_seater}</p>
          <p>Triple Seater: {currentTemple.roomData && currentTemple.roomData.triple_seater}</p>
          <button onClick={() => setShowRoomsForm(true)} className="update-rooms-button">
            Update Rooms
          </button>
        </div>

        <div className="temple-profile-card home-fund-card">
          <h3>DONATION </h3>
          <p className='fs-3'>Total Donations Received: {currentTemple.donation && currentTemple.donation.amount || 0} Rs</p>
          {/* Add form elements to update donation details here */}
        </div>
      </div>

      {/* Temple Details Section - Two-Column Layout */}
      <div className="temple-details-row">
        <div className="temple-details-column">
          <p className='temple-detail'>Temple ID : {currentTemple.id}</p>
          <p className='temple-detail'>Email: {currentTemple.email}</p>
          <p className='temple-detail'>Mobile: {currentTemple.mobNumber}</p>
          <p className='temple-detail'>DIETY: {currentTemple.diety}</p>
          <p className='temple-detail'>State: {currentTemple.state}</p>
          <p className='temple-detail'>District: {currentTemple.district}</p>
        </div>

        <div className="temple-image-column">
          <img src={currentTemple.image} alt='Temple Image' className='temple-image' />
        </div>
      </div>

       {/* Rooms Update Form */}
       {showRoomsForm && (
        <form id='room-update-form' onSubmit={handleSubmit(onRoomUpdate)}>
          <div className="rooms-update-form">
            <h3>Update Rooms Availability</h3>
            <div className="form-group mb-2">
              <label className='text-align-left' htmlFor="name">Single Seater Rooms</label>
              <input {...register("single_seater")} type="text" className="form-control" placeholder="Number of rooms available" required />
            </div>
            <div className="form-group mb-2">
              <label className='text-align-left' htmlFor="name">Double Seater Rooms</label>
              <input {...register("double_seater")} type="text" className="form-control" placeholder="Number of rooms available" required />
            </div>
            <div className="form-group mb-2">
              <label className='text-align-left' htmlFor="name">Triple Seater Rooms</label>
              <input {...register("triple_seater")} type="text" className="form-control" placeholder="Number of rooms available" required />
            </div>
            <div className="form-buttons">
              <button type="submit">Submit</button>
              <button onClick={() => setShowRoomsForm(false)}>Cancel</button>
            </div>
          </div>
        </form>
      )}
      {/* Event update form */}
      { eventForm && (
        <form id='room-update-form' onSubmit={handleSubmit(onEventUpdate)}>
          <div className="rooms-update-form">
            <h3>Update Upcoming Event</h3>
            <div className="form-group mb-2">
              <label htmlFor="event_name">Event Name</label>
              <input {...register("event_name")} type="text" className="form-control" placeholder="Name of Event" required />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="event_date">Event Start Date</label>
              <input {...register("event_date")} type="date" className="form-control" placeholder="Date of Event Starting" required />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="event_duration">Event Duration</label>
              <input {...register("event_duration")} type="text" className="form-control" placeholder="e.g. 3 Days or 5 Days" required />
            </div>
            <div className="form-buttons">
              <button type="submit">Submit</button>
              <button type="button" onClick={() => setEventForm(false)}>Cancel</button>
            </div>
          </div>
        </form>
      )}
    </section>
  );
}

export default TempleProfile;