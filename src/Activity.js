import styled from '@emotion/styled';
import { TableContainer,Table, TableCell,TableRow,TableHead,TableBody, Paper, Typography, tableCellClasses} from '@mui/material'
import React, { useEffect, useState } from 'react'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  

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
            <StyledTableCell>Company</StyledTableCell>
            <StyledTableCell align="right">ID</StyledTableCell>
            <StyledTableCell align="right">Comment</StyledTableCell>
            <StyledTableCell align="right">Commented At</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pastActivity.map((row) => (
            <StyledTableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {row.company_name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.company_id}</StyledTableCell>
              <StyledTableCell align="right">{row.comment}</StyledTableCell>
              <StyledTableCell align="right">{row.commented_at}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
   </TableContainer> : <Typography>No Activity</Typography>}
   </>
  )
}

export default Activity