import { Card, Container, CssBaseline, Grid, Paper, Stack, TextField,Avatar,CardHeader,CardContent,Typography,Alert,AlertTitle, Snackbar, CircularProgress, Skeleton} from '@mui/material';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './App.css';
import Button from '@mui/material/Button';
import Box from '@mui/system/Box';
import { useState } from 'react';
import Comment_api from './Comment_api';

function App() {
  const [userdata,setUserdata] = useState({username : '', session : ''})
  const [userNonfollowbacks,setUserNonfollowbacks] = useState([])
  const [data,setData] = useState('')
  const [buttonId,setButtonId] = useState([])
  const [schedule,setSchedule] = useState(false)
  const[scheduleProgress,setSechduleProgress] = useState(false)


  const skeletons = <Grid item lg={3}>
    <Card sx={{paddingBottom : '12px',backgroundColor : '#666666',borderRadius : '12px',width : '285px'}}>
    <CardHeader   
      avatar={
        
        <Skeleton animation="wave" variant="circular" width='46px' height='46px' sx={{marginRight : '12px'}}>
        </Skeleton>
      }
      
      title={
          <Skeleton
            animation="wave"
            height={20}
            style={{ marginBottom: 6 }}
            width='150px'
          />
          
        }
        subheader = {<Skeleton animation="wave" height={10} width='60%'/>}
      
      />
      <CardContent>
      <Skeleton animation="wave" height={20} style={{ marginBottom: 6 }} />
      </CardContent>
      <Stack direction = {'row'} spacing={4} pl={4} pr={1}>
      <Skeleton animation="wave" height={30} width="90px" />
      <Skeleton animation="wave" height={30} width="90px"/>
      </Stack>
     

    </Card>
  </Grid>;



  const get_non_followbacks = () => {
    setData('Yes')
    const userinfo = {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name : userdata.username,
        sessionToken : userdata.session
        }),
      }
     
   fetch('https://c688f62pwi.execute-api.eu-north-1.amazonaws.com/get_non_followbacks',userinfo)
  .then((Response) => Response.json())
  .then((Response) => {
    if (Response.non_followback_data.length != 0){
      (setUserNonfollowbacks(Response.non_followback_data));
      setData('No')
    }
    else {
      setUserNonfollowbacks('You dont have any non-followbacks')
    }
  })}

  const unfollow_single_user = (e) => {
    const userinfo = {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id : e.target.value,
        sessionToken : userdata.session
        }),
      }
   

    fetch("https://ok2cui9j2e.execute-api.eu-north-1.amazonaws.com/unfollowUser",userinfo)
   .then((Response) => Response.json())
   .then((response) => {
    if(response.response === "true"){
       setButtonId((prevState) => {return [...prevState,e.target.value]})
    }
    })
  }

  const unfollow_all_users = () => {
    setSechduleProgress(true)
    const userInfo = {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data : userNonfollowbacks,
        session : userdata.session,
        user_name : userdata.username
        }),
    }
   fetch('https://6auvdipio1.execute-api.eu-north-1.amazonaws.com/unfollowAllNonfollowbacks',userInfo)
  .then((response) => response.json())
  .then((response) => {
    if (response.result === 'true'){
      setSechduleProgress(false)
      setSchedule(true)
    }
  })
  }

  const handleClose = (reason) => {
    if (reason == 'clickaway'){
      return
    }
    else{

    setSchedule(false)
    }
  }

  
  
  return (
   <>
   <Snackbar open={schedule}  autoHideDuration={5000} onClose={handleClose} anchorOrigin={{ vertical : 'top', horizontal : 'center' }}>
    <Alert severity='success' onClose={handleClose} sx={{width : '500px'}}>
    <AlertTitle>Success</AlertTitle>
  Your Unfllowing is scheduled — <strong>Check back later</strong>
    </Alert>
   </Snackbar>
   <Box width = '100%'>
   <Grid pl={5} container bgcolor = '#4d4d4d' sx={{height : '44px',alignItems : 'center',width : '1000px',borderRadius : '10px'}} ml={32} mt={2} mr={32}>
    <Grid item color= '#5E5353' mr={99} backgroundColor = 'grey'>PH mate</Grid>
    <Grid item><Button sx={{backgroundColor : '#333333',height : '28px', color : 'white', borderRadius : '10px','&:hover' :{backgroundColor : '#8E969D'}}}>Sign Up</Button></Grid>
   </Grid>
   </Box>



   <Box width='100%' height='300px' sx={{display : 'flex', justifyContent: 'center',alignItems:'center'}}>
    
    <Grid spacing={1} direction={'column'} container bgcolor='#4d4d4d' sx={{height : '215px', width: '487px' ,borderRadius : '10px', alignItems : 'center'}}>
      <Grid item >
    <TextField  sx={{width : '400px'}} id="standard-basic" label="name" variant="standard" value = {userdata.username} onChange={(e) => {setUserdata({...userdata,username : e.target.value})}}/>
    </Grid>
    <Grid item>
    <TextField sx={{width : '400px'}} id="standard-basic" label="session token" variant="standard" value={userdata.session} onChange={(e) => {setUserdata({...userdata,session : e.target.value})}}/>
    </Grid>
    <Grid item mt={4}>
    <Stack direction={'row'}>
      <Button onClick = {get_non_followbacks} variant = 'contained'  sx={{color : 'white', backgroundColor : '#333333', ':hover':{backgroundColor : '#8E969D'}}}>Get Non-followbacks &nbsp; <ManageSearchIcon/></Button>
    </Stack>
    </Grid>
   
    </Grid>
    
   </Box>

   {data === 'No' ? (scheduleProgress ? <Box display= 'flex' justifyContent='center' alignItems='center' mb={4.6}><CircularProgress color='success'/></Box> : <Box display='flex' justifyContent='center' alignItems= 'center' mb={5}><Button onClick = {unfollow_all_users} variant='contained' sx = {{backgroundColor : '#00e600'}}>Unfollow all &nbsp;<DoneAllIcon></DoneAllIcon></Button></Box> ): null}
   <Grid container textAlign={'center'} pl={16} pr={16} spacing={5}>

    {data === 'Yes' ? <Grid container textAlign={'center'} pl={5} pr={10} columnSpacing={16} spacing={5} mt={9}>
     {skeletons}{skeletons}{skeletons}{skeletons}{skeletons}{skeletons}{skeletons}{skeletons}
    </Grid> :
     userNonfollowbacks.map((info) => {
      const card = <Grid item lg={3} ><Card sx={{paddingBottom : '12px',backgroundColor : '#666666',borderRadius : '12px'}}>
      <CardHeader   
      avatar={
        
        <Avatar sx={{height : '46px',width : '46px' }} src = {info.avatarUrl}>
        </Avatar>
      }
      
      title = {<Typography> {info.name} </Typography>}
      
      subheader={'#' + info.id}/>
      <CardContent>
      <Typography variant="body2" color="text.secondary" mt={-2} display="inline">
        {info.headline}
      </Typography>
      </CardContent>
     
    
    <Stack direction = {'row'} spacing={3} pl={2}>
    <Typography>{info.followersCount + ' Followers'}</Typography> 
    {buttonId.includes(info.id) ? <Button sx={{bgcolor : '#00e600',height : '28px',paddingTop : '8px',marginLeft : '20px'}} variant='contained'>Done</Button> :
    <Button sx={{bgcolor : '#4d4d4d',height : '28px',paddingTop : '8px',  ':hover':{backgroundColor : '#8E969D'}}} variant='contained' value = {info.id} onClick={unfollow_single_user}>Unfollow</Button>}
    </Stack>
   
    </Card>
    </Grid>
    return <>{card}</>;
    })
    }
    
   
   </Grid>

   <Comment_api></Comment_api>



   </>
  );
}

export default App;
