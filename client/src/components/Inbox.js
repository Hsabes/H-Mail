import React, { useState, useEffect } from 'react' 
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import NavBar from "./NavBar.js"
import Emails from "./Emails.js"
import Saved from "./Saved.js"
import Compose from "./Compose.js"
import SentEmails from "./SentEmails.js"

function Inbox({ currentUser, setCurrentUser }) {

  const [navigation, setNavigation] = useState("Inbox")
  const [checked, setChecked] = useState([]);
  const [users, setUsers] = useState([])

  // let refresh = 0;

  // while (refresh < 10000){
  //   setTimeout(function(){
  //     refresh += 1
  //   }, 5000)
  // }

  useEffect(() => {
      fetch("/users")
      .then(res => res.json())
      .then((res) => {
        setUsers(res)
      })
    }, []); 

  function handleSaveClick(e){
    checked.map(email => {
        fetch(`/emails/${email.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ saved: true})
        })
        .then(res => res.json())
        .then(res => console.log(email))
    })
    setChecked([])
    window.location.reload(false)
}

function handleDeleteClick(e){
    checked.map(email => {
        fetch(`/emails/${email.id}`, {
            method: 'DELETE'
        })
    })
    setChecked([])
    window.location.reload(false)
}

const handleToggle = (value) => () => {
  const currentIndex = checked.indexOf(value);
  const newChecked = [...checked];

  if (currentIndex === -1) {
  newChecked.push(value);
  } else {
  newChecked.splice(currentIndex, 1);
  }

  setChecked(newChecked);
};

function renderNavigation(){
  if (navigation === "Inbox"){
    return <Emails currentUser={currentUser} 
    handleToggle={handleToggle}
    checked={checked}
    users={users}/>
  } else if (navigation === "Saved"){
    return <Saved currentUser={currentUser}
    handleToggle={handleToggle}
    checked={checked}
    users={users}/>
  } else if (navigation === "Sent"){
    return <SentEmails currentUser={currentUser} 
    handleToggle={handleToggle}
    checked={checked}
    users={users}/>
  } else if (navigation === "Compose"){
    return <Compose currentUser={currentUser} 
    setNavigation={setNavigation}
    users={users}/>
  }
}

  return (
    <>
      <NavBar currentUser={currentUser} 
      setCurrentUser={setCurrentUser} 
      setNavigation={setNavigation} />
      <Grid container display="flex" sx={{ mt: 2 }}>
            <Grid item>
                <Button disabled={navigation === "Compose"} 
                variant="contained" 
                sx={{ mr: 2 }}
                onClick={handleDeleteClick}>Delete</Button>
            </Grid>
            <Grid item>
                <Button disabled={navigation === "Saved" || navigation === "Compose" || navigation === "Sent"} variant="contained" onClick={handleSaveClick}>
                  Save
                </Button>
            </Grid>
        </Grid>
      { renderNavigation() }
    </>
  )
}

export default Inbox

// saved, sent, all