import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';

const PostCountCard = () => {
  const [postCount, setPostCount] = useState(0);

  useEffect(() => {
    axios.get('https://technoblogsapp.azurewebsites.net/postcount')
    // axios.get('http://localhost:5454/postcount')
      .then(response => {
        setPostCount(response.data);
      })
      .catch(error => console.error('Error fetching post count:', error));
  }, []);

  return (
    <Card  >
      <CardContent>
        <Typography variant="h5" component="div">
          Post Count
        </Typography>
        <Typography variant="h2">{postCount}</Typography>
      </CardContent>
    </Card>
  );
};

export default PostCountCard;
