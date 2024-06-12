import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, TextField, Button, Container } from '@mui/material';

const AddAdmin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    //   const response = await axios.post('http://localhost:5454/addadmin', {
      const response = await axios.post('https://technoblogsapp.azurewebsites.net/addadmin', {
        username,
        password
      });
      setMessage(response.data);
    } catch (error) {
      setMessage('Error adding admin');
      console.error('Error adding admin:', error);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '0px' }}>
      <Card>
        <CardContent>
          <Typography variant="h3" component="div" gutterBottom>
            Add Admin
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
              Add Admin
            </Button>
          </form>
          {message && (
            <Typography variant="body2" color="textSecondary" style={{ marginTop: '20px' }}>
              {message}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default AddAdmin;
