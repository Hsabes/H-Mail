import React, {useState} from 'react';
import { Grid } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarRateIcon from '@mui/icons-material/StarRate';

function Emails({ currentUser }) {

    const [checked, setChecked] = useState([]);

    const { received_emails } = currentUser

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
        window.location.reload(false)
    }

    function handleDeleteClick(e){
        checked.map(email => {
            fetch(`/emails/${email.id}`, {
                method: 'DELETE'
            })
        })
        window.location.reload(false)
    }

    // Navigation state is to render the emails that belongs to each navigation menu item

  return (
    <>
        <Grid container display="flex" sx={{ mt: 2 }}>
            <Grid item>
                <Button variant="contained" 
                sx={{ mr: 2 }}
                onClick={handleDeleteClick}>Delete</Button>
            </Grid>
            <Grid item>
                <Button variant="contained" onClick={handleSaveClick}>Save</Button>
            </Grid>
        </Grid>        
        <List dense sx={{ width: '100%' }}>
        {received_emails?.map((email) => {
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
                        .then(res => console.log(email))
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
                    <ListItemButton>
                    <ListItemAvatar>
                        <Avatar />
                    </ListItemAvatar>
                    <ListItemText id={labelId} primary={email.subject} />
                    <h4>{email.created_at.slice(0, 10)}</h4>
                    </ListItemButton>
                </ListItem>
            );
        })}
        </List>
    </>
  );
}

export default Emails