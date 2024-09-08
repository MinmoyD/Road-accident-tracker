import React, { useState } from 'react';
import { Container, Typography, Grid, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, MenuItem, TextField } from '@mui/material';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Papa from 'papaparse';
// import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const AccidentPage = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    severity: '',
    sex: ''
  });
  const [fileUploaded, setFileUploaded] = useState(false); // Tracks if file is uploaded

  // Handle CSV file upload and convert to JSON
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true, // Treats the first row as the header
        complete: (result) => {
          const accidentData = result.data;
          setData(accidentData); // Store parsed JSON data from CSV
          setFilteredData(accidentData); // Initialize filteredData with the full dataset
          setFileUploaded(true); // Indicate that file is uploaded
        },
        skipEmptyLines: true,
      });
    }
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  // Apply filters to data
  const applyFilters = () => {
    let newData = data;
    if (filters.severity) {
      newData = newData.filter(item => item.severity === filters.severity);
    }
    if (filters.sex) {
      newData = newData.filter(item => item.sex === filters.sex);
    }
    setFilteredData(newData); // Set the filtered data to be displayed
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
      <Paper elevation={3} style={{ padding: '2rem' }}>
        <Typography variant="h4" gutterBottom>
          Accident Records and Analysis
        </Typography>

        {/* File Upload */}
        <Grid container spacing={3} style={{ marginBottom: '2rem' }}>
          <Grid item xs={12}>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              style={{ marginBottom: '1rem' }}
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              disabled={!fileUploaded} // Disable until file is uploaded
              style={{ marginBottom: '1rem' }}
            >
              CSV Uploaded!
            </Button>
          </Grid>

          {/* Filters */}
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Severity"
              name="severity"
              select
              value={filters.severity}
              onChange={handleFilterChange}
              helperText="Select severity"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Sex"
              name="sex"
              select
              value={filters.sex}
              onChange={handleFilterChange}
              helperText="Select sex"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              variant="contained"
              color="primary"
              onClick={applyFilters}
              disabled={!fileUploaded} // Disable filter button until data is loaded
              style={{ marginTop: '1.5rem' }}
            >
              Apply Filters
            </Button>
          </Grid>
        </Grid>

        {/* OpenStreetMap using react-leaflet */}
        {/* <MapContainer center={[51.505, -0.09]} zoom={10} style={{ height: '400px', marginBottom: '2rem' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {filteredData.map((item, index) => (
            <Marker
              key={index}
              position={[parseFloat(item.latitude), parseFloat(item.longitude)]}
              icon={L.icon({
                iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
              })}
            >
              <Popup>
                <Typography variant="body1"><strong>Location:</strong> {item.location}</Typography>
                <Typography variant="body1"><strong>Date:</strong> {item.date}</Typography>
                <Typography variant="body1"><strong>Time:</strong> {item.time}</Typography>
                <Typography variant="body1"><strong>Severity:</strong> {item.severity}</Typography>
                <Typography variant="body1"><strong>Sex:</strong> {item.sex}</Typography>
              </Popup>
            </Marker>
          ))}
        </MapContainer> */}

        {/* Accident Table */}
        <TableContainer component={Paper} style={{ marginTop: '2rem' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Severity</TableCell>
                <TableCell>Sex</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell> {/* Serial Number */}
                  <TableCell>{row.Crash_Seve}</TableCell>
                  <TableCell>{row.Crash_Year}</TableCell>
                  <TableCell>{row.V1_Type}</TableCell>
                  <TableCell>{row.Weather}</TableCell>
                  <TableCell>{row.sex}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default AccidentPage;
