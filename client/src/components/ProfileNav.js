import React, { useState } from 'react'
import { useNavigate,  Link as RouterLink } from 'react-router-dom'
import { AppBar, styled, Avatar, Menu, MenuItem, Toolbar, Box } from "@mui/material"
import { deepOrange } from '@mui/material/colors';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function NavBar({ setCurrentUser, currentUser }) {

    const [open, setOpen] = useState(false)

    const navigate = useNavigate();

    const StyledToolbar = styled(Toolbar) ({
        display: "flex",
        justifyContent: "space-between",
    })

    const Icons = styled(Box)(({ theme }) => ({
        display:"flex" , alignItems:"center" , gap:"40px"
    }))

    const handleLogOut = () => {
        fetch('/logout', {
          method: 'DELETE'
        })
        setCurrentUser(false)
        localStorage.clear();
        navigate("/")
    };

    const handleClick = () => {
        navigate("/account")
    }

    const handleNavigateClick = () => {
        navigate("/inbox")
    }

  return (
    <AppBar position="sticky" 
    sx={{backgroundColor:"#33691e"}}
    style={{   
        '--color-1': 'lightblue',
        '--color-2': 'lightgreen',
        '--color-3': 'lightyellow',
        background: `
            linear-gradient(
            110deg,
            var(--color-2),
            var(--color-1),
            var(--color-3)
            )`,
        }}>
        <StyledToolbar>
            <ArrowBackIosIcon onClick={handleNavigateClick} sx={{ width: 40, height: 40 }} />
            <h1 sx={{ display: {xs: "none", sm:"block" } }} style={{color: "black"}}>
                Hmail
            </h1>
        <Icons>
            <Avatar sx={{ bgcolor: deepOrange[500], width: 57, height: 57 }}
            onClick={e=>setOpen(true)}
            src={currentUser.avatar}
            />
        </Icons>
        </StyledToolbar>
        <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        // anchorEl={anchorEl}
        open={open}
        onClose={e=>setOpen(false)}
        anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
        }}
        transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
        }}
    >
        <MenuItem onClick={handleLogOut}>Logout</MenuItem>
    </Menu>
    </AppBar>
  )
}

export default NavBar