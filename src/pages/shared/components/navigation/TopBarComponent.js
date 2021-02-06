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

class TopBarComponent extends React.Component {
    constructor(params) {
        super(params)
        this.state = {
            redirect: false,
            searchInput: null,
            profile: null
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        const profile = localStorage.getItem("PROFILE")
        if (profile !== null && typeof JSON.parse(profile) !== 'string')
            this.setState({
                profile: JSON.parse(profile)
            })
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
                    <div style={{width: '39vw', display: 'flex', alignItems: 'center'}}>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', marginLeft: '15vw', width: '50%'}}>
                        <TextField placeholder={"Search"} variant={"outlined"} color={'none'}
                                   style={{width: '90%', backgroundColor: '#272e38'}} onChange={this.handleChange}/>
                        <Button
                            href={this.state.searchInput !== null ? "/search/" + this.state.searchInput + "/true" : null}
                            style={{height: "56px", border: '#39adf6 2px solid', backgroundColor: '#272e38'}}
                            variant={"outlined"}><SearchIcon/></Button>
                    </div>
                    {typeof (new Cookies()).get("JWT") !== 'undefined' && this.state.profile !== null ?
                        <div className="top_nav_bar_profile_container">
                            <p style={{
                                marginRight: '1%',
                                fontSize: '16px',
                                fontWeight: '400',
                                lineBreak: 'auto',
                                wordBreak: 'break-all',
                                textTransform: 'capitalize'
                            }}>{("" + this.state.profile.name).substr(0, ("" + this.state.profile.name).indexOf(' '))}</p>
                            <Avatar
                                style={{height: '45px', marginRight: '1%', width: '45px'}}
                                src={this.state.profile.image}
                                alt="user"

                            />
                        </div>:

                        null
                    }

                </div>
            </ThemeProvider>
        )
    }
}

export default TopBarComponent