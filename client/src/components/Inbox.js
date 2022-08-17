import React, { useState } from 'react'
import NavBar from "./NavBar.js"
import SideMenu from "./SideMenu"

function Inbox({ currentUser, setCurrentUser }) {

  const [sideMenu, setSideMenu] = useState(false)

  return (
    <div>
      <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser} setSideMenu={setSideMenu} />
    </div>
  )
}

export default Inbox