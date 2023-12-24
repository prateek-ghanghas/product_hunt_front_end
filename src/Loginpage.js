import { useAuth0 } from '@auth0/auth0-react'
import { Button ,Box} from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Loginpage() {
    const {logout,loginWithPopup,isAuthenticated} = useAuth0()
    const navigate = useNavigate()

    const handleclick = () => {
        loginWithPopup();
        

    }
    isAuthenticated ? navigate('/') : navigate('/login')

  return (
    <>
    <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',alignContent:'center'}}>
        <Button onClick={handleclick}>Log in</Button>
    </Box>
    </>
  )
}

export default Loginpage