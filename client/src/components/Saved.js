import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarRateIcon from '@mui/icons-material/StarRate';

function Saved({ currentUser, handleToggle, checked }) {
  
    const { received_emails } = currentUser

    const savedEmails = received_emails.filter((email) => email.saved === true)

    console.log(savedEmails)

  return (
    <>
        <List dense sx={{ width: '100%' }}>
        {savedEmails?.map((email) => {
            const labelId = `checkbox-list-secondary-label-${email}`;
            return (
                <ListItem
                    key={email.id}
                    onClick={(e) => {
                        fetch(`/emails/${email.id}`, {
                            method: 'PATCH',
                            headers: {
                                "Content-Type": "application/json",
                                "Accept": "application/json"
                            },
                            body: JSON.stringify({ read: true })
                        })
                        .then(res => res.json())
                        .then(res => console.log("email read"))
                    }} // render sepcific emial
                    disablePadding>     
                    <Checkbox
                        edge="end"
                        onChange={handleToggle(email)}
                        checked={checked.indexOf(email) !== -1}
                        inputProps={{ 'aria-labelledby': labelId }}
                        />   
                    { email.saved === true 
                    ? 
                    <StarRateIcon sx={{ ml: 1 }} />    
                    : 
                    <StarBorderIcon sx={{ ml: 1 }} /> }
                    <ListItemButton onClick={(e) => console.log("open me!")}>
                    <ListItemAvatar>
                        <Avatar />
                    </ListItemAvatar>
                    { window.innerWidth > 400 
                    ?
                    <ListItemText id={labelId} primary={email.subject.length > 20 
                        ? 
                        email.subject.slice(0, 20) + "..." 
                        : 
                        email.subject} /> 
                    :
                    <ListItemText id={labelId} primary={email.subject.slice(0,8) + "..."} />
                    }
                    { window.innerWidth > 400
                    ? 
                    <h4>Received: {email.created_at.slice(0, 10)}</h4> 
                    :
                    <h4>Received: {email.created_at.slice(5, 10)}</h4> 
                    }
                    </ListItemButton>
                </ListItem>
            );
        })}
        </List>
    </>
  )
}

export default Saved