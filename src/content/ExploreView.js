import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ref, get, getDatabase } from "firebase/database";
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, Form } from "react-bootstrap";
import { storage } from "./../firebase";

export default function ExploreView() {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchGames = async () => {
      try {
        console.log("Fetching games...");
        const gamesRef = ref(getDatabase(), "games");
        const snapshot = await get(gamesRef);
        const gamesData = [];
        snapshot.forEach((childSnapshot) => {
          const gameId = childSnapshot.key;
          const gameData = childSnapshot.val();
          gamesData.push({ id: gameId, ...gameData });
        });
        console.log("Games fetched:", gamesData);
        setGames(gamesData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGames();
  }, []);

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    game.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ textAlign: "center" }}>

        <header>
            <div style={{color: "#fff", backgroundColor: "#333", padding: "10px 20px", margin: "10px"}}>
                <h1>Explore Page</h1>
                <p>This page allows you to explore various games available in the Arcade Archive. You can view the most played games and recently played games.</p>
            </div>
        </header>
        
        <input
        type="text"
        placeholder="Search Games"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "2px", padding: "10px", borderRadius: "40px" }}
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        {filteredGames.map((game) => (
          <div key={game.id} style={{ margin: "50px", width: "calc(100% / 3 - 20px)", maxWidth: "300px" }}>
            <div style={{ border: "1px solid #ccc", borderRadius: "10px", padding: "10px", width: "200px" }}>
              <Link to={`/game/${game.id}`} style={{ textDecoration: "none", color: "black", display: "block" }}>
                <img 
                  src={game.thumbnailUrl} 
                  alt={game.title} 
                  style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px 8px 0 0" }}
                />
                <p 
                  style={{ marginTop: "10px", fontSize: "18px", fontWeight: "bold", textAlign: "left", 
                           whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                >
                  {game.title.length > 10 ? game.title.substring(0, 10) + "..." : game.title}
                </p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
}