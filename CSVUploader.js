import React, { useState } from 'react';
import { Button, Typography, Container } from '@mui/material';
import Papa from 'papaparse';

const CSVUploader = () => {
  const [jsonData, setJsonData] = useState(null);
  const [fileName, setFileName] = useState('');

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0]; // Get the uploaded file
    setFileName(file.name); // Set the uploaded file name

    // Parse the CSV file
    Papa.parse(file, {
      header: true, // If the CSV has headers
      skipEmptyLines: true, // Skip empty lines
      complete: (result) => {
        const jsonData = result.data; // Convert to JSON
        setJsonData(jsonData); // Store JSON data in state
      },
    });
  };

  return (
    <Container style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Upload CSV and Convert to JSON
      </Typography>

      {/* File Input for CSV Upload */}
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        style={{ marginBottom: '1rem' }}
      />

      {/* Display Uploaded File Name */}
      {fileName && (
        <Typography variant="body1">
          <strong>Uploaded File:</strong> {fileName}
        </Typography>
      )}

      {/* Convert Button (Optional if you need to trigger conversion explicitly) */}
      {jsonData && (
        <div style={{ marginTop: '1rem' }}>
          <Typography variant="h6">JSON Data:</Typography>
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        </div>
      )}
    </Container>
  );
};

export default CSVUploader;
