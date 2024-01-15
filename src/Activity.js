import { TableContainer,Table, TableCell,TableRow,TableHead,TableBody, Paper, Typography} from '@mui/material'
import React, { useEffect, useState } from 'react'

function Activity() {
    const [pastActivity,setPastActivity] = useState([])
    const userinfo = {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username : localStorage.getItem("PHusername")
          }),
        }
 useEffect(() => {
    fetch('https://j52zch4djd.execute-api.eu-north-1.amazonaws.com/pastActivity',userinfo)
    .then((response) => response.json())
    .then((response) => {
            setPastActivity(response.resultData)
        
    })
 },[])
  return (
   <>
   { localStorage.getItem("PHusername") ? 
   <TableContainer component={Paper}>
   <Table sx={{ minWidth: 650 }} aria-label="simple table">
   <TableHead>
          <TableRow>
            <TableCell>Company</TableCell>
            <TableCell align="right">ID</TableCell>
            <TableCell align="right">Comment</TableCell>
            <TableCell align="right">Commented At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pastActivity.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.company_name}
              </TableCell>
              <TableCell align="right">{row.company_id}</TableCell>
              <TableCell align="right">{row.comment}</TableCell>
              <TableCell align="right">{row.commented_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
   </TableContainer> : <Typography>No Activity</Typography>}
   </>
  )
}

export default Activity