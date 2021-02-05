// import axios from 'axios';
import React from 'react'
import "../../styles/PageModel.css"
import {createMuiTheme} from "@material-ui/core/styles";
import {ThemeProvider} from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import {Avatar, Button} from "@material-ui/core";
import Cookies from "universal-cookie";
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
                        {typeof (new Cookies()).get("JWT") != 'undefined' ?
                            <div className="profile_info_container">

                                <Avatar
                                    style={{height: '55px', width: '55px'}}
                                    src={this.state.profile.imageURL}
                                    alt="user"

                                />
                                <p style={{
                                    marginLeft: '5px',
                                    fontSize: '17px',
                                    fontWeight: '400',
                                    lineBreak: 'auto',
                                    wordBreak: 'break-all',
                                    textTransform: 'capitalize'
                                }}>Hi, {("" + this.state.profile.name).substr(0, ("" + this.state.profile.name).indexOf(' '))}</p>

                            </div>:
                            null
                        }
                    </div>
                </div>
            </ThemeProvider>
        )
    }
}

export default SearchBarComponent