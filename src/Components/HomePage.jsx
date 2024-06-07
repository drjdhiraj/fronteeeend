import { Grid } from '@mui/material'
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
              {/* <Route path='/profile' element={<Profile/>}></Route> */}
              <Route path='/profile/:id' element={<Profile />} />
              <Route path='/twit/:id' element={<TwitDetail />} />
            </Routes>
          </Grid>
        </Grid>
      </Grid>

      {/* Right Sidebar */}
      <Grid item xs={12} lg={3} className='hidden lg:block'>
        <RightPart />
      </Grid>
    </Grid>
  )
}

export default HomePage
