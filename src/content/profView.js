import React from "react";
import { useNavigate } from 'react-router-dom';

const ProfView = () => {

  const navigate = useNavigate();
  return (
    <div class="containter-fluid text-center">
      <div class="row row-cols-3 g-2">
        <div class="col">
          <div class="card">
            <img href="profile.jpg" alt="Profile pic" />
          </div>
        </div>
        <div class="card">
          <div class="col">
            <h2>Username</h2>
            <p>Insert Bio Here</p>
            <button class="btn btn-secondary" onClick={navigate("/profile/settings")}>Edit Profile</button>

          </div>
        </div>
        <div class="col">
        </div>
        <div class="col">
          <div class="card">
            <h5>Games Played</h5>
            <ul>
            //logic for firebase
            </ul>
          </div>
        </div>
        <div class="col">
          <div class="card">
            <h5>Your Games</h5>
          //logic for firebase
          </div>
        </div>
        <div class="col">
          <div class="card">
            <h5>Friends List</h5>
            <ul>
            //logic for firebase
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfView;