import React, { useState, useEffect } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "./../firebase";
import { update } from "firebase/database";
import { useParams, useNavigate } from "react-router-dom";
import { getDatabase, ref as databaseRef, get } from "firebase/database";
import { useAuth } from "../contexts/AuthContext";

export default function UpdateGame() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [pythonFile, setPythonFile] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const allowedImageTypes = ["image/png", "image/jpeg", "image/gif"];
  const pythonAllowedExtension = ".py";

  const [thumbnailUploaded, setThumbnailUploaded] = useState(false);
  const [pythonUploaded, setPythonUploaded] = useState(false);

  // Fetch game details
  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const database = getDatabase();
        const gameRef = databaseRef(database, `games/${id}`);
        const snapshot = await get(gameRef);
        const gameData = snapshot.val();
        setTitle(gameData.title);
        setDescription(gameData.description);
      } catch (error) {
        console.error("Error fetching game details:", error);
      }
    };
    fetchGameDetails();
  }, [id]);

  const handleUpdate = async () => {
    try {
      if (!title || !description || !imageUpload || !pythonFile) {
        setError("Please fill in all fields and upload both an image and a Python file.");
        return;
      }

      if (!imageUpload.type || !allowedImageTypes.includes(imageUpload.type)) {
        setError("Only .png, .jpg, and .gif files are allowed for images.");
        return;
      }

      const pythonFileName = pythonFile.name;
      const pythonFileExtension = pythonFileName.substring(pythonFileName.lastIndexOf('.'));
      if (pythonFileExtension !== pythonAllowedExtension) {
        setError("Only Python (.py) files are allowed for the Python script.");
        return;
      }

      const thumbnailRef = ref(storage, `thumbnails/${imageUpload.name}`);
      const pythonRef = ref(storage, `pythonFiles/${pythonFile.name}`);

      // Upload new files
      await Promise.all([
        uploadBytes(thumbnailRef, imageUpload),
        uploadBytes(pythonRef, pythonFile)
      ]);

      // Get download URLs
      const [thumbnailSnapshot, pythonSnapshot] = await Promise.all([
        getDownloadURL(thumbnailRef),
        getDownloadURL(pythonRef)
      ]);

      // Update game data in the database
      const database = getDatabase();
      const gameRef = databaseRef(database, `games/${id}`);
      await update(gameRef, {
        title,
        description,
        thumbnailUrl: thumbnailSnapshot,
        pythonUrl: pythonSnapshot
      });

      setSuccessMessage("Game updated successfully!");
      setError(null);

      // Set uploaded flags to true
      setThumbnailUploaded(true);
      setPythonUploaded(true);
    } catch (error) {
      setError("Failed to update game. Please try again.");
      console.error("Error updating game:", error);
    }
  };

  return (
    <div>
      <h1 className="text-center font-weight-bold mb-5">Update Game</h1>
      <Form>
        <Form.Group>
          <Form.Label htmlFor="file-upload" className="form-control-file border p-2 mb-2" style={{ cursor: 'pointer' }}>
            Choose Thumbnail Image
          </Form.Label>
          <Form.Control
            id="file-upload"
            className="d-none"
            type="file"
            accept=".png, .jpg, .gif"
            onChange={(event) => setImageUpload(event.target.files[0])}
          />
          {thumbnailUploaded && <Alert variant="success">Thumbnail uploaded successfully!</Alert>}
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Control
            type="text"
            placeholder="Title"
            className="form-control border p-2"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Control
            as="textarea"
            placeholder="Description"
            className="form-control border p-2"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="python-upload" className="form-control-file border p-2 mb-2" style={{ cursor: 'pointer' }}>
            Choose Python File
          </Form.Label>
          <Form.Control
            id="python-upload"
            className="d-none"
            type="file"
            accept=".py"
            onChange={(event) => setPythonFile(event.target.files[0])}
          />
          {pythonUploaded && <Alert variant="success">Python file uploaded successfully!</Alert>}
        </Form.Group>

        <Button className="form-control-file border p-2" onClick={handleUpdate}> Update Game</Button>
        {error && <Alert variant='danger'>{error}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
      </Form>
    </div>
  );
}