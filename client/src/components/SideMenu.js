import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
// import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import CreateIcon from '@mui/icons-material/Create';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';

export default function SideMenu({ setNavigation }) {
  const [drawer, setDrawer] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    // console.log(event)
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawer({ ...drawer, [anchor]: open });
  };

  // set the text of the mapped array to the route ex: component={"/" + text.toLowerCase() }, text needs to be the same name as the route

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['inbox', 'saved', 'compose', 'sent'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={(e) => {
              if (text === "inbox"){
                setNavigation(text)
              } else if (text === "saved"){
                setNavigation(text)
              } else if (text === "compose"){
                setNavigation(text)
              } else if (text === "sent"){
                setNavigation(text)
              }
            } }>
              <ListItemIcon>
                {text === "inbox" ? <MailIcon /> : null}
                {text === "saved" ? <InboxIcon /> : null}
                {text === "compose" ? <CreateIcon /> : null}
                {text === "sent" ? <SendIcon /> : null}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['all mail', 'trash'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={(e) => {
              if (text === "all mail"){
                setNavigation(text)
              } else if (text === "trash"){
                setNavigation(text)
              } 
            } }>
              <ListItemIcon>
                {text === "all mail" ? <MailIcon /> : null}
                {text === "trash" ? <DeleteIcon /> : null}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  function handleMenuClick(text){
    if (text === "inbox"){
      console.log("correct")
    } else {
      console.log("incorrect")
    }
  }

  // console.log(drawer)

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <MenuIcon sx={{ width: 40, height: 38 }} onClick={toggleDrawer(anchor, true)}/>
          <Drawer
            anchor={anchor}
            open={drawer[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}