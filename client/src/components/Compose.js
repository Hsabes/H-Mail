import React, { useState } from 'react'
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const defaultValues = {
    recipient: '',
    recipient_id: '',
    sender_id: '',
    subject: '',
    body: ''
}

function Compose({ currentUser, users }) {

    const [formData, setFormData] = useState(defaultValues)
    const [error, setError] = useState("Recipient")

    const recipient = users?.find((user) => user.email === formData.recipient)

    function handleSubmit(e){
        e.preventDefault()
        
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
        window.location.reload(false)
        } else {
            setError("Recipient not found")
        }
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
                        label={error}></TextField>
                    </Grid>
                    <Grid item sx={{ m: 2 }}>
                        <TextField fullWidth 
                        variant="standard"
                        required
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
                        id="send"
                        type="submit"
                        style={{
                            '--color-1': 'blue',
                            '--color-2': 'red',
                            '--color-3': 'yellow',
                            background:`
                                linear-gradient(
                                170deg,
                                var(--color-1),
                                var(--color-2),
                                var(--color-3)
                                )`,
                            color: 'white',
                            width: "150px",
                            padding: 15,
                            borderRadius: 8,
                            border: "1px solid #000",
                        }}
                        sx={{
                            opacity: recipient && formData.subject ? 1 : .50,
                            transition: "1s"
                        }}
                        >SEND</Button>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    </Grid>
  )
}

export default Compose