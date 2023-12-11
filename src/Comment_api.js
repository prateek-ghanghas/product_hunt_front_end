import { Box, CssBaseline, Typography,Grid,TextField,Stack,Button ,MenuItem, Tooltip,Snackbar,AlertTitle,Alert} from '@mui/material'
import React, { useState } from 'react'

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
    const [userdata,setUserdata] = useState({username : '', session : '', comment : ''})
    const [noOfDays,SetNoOfDays] = useState('')
    const [commentApiResponse,setCommentApiResponse] = useState(false)

    const schedule_comments = () => {
     const userinfo = {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name : userdata.username,
          sessionToken : userdata.session,
          no_of_days : noOfDays,
          comment : userdata.comment,
          }),
        }
        fetch('https://40djlwps1e.execute-api.eu-north-1.amazonaws.com/commentOnRecentLaunchedProducts',userinfo)
        .then((response) => response.json())
        .then((response) => {
            if (response.result === 'true'){
                setCommentApiResponse(true)
            }
        })
    }

    const handleClose = (reason) => {
        if (reason == 'clickaway'){
          return
        }
        else{
    
        setCommentApiResponse(false)
        }
      }

  return (
    <>
    <Snackbar open={commentApiResponse}  autoHideDuration={5000} onClose={handleClose} anchorOrigin={{ vertical : 'top', horizontal : 'center' }}>
    <Alert severity='success' onClose={handleClose} sx={{width : '500px'}}>
    <AlertTitle>Success</AlertTitle>
  Your Commenting on Products is Scheduled — <strong>Check back later</strong>
    </Alert>
   </Snackbar>
    <Box width='100%' height='380px' sx={{display : 'flex', justifyContent: 'center',alignItems:'center'}}>
    
    <Grid spacing={1} direction={'column'} container bgcolor='#bebeb6' sx={{height : 'auto', width: '650px' ,borderRadius : '10px', alignItems : 'center',paddingBottom : '30px'}}>
      <Grid item >
    <TextField  sx={{width : '600px'}} id="standard-basic" label="username" variant="standard" value = {userdata.username} onChange={(e) => {setUserdata({...userdata,username : e.target.value})}}/>
    </Grid>
    <Grid item>
    <TextField sx={{width : '600px'}} id="standard-basic" label="session" variant="standard" value={userdata.session} onChange={(e) => {setUserdata({...userdata,session : e.target.value})}}/>
    </Grid>
    <Grid item>
     <Stack direction={'row'} spacing={4}>  
    <Tooltip title = {<Typography>If you left this input empty, the default comment will be considered</Typography>}>  <TextField sx={{width : '420px'}} id="standard-basic" label="Deafult : Congrats team {Product Name} on your launch." variant="standard" onChange={(e) => {setUserdata({...userdata,comment : e.target.value})}}></TextField></Tooltip>
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
    <Grid item mt={2}>
    <Stack direction={'row'} height={40} spacing={3}>
      
      
        <Button onClick = {schedule_comments} variant = 'contained'  sx={{color : 'white', backgroundColor : '#333333', ':hover':{backgroundColor : '#8E969D'}, marginTop : '-20px'}}>Schedule Comments</Button>
    
    </Stack>
    </Grid>
   
    </Grid>
    
   </Box>

    </>
  )
}

export default Comment_api