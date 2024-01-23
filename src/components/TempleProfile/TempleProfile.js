import React, { useContext, useState , useEffect} from 'react';
import axios from 'axios';
import {useForm} from 'react-hook-form'
import './TempleProfile.css';
import { TempleContext } from '../contexts/TempleContext';

function TempleProfile() {
  let {register , handleSubmit , setValue } = useForm();

  let [,,currentTemple] = useContext(TempleContext);

  const [showRoomsForm, setShowRoomsForm] = useState(false);
  const [roomData, setRoomsData] = useState({
    singleSeater: 0,
    doubleSeater: 0,
    tripleSeater: 0,
  });

  useEffect(() => {
    // Fetch room details when the component mounts
    fetchRoomDetails();
  }, [currentTemple.id]); // Fetch room details whenever the temple ID changes

  const fetchRoomDetails = async () => {
    try {
      // Fetch room details from local API based on the current temple ID
      const response = await axios.get(`http://localhost:4000/templeRoomDetails?templeId=${currentTemple.id}`);
      // Update state with the fetched data
      setRoomsData(response.data[0]);
    } catch (error) {
      console.error('Error fetching room details:', error);
      // Handle error if necessary
    }
  };
  
  const onRoomUpdate = async (data) => {
    try {
      // Fetch the existing room details first
      const existingRoomDetails = await axios.get(`http://localhost:4000/templeRoomDetails?templeId=${currentTemple.id}`);
      
      if (existingRoomDetails.data.length > 0) {
        // If room details exist, update them using axios.put
        await axios.put(`http://localhost:4000/templeRoomDetails/${existingRoomDetails.data[0].id}`, {
          singleSeater: data.single_seater,
          doubleSeater: data.double_seater,
          tripleSeater: data.triple_seater,
        });
      } else {
        // If room details don't exist, create them using axios.post
        await axios.post(`http://localhost:4000/templeRoomDetails`, {
          templeId: currentTemple.id,
          singleSeater: data.single_seater,
          doubleSeater: data.double_seater,
          tripleSeater: data.triple_seater,
        });
      }
  
      // Fetch updated room details after successful update
      fetchRoomDetails();
  
      // Close the form
      setShowRoomsForm(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error if necessary
    }
  };

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
          <p className='event-name'>Event Name: {currentTemple.upcomingEventName || 'No upcoming event'}</p>
          <p className='event-start-date'>Start Date: {currentTemple.upcomingEventStartDate || 'Not specified'}</p>
          <p className='event-duration'>Duration: {currentTemple.upcomingEventDuration || 'Not specified'}</p>
          {/* Add form elements to update event details here */}
        </div>

        {/* Stay Facilities Card */}
        <div className="temple-profile-card stay-facilities-card">
        <h3>Stay Facilities</h3>
              <p>Single Seater: {roomData && roomData.singleSeater}</p>
              <p>Double Seater: {roomData && roomData.doubleSeater}</p>
              <p>Triple Seater: {roomData && roomData.tripleSeater}</p>
        <button onClick={() => setShowRoomsForm(true)} className="update-rooms-button">
          Update Rooms
        </button>
      </div>

        <div className="temple-profile-card home-fund-card">
          <h3>Home Fund</h3>
          <p>Total Donations Received: ${currentTemple.homeFund || 0}</p>
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
        <form  id='room-update-form' onSubmit={handleSubmit(onRoomUpdate)}>
          <div className="rooms-update-form">
            <h3>Update Rooms Availability</h3>
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





    