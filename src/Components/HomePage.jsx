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
  const {theme}=useSelector(store=>store);
  return (
    <Grid container className='px-4 lg:px-36 justify-between'xs={12}>

        <Grid item xs={3} lg={2} className='flex lg:block  w-full relative'>
                <Navigation/>

            </Grid>
        <Grid item xs={8} lg={8} className={`px-4 lg:px-9 border ${theme.currentTheme==="dark"?"border-gray-800":""} `}>
          <Routes>
            <Route path='/' element={<HomeSection/>}></Route>
            <Route path='/admin' element={<Admin/>}></Route>
            <Route path='/home' element={<HomeSection/>}></Route>
            {/* <Route path='/profile' element={<Profile/>}></Route> */}
            <Route path='/profile/:id' element={<Profile/>}></Route>
            <Route path='/twit/:id' element={<TwitDetail/>}></Route>
          </Routes>
            
        </Grid>
        <Grid item  xs={0} lg={2} className='hidden lg:block  w-full relative pl-2 '>
            <RightPart/>
        </Grid>

    </Grid>
  )
}

export default HomePage
