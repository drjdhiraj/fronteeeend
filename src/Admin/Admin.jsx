import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, TextField, Button } from '@mui/material';
import axios from 'axios'; // Import axios for making HTTP requests
import AdminPage from './Adminpage'

const Admin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // Authentication state

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a GET request to fetch admin details by username
      const response = await axios.get(`https://technoblogsapp.azurewebsites.net/admin?username=${username}`);
      // const response = await axios.get(`http://localhost:5454/admin?username=${username}`);

      // Check if the response contains admin details
      if (response.data) {
        // Assuming the password is returned as part of the admin data
        const adminPassword = response.data.password;

        // Check if the entered password matches the admin password
        if (password === adminPassword) {
          setIsAdmin(true);
        } else {
          alert('Invalid username or password');
        }
      } else {
        alert('Admin not found');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred while logging in');
    }
  };

  if (!isAdmin) {
    return (
      <div className="p-5">
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Admin Login
                </Typography>
                <form onSubmit={handleSubmit}>
                  <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ marginBottom: '1rem' }}
                  />
                  <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ marginBottom: '1rem' }}
                  />
                  <Button variant="contained" color="primary" type="submit">
                    Login
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }

  return (
    <div className="p-5">
      <AdminPage />
    </div>
  );
};

export default Admin;
