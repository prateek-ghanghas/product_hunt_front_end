import React from 'react'

function setBodyColor({color}) {
  document.documentElement.style.setProperty('--bodyColor',color)
}

export default setBodyColor