import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { useDispatch } from 'react-redux'; // Importing useDispatch hook
import { getAllTweets, getUsersTweets } from '../Store/Tweet/Action'; // Import actions from actions.js

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [locations, setLocations] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [locationCount, setLocationCount] = useState(0);
  const [googleLoginCount, setGoogleLoginCount] = useState(0);
  const [nonGoogleLoginCount, setNonGoogleLoginCount] = useState(0);
  const dispatch = useDispatch(); // Getting the dispatch function

  useEffect(() => {
    fetch('http://localhost:5454/getAllUsers')
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
  }, [dispatch]); // Adding dispatch to the dependencies array

  const handleUserClick = (userId) => {
    // Dispatch the action to get tweets of a specific user
    dispatch(getUsersTweets(userId)); // Dispatching the action
  };

  return (
    <div className="p-5">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card className="max-h-400 overflow-y-auto">
            <CardContent>
              <Typography variant="h5" component="div">
                Users
              </Typography>
              <ul className="rounded-md p-3 overflow-y-auto" style={{ maxHeight: '800px' }}>
                {users.map((user, index) => (
                  <li className="shadow-xl hover:bg-green-300 bg-blue-200 rounded-md p-3 m-3" key={index} onClick={() => handleUserClick(user.id)}>
                    <Typography variant="body1">{user.fullName}</Typography>
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
      </Grid>
    </div>
  );
};

export default AdminPage;
