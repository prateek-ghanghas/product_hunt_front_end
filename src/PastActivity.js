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
          }),
        }
 useEffect(() => {
    fetch('https://j52zch4djd.execute-api.eu-north-1.amazonaws.com/pastActivity',userinfo)
    .then((response) => response.json())
    .then((response) => {
        if (response.result){
            setPastActivity(response.result)
        }
    })
 },[])

  return (
    <>
    <Typography>{pastActivity}</Typography>
    </>
  )
}

export default PastActivity