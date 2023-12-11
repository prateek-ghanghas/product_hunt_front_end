import { Card, Container, CssBaseline, Grid, Paper, Stack, TextField,Avatar,CardHeader,CardContent,Typography,Alert,AlertTitle, Snackbar, CircularProgress, Skeleton, ToggleButtonGroup, ToggleButton} from '@mui/material';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './App.css';
import Button from '@mui/material/Button';
import Box from '@mui/system/Box';
import { useState } from 'react';
import Comment_api from './Comment_api';
import Unfollow from './Unfollow';

function App() {
 
  const [alignment, setAlignment] = useState('UNFOLLOW')


 
  const toogle_button = (e,newAlignment) => {
    setAlignment(newAlignment)
  }

  
  
  return (
   <>
   

  
   <Box width = '100%' sx={{display : 'flex', flexDirection : 'row',justifyContent : 'center', alignItems : 'center'}}>
   <Grid pl={5} container bgcolor = '#bebeb6' sx={{height : '44px',alignItems : 'center',justifyContent: 'center',width : '1000px',borderRadius : '10px'}} ml={32} mt={2} mr={32}>
    <Grid item color= '#5E5353' mr={90}><Typography color={'black'}>PH mate</Typography></Grid>
    <Grid item><Button sx={{backgroundColor : '#333333',height : '28px', color : 'white', borderRadius : '10px','&:hover' :{backgroundColor : '#8E969D'}}}>Sign Up</Button></Grid>
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
  <ToggleButton value="UNFOLLOW">UNFOLLOW</ToggleButton>
  <ToggleButton value="AUTO-COMMENT">AUTO-COMMENT</ToggleButton>
    
    </ToggleButtonGroup>
    </Box>

    {alignment === 'UNFOLLOW' ? <Unfollow></Unfollow> : null}

   
   {alignment === 'AUTO-COMMENT' ? <Comment_api></Comment_api> : null }



   </>
)
  }

export default App;
