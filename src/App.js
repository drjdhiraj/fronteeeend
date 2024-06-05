import { Route, Routes } from 'react-router-dom';
import './App.css';
import Authentication from './Components/Authentication/Authentication';
import HomePage from './Components/HomePage';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getUserProfile } from './Store/Auth/Action';
import { ThemeProvider } from '@mui/material/styles';

import darkTheme from './Theme/DarkTheme';
import lightTheme from './Theme/LightTheme';
import { Box,  CssBaseline } from '@mui/material';

function App() {
  const dispatch=useDispatch();
  const {auth}=useSelector(store=>store);
  const jwt = localStorage.getItem("jwt")
  const [currentTheme,setCurrentTheme]=useState("");
  const {theme}=useSelector(store=>store);

  useEffect(()=>{

    if(jwt){
      dispatch(getUserProfile(jwt))
    }
  
  },[auth.jwt,jwt,dispatch])

  useEffect(()=>{
setCurrentTheme(localStorage.getItem("theme"))
  },[theme.currentTheme])
 
  console.log("them ",theme.currentTheme)
  return (
    <ThemeProvider theme={currentTheme==="dark"? darkTheme:lightTheme} className="">
      <CssBaseline />
      <Box sx={{}}>
        {/* <Button variant='content' color='success'>Check Theme</Button> */}
          <Routes>
        <Route path='/*' element={ auth.user?.fullName? <HomePage/>:<Authentication/>}></Route>
        <Route path='/signin' element={<Authentication/>}></Route>
        <Route path='/signup' element={<Authentication/>}></Route>
        {/* <Route path='/profile' element={<HomePage/>}></Route> */}
      </Routes>
      </Box>
    
      
    </ThemeProvider>
  );
}

export default App;
