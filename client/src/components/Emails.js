import React, {useState} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';

function Emails({ navigation, currentUser }) {

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

    console.log(checked)

    // Navigation state is to render the emails that belongs to each navigation menu item

  return (
    <List dense sx={{ width: '100%' }}>
      {received_emails?.map((email) => {
        const labelId = `checkbox-list-secondary-label-${email}`;
        return (
          <ListItem
            key={email.id}
            onClick={(e) => console.log(email)}
            // secondaryAction={
              
            // }
            disablePadding
          >
            <Checkbox
                edge="end"
                onChange={handleToggle(email)}
                checked={checked.indexOf(email) !== -1}
                inputProps={{ 'aria-labelledby': labelId }}
              />
            <ListItemButton>
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={email.subject} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}

export default Emails