import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {useForm} from 'react-hook-form'
import "./TempleDetails.css"; // Import the CSS file
import { useParams, useNavigate } from "react-router-dom";
import { userLoginContext } from '../contexts/userLoginContext';

function TempleDetails() {
  const { register, handleSubmit } = useForm();

  const { id } = useParams();
  const navigate = useNavigate();
  const [currentUser] = useContext(userLoginContext);

  const [showBookingForm, setShowBookingForm] = useState(false);
  const [donationFrom, setDonationFrom] = useState(false);
  let [showAlert , setShowAlert] = useState(false);

  
  const [templeDetails, setTempleDetails] = useState(null);
  useEffect(() => {
    const fetchTempleDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/temples/${id}`);
        setTempleDetails(response.data);
      } catch (error) {
        console.error("Error fetching temple details", error);
      }
    };

    fetchTempleDetails();
  }, [id]);

  const handleBookRoomsClick = () => {
    if (Object.keys(currentUser).length === 0) {
      // User is not logged in, show alert
      setShowAlert(true);
    } else {
      // User is logged in, show booking form
      setShowBookingForm(true);
    }
  };
  function sendToLogin(){
    navigate(`/login?id=${id}`);
  }
  const handleMakeDonationClick = () => {
    if (Object.keys(currentUser).length === 0) {
      // User is not logged in, show alert
      setShowAlert(true);
    } else {
      // User is logged in, show donation form
      setDonationFrom(true);
    }
  };

  async function onRoomBooking(data){
      let updatedData = { ...currentUser,templeName:templeDetails.name, bookedRooms: { ...data } };
      const updateResponse = await axios.put(`http://localhost:4000/users/${currentUser.id}`, updatedData);
        if (updateResponse.status === 200) {
        console.log('Room Booked Successfully Successfully');
      }
        // now updating temple data 
        // Calculate the remaining rooms after booking
      const remainingSingleSeater = templeDetails.roomData.single_seater - data.single_seater;
      const remainingDoubleSeater = templeDetails.roomData.double_seater - data.double_seater;
      const remainingTripleSeater = templeDetails.roomData.triple_seater - data.triple_seater;

      // Update the templeDetails object with the remaining rooms
      const updatedTempleDetails = {
        ...templeDetails,
        roomData: {
          single_seater: remainingSingleSeater,
          double_seater: remainingDoubleSeater,
          triple_seater: remainingTripleSeater,
        },
  };

      // Make API request to update templeDetails in the backend 
      const res = await axios.put(`http://localhost:4000/temples/${id}`, updatedTempleDetails);

      if (res.status === 200) {
        console.log('Room Booked Successfully');
        // Update the local state with the new templeDetails
        setTempleDetails(updatedTempleDetails);
      }
        setShowBookingForm(false);
  };

  async function onDonation(data) {
    let updatedData = { ...currentUser, donation: { ...data } };
  
    const userUpdateResponse = await axios.put(`http://localhost:4000/users/${currentUser.id}`, updatedData);
    if (userUpdateResponse.status === 200) {
      console.log('Donation updated at USER API');
    }
  
    // Ensure that templeDetails.donation.amount is a valid number
    let currentDonationAmount = parseInt(templeDetails?.donation?.amount) || 0;
    let additionalDonationAmount = parseInt(data.amount) || 0;
  
    // Perform addition with default value of 0
    let totalDonation = currentDonationAmount + additionalDonationAmount;
  
    // Corrected assignment to the amount property
    const updatedTempleDetails = { ...templeDetails, donation: { amount: totalDonation } };
  
    // Make API request to update templeDetails in the backend 
    const res = await axios.put(`http://localhost:4000/temples/${id}`, updatedTempleDetails);
  
    if (res.status === 200) {
      console.log('Donation updated at TEMPLE Successfully');
      // Update the local state with the new templeDetails
      setTempleDetails(updatedTempleDetails);
    }
  
    setDonationFrom(false);
  }
  
  

  if (!templeDetails) {
    return <p className='lead display-1 text-danger'>Loading temple details...</p>;
  }

  return (
  <div className="temple-details-container">

        <div className="temple-header">
          <h1 className="temple-name">{templeDetails.name}</h1>
          {currentUser.username && <p className='current-user'> Username: {currentUser.username}</p>}
        </div>
        

      <div className="temple-columns">
        {/* First Column */}
          <div className="first-column">
             <div className="temple-info-row">
                <p className="temple-detail">Email: {templeDetails.email ? templeDetails.email : "Not Provided"}</p>
                <p className="temple-detail">State: {templeDetails.state  ? templeDetails.state : "Not Provided"}</p>
                <p className="temple-detail">District: {templeDetails.district  ? templeDetails.district : "Not Provided"}</p>
              </div>
            <div className="temple-image-row">
              <img className="temple-details-image"
                src={templeDetails.image ? templeDetails.image : "https://media.istockphoto.com/id/508628776/photo/sunset-over-kandariya-mahadeva-temple.webp?b=1&s=170667a&w=0&k=20&c=b8XnVpyy7hDGgHpBOpXTZ581q6Xqan0IUaGKRcgZRRM="} alt="Image of Temple" />
            </div>
            <div className="temple-about-row">
              <p className="temple-details-about"> <b>ABOUT TEMPLE</b> <br></br> {templeDetails.about ? templeDetails.about : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." }</p>
            </div>
          </div>

        {/* Second Column */}
        <div className="second-column">

          {/* Upcoming Events Card */}
          <div className="temple-details-card upcoming-events-card">
            <h3>Upcoming Events</h3>
            {templeDetails.eventData ? (
              <>
                <p>Event Name : {templeDetails.eventData.event_name}</p>
                <p>Event Date : {templeDetails.eventData.event_date}</p>
                <p>Event Duration : {templeDetails.eventData.event_duration}</p>
              </>
            ) : (
              <p>No upcoming events at the moment.</p>
            )}
          </div>

          {/* Stay Facilities Card */}
          <div className="temple-details-card stay-facilities-card">
            <h3>Stay Facilities</h3>
            <p>Single Seater Rooms: {templeDetails.roomData ? templeDetails.roomData.single_seater : "Not Specified"}</p>
            <p>Double Seater Rooms: {templeDetails.roomData ? templeDetails.roomData.double_seater : "Not Specified"}</p>
            <p>Triple Seater Rooms: {templeDetails.roomData ? templeDetails.roomData.triple_seater : "Not Specified"}</p>
            <button className="book-rooms-button" onClick={handleBookRoomsClick}>
              Book Rooms
            </button>
          </div>

          <div className="temple-details-card make-donations-card">
            <h3>Make Donations</h3>
            <p>
              Support the temple's development and activities. Your contribution can make a
              difference.
            </p>
            <button className="donate-button" onClick={handleMakeDonationClick}>
              Make Donation
            </button>
          </div>

        </div>

      </div>

      {/* Room Booking form */}
      { showBookingForm && (
        <form id='room-update-form' onSubmit={handleSubmit(onRoomBooking)}>
          <div className="rooms-update-form">
            <div className="title">
               Provide Room Details
            </div>
            <p className="available-rooms">Available<br></br> Rooms</p>
            <div className="field">
              <label id="name">Single Seater Rooms</label>
              <input {...register("single_seater")} type="number" min='0' max={templeDetails.roomData && templeDetails.roomData.single_seater} placeholder="No. of rooms" required />
               <span>{templeDetails.roomData && templeDetails.roomData.single_seater}</span> 
            </div>
            <div className="field">
              <label htmlFor="name">Double Seater Room</label>
              <input {...register("double_seater")} type="number" min='0' max={templeDetails.roomData && templeDetails.roomData.double_seater} placeholder="No. of rooms" required />
               <span>{templeDetails.roomData && templeDetails.roomData.double_seater}</span>
            </div>
            <div className="field">
              <label htmlFor="name">Triple Seater Rooms</label>
              <input {...register("triple_seater")} type="number"  min='0' max={templeDetails.roomData && templeDetails.roomData.triple_seater} placeholder="No. of rooms" required />
               <span>{templeDetails.roomData && templeDetails.roomData.triple_seater}</span>
            </div>
            <div className="form-buttons">
              <button className="form-buttons-btn" type="submit">Submit</button>
              <button className="form-buttons-btn" type="button" onClick={() => setShowBookingForm(false)}>Cancel</button>
            </div>
          </div>
        </form>
      )}

      {/* Donation  form */}
      { donationFrom && (
        <form id='room-update-form' onSubmit={handleSubmit(onDonation)}>
          <div className="rooms-update-form">
            <h3>Donation Details</h3>
            <div className="form-group mb-2">
              <label className='text-align-left' htmlFor="name">Amount</label>
              <input {...register("amount")} type="number" className="form-control" min='0'  placeholder="Amount" required />
            </div>
            <div className="form-group mb-2">
              <label className='text-align-left' htmlFor="name">Method of Payment</label>
              <input {...register("payment_method")} type="text" className="form-control" min='0'  placeholder="e.g. NEFT/IMPS/UPI" required />
            </div>
            <div className="form-buttons">
              <button className="form-buttons-btn" type="submit">Submit</button>
              <button className="form-buttons-btn"  type="button" onClick={() => setDonationFrom(false)}>Cancel</button>
            </div>
          </div>
        </form>
      )}

      {/* Alert   Box */}
      { showAlert && (
        <section className="alert-container">
          <div className="alert-box">
              <p>You need to login for Booking Rooms/Donation</p>
              <div className="alert-buttons-container">
                <button onClick={sendToLogin} className="btn btn-primary"> Login</button>
                <button onClick={() => setShowAlert(false)} className="btn btn-danger">Cancel</button>
             </div>
            </div>
        </section>
      )}


  </div>
  );
}

export default TempleDetails;