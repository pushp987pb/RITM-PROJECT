import {useContext,useState} from 'react'
import './UserProfile.css';
import { userLoginContext } from '../contexts/userLoginContext'

function UserProfile() {
  let [currentUser]=useContext(userLoginContext)

  return (
    <section className="user-profile-section">
      <header className='user-profile-header'>
        <h3>Welcome <br></br>{currentUser.fullname ? currentUser.fullname : 'Mr. Anonymous' }</h3>
        <div className='user-profile-img'>
              <img src={currentUser.profileImg ? currentUser.profileImg : 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg&ga=GA1.1.1801501137.1706076229&semt=ais'}
                alt="Profile"/> 
        </div>
      </header>
      <div className='user-profile-about'>
         <h3>About</h3>
         <div className='user-profile-about-details'>
            <p>Username: {currentUser.username ? currentUser.username : 'Not Specified' }</p>
            <p>Gender : {currentUser.gender ? currentUser.gender : 'Not Specified' }</p>
            <p>Mobile : {currentUser.mobNumber ? currentUser.mobNumber : 'Not Specified' }</p>
            <p>DOB : {currentUser.dob ? currentUser.dob : 'Not Specified' }</p>
            <p>Email : {currentUser.email ? currentUser.email : 'Not Specified' }</p>
          </div>
      </div>
      <div className='user-profile-cards'>
        <div className='user-profile-card'>
          <h5>Room Booking Details</h5>
           {currentUser.bookedRooms ? (
              <>
                <p>Single Seater: {currentUser.bookedRooms.single_seater}</p>
                <p>Double Seater: {currentUser.bookedRooms.double_seater}</p>
                <p>Triple Seater: {currentUser.bookedRooms.triple_seater}</p>
              </>
            ) : (
              <p>No Record Found</p>
            )}
        </div>
        <div className='user-profile-card'>
            <h5>Donation Details</h5>
              {currentUser.donation ? (
              <>
                <p>Amount: {currentUser.donation.amount}</p>
                <p>Payment Mode: {currentUser.donation.payment_method}</p>
                <p>To : {currentUser.templeName}</p>
              </>
            ) : (
                  <p>No Record Found</p>
                )}
        </div>
      </div>
    </section>
  );
}

export default UserProfile;

{/*
<div className="user-profile-header">
<div className="profile-image-container">
   <img
    src={currentUser.profileImg ? currentUser.profileImg : 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg&ga=GA1.1.1801501137.1706076229&semt=ais'}
    alt="Profile"
    className="profile-image"
  /> 
</div>
</div>

<div className="user-details">
<p>Welcome {currentUser.fullname}</p>

<div className="about-user">
  <p>Email: {currentUser.email}</p>
  <p>DOB: {currentUser.dob}</p>
  <p>Username: {currentUser.username}</p>
</div>

<div className="card-row">
  <div className="card">
    <p className="card-title">About User</p>
    <p>Email: {currentUser.email}</p>
    <p>DOB: {currentUser.dob}</p>
    <p>Username: {currentUser.username}</p>
    <p>Gender: {currentUser.gender}</p>
  </div>

  <div className="card">
    <p className="card-title">Booked Room Details</p>
    {currentUser.bookedRooms ? (
      <>
        <p>Single Seater: {currentUser.bookedRooms.single_seater}</p>
        <p>Double Seater: {currentUser.bookedRooms.double_seater}</p>
        <p>Triple Seater: {currentUser.bookedRooms.triple_seater}</p>
      </>
    ) : (
      <p>No Record Found</p>
    )}
  </div>

  <div className="card">
    <p className="card-title">Donation Details</p>
    {currentUser.donation ? (
      <p>You have donated: {currentUser.donation.amount} to {currentUser.templeName}</p>
    ) : (
      <p>No Record Found</p>
    )}
  </div>
</div>
</div>





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