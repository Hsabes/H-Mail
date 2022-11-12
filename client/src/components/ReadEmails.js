import React from 'react';
import { Box } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import CloseIcon from '@mui/icons-material/Close';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarRateIcon from '@mui/icons-material/StarRate';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from "@mui/material/Button";
import Fade from '@mui/material/Fade';
import { deepOrange } from '@mui/material/colors';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "75%",
    height: "75%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 12,
    p: 4,
}

function ReadEmails({ received_emails, checked, handleToggle, findAvatar, open, clickedEmail, setClickedEmail, disabled, setDisabled, foundSender, handleOpen, handleClose }){

  const sorted_emails = received_emails?.sort((a, b) => b.id - a.id)

  const filteredByRead = sorted_emails?.filter((email) => email.read === true)

  return (
    <>
        <Box style={{ textAlign: "center" }}>
            <h2 syle={{ textAlign: "center" }}>Read Emails</h2>
        </Box>
        <List dense sx={{ width: '100%' }}>
        {filteredByRead?.map((email) => {
            const labelId = `checkbox-list-secondary-label-${email}`;
            return (
                <ListItem
                    key={email.id}
                    onClick={(e) => {
                        if (!disabled && email.read === false){
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
                        }}}
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
                    <ListItemButton sx={{ color: "#000" }} disabled={disabled} onClick={(e) => {
                        if (!disabled){
                            handleOpen()
                            setClickedEmail(email)
                            setDisabled(true)
                        }
                    }}>
                    <Modal open={open}
                    onClose={handleClose}
                    hideBackdrop={true}
                    >
                        <Fade in={open}>
                            <Box sx={style}>
                                <Button sx={{ left: "90%" }} onClick={handleClose}>
                                    <CloseIcon />
                                </Button>
                                <Typography sx={{ mt: 2, mb: 2 }}><strong>From:</strong> {foundSender?.email}</Typography>
                                <Divider />
                                <Typography sx={{ mt: 2, mb: 2 }}><strong>To:</strong> You</Typography>
                                <Divider />
                                <Typography sx={{ mt: 2, mb: 2 }}><strong>Subject:</strong> {clickedEmail.subject}</Typography>
                                <Divider />
                                <Typography sx={{ mt: 2, mb: 2 }}>{clickedEmail.body}</Typography>
                            </Box>
                        </Fade>
                    </Modal>
                    <ListItemAvatar>
                        <Avatar src={findAvatar(email)} sx={{ bgcolor: deepOrange[500], height: 48, width: 48 }} /> 
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
                    <h4>{email.created_at.slice(5, 10)}</h4> 
                    }
                    </ListItemButton>
                </ListItem>
            );
        })}
        </List>
    </>
  )
}

export default ReadEmails