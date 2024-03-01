import React from 'react'
import { Card, Container, CssBaseline, Grid, Paper, Stack, TextField,Avatar,CardHeader,CardContent,Typography,Alert,AlertTitle, Snackbar, CircularProgress, Skeleton, ToggleButtonGroup, ToggleButton, Chip} from '@mui/material';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './App.css';
import Button from '@mui/material/Button';
import Box from '@mui/system/Box';
import { useEffect, useState } from 'react';
import Comment_api from './Comment_api';
import Unfollow from './Unfollow';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';


function Homepage() {
    const [alignment, setAlignment] = useState('AUTO-COMMENT')
    const navigate = useNavigate()
  
  
    const {loginWithRedirect,user,isAuthenticated,loginWithPopup,logout} = useAuth0()
  
    const handleActivity = () => {
      navigate('/Activity')
    }
    useEffect(() => {
    if(isAuthenticated){ 
      const object = {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
                 },
       body : JSON.stringify({
        gmail : user.email,
        name: user.name
       }) 
  } 
      console.log(user.email)
    fetch('https://r8echjrwjf.execute-api.eu-north-1.amazonaws.com/userData',object)}
  
    },[isAuthenticated]
  
    )
  
    console.log(isAuthenticated)
   
    const toogle_button = (e,newAlignment) => {
      setAlignment(newAlignment)
    }
  
    console.log(user)
  
  
    const handleLogout = () => {
      logout()
      navigate("/login")
    }
    
    return (
     <>
     
     <Box sx={{justifyContent : 'center', alignItems : 'center',display: 'flex',mt:'10px',mb:'5px'}}>
     {isAuthenticated ?<Typography variant='h3' sx={{color:'#a7a7a0'}}> Welcome {user.name}</Typography>: <Typography variant='h3' sx={{color:'#a7a7a0'}}>Try it!</Typography>}
     </Box>
     <Box width = '100%' sx={{display : 'flex', flexDirection : 'row',justifyContent : 'center', alignItems : 'center',height:'100px'}}>
     <Grid pl={5} container bgcolor = '#bebeb6' sx={{height : '50px',alignItems : 'center',justifyContent: 'center',width : '1000px',borderRadius : '10px'}} ml={32} mt={2} mr={32}>
      <Grid item color= '#5E5353' mr={90}><Typography color={'black'}>PH mate</Typography></Grid>
      <Grid item>
        {isAuthenticated?
        <Stack display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
        <Button onClick={handleLogout}>Log out</Button>
      <Avatar src={user.picture} sx={{height:'28px',width:'28px'}}></Avatar>
      </Stack>:null}
      </Grid>
     </Grid>
     </Box>
  
     <Box width = '100%' sx={{display : 'flex', flexDirection : 'row', justifyContent : 'center', alignItems : 'center', marginTop : '20px'}}>
      <ToggleButtonGroup
      
      color="primary"
    value={alignment}
    exclusive
    onChange={toogle_button}
    aria-label="Platform"
  >
    <ToggleButton value="AUTO-COMMENT">AUTO-COMMENT</ToggleButton>
    <ToggleButton value="UNFOLLOW">UNFOLLOW</ToggleButton>
      
      </ToggleButtonGroup>
      <Chip onClick = {handleActivity} icon={<PublishedWithChangesIcon/>} sx = {{marginLeft : '20px',height : '40px'}} label="Activity" color='secondary' variant="outlined"></Chip>
      </Box>
  
      {alignment === 'UNFOLLOW' ? <Unfollow></Unfollow> : null}
  
     
     {alignment === 'AUTO-COMMENT' ? <Comment_api></Comment_api> : null }
  
  
  
     </>
  )
}

export default Homepage