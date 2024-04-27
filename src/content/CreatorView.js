import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./../firebase";
import { v4 } from "uuid";
import { uploadGame } from "./../contexts/dbContext"; // Import the function to upload game data

export default function CreatorView() {
  const [imageUpload, setImageUpload] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pythonFile, setPythonFile] = useState(null);
  const [error, setError] = useState(null);

  const allowedImageTypes = ["image/png", "image/jpeg", "image/gif"];
  const pythonAllowedExtension = ".py";

  const handleImageUpload = () => {
    if (!imageUpload || !title || !description || !pythonFile) {
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
  
    const thumbnailRef = ref(storage, `thumbnails/${imageUpload.name + v4()}`);
    const pythonRef = ref(storage, `pythonFiles/${pythonFile.name + v4()}`);
  
    Promise.all([
      uploadBytes(thumbnailRef, imageUpload),
      uploadBytes(pythonRef, pythonFile)
    ]).then(([thumbnailSnapshot, pythonSnapshot]) => {
       Promise.all([
        getDownloadURL(thumbnailSnapshot.ref),
        getDownloadURL(pythonSnapshot.ref)
      ]).then(([thumbnailUrl, pythonUrl]) => {
        uploadGame(title, description, thumbnailUrl, pythonUrl);
        setError(null);
        setTitle("");
        setDescription("");
        setImageUpload(null);
        setPythonFile(null);
      }).catch(error => {
        setError("Failed to get download URLs for uploaded files. Please try again.");
        console.error("Error getting download URLs:", error);
      });
    }).catch(error => {
      setError("Failed to upload files. Please try again.");
      console.error("Error uploading files:", error);
    });
  };
  
  return (
    <div>
      <h1 className="text-center font-weight-bold mb-5">Create a Game</h1>
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
        </Form.Group>

        <Button className="form-control-file border p-2" onClick={handleImageUpload}> Upload Game</Button>
        {error && <Alert variant='danger'>{error}</Alert>}
      </Form>
    </div>
  );
}