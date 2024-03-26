import React from "react";

const Card = () => {
return(
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
          <a href="#" class="btn btn-secondary">Edit Profile</a>

        </div>
      </div>
      <div class="col">
      </div>
      <div class="col">
        <div class="card">
          <h5>Games Played</h5>
          <ul>
            <li>Game 1</li>
            <li>Game 2</li>
            <li>Game 3</li>
            <li>Game 1</li>
            <li>Game 2</li>
            <li>Game 3</li>
            <li>Game 1</li>
            <li>Game 2</li>
            <li>Game 3</li>
          </ul>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <h5>Your Games</h5>
          <p>Interact With Your Games</p>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <h5>Friends List</h5>
          <ul>
            <li>Friend 1</li>
            <li>Friend 2</li>
            <li>Friend 3</li>
            <li>Friend 1</li>
            <li>Friend 2</li>
            <li>Friend 3</li>
            <li>Friend 1</li>
            <li>Friend 2</li>
            <li>Friend 3</li>
            <li>Friend 1</li>
            <li>Friend 2</li>
            <li>Friend 3</li>
            <li>Friend 1</li>
            <li>Friend 2</li>
            <li>Friend 3</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Card;