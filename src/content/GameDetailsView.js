import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ref as databaseRef, get, getDatabase } from "firebase/database";
import { ref as storageRef, getDownloadURL } from "firebase/storage";
import { storage } from "./../firebase";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

export default function GameDetailsView() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [pythonUrl, setPythonUrl] = useState(null);

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

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          {game && (
            <Card>
              <Card.Body>
                <Card.Title>{game.title}</Card.Title>
                <Card.Text>{game.description}</Card.Text>
                {pythonUrl && (
                  <Button variant="primary" href={pythonUrl} download={`${game.title}.py`}>
                    Download Python File
                  </Button>
                )}
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}