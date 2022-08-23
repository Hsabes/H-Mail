import React, { useState } from 'react'
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const defaultValues = {
    recipient_id: '',
    sender_id: '',
    subject: '',
    body: ''
}

function Compose({ currentUser, setNavigation, users }) {

    const [formData, setFormData] = useState(defaultValues)

    function handleSubmit(e){
        e.preventDefault()

        const recipient = users?.find((user) => user.email.includes(formData.recipient))
        
        if (recipient){
            fetch(`/emails`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                recipient_id: recipient.id,
                sender_id: currentUser.id,
                subject: formData.subject,
                body: formData.body
            })
        })
        .then(res => res.json())
        .then(res => console.log("sent"))
        setFormData(defaultValues)
        setNavigation('Inbox')
        } else {
            alert("Recipient not found")
        }
        window.location.reload(false)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

  return (
    <Grid container
    minWidth="100%"
    minHeight="100vh"
    flexDirection="column">
        <Grid item
        textAlign="center">
            <h2>Compose an email</h2>
            <Grid item border="2px solid black" padding="2">
                <form onSubmit={handleSubmit}>
                    <Grid item sx={{ m: 2 }}>
                        <TextField fullWidth 
                        id="to"
                        required
                        variant="standard"
                        type="text"
                        name="recipient"
                        value={formData.recipient}
                        onChange={handleChange}
                        label="Recipient"></TextField>
                    </Grid>
                    <Grid item sx={{ m: 2 }}>
                        <TextField fullWidth 
                        variant="standard"
                        value={formData.subject}
                        type="text"
                        name="subject"
                        onChange={handleChange}
                        label="Subject"></TextField>
                    </Grid>
                    <Grid item sx={{ m: 2 }}>
                        <TextField fullWidth 
                        variant="standard"
                        value={formData.body}
                        type="text"
                        name="body"
                        onChange={handleChange}
                        multiline
                        rows={17}></TextField>
                    </Grid>
                    <Grid item sx={{m: 2}}>
                        <Button
                        type="submit"
                        fullWidth
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
                            }}>SEND</Button>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    </Grid>
  )
}

export default Compose