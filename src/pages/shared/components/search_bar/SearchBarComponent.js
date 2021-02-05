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
            searchInput: null,
            profile: null
        }
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount() {
        const profile = sessionStorage.getItem("PROFILE")
        if(profile !== null)
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
                    <div style={{width:'33.333334%'}} >
                        <img style={{width:'9vw', float:'left'}}src='cafe' alt={"aeb"} />
                    </div>
                    <div style={{display:'flex', alignItems:'center', justifyContent: (this.state.profile !== null? "center": "flex-start"), width:(this.state.profile !== null? "33.333334%" : "66.666667%")}}>
                        <TextField placeholder={"Search"} variant={"outlined"} color={'none'} style={{width:'90%', backgroundColor:'#272e38'}} onChange={this.handleChange}/>
                        <Button href={"/search?="+this.state.searchInput+"/true"} style={{height:"56px", border:'#39adf6 2px solid', backgroundColor:'#272e38'}} variant={"outlined"}><SearchIcon/></Button >
                    </div>
                    {this.state.profile !== null?
                        <div className="top_nav_bar_profile_container" >
                            <p style={{
                                marginRight: '1%',
                                fontSize: '16px',
                                fontWeight: '400',
                                lineBreak: 'auto',
                                wordBreak: 'break-all',
                                textTransform: 'capitalize'
                            }}>{("" + this.state.profile.name).substr(0, ("" + this.state.profile.name).indexOf(' '))}</p>
                            <Avatar
                                style={{height: '45px', marginRight: '1%',width: '45px'}}
                                src={this.state.profile.imageURL}
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

export default SearchBarComponent