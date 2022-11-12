import React, { useState, useEffect } from 'react' 
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import NavBar from "./NavBar.js"
import Emails from "./Emails.js"
import Saved from "./Saved.js"
import Compose from "./Compose.js"
import SentEmails from "./SentEmails.js"
import ReadEmails from "./ReadEmails.js"

function Inbox({ currentUser, setCurrentUser }) {

  // Gets all of the users received emails, which are used in different ways depending on the navigation the user clicks

  const { received_emails } = currentUser

  // This is all of the state for the application. It is passed to the various components to handle tasks such as disabling buttons, handling clicks on specific
  // emails, setting emails to checked to be saved or deleted, opening modals to view specific emails, and utilizing an array of all users for different purposes

  // See the components they are being passed into below

  const [open, setOpen] = useState(false)
  const [clickedEmail, setClickedEmail] = useState({})
  const [disabled, setDisabled] = useState(false)
  const [navigation, setNavigation] = useState("Inbox")
  const [checked, setChecked] = useState([]);
  const [users, setUsers] = useState([])

  // Finds the sender of a clicked email. This is used to display the name of the sender in the email, and eventually utlized for a reply function

  const foundSender = users?.find((user) => user.id === clickedEmail.sender_id)

  // Next two functions handle opening and closing an email

  function handleOpen(){
    setOpen(true)
  }

  function handleClose(){
      setOpen(false)
      setClickedEmail({})
      setDisabled(false)
  }

  // Fetches all users. This is to gather rendered information such as the sender of an email

  useEffect(() => {
      fetch("/users")
      .then(res => res.json())
      .then((res) => {
        setUsers(res)
      })
    }, []); 

  // For every email that is checked, it will send a PATCH request to update that email's saved property to true

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

  // Same as above, except it deletes the emails

  function handleDeleteClick(e){
      checked.map(email => {
          fetch(`/emails/${email.id}`, {
              method: 'DELETE'
          })
      })
      setChecked([])
      window.location.reload(false)
  }

  // Handles the checkboxes and adds emails to the "checked" state to be saved or deleted

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

  // Parameter is sent from the emails rendered in the specific folder. Email is used to find the users, from which the avatar is rendered on that email

  function findAvatar(email){
    let foundSender = users?.find((user) => user.id === email.sender_id)
    if (foundSender){
        return foundSender.avatar
    }
  }

  // Renders specific kinds of emails based on what the user clicks. See "./SideMenu.js". This is called in the return of this component

  function renderNavigation(){
    if (navigation === "Inbox"){
      return <Emails received_emails={received_emails} 
      handleToggle={handleToggle}
      checked={checked}
      users={users}
      findAvatar={findAvatar}
      open={open}
      setOpen={setOpen}
      clickedEmail={clickedEmail}
      setClickedEmail={setClickedEmail}
      disabled={disabled}
      setDisabled={setDisabled}
      foundSender={foundSender}
      handleOpen={handleOpen}
      handleClose={handleClose}/>
    } else if (navigation === "Saved"){
      return <Saved received_emails={received_emails}
      handleToggle={handleToggle}
      checked={checked}
      users={users}
      findAvatar={findAvatar}
      open={open}
      setOpen={setOpen}
      clickedEmail={clickedEmail}
      setClickedEmail={setClickedEmail}
      disabled={disabled}
      setDisabled={setDisabled}
      foundSender={foundSender}
      handleOpen={handleOpen}
      handleClose={handleClose}/>
    } else if (navigation === "Sent"){
      return <SentEmails currentUser={currentUser} 
      handleToggle={handleToggle}
      checked={checked}
      users={users}
      findAvatar={findAvatar}
      open={open}
      clickedEmail={clickedEmail}
      setClickedEmail={setClickedEmail}
      disabled={disabled}
      setDisabled={setDisabled}
      handleOpen={handleOpen}
      handleClose={handleClose}/>
    } else if (navigation === "Compose"){
      return <Compose currentUser={currentUser} 
      setNavigation={setNavigation}
      users={users}
      open={open}
      setOpen={setOpen}
      clickedEmail={clickedEmail}
      setClickedEmail={setClickedEmail}
      disabled={disabled}
      setDisabled={setDisabled}/>
    } else if (navigation === "Read"){
      return <ReadEmails received_emails={received_emails}
      users={users}
      checked={checked}
      handleToggle={handleToggle}
      findAvatar={findAvatar}
      open={open}
      setOpen={setOpen}
      clickedEmail={clickedEmail}
      setClickedEmail={setClickedEmail}
      disabled={disabled}
      setDisabled={setDisabled}
      foundSender={foundSender}
      handleOpen={handleOpen}
      handleClose={handleClose}/>
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