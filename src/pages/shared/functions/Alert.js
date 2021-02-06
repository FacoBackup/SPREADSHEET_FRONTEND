import MuiAlert from "@material-ui/lab/Alert";
import React from "react";

export default function Alert(props) {
    return (<MuiAlert elevation={4} variant="filled" {...props}/>)
}
