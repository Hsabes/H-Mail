import React, { useState } from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import CreateIcon from '@mui/icons-material/Create';
import SendIcon from '@mui/icons-material/Send';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';

export default function SideMenu({ setNavigation }) {
  
  const [drawer, setDrawer] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawer({ ...drawer, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Inbox', 'Saved', 'Compose', 'Sent', 'Read'].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={(e) => {
              if (text === "Inbox"){
                setNavigation(text)
              } else if (text === "Saved"){
                setNavigation(text)
              } else if (text === "Compose"){
                setNavigation(text)
              } else if (text === "Sent"){
                setNavigation(text)
              } else if (text === "Read"){
                setNavigation(text)
              }
            } }>
              <ListItemIcon>
                {text === "Inbox" ? <MailIcon /> : null}
                {text === "Saved" ? <InboxIcon /> : null}
                {text === "Compose" ? <CreateIcon /> : null}
                {text === "Sent" ? <SendIcon /> : null}
                {text === "Read" ? <MarkEmailReadIcon /> : null}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );


  
  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          { window.innerWidth < 720 
          ? 
          <DoubleArrowIcon sx={{ width: 40, height: 38 }} 
            onClick={toggleDrawer(anchor, true)}/> 
          : 
          <MenuIcon sx={{ width: 40, height: 38 }} 
            onClick={toggleDrawer(anchor, true)}/>
          }
          <SwipeableDrawer
            anchor={anchor}
            open={drawer[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}