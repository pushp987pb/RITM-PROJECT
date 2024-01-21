import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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
    <div>
      <h2>{templeDetails.name}</h2>
      <p>Email: {templeDetails.email}</p>
      <p>State: {templeDetails.state}</p>
      <p>District: {templeDetails.district}</p>
      {/* Add other temple details as needed */}
    </div>
  );
}

export default TempleDetails;
