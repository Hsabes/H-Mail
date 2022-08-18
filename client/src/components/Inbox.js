import React, { useState } from 'react'
import NavBar from "./NavBar.js"
import Emails from "./Emails.js"

function Inbox({ currentUser, setCurrentUser }) {

  const [navigation, setNavigation] = useState("inbox")

  function renderNavigation(){
    if (navigation === "inbox"){
      return <Emails currentUser={currentUser}/>
    } else if (navigation === "saved"){
      return <h4>saved</h4>
    } else if (navigation === "sent"){
      return <h4>sent</h4>
    } else if (navigation === "trash"){
      return <h4>trash</h4>
    } else if (navigation === ""){
      return <h4>saved</h4>
    }
  }

  return (
    <>
      <NavBar currentUser={currentUser} 
      setCurrentUser={setCurrentUser} 
      setNavigation={setNavigation} />
      { renderNavigation() }
    </>
  )
}

export default Inbox

// saved, sent, all