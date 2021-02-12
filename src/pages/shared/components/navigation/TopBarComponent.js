import React from 'react'
import "../../styles/PageModel.css"
import {createMuiTheme} from "@material-ui/core/styles";
import {ThemeProvider} from "@material-ui/styles";
import {Avatar, IconButton, InputBase, Paper} from "@material-ui/core";
import Cookies from "universal-cookie/lib";
import SearchIcon from "@material-ui/icons/SearchRounded"
import {Redirect} from "react-router-dom";

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
            searchInput: typeof params.input === 'undefined'? null : params.input,
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
        if(this.state.redirect === false)

            return (
                <ThemeProvider theme={theme}>
                    <div className={"top_nav_bar_container"}>
                        <div style={{width: '39vw', display: 'flex', alignItems: 'center'}}>
                        </div>
                        <div style={{display:'flex', alignItems:'center'}}>
                            <Paper component="form" style={{backgroundColor: '#272e38',height:'6vh', width: '30vw', display: 'flex', alignItems: 'center', justifyContent:'space-between'}}>
                                <InputBase
                                    style={{marginLeft:'1vw'}}
                                    placeholder={this.state.searchInput === null ? "Search" : this.state.searchInput}
                                    onChange={this.handleChange}
                                    onKeyDown={key => (key.key === "Enter"? this.setState({redirect: true}): console.log("."))}
                                />
                                <IconButton aria-label="search"  href={this.state.searchInput !== null ? "/search/{" + this.state.searchInput + "}/true" : null}>
                                    <SearchIcon />
                                </IconButton>
                            </Paper>
                        </div>

                        {typeof (new Cookies()).get("JWT") !== 'undefined' && this.state.profile !== null ?
                            <div className="top_nav_bar_profile_container">
                                <p style={{
                                    marginRight: '1vw',
                                    fontSize: '16px',
                                    fontWeight: '400',
                                    lineBreak: 'auto',
                                    wordBreak: 'break-all',
                                    textTransform: 'capitalize'
                                }}>{this.state.profile.name}</p>
                                <Avatar
                                    style={{height: '45px', marginRight: '1%', width: '45px'}}
                                    src={this.state.profile.pic}
                                    alt="user"
                                />
                            </div>:

                            null
                        }

                    </div>
                </ThemeProvider>
            )
        else{
            if (this.state.searchInput !== null)
                return ( <Redirect to={"/search/{" + this.state.searchInput + "}/true"}/>)
            else
                this.setState({redirect: false})
        }

    }
}

export default TopBarComponent