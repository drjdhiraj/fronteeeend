import React, { useState, useEffect } from 'react';
import { Card, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Typography, Paper } from '@mui/material';
import axios from 'axios';

const LocationList = () => {
  const [locationsData, setLocationsData] = useState([]);

  useEffect(() => {
    // axios.get('http://localhost:5454/getloc')
    axios.get('https://technoblogsapp.azurewebsites.net/getloc')
      .then(response => {
        setLocationsData(response.data);
      })
      .catch(error => console.error('Error fetching locations:', error));
  }, []);

  return (
    <Card className="max-h-400 min-w-[400px] block overflow-y-auto transition-transform my-3 shadow-2xl duration-300">
      <TableContainer component={Paper}  className='overflow-scroll max-h-96 ' >
        <Typography variant="h5" component="div" style={{ padding: '16px' }}>
          Locations
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Location</TableCell>
              <TableCell>Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {locationsData.map((locationData, index) => (
              <TableRow 
                key={index}
                style={{ cursor: "pointer" }}
                hover
              >
                <TableCell>{locationData[0] || 'Not Provided'}</TableCell>
                <TableCell>{locationData[1]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default LocationList;
