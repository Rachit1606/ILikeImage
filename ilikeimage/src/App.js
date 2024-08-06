import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState('');
  const [format, setFormat] = useState('JPG');
  const [requestId, setRequestId] = useState('');
  const [status, setStatus] = useState('');
  const [sourceLink, setSourceLink] = useState('');
  const [destinationLink, setDestinationLink] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result.split(',')[1]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConvert = () => {
    if (!imageBase64) {
      alert('Please upload an image first.');
      return;
    }

    const createdTime = new Date().toISOString();
    const payload = {
      image_data: `data:image/png;base64,${imageBase64}`,
      format: format,
      createdTime: createdTime,
    };

    axios.post('https://5k3st44q9i.execute-api.us-east-1.amazonaws.com/Prod/', payload)
      .then((response) => {
        const { request_id } = JSON.parse(response.data.body);
        setRequestId(request_id);
        setStatus('InProgress');
      })
      .catch((error) => {
        alert('Failed to start conversion');
        console.error(error);
      });
  };

  useEffect(() => {
    let interval;
    if (status === 'InProgress' && requestId) {
      interval = setInterval(() => {
        axios.get(`https://5k3st44q9i.execute-api.us-east-1.amazonaws.com/Prod/${requestId}`)
          .then((response) => {
            const responseBody = JSON.parse(response.data.body);
            const { status: apiStatus, source_image_link, destination_image_link } = responseBody;
            
            if (apiStatus !== status) {
              setStatus(apiStatus);
            }

            if (apiStatus === 'Completed') {
              setSourceLink(source_image_link);
              setDestinationLink(destination_image_link);
              clearInterval(interval); // Clear interval once completed
            } else if (apiStatus === 'Failed') {
              alert('Failed to convert image');
              clearInterval(interval); // Clear interval if failed
            }
          })
          .catch((error) => {
            alert('Error checking conversion status');
            console.error(error);
            clearInterval(interval); // Clear interval on error
          });
      }, 5000);
    }

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [status, requestId]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>IlikeImage</h1>
        <p>Convert your images with ease</p>
      </header>
      <main className="App-main">
        <div className="converter-container">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
            className="file-input"
            id="file-input"
          />
          <label htmlFor="file-input" className="file-label">
            Choose an image
          </label>
          <select 
            value={format} 
            onChange={(e) => setFormat(e.target.value)}
            className="format-select"
          >
            <option value="JPG">JPG</option>
            <option value="PNG">PNG</option>
            <option value="GIF">GIF</option>
          </select>
          <button onClick={handleConvert} className="convert-button">Convert</button>
        </div>

        {status === 'InProgress' && <p className="status">Converting...</p>}

        {status === 'Completed' && (
          <div className="download-links">
            <a href={sourceLink} target="_blank" rel="noopener noreferrer" className="download-button">Download Source Image</a>
            <a href={destinationLink} target="_blank" rel="noopener noreferrer" className="download-button">Download Converted Image</a>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;