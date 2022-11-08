import React, { useState } from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { Grid, Link } from "@mui/material";
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import Button from "@mui/material/Button";
import EmailIcon from '@mui/icons-material/Email';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const defaultValues = {
    email: "",
    username: "",
    password: ""
  };

function Signup({ setCurrentUser }) {

    const [formData, setFormData] = useState(defaultValues)
    const [errors, setErrors] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const {email, username, password} = formData

    function handleSubmit(e){
        e.preventDefault()
        const user = {
            email, 
            username,
            password
        }
        fetch('/users', {
          method:'POST',
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify(user)
        })
        .then(res => {
            if(res.ok){
                res.json().then(user => {
                    setCurrentUser(user)
                    navigate("/inbox")
                    const email = {
                        subject: "Welcome to Hmail!",
                        body: "Thank you for signing up at H-Mail. Feel free to send any friends you have some emails, they'll need an H-Mail account as well.",
                        sender_id: 1,
                        recipient_id: user.id,
                    }
                    fetch('/emails', {
                        method: 'POST',
                        headers:{'Content-Type': 'application/json'},
                        body: JSON.stringify(email)
                    })
                    .then(res => res.json())
                    .then(data => console.log(data))
                    window.location.reload(false)
                })
                setFormData(defaultValues)
            } else {
                res.json().then(json => setErrors(Object.entries(json.errors)))
            }
        }) 

    }

      const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleClickShowPassword = () => {
        setShowPassword((currentState) => !currentState);
    };

    let passwordStrength;

    if (formData.password.length >= 10){
            passwordStrength = "Strength: Strong"
        } else if (formData.password.length < 10 && formData.password.length >= 5){
            passwordStrength = "Strength: Medium"
        } else if (formData.password.length < 5 && formData.password.length >= 3){
            passwordStrength = "Strength: Weak"
        } else if (formData.password.length < 3 && formData.password.length > 0) {
            passwordStrength = "Password too short"
        } else if (formData.password.length === 0){
            passwordStrength = null
        }

    return (
        <Grid 
        minWidth="100%"
        minHeight="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
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
                )
            `,
            }}>
            <Grid style={{ textAlign: "center" }}>
                <h1>Create Your Hmail Account</h1>
                <form onSubmit={handleSubmit}>
                    <Grid container 
                    display= "flex"
                    alignItems= "center"
                    direction="column"
                    sx={{ mb: 5 }}
                    >
                        <Grid item>
                            <TextField InputLabelProps={{ shrink: true }}
                            InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    { email.includes("@hmail.com") 
                                    && email.length > 12 
                                    && email.length < 26 
                                    ? <CheckIcon /> 
                                    : <EmailIcon /> }
                                  </InputAdornment>
                                ),
                            }}
                            id="email"
                            name="email"
                            label="Email Address"
                            type="text"
                            helperText="Ex: example@hmail.com"
                            onChange={handleChange}
                            required>
                            </TextField>
                        </Grid>
                        <Grid item sx={{ mt: 2 }}>
                            <TextField InputLabelProps={{ shrink: true }}
                            InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <EmailIcon />
                                  </InputAdornment>
                                ),
                            }}
                            id="username"
                            name="username"
                            label="Username"
                            type="text"
                            onChange={handleChange}
                            required>
                            </TextField>
                        </Grid>
                        <Grid item sx={{ mt: 2 }}>
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
                            type={showPassword ? "text" : "password"}
                            onChange={handleChange}
                            required>
                            </TextField>
                        </Grid>
                        <h5>{passwordStrength}</h5>
                        <Grid item>
                            <Button variant="contained" 
                            type="submit"                 
                            style={{
                                '--color-1': 'blue',
                                '--color-2': 'red',
                                '--color-3': 'yellow',
                                background: `
                                    linear-gradient(
                                    170deg,
                                    var(--color-1),
                                    var(--color-2),
                                    var(--color-3)
                                    )
                                `,
                            
                                // Unrelated styles:
                                color: 'white',
                                textAlign: 'center',
                                padding: 15,
                                borderRadius: 12,
                                }}
                                >Sign up</Button>
                        </Grid>
                        <Grid item sx={{ mt: 2 }}>
                            <Link component={RouterLink} to="/">Login instead</Link>
                        </Grid>
                        { errors ? <h4>{errors.map(error => error.slice(1) + " ")}</h4> : null}
                    </Grid>
                </form>
            </Grid>
        </Grid>
      )
}

export default Signup