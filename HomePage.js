import React, { useState } from 'react';
import { Button, Typography, Container, Paper, Grid } from '@mui/material';
import Papa from 'papaparse';

const HomePage = () => {
  const [jsonData, setJsonData] = useState(null); // To store JSON data from CSV
  const [fileName, setFileName] = useState(''); // Store the uploaded file name
  const [displayData, setDisplayData] = useState(false); // Control when to show data after submission

  // Handle file upload and convert CSV to JSON
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
        console.log('Converted JSON:', jsonData); // Log the JSON data to the console
        setDisplayData(false); // Reset display until submit is clicked
      },
    });
  };

  // Handle Submit button click
  const handleSubmit = () => {
    setDisplayData(true); // Show the parsed data on submit
  };

  return (
    <Container style={{ marginTop: '2rem' }}>
      <Paper elevation={3} style={{ padding: '2rem', marginBottom: '2rem' }}>
        <Typography variant="h4" gutterBottom>
          Road Accident Tracker
        </Typography>
        <Typography variant="body1" paragraph>
          Upload a CSV file to view accident data in JSON format and show on submit.
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

        {/* Submit Button to show the data */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!jsonData}
          style={{ marginTop: '1rem' }}
        >
          Submit
        </Button>

        {/* Display JSON Data after Submit */}
        {displayData && jsonData && (
          <div style={{ marginTop: '2rem' }}>
            <Typography variant="h6">Accident Data:</Typography>
            <Grid container spacing={2}>
              {jsonData.map((row, index) => (
                <Grid item xs={12} key={index}>
                  <Paper elevation={2} style={{ padding: '1rem' }}>
                    <Typography variant="body2">
                      <strong>Location:</strong> {row.Crash_Seve} <br />
                      <strong>Year:</strong> {row.Crash_Year} <br />
                      <strong>Vecal type:</strong> {row.V1_Type} <br />
                      <strong>Weather:</strong> {row.Weather} <br />
                      <strong>Sex:</strong> Male
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </div>
        )}
      </Paper>
    </Container>
  );
};

export default HomePage;
