import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography, Paper } from '@mui/material';

const PostDashboard = () => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    // axios.get('http://localhost:5454/getalltwitsall')
    axios.get('https://technoblogsapp.azurewebsites.net/getalltwitsall')
      .then(response => {
        setTweets(response.data);
      })
      .catch(error => console.error('Error fetching tweets:', error));
  }, []);

  const handleDelete = async (tweetId) => {
    try {
    //   const response = await fetch(`http://localhost:5454/twit/${tweetId}`, {
      const response = await fetch(`https://technoblogsapp.azurewebsites.net/twit/${tweetId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTweets(tweets.filter((tweet) => tweet.id !== tweetId));
      } else {
        console.error('Error deleting tweet:', response.statusText);
        const errorText = await response.text();
        throw new Error(errorText);
      }
    } catch (error) {
      console.error('Error deleting tweet:', error);
    }

}

  return (
    <TableContainer component={Paper}  className='overflow-scroll max-h-96 ' >
                <Typography variant="h5" component="div" style={{ padding: '16px' }}>
          Post Controller
        </Typography>
      <Table> 
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Content</TableCell>
            <TableCell>Posted by(ID)</TableCell>
            <TableCell>Posted Location</TableCell>
            <TableCell>Likes</TableCell>
            <TableCell>Replies</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tweets.map(tweet => (
            <TableRow key={tweet.id}>
              <TableCell>{tweet.id}</TableCell>
              <TableCell>{tweet.content}</TableCell>
              <TableCell>{tweet.user.id}</TableCell>
              <TableCell>{tweet.user.location || 'Not Provided'} </TableCell>
              <TableCell>{tweet.totalLikes}</TableCell>
              <TableCell>{tweet.totalReplies}</TableCell>
              <TableCell>
                <Button variant="contained" color="secondary" onClick={() => handleDelete(tweet.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PostDashboard;
