import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import axios from 'axios';

const AdminList = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    // Replace with your actual API endpoint
    // axios.get('http://localhost:5454/getAllAdmin')
    axios.get('https://technoblogsapp.azurewebsites.net/getAllAdmin')
      .then(response => {
        setAdmins(response.data);
      })
      .catch(error => console.error('Error fetching admins:', error));
  }, []);

  return (
    <TableContainer component={Paper} className=' overflow-scroll max-h-96 ' >
      <Typography variant="h3" component="div" style={{ padding: '10px' }}>
        Admin List
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Username</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {admins.map((admin) => (
            <TableRow key={admin.id}>
              <TableCell>{admin.id}</TableCell>
              <TableCell>{admin.username}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminList;
