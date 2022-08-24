import React, { useState } from 'react'
import ProfileNav from './ProfileNav.js'
import { Box, Grid, styled, Avatar } from "@mui/material"
import { deepOrange } from '@mui/material/colors';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import CheckIcon from '@mui/icons-material/Check';
import Divider from '@mui/material/Divider';
import PersonIcon from '@mui/icons-material/Person';

const defaultValues = {
    editEmail: "",
    editUsername: "",
    editPassword: ""
  };

function Account({ currentUser, setCurrentUser }) {

    const [formData, setFormData] = useState(defaultValues)
    const [showPassword, setShowPassword] = useState(false)
    const [avatarData, setAvatarData] = useState(null)

    const { editEmail, editUsername, editPassword } = formData

    const Icons = styled(Box)(({ theme }) => ({
        display:"flex" , alignItems:"center" , gap:"40px"
    }))

    function handleEmailSubmit(e){
        e.preventDefault()
        fetch(`/users/${currentUser.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ email: editEmail })
        })
        .then(res => res.json())
        .then(res => console.log("email edited"))
        setFormData(defaultValues)
        window.location.reload(false)
    }

    const handleEmailChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    function handlePasswordSubmit(){
        fetch(`/users/${currentUser.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ password: editPassword })
        })
        .then(res => res.json())
        .then(res => console.log("username edited"))
        setFormData(defaultValues)
        window.location.reload(false)
    }

    const handlePasswordChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    function handleUsernameSubmit(){
        fetch(`/users/${currentUser.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ username: editUsername })
        })
        .then(res => res.json())
        .then(res => console.log("username edited"))
        setFormData(defaultValues)
        window.location.reload(false)
    }

    const handleUsernameChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    function handleAvatarSubmit(){     
        const formData = new FormData()
        formData.append('avatar', avatarData)

        fetch(`/users/${currentUser.id}`, {
            method: "PATCH",
            body: formData
        })
        .then(res => res.json())
        .then(res => console.log("avatar edited"))
        window.location.reload(false)
    }

    console.log(avatarData)
    console.log(currentUser)

    const handleClickShowPassword = () => {
        setShowPassword((currentState) => !currentState);
    };

  return (
    <>
        <ProfileNav setCurrentUser={setCurrentUser} currentUser={currentUser} />
        <Box textAlign="center">
            <h2>{currentUser.username}'s Account</h2>
        </Box>
        <Grid container display="flex"
        justifyContent="space-around"
        style={{ height: "100%" }}
        sx={{ mt: 5 }}>
            <Grid item>
                <Grid item>
                    <Icons>
                        <Avatar sx={{ bgcolor: deepOrange[500], width: 400, height: 400 }} src={currentUser.avatar} />
                    </Icons>
                </Grid>
                <form onSubmit={handleAvatarSubmit}>
                    <Grid item display="flex" justifyContent="center" sx={{ mt: 3 }}>
                        <Button
                        component="label">
                            { avatarData ? avatarData.name : "Change Avatar"}
                            <input type="file" 
                            accept="image/*"
                            hidden
                            onChange={(e) => setAvatarData(e.target.files[0])}/>
                        </Button>     
                    </Grid>
                    { avatarData 
                    ? 
                        <Grid item display="flex" justifyContent="center" variant="contained">
                            <Button type="submit">Submit</Button>
                        </Grid>
                    :
                        null
                    }
                </form>
                </Grid>
            <Grid item>
                { window.innerWidth < 727 ? <Divider /> : null }
                <Grid item textAlign="center">
                    <h3>Your email address: {currentUser.email}</h3>
                </Grid>
                <form onSubmit={handleEmailSubmit}>
                    <Grid item display="flex" justifyContent="center">
                        <TextField InputLabelProps={{ shrink: true }}
                            InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    { editEmail.includes("@hmail.com") 
                                    && editEmail.length > 12 
                                    && editEmail.length < 26 
                                    ? <CheckIcon /> 
                                    : <EmailIcon /> }
                                  </InputAdornment>
                                ),
                            }}
                            id="editEmail"
                            name="editEmail"
                            label="Email Address"
                            type="text"
                            required
                            onChange={handleEmailChange}/>
                        <Button type="submit">Edit</Button>
                    </Grid>
                </form>
                <form onSubmit={handleUsernameSubmit}>
                    <Grid item display="flex" justifyContent="center" sx={{ mt: 6 }}>
                        <TextField InputLabelProps={{ shrink: true }}
                            InputProps={{
                                startAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton edge="start">
                                      <PersonIcon />
                                    </IconButton>
                                  </InputAdornment>
                                ),
                            }}
                            id="editUsername"
                            name="editUsername"
                            label="Username"
                            onChange={handleUsernameChange}
                            type="text"/>
                        <Button type="submit">Edit</Button>
                    </Grid>
                </form>
                <form onSubmit={handlePasswordSubmit}>
                    <Grid item display="flex" justifyContent="center" sx={{ mt: 6, mb: 6 }}>
                        <TextField InputLabelProps={{ shrink: true }}
                            InputProps={{
                                startAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowPassword}
                                      edge="start">
                                      {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                            }}
                            id="password"
                            name="password"
                            label="Password"
                            onChange={handlePasswordChange}
                            type={showPassword ? "text" : "password"}/>
                        <Button type="submit">Edit</Button>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    </>
  )
}

export default Account