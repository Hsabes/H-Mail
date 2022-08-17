import React, { useState } from 'react'
import NavBar from "./NavBar.js"
import Emails from "./Emails.js"

function Inbox({ currentUser, setCurrentUser }) {

  const [navigation, setNavigation] = useState("inbox")

  return (
    <>
      <NavBar currentUser={currentUser} 
      setCurrentUser={setCurrentUser} 
      setNavigation={setNavigation} />
      <Emails navigation={navigation}/>
    </>
  )
}

export default Inbox