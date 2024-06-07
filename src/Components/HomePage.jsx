import { Grid, Box } from '@mui/material'
import React from 'react'
import Navigation from './Navigation/Navigation'
import HomeSection from './Home/MiddlePart/HomeSection'
import RightPart from './RightPart/RightPart'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import Profile from './Profile/Profile'
import TwitDetail from './Home/MiddlePart/TwitDetail'
import Admin from '../Admin/Admin'

const HomePage = () => {
  const { theme } = useSelector(store => store);

  return (
    <Grid container spacing={2} className='px-2 md:px-4 lg:px-36'>
      {/* Right Sidebar on top for small screens */}
      <Grid item xs={12} sx={{ display: { lg: 'none' } }}>
        <RightPart />
      </Grid>

      {/* Navigation */}
      <Grid item xs={12} sm={3} lg={2}>
        <Navigation />
      </Grid>

      {/* Main Content */}
      <Grid item xs={12} sm={9} lg={7}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Routes>
              <Route path='/' element={<HomeSection />} />
              <Route path='/admin' element={<Admin />} />
              <Route path='/home' element={<HomeSection />} />
              <Route path='/profile/:id' element={<Profile />} />
              <Route path='/twit/:id' element={<TwitDetail />} />
            </Routes>
          </Grid>
        </Grid>
      </Grid>

      {/* Right Sidebar for large screens */}
      <Grid item lg={3} sx={{ display: { xs: 'none', lg: 'block' }, position: { lg: 'fixed' }, right: 0, top: 0, height: '100vh', overflow: 'auto' }}>
        <Box p={2}>
          <RightPart />
        </Box>
      </Grid>
    </Grid>
  )
}

export default HomePage
