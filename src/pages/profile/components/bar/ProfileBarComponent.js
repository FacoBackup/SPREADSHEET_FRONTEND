import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import "../../styles/ProfileBarStyle.css";
import Button from '@material-ui/core/Button';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import Host from '../../../../Host'
// import {Avatar} from '@material-ui/core';
import {ThemeProvider} from "@material-ui/styles";
import {createMuiTheme} from "@material-ui/core/styles";
import StorageRoundedIcon from '@material-ui/icons/StorageRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import {Redirect} from 'react-router-dom'
import {HomeRounded} from "@material-ui/icons";
import PhoneRoundedIcon from "@material-ui/icons/PhoneRounded";

const theme = createMuiTheme({
    palette: {
        type: "dark"
    }
});

const cookies = new Cookies()

class ProfileBarComponent extends Component {
    constructor(params) {
        super(params)
        this.state = {

            home: params.home,
            search: params.search,
            signOut: false,
        }
    }

    render() {
        if (this.state.signOut === false)
            return (

                <div className="profile_bar_container">
                    <ThemeProvider theme={theme}>

                        {/* <div  className="profile_qrcode_container">
                        <QRcode
                                value= {"BEGIN:VCARD" +
                                "VERSION:4.0" +
                                "N:{components.name}" +
                                "FN:"+ this.state.components.name +
                                "TEL;TYPE#work,voice;VALUE#uri:tel:" + this.state.components.phoneNumber +
                                "ADR;TYPE#HOME;LABEL#" + this.state.components.nationality + "/" + this.state.components.cityOfBirth +
                                "EMAIL:" + this.state.components.email + "END:VCARD"}
                                />
                        </div> */}

                        <div className="profile_bar_buttons_container">


                            <div className={this.state.home === true ? "clicked_button_style" : null} >
                                <Button style={{textTransform:"capitalize", color:(this.state.home === true ? "#39adf6":'#ededed'),fontSize:'16px', width:'14vw',marginLeft:'1vw', justifyContent:'flex-start'}} href={"/profile/"+cookies.get("ID")}>
                                    <HomeRounded style={{marginRight:'10px', fontSize:'27px',color:(this.state.home === true ? "#39adf6":'#62666f')}}/>Home
                                </Button>
                            </div>
                            <div className={this.state.archive === true ? "clicked_button_style" : null} >
                                <Button disabled style={{textTransform:"capitalize",  color:(this.state.archive === true ? "#39adf6":'#ededed'),fontSize:'16px', width:'14vw',marginLeft:'1vw', justifyContent:'flex-start'}}>
                                    <StorageRoundedIcon style={{marginRight:'10px', fontSize:'27px',color:'#62666f'}}/>archive</Button>
                            </div>


                            <div className={this.state.search === true ? "clicked_button_style" : null} >
                                <Button style={{textTransform:"capitalize",  color:(this.state.search === true ? "#39adf6":'#ededed'),fontSize:'16px', width:'14vw',marginLeft:'1vw', justifyContent:'flex-start'}}>
                                    <PhoneRoundedIcon style={{marginRight:'10px', fontSize:'27px',color:(this.state.search === true ? "#39adf6":'#62666f'),}}/>ramais
                                </Button>
                            </div>
                            <div >
                                <Button href={"/authenticate"} style={{textTransform:"capitalize",  color:'#ededed',fontSize:'16px', width:'14vw',marginLeft:'1vw', justifyContent:'flex-start'}}> <ExitToAppRoundedIcon style={{marginRight:'10px', fontSize:'27px',color:'#62666f'}}/>sign out</Button>
                            </div>


                        </div>
                    </ThemeProvider>

                </div>
            );
        else
            return (<Redirect to="/authenticate"/>)
    }
}

export default ProfileBarComponent;