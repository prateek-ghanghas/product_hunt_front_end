import { Box, CssBaseline, Typography,Grid,TextField,Stack,Button ,MenuItem, Tooltip,Snackbar,AlertTitle,Alert,Dialog,DialogContent,DialogTitle,IconButton, Checkbox, FormControlLabel} from '@mui/material'
import React, { useEffect, useState } from 'react'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PastActivity from './PastActivity';

const days = [
    { 
        value :'Today',
        label : 'Today'

    },
    {
      value: '1',
      label: 'Last 1 day',
    },
    {
      value: '2',
      label: ' Last 2 days',
    },
    {
      value: '3',
      label: 'Last 3 days',
    },
    {
        value: '4',
        label: 'Last 4 days',
      },
      {
        value: '5',
        label: 'Last 5 days',
      },
      {
        value: '6',
        label: 'Last 6 days',
      },
      {
        value: '7',
        label: 'Last 7 days',
      },
      {
        value: '8',
        label: 'Last 8 days',
      },
      {
        value: '9',
        label: 'Last 9 days',
      },
      {
        value: '10',
        label: 'Last 10 days',
      }
  ];

function Comment_api() {
    const [userdata,setUserdata] = useState({username : localStorage.getItem("PHusername") ? localStorage.getItem("PHusername") :"", session : localStorage.getItem("session") ? localStorage.getItem("session") :"Enter your session token" , comment : ''})
    const [noOfDays,SetNoOfDays] = useState(localStorage.getItem("noOfDays") ? localStorage.getItem("noOfDays") :"")
    const [commentApiResponse,setCommentApiResponse] = useState(false)
    const [sessionOpen, setsessionOpen] = useState(false)
    const [usernameOpen, setUsernameOpen] = useState(false)
    const [sessionValidity,setSessionValidity] = useState(false)
    const [checkbox,setCheckbox] = useState(false)
    const [checked, setChecked] = useState(false);
    useEffect(() => {
      if (localStorage.getItem("session") && localStorage.getItem("PHusername")){
      const userSession = localStorage.getItem("session")
      
     const userinfo = {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name : userdata.username,
          sessionToken : userSession,
          }),
        }
        fetch('https://8gjcfgmeyj.execute-api.eu-north-1.amazonaws.com/checkboxValue',userinfo)
        .then((response) => response.json())
        .then((response) => {
         if (response.result === 'on'){setCheckbox(true);setChecked(true);setUserdata({...userdata,comment : response.comment})}
        })
    }},[])
    
    const schedule_comments = () => {
      localStorage.setItem("session",userdata.session)
      localStorage.setItem("PHusername",userdata.username)
      localStorage.setItem("noOfDays",noOfDays)
      
        const userSession = localStorage.getItem("session")
      
     const userinfo = {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name : userdata.username,
          sessionToken : userSession,
          no_of_days : noOfDays,
          comment : userdata.comment,
          dailyScheduling : checked ? "on" : "off",
          }),
        }
        fetch('https://40djlwps1e.execute-api.eu-north-1.amazonaws.com/commentOnRecentLaunchedProducts',userinfo)
        .then((response) => response.json())
        .then((response) => {
            if (response.result === 'true'){
                setCommentApiResponse(true)
                setCheckbox(true)
            }
            else if(response.result == "access_denied"){
               
               localStorage.removeItem("session")
               setSessionValidity(true)
            }
        })
    }

    const handleCloseCommentApi = (reason) => {
        if (reason == 'clickaway'){
          return
        }
        else{
    
        setCommentApiResponse(false)
        }
      }
      const handleCloseSessionValidity = (reason) => {
        if (reason == 'clickaway'){
          return
        }
        else{
    
        setSessionValidity(false)
        }
      }
      const close_session_dialog = () => {
        setsessionOpen(false)
      }
      const close_username_dialog = () => {
        setUsernameOpen(false)
      }
      const handleChange = (e) => {
        if(checked === false){
        const userSession = localStorage.getItem("session")
      
     const userinfo = {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name : userdata.username,
          sessionToken : userSession,
          dailyScheduling : "on",
          comment : userdata.comment
          }),
        }
        fetch('https://6fyheyvr18.execute-api.eu-north-1.amazonaws.com/scheduleValueWrite',userinfo)
        .then((response) => response.json())
        .then((response) => {
      
        })}
        else{
          const userSession = localStorage.getItem("session")
      
          const userinfo = {
             method: "post",
             headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
             },
             body: JSON.stringify({
               name : userdata.username,
               sessionToken : userSession,
               dailyScheduling : "off",
               comment : userdata.comment
               }),
             }
             fetch('https://6fyheyvr18.execute-api.eu-north-1.amazonaws.com/scheduleValueWrite',userinfo)
             .then((response) => response.json())
             .then((response) => {
           
             })
        }
        setChecked(!checked)
      
      }

      const handleEditComment = () => {
        const username = localStorage.getItem('PHusername')
        const session = localStorage.getItem('session')
        const userinfo = {
          method: "post",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name : username,
            sessionToken : session,
            comment : userdata.comment
            }),
          }
          fetch('https://u0nsya3ysc.execute-api.eu-north-1.amazonaws.com/editComment',userinfo)
          .then((response) => response.json())
          .then((response) => {
        
          })
      }
      

  return (
    <>
    
    <Snackbar open={commentApiResponse}  autoHideDuration={5000} onClose={handleCloseCommentApi} anchorOrigin={{ vertical : 'top', horizontal : 'center' }}>
    <Alert severity='success' onClose={handleCloseCommentApi} sx={{width : '500px'}}>
    <AlertTitle>Success</AlertTitle>
  Your Commenting on Products is Scheduled — <strong>Check back later</strong>
    </Alert>
   </Snackbar>
   <Snackbar open={sessionValidity}  autoHideDuration={5000} onClose={handleCloseSessionValidity} anchorOrigin={{ vertical : 'top', horizontal : 'center' }}>
    <Alert severity='error' onClose={handleCloseSessionValidity} sx={{width : '500px'}}>
    <AlertTitle>Expired</AlertTitle>
  Seems like something wrong with your session token or it is expired — <strong>Enter it again!</strong>
    </Alert>
   </Snackbar>
    <Box width='100%' height='450px' sx={{display : 'flex', justifyContent: 'center',alignItems:'center'}}>
    
    <Grid spacing={2} direction={'column'} container bgcolor='#bebeb6' sx={{height : 'auto', width: '650px' ,borderRadius : '10px', alignItems : 'center',paddingBottom : '30px'}}>
      <Grid item >
    <TextField  sx={{width : '600px'}} id="standard-basic" label="Username" variant="standard" value = {userdata.username} onChange={(e) => {setUserdata({...userdata,username : e.target.value})}}
    InputProps={ { 
      endAdornment : (<IconButton onClick={() => {setUsernameOpen(true)}}><InfoOutlinedIcon></InfoOutlinedIcon></IconButton>)
    }}
    >
      </TextField>
      <Dialog scroll='body' open = {usernameOpen} maxWidth = {true} onClose={close_username_dialog}>
        <DialogTitle>Follow these simple steps to get your Username</DialogTitle>
        <DialogContent>1. Go to your Product Hunt Homepage. Hover over your profile icon and select settings.</DialogContent>
        <DialogContent><img width = '800px' src='./profileHover.png'/></DialogContent>
        <DialogContent>2. Select My Details tab , there you will find your username field.</DialogContent>
        <DialogContent><img width = '800px' src='./myDetails.png'/></DialogContent>
        </Dialog>

    </Grid>
    
       <Grid item>
      
    <TextField sx={{width : '600px'}} id="standard-basic" label="Session Token" variant="standard"  value={userdata.session} onChange={(e) => {setUserdata({...userdata,session : e.target.value})}}
    InputProps={ { 
      endAdornment : (<IconButton onClick={() => {setsessionOpen(true)}}><InfoOutlinedIcon></InfoOutlinedIcon></IconButton>)
    }}
    >
      </TextField> 
      <Dialog scroll='body' open = {sessionOpen} maxWidth = {true} onClose={close_session_dialog}>
        <DialogTitle>Follow these simple steps to get your session token</DialogTitle>
        <DialogContent>1. After logging in to Product Hunt, right click on the page and go to inspect</DialogContent>
        <DialogContent><img width = '800px' src='./inspecttool.png'/></DialogContent>
        <DialogContent>2. DevTools will open, then go to Application tab</DialogContent>
        <DialogContent><img width = '800px' src='./devtool_applicationtab.png'/></DialogContent>
        <DialogContent>3. Then under the storage section, select cookies</DialogContent>
        <DialogContent><img width = '800px' src='./cookies.png'/></DialogContent>
        <DialogContent>4. Then select the option under cookies, same as in the image</DialogContent>
        <DialogContent><img width = '800px' src='./url.png'/></DialogContent>
        <DialogContent>5. Then under the Name column, select the 'producthunt_session_production' field</DialogContent>
        <DialogContent><img width = '800px' src='./productsession.png'/></DialogContent>
        <DialogContent>6. That's it, below the table you will find your cookie value. Copy it and paste it in the session token field.</DialogContent>
        <DialogContent><img width = '800px' src='./token.png'/></DialogContent>
        
      </Dialog>
    </Grid>
    <Grid item>
     <Stack direction={'row'} spacing={4}>  
    <Tooltip title = {<Typography>If you left this input empty, the default comment will be considered</Typography>}>  <TextField sx={{width : '420px'}} id="standard-basic" label="Deafult : Congrats team {Product Name} on your launch." variant="standard" value = {userdata.comment} onChange={(e) => {setUserdata({...userdata,comment : e.target.value})}}></TextField></Tooltip>
    <TextField
          id="outlined-select-currency"
          select
          label="Select"
          defaultValue="Today"
          helperText="Products launched on"
          sx={{color : 'black'}}
          value={noOfDays}
          onChange={(e) => SetNoOfDays(e.target.value)}
        >
          {days.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
    </Stack> 
    </Grid>
    {checked ? <Box alignSelf={'flex-start'} pl={3.5} mt={-2}><Button onClick = {handleEditComment} sx={{color : 'white', backgroundColor : '#9932CC', ':hover':{backgroundColor : ' #9400D3'}}} variant='contained'>Edit Comment</Button></Box>:null}
    { checkbox ?
    <Box alignSelf={'flex-start'} pl={3.5}><FormControlLabel control={<Checkbox checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} color='success'/>} label='Daily Scheduling'></FormControlLabel></Box> : null}
    <Grid item mt={2}>
    <Stack direction={'row'} height={40} spacing={3} mt={-2}>
      
      
        <Button onClick = {schedule_comments} variant = 'contained'  sx={{color : 'white', backgroundColor : '#333333', ':hover':{backgroundColor : '#8E969D'}, marginTop : '-20px'}}>Schedule Comments</Button>
    
    </Stack>
    </Grid>
   
    </Grid>
    
   </Box>
   

    </>
  )
}

export default Comment_api