import React from 'react'
import {Card, CardContent, Typography} from "@mui/material";
import Grid from '@mui/material/Grid';
const itemDetails = ({itemDetails, qty}) => {
  return (
    <Card style={{width: "80%"}}>
    <CardContent>
        <Grid container style={{paddingTop: "5%", paddingBottom: "5%"}}>
            <Grid item xs={4}/>
            <Grid item xs={4}>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant={"h4"}>
                                {itemDetails.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} style={{paddingTop: "2%"}}>
                            <Typography
                                variant={"body1"}
                                style={{
                                    fontSize: "15px",
                                }}
                            >
                                Quantity: <b>{qty}</b>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} style={{paddingTop: "2%"}}>
                            <Typography
                                variant={"body1"}
                                style={{
                                    fontSize: "15px",
                                }}
                            >
                                category: <b>{itemDetails.category}</b>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} style={{paddingTop: "2%"}}>
                            <Typography
                                variant={"body1"}
                                style={{
                                    fontSize: "15px",
                                    //color: theme.palette.disabled.main,
                                }}
                            >
                                <em>{itemDetails.description}</em>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} style={{paddingTop: "2%"}}>
                            <Typography
                                variant={"body1"}
                                style={{
                                    fontSize: "25px",
                                    //color: theme.palette.secondary.main,
                                }}
                            >
                                Total Price : &#8377; {itemDetails.price * qty}
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            </Grid>
            <Grid item xs={4}/>
        </Grid>
    </CardContent>
</Card>
  )
}

export default itemDetails
