import React from 'react'
import { Grid } from "@mui/material";

function Emails({ navigation }) {

    console.log(navigation)

  return (
    <Grid style={{ textAlign: "center" }}>{navigation}</Grid>
  )
}

export default Emails