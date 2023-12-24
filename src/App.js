import { Card, Container, CssBaseline, Grid, Paper, Stack, TextField,Avatar,CardHeader,CardContent,Typography,Alert,AlertTitle, Snackbar, CircularProgress, Skeleton, ToggleButtonGroup, ToggleButton} from '@mui/material';

import './App.css';

import { Route, Routes } from 'react-router-dom';
import Homepage from './Homepage';
import Loginpage from './Loginpage';
import PrivateRoutes from './PrivateRoutes';


function App() {
  return(
 <>
   <Routes>
    <Route element={<PrivateRoutes></PrivateRoutes>}>
    <Route exact path='/' element={<Homepage></Homepage>}></Route>
    </Route>
    
    <Route path='/login' element = {<Loginpage></Loginpage>}/>
   </Routes>

 </>
  )
  }

export default App;
