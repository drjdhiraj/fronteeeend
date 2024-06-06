import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux'; // Importing useDispatch hook
import { getAllTweets } from '../Store/Tweet/Action'; // Import actions from actions.js
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Login from './Login'; // Import the Login component
import PostCountCard from './PostCountCard';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [locations, setLocations] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [locationCount, setLocationCount] = useState(0);
  const [googleLoginCount, setGoogleLoginCount] = useState(0);
  const [nonGoogleLoginCount, setNonGoogleLoginCount] = useState(0);
  const [userIdToDelete, setUserIdToDelete] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state
  const dispatch = useDispatch(); // Getting the dispatch function
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    if (isAuthenticated) {
      fetch('https://technoblogsapp.azurewebsites.net//getAllUsers')
        .then(response => response.json())
        .then(data => {
          setUsers(data);
          setUserCount(data.length);
          const uniqueLocations = [...new Set(data.map(user => user.location).filter(location => location))];
          setLocations(uniqueLocations);
          setLocationCount(uniqueLocations.length);

          // Counting the number of users who logged in with Google and those who did not
          const googleLoginUsers = data.filter(user => user.login_with_google);
          setGoogleLoginCount(googleLoginUsers.length);
          setNonGoogleLoginCount(data.length - googleLoginUsers.length);
        });

      // Dispatch the action to get all tweets
      dispatch(getAllTweets()); // Dispatching the action
    }
  }, [dispatch, isAuthenticated]); // Adding dispatch to the dependencies array

  const handleUserClick = (userId) => {
    // Redirect to the user's profile page
    navigate(`/profile/${userId}`);
  };

  const handleDeleteUser = () => {
    fetch(`http://localhost:5454/users/${userIdToDelete}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        setUsers(users.filter(user => user.id !== parseInt(userIdToDelete, 10)));
        setUserCount(prevCount => prevCount - 1);
        setUserIdToDelete('');
      } else {
        console.error(`Error deleting user: ${response.statusText}`);
        return response.text().then(text => { throw new Error(text) });
      }
    })
    .catch(error => console.error('Error deleting user:', error));
  };

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="p-5">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card className="max-h-400 overflow-y-auto  transition-transform duration-300   ">
            <CardContent>
              <Typography variant="h5" component="div">
                Users
              </Typography>
              <ul className="rounded-md  p-3 overflow-y-auto" style={{ minHeight: '300px' }}>
                {users.map((user, index) => (
                  <li
                    className="shadow-xl hover:bg-green-300  bg-blue-200 rounded-md p-3 m-3"
                    key={index}
                    onClick={() => handleUserClick(user.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <Typography variant="body1">
                      {user.fullName} (ID: {user.id})
                    </Typography>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card className="max-h-400 overflow-y-auto">
            <CardContent>
              <Typography variant="h5" component="div">
                Locations
              </Typography>
              <ul className="rounded-md p-3 overflow-y-auto" style={{ maxHeight: '800px' }}>
                {locations.map((location, index) => (
                  <li className="shadow-xl hover:bg-green-300 bg-blue-200 rounded-md p-3 m-3" key={index}>
                    <Typography variant="body1">{location}</Typography>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                User Count
              </Typography>
              <Typography variant="h2">{userCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Location Count
              </Typography>
              <Typography variant="h2">{locationCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <PostCountCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Google Login Count
              </Typography>
              <Typography variant="h2">{googleLoginCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Non-Google Login Count
              </Typography>
              <Typography variant="h2">{nonGoogleLoginCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Delete User
              </Typography>
              <TextField
                label="User ID"
                variant="outlined"
                value={userIdToDelete}
                onChange={(e) => setUserIdToDelete(e.target.value)}
                style={{ marginBottom: '1rem' }}
              />
              <Button variant="contained" color="error" onClick={handleDeleteUser}>
                Delete User
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminPage;
