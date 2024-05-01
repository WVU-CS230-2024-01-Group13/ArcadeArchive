import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ref as databaseRef, get, getDatabase, remove, update } from "firebase/database";
import { ref as storageRef, getDownloadURL } from "firebase/storage";
import { storage } from "./../firebase";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext"; // Import the authentication context

export default function GameDetailsView() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [pythonUrl, setPythonUrl] = useState(null);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth(); // Get the current authenticated user
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        console.log("Fetching game details for ID:", id);
        const database = getDatabase();
        const gameRef = databaseRef(database, `games/${id}`);
        const snapshot = await get(gameRef);
        const gameData = snapshot.val();
        console.log("Game details snapshot:", gameData);
        setGame(gameData);

        // Generate direct download URL for Python file
        const pythonFileRef = storageRef(storage, gameData.pythonUrl);
        const url = await getDownloadURL(pythonFileRef);
        setPythonUrl(url);
      } catch (error) {
        console.error("Error fetching game details:", error);
      }
    };
    fetchGameDetails();
  }, [id]);

  const trackDownload = async () => {
    try {
      // Increment downloads count for the current game in the database
      const database = getDatabase();
      const gameRef = databaseRef(database, `games/${id}`);
      const snapshot = await get(gameRef);
      const downloadsCount = snapshot.val().downloadsCount || 0;
      update(gameRef, { downloadsCount: downloadsCount + 1 });
    } catch (error) {
      console.error("Error tracking download:", error);
    }
  };

  const handleDeleteGame = async () => {
    try {
      const database = getDatabase();
      const gameRef = databaseRef(database, `games/${id}`);
      
      // Check if the current user is the uploader of the game
      if (currentUser.uid === game.uploaderId) {
        await remove(gameRef);
        navigate("/"); // Redirect to the explore page after successful deletion
      } else {
        setError("You are not authorized to delete this game.");
      }
    } catch (error) {
      console.error("Error deleting game:", error);
    }
  };
  
  const handleUpdateGame = () => {
    navigate(`/update-game/${id}`);
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          {error && <Alert variant="danger">{error}</Alert>}
          {game && (
            <Card>
              <Card.Body style={{backgroundColor: "lightgray", borderRadius: "10px"}}>
                <Card.Title>{game.title}</Card.Title>
                <Card.Text>{game.description}</Card.Text>
                {pythonUrl && (
                  <Button onClick={trackDownload} variant="primary" href={pythonUrl} download={`${game.title}.py`} style={{marginBottom: "10px"}}>
                    View Game File
                  </Button>
                )}

                {currentUser && currentUser.uid === game.uploaderId && (
                  <div>
                    <Button variant="danger" onClick={handleDeleteGame} className="ml-2" style={{marginBottom: "10px"}}>
                      Delete Game
                    </Button>
                    <Button onClick={handleUpdateGame} className="ml-2" style={{marginBottom: "10px", backgroundColor: "#FFD700", borderColor: "#FFD700" }}>
                      Update Game
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}
