import React from 'react';

const Analytics = () =>{
   return (
      <body>
        <h1 className="main-title">Analytics</h1>
  
        <div id="grid-container">
          <div>
            <h2>Game 1</h2>
            <ul>
              <li>Total Players:</li>
              <li>Average Players:</li>
              <li>Repeat Players:</li>
            </ul>
            <p>Rating:</p>
            <p>
              <img
                src="https://static-resources.zybooks.com/star.png"
                alt="star"
              />
              <img
                src="https://static-resources.zybooks.com/star.png"
                alt="star"
              />
              <img
                src="https://static-resources.zybooks.com/star.png"
                alt="star"
              />
              <img
                src="https://static-resources.zybooks.com/star.png"
                alt="star"
              />
              <img
                src="https://static-resources.zybooks.com/star.png"
                alt="star"
              />
            </p>
          </div>
          <div>
            <h2>Game 2</h2>
            <ul>
              <li>Total Players:</li>
              <li>Average Players:</li>
              <li>Repeat Players:</li>
            </ul>
            <p>Rating:</p>
            <p>
              <img
                src="https://static-resources.zybooks.com/star.png"
                alt="star"
              />
              <img
                src="https://static-resources.zybooks.com/star.png"
                alt="star"
              />
              <img
                src="https://static-resources.zybooks.com/star.png"
                alt="star"
              />
              <img
                src="https://static-resources.zybooks.com/star.png"
                alt="star"
              />
              <img
                src="https://static-resources.zybooks.com/star.png"
                alt="star"
              />
            </p>
          </div>
          <div>
            <h2>Game 3</h2>
            <ul>
              <li>Total Players:</li>
              <li>Average Players:</li>
              <li>Repeat Players:</li>
            </ul>
            <p>Rating:</p>
            <p>
              <img
                src="https://static-resources.zybooks.com/star.png"
                alt="star"
              />
              <img
                src="https://static-resources.zybooks.com/star.png"
                alt="star"
              />
              <img
                src="https://static-resources.zybooks.com/star.png"
                alt="star"
              />
              <img
                src="https://static-resources.zybooks.com/star.png"
                alt="star"
              />
              <img
                src="https://static-resources.zybooks.com/star.png"
                alt="star"
              />
            </p>
          </div>
          <div>
            <h2>Game 4</h2>
            <ul>
              <li>Total Players:</li>
              <li>Average Players:</li>
              <li>Repeat Players:</li>
            </ul>
            <p>Rating:</p>
            <p>
              <img
                src="https://static-resources.zybooks.com/star.png"
                alt="star"
              />
              <img
                src="https://static-resources.zybooks.com/star.png"
                alt="star"
              />
              <img
                src="https://static-resources.zybooks.com/star.png"
                alt="star"
              />
              <img
                src="https://static-resources.zybooks.com/star.png"
                alt="star"
              />
              <img
                src="https://static-resources.zybooks.com/star.png"
                alt="star"
              />
            </p>
          </div>
          <div>
            <h2>Game 5</h2>
            <ul>
              <li>Total Players:</li>
              <li>Average Players:</li>
              <li>Repeat Players:</li>
            </ul>
            <p>Rating:</p>
            <p>
              <img
                src="https://static-resources.zybooks.com/star.png"
                alt="star"
              />
              <img
                src="https://static-resources.zybooks.com/star.png"
                alt="star"
              />
              <img
                src="https://static-resources.zybooks.com/star.png"
                alt="star"
              />
              <img
                src="https://static-resources.zybooks.com/star.png"
                alt="star"
              />
              <img
                src="https://static-resources.zybooks.com/star.png"
                alt="star"
              />
            </p>
          </div>
          <div>
            <h2>Game 6</h2>
            <ul>
              <li>Total Players:</li>
              <li>Average Players:</li>
              <li>Repeat Players:</li>
            </ul>
            <p>Rating:</p>
            <p>
              <img
                src="https://static-resources.zybooks.com/star.png"
                alt="star"
              />
              <img
                src="https://static-resources.zybooks.com/star.png"
                alt="star"
              />
              <img
                src="https://static-resources.zybooks.com/star.png"
                alt="star"
              />
              <img
                src="https://static-resources.zybooks.com/star.png"
                alt="star"
              />
              <img
                src="https://static-resources.zybooks.com/star.png"
                alt="star"
              />
            </p>
          </div>
        </div>
      </body>
    );
}

const styles = {
   fontFamily: "'Times New Roman', Times, serif",
   textAlign: "center",
   color: "black",
   fontSize: "40pt"
 };
 
 const bodyStyle = {
   backgroundColor: "rgba(255, 255, 255, 0.5)",
   backgroundImage: 'url("video-game-collage-wallpaper-preview.jpg")',
   backgroundBlendMode: "overlay"
 };
 
 const gridContainerStyle = {
   display: "grid",
   gridTemplateColumns: "repeat(3, 1fr)",
   gap: "20px"
 };
 
 const gridItemStyle = {
   display: "flex",
   flexDirection: "column",
   backgroundColor: "rgba(255, 255, 255, 0.9)",
   border: "5px solid rgba(0, 0, 0, 0.8)",
   padding: "10px",
   fontSize: "15px",
   borderRadius: "15px",
   textAlign: "center"
 };
export default Analytics;