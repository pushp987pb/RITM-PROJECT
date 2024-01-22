import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./TempleDetails.css"; // Import the CSS file

function TempleDetails() {
  const { id } = useParams();
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
          <div className="temple-details-card stay-facilities-card">
            <h3>Stay Facilities</h3>
            <p>Single Seater: {templeDetails.singleSeaterAvailability}</p>
            <p>Double Seater: {templeDetails.doubleSeaterAvailability}</p>
            <p>Triple Seater: {templeDetails.tripleSeaterAvailability}</p>
            <button className="book-rooms-button">Book Rooms</button>
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
    </div>
  );
}

export default TempleDetails;