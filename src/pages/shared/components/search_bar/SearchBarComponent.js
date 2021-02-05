// import axios from 'axios';
import React from 'react'
import "../../styles/PageModel.css"
import {createMuiTheme} from "@material-ui/core/styles";
import {ThemeProvider} from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import {Avatar, Button} from "@material-ui/core";
import Cookies from "universal-cookie";
import SearchIcon from "@material-ui/icons/SearchRounded"

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
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event){
        this.setState({
            searchInput: event.target.value
        })
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <div className={"top_nav_bar_container"}>
                    <div style={{display:'grid', justifyContent:'center'}}>
                        <div style={{display:'flex', marginTop:'1%'}}>
                            <TextField placeholder={"Search"} variant={"outlined"} onChange={this.handleChange}/>
                            <Button href={"/search?="+this.state.searchInput+"/true"}><SearchIcon/></Button >
                        </div>
                        {typeof (new Cookies()).get("JWT") != 'undefined' ?
                            <div className="profile_info_container">
                                <p style={{
                                    marginLeft: '5px',
                                    fontSize: '17px',
                                    fontWeight: '400',
                                    lineBreak: 'auto',
                                    wordBreak: 'break-all',
                                    textTransform: 'capitalize'
                                }}>{("" + this.state.profile.name).substr(0, ("" + this.state.profile.name).indexOf(' '))}</p>
                                <Avatar
                                    style={{height: '55px', width: '55px'}}
                                    src={this.state.profile.imageURL}
                                    alt="user"

                                />
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