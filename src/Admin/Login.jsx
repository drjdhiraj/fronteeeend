import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';

const Login = ({ onLogin }) => {
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (password === '123') {
      onLogin();
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <Card className="max-h-400 overflow-y-auto">
      <CardContent>
        <Typography variant="h5" component="div">
          Admin Login
        </Typography>
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: '1rem' }}
        />
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
      </CardContent>
    </Card>
  );
};

export default Login;
