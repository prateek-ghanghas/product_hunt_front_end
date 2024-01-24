import { useAuth0 } from '@auth0/auth0-react'
import { Button ,Box, Typography,Stack} from '@mui/material'
import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import './landingPage.css'
import EastIcon from '@mui/icons-material/East';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';

function Loginpage() {
    const {loginWithPopup,isAuthenticated} = useAuth0()
    const navigate = useNavigate()

    const handleclick = () =>  {
        loginWithPopup();
        

    }
    useEffect(() => {
     isAuthenticated ? navigate('/') : navigate('/login')
    },[isAuthenticated])

  return (
    <>
    <div className='wrapper'>
      <Box sx={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',pt:'150px',width:'100%'}}>
    <Stack sx={{color:'white',fontSize:'50px'}}>
      Let's Grow Together On Product Hunt!
    </Stack>
    </Box>
    <Box sx={{display:'flex',flexDirection:'row', justifyContent:'center',alignItems:'center',width:'100%',textTransform:'capitalize',textAlign:'center',pt:'12px'}}>
    
    <Stack sx={{width:'46%'}}>
  <Typography sx={{fontFamily:'helvectica',fontSize:'h6.fontSize',color:'wheat'}}>
      Optimize your product hunt journey with our simple web app! 
Increase your followers and engagement by Automate commenting on top newly launched products, by removing non-followback users. Maximize your network and maintain a relevant follower base  
</Typography>     
</Stack>
    </Box>

      

    
    
    <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',alignContent:'center',mt:'25px'}}>
      <Box sx={{color:'#E9DBC6'}}><Typography sx={{fontFamily:'helvectica',fontSize:'30px'}}><b>Start using the app straight away &nbsp;</b></Typography></Box>
        <Button sx={{padding: '7px 14px',
    fontSize: '1.2rem',
    color: '#fff',
    fontWeight: '600',
    textTransform: 'uppercase',
    border: '1px solid rgb(249, 168, 168)',
    borderRadius: '4px',
    cursor: 'pointer' ,':hover':{background:'white',
      color: 'black'

      }}} endIcon={<EastIcon/>} onClick={handleclick} className='login-button'>Log in</Button>
    </Box>
    </div>
  
  
    </>
  )
}

export default Loginpage