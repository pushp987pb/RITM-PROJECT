import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./TempleDetails.css"; // Import the CSS file

function TempleDetails() {
  const { id } = useParams();
  const [templeDetails, setTempleDetails] = useState(null);
  let [roomData , setRoomData] = useState(null)
  const [showLoginForm, setShowLoginForm] = useState(false);

  useEffect(() => {
    const fetchTempleDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/temples/${id}`);
        setTempleDetails(response.data);
        const res = await axios.get(`http://localhost:4000/templeRoomDetails?templeId=${id}`);
        setRoomData(res.data[0]);
        console.log(roomData)
      } catch (error) {
        console.error("Error fetching temple details", error);
      }
    };

    fetchTempleDetails();
  }, [id]);

  const handleBookRoomsClick = () => {
    // Show the login form when "Book Rooms" is clicked
    setShowLoginForm(true);
  };

  const handleLoginFormSubmit = (event) => {
    // Handle login form submission logic here
    // You can add your authentication logic
    // Once authenticated, you can proceed with room booking
    // For simplicity, let's just close the form
    setShowLoginForm(false);
    event.preventDefault();
  };

  if (!templeDetails) {
    // You can add loading spinner or other UI for when the data is being fetched
    return <p>Loading temple details...</p>;
  }

  return (
    <div className="temple-details-container">

      <div className="temple-header">
        <h1 className="temple-name">{templeDetails.name}</h1>
      </div>

      <div className="temple-columns">
        {/* First Column */}
        <div className="first-column">
          <div className="temple-image-row">
            <img className="temple-details-image" src={templeDetails.image} alt="Image of Temple" />
            <div id="temple-details-column">
              <p className="temple-detail">Email: {templeDetails.email}</p>
              <p className="temple-detail">State: {templeDetails.state}</p>
              <p className="temple-detail">District: {templeDetails.district}</p>
            </div>
          </div>
          <div className="temple-about-row">
            <p className="temple-details-about">{templeDetails.about}</p>
          </div>
        </div>

        {/* Second Column */}
        <div className="second-column">

          {/* Upcoming Events Card */}
          <div className="temple-details-card upcoming-events-card">
            <h3>Upcoming Events</h3>
            {templeDetails.upcomingEvents ? (
              <p>{templeDetails.upcomingEvents}</p>
            ) : (
              <p>No upcoming events at the moment.</p>
            )}
          </div>

          {/* Stay Facilities Card */}
          {/* Stay Facilities Card */}
            <div className="temple-details-card stay-facilities-card">
              <h3>Stay Facilities</h3>
              <p>Single Seater: {roomData && roomData.singleSeater}</p>
              <p>Double Seater: {roomData && roomData.doubleSeater}</p>
              <p>Triple Seater: {roomData && roomData.tripleSeater}</p>
              <button onClick={handleBookRoomsClick} className="book-rooms-button">
                Book Rooms
              </button>
            </div>

          {/* Make Donations Card */}
          <div className="temple-details-card make-donations-card">
            <h3>Make Donations</h3>
            <p>
              Support the temple's development and activities. Your contribution can make a
              difference.
            </p>
            <button className="donate-button">Make Donation</button>
          </div>
        </div>
      </div>

      {/* Login Form */}
      {showLoginForm && (
        <div className="login-form-container">
          <form onSubmit={handleLoginFormSubmit} className="login-form">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
            <div className="form-buttons">
              <button type="submit">Submit</button>
              <button onClick={() => setShowLoginForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}

export default TempleDetails;