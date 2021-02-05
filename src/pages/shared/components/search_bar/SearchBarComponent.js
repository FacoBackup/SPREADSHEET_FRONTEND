import axios from 'axios';
import React from 'react'
import "../../styles/PageModel.css"
import {createMuiTheme} from "@material-ui/core/styles";
import {ThemeProvider} from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import {Button} from "@material-ui/core";
const theme = createMuiTheme({
    palette: {
        type: "dark"
    }
});

class SearchBarComponent extends React.Component {
    constructor(params) {
        super(params)
        this.state = {
            redirect: false,
            searchInput: null
        }
    }


    render() {
        return (
            <ThemeProvider theme={theme}>
                <div className={"top_nav_bar_container"}>
                    <div style={{display:'grid', justifyContent:'center'}}>
                        <div style={{display:'flex'}}>
                            <TextField placeholder={"Search"} variant={"outlined"} style={{width:"40vw", marginTop:'1%'}}/>
                            <Button style={{marginTop:'1%'}}>Search</Button >
                        </div>
                    </div>
                </div>
            </ThemeProvider>
        )
    }
}

export default SearchBarComponent