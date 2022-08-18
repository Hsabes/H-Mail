import React, { useState } from 'react'
import { useNavigate,  Link as RouterLink } from 'react-router-dom'
import { Grid, Link } from "@mui/material";
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import Button from "@mui/material/Button";
import EmailIcon from '@mui/icons-material/Email';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const defaultValues = {
    email: "",
    password: "",
  };

function Login({ setCurrentUser }) {

    const [formValues, setFormValues] = useState(defaultValues);
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
          ...formValues,
          [name]: value,
        });
    };

    const handleSubmit = (e) => {
    e.preventDefault();

    const configObj = {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        },
        body: JSON.stringify({ ...formValues }),
    };

    fetch("/login", configObj)
    .then(res => {
        if (res.ok) {
        return res.json();
        }
        setError('Incorrect Email or Password. Try Again!');
    })
    .then((user) => {
        setCurrentUser(user)
        navigate("/inbox")
        window.location.reload(false)
    })
    .catch((error) => {
        alert(error)
    })
    setFormValues(defaultValues);
    };

    const handleClickShowPassword = () => {
        setShowPassword((currentState) => !currentState);
    };

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
            <h1>Login to Hmail</h1>
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
                                <EmailIcon />
                              </InputAdornment>
                            ),
                        }}
                        id="email"
                        name="email"
                        label="Email Address"
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
                    { error ? <h5>{error}</h5> : null }
                    <Grid item>
                        {/* need route on button */}
                        <Button variant="contained" 
                        type="submit"                 
                        sx={{ mt: 2 }}
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
                                )`,
                            color: 'white',
                            textAlign: 'center',
                            padding: 15,
                            borderRadius: 12,
                            }}
                            >Login</Button>
                    </Grid>
                    <Grid item sx={{ mt: 2 }}>
                        <Link component={RouterLink} to="/signup">Sign up instead</Link>
                    </Grid>
                    
                </Grid>
            </form>
        </Grid>
    </Grid>
  )
}

export default Login