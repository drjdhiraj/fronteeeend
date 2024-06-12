import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import {
  Card,
  CardContent,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  ListItemText,
  List,
  ListItem,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux"; // Importing useDispatch hook
import { getAllTweets } from "../Store/Tweet/Action"; // Import actions from actions.js
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import Login from "./Login"; // Import the Login component
import PostCountCard from "./PostCountCard";
import AdminList from "./AdminList";
import LocationList from "./LocationList";
import PostDashboard from "./PostDashboard";
import AddAdmin from "./AddAdmin";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [locations, setLocations] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [locationCount, setLocationCount] = useState(0);
  const [googleLoginCount, setGoogleLoginCount] = useState(0);
  const [nonGoogleLoginCount, setNonGoogleLoginCount] = useState(0);
  const [userIdToDelete, setUserIdToDelete] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state
  const dispatch = useDispatch(); // Getting the dispatch function
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    if (isAuthenticated) {
      fetch("https://technoblogsapp.azurewebsites.net/getAllUsers")
      // fetch("http://localhost:5454/getAllUsers")
        .then((response) => response.json())
        .then((data) => {
          setUsers(data);
          setUserCount(data.length);
          const uniqueLocations = [
            ...new Set(
              data.map((user) => user.location).filter((location) => location)
            ),
          ];
          setLocations(uniqueLocations);
          setLocationCount(uniqueLocations.length);

          // Counting the number of users who logged in with Google and those who did not
          const googleLoginUsers = data.filter(
            (user) => user.login_with_google
          );
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
    // fetch(`http://localhost:5454/users/delete/${userIdToDelete}`, {
    fetch(`https://technoblogsapp.azurewebsites.net/users/delete/${userIdToDelete}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setUsers(
            users.filter((user) => user.id !== parseInt(userIdToDelete, 10))
          );
          setUserCount((prevCount) => prevCount - 1);
          setUserIdToDelete("");
          toast.success("Deleted Successfully");
        } else {
          console.error(`Error deleting user: ${response.statusText}`);
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="p-5  ">
      <Grid container spacing={3}>
        <Grid
          className="hover:scale-110 duration-300"
          item
          xs={12}
          sm={6}
          md={4}
        >
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                User Count
              </Typography>
              <Typography variant="h2">{userCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid
          className="hover:scale-110 duration-300"
          item
          xs={12}
          sm={6}
          md={4}
        >
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Location Count
              </Typography>
              <Typography variant="h2">{locationCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} className="hover:scale-110 duration-300 " >
          <PostCountCard className="hover:scale-110" />
        </Grid>







        <Grid item xs={12}>
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
                  style={{ marginBottom: "1rem" }}
                />
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDeleteUser}
                >
                  Delete User
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Card className="max-h-30 min-w-[400px] block  overflow-scroll  transition-transform my-3 shadow-2xl duration-300   ">
            <TableContainer component={Paper}  className='overflow-scroll max-h-96 ' >
              <Typography
                variant="h5"
                component="div"
                style={{ padding: "16px" }}
              >
                Users
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Full Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Location</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow
                      key={user.id}
                      onClick={() => handleUserClick(user.id)}
                      style={{ cursor: "pointer" }}
                      hover
                    >
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.fullName}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.location}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>

          
        <Grid item xs={42} sm={46} md={44}>
          <LocationList />
        </Grid>
        <Grid item xs={45} sm={50} md={50}>
          <PostDashboard />
        </Grid>



          
        <Container maxWidth="lg" style={{ marginTop: '50px' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <AdminList />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <AddAdmin />
          </Paper>
        </Grid>
      </Grid>
    </Container>
          
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminPage;
