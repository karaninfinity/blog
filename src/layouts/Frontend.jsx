import React from 'react'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { Box, Grid } from '@mui/material'
import { Outlet } from 'react-router-dom'

const Frontend = () => {
  return (
    <Box>
        {/* <Header/> */}
        <Outlet/>
        {/* <Footer/> */}
    </Box>
  )
}

export default Frontend
