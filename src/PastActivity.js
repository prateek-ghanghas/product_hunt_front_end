import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

function PastActivity() {
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
console.log(pastActivity)
  return (
    <>
    <Typography>{pastActivity.map((dic) => {
        
        return <p>{dic.name}</p>
    })}</Typography>
    </>
  )
}

export default PastActivity