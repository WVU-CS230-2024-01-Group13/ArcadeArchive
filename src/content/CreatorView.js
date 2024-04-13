import React, { useState } from 'react';

const CreatorView = () => {
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [loadingArchive, setLoadingArchive] = useState(false);

    const handleUploadClick = () => {
        setLoadingUpload(true);
        // Simulate the verification process (replace with actual logic)
        setTimeout(() => {
          setLoadingUpload(false);
        }, 2000); // Simulate a 2-second delay
      };
    
      const handleArchiveClick = () => {
        setLoadingArchive(true);
        // Simulate the verification process (replace with actual logic)
        setTimeout(() => {
          setLoadingArchive(false);
        }, 2000); // Simulate a 2-second delay
      };
      
  return (
    <div style={styles.container}>

      <div style={styles.left}>
        <div style={styles.checkbox}>
          <input type="checkbox" id="hideUsername" />
          <label htmlFor="hideUsername">Hide My Username</label>
        </div>
        <div style={styles.checkbox}>
          <input type="checkbox" id="allowDownloads" />
          <label htmlFor="allowDownloads">Allow Downloads</label>
        </div>
      </div>

      <div style={styles.middle}>
        <input type="text" placeholder="Game Title" style={styles.titleInput} />
        <textarea placeholder="Game Description" style={styles.descriptionInput} />
      </div>

      <div style={styles.right}>
          <div style={{ marginBottom: '30px' }}>
            <input type="file" accept=".py" style={styles.fileInput} />
          </div>
            
          <div style={{ marginBottom: '10px' }}>
            <button
              style={styles.button}
              onClick={handleUploadClick}
              disabled={loadingUpload || loadingArchive}
            >
              {loadingUpload ? 'Verifying Game...' : 'Upload Game Code'}
            </button>
          </div>
          <div>
            <button
              style={styles.button}
              onClick={handleArchiveClick}
              disabled={loadingArchive || loadingUpload}
            >
              {loadingArchive ? 'Verifying Game...' : 'Upload to Archive'}
            </button>
          </div>
        </div>

    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    padding: '20px',
    backgroundColor: '#f2f2f2',
  },
  left: {
    marginBottom: '-80px',
    padding: '20px',
  },
  middle: {
    marginBottom: '20px',
    width: '80%',
    maxWidth: '600px',
    textAlign: 'center',
    padding: '20px',
  },
  right: {
    textAlign: 'right',
    padding: '20px',
  },
  checkbox: {
    marginBottom: '15px',
  },
  titleInput: {
    padding: '12px',
    marginBottom: '70px',
    width: '100%',
    padding: '8px',
    boxSizing: 'border-box',
    fontSize: '18px',
    fontFamily: 'Arial',
  },
  descriptionInput: {
    marginBottom: '10px',
    width: '100%',
    height: '300px',
    padding: '12px',
    boxSizing: 'border-box',
    fontSize: '18px',
    fontFamily: 'Arial',
  },
   fileInput: {
    marginRight: '-50px',
    marginTop: '20px',
    width: '100%',
    padding: '12px', 
    boxSizing: 'border-box',
    fontSize: '16px', 
    fontFamily: 'Arial',
  },
  button: {
    padding: '14px 28px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#484848',
    color: '#fff',
    cursor: 'pointer',
    marginLeft: '10px',
    width: '80%',
    height: 'auto',
    fontSize: '16px',
    marginBottom: '10px',
  },
};

export default CreatorView;
