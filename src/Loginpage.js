import { useAuth0 } from '@auth0/auth0-react'
import { Button ,Box, Typography} from '@mui/material'
import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function Loginpage() {
    const {loginWithPopup,isAuthenticated} = useAuth0()
    const navigate = useNavigate()

    const handleclick = () =>  {
        loginWithPopup();
        navigate('/login')
        

    }
    /*useEffect(() => {
     isAuthenticated ? navigate('/') : navigate('/login')
    },[isAuthenticated])*/

  return (
    <>
    <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',alignContent:'center',height:'100vh',justifyContent:'space-evenly'}}>
        <Typography>Please Log in to use</Typography>
        <Button onClick={handleclick} variant='contained'>Log in</Button>
    </Box>
    </>
  )
}

export default Loginpage