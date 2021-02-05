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
            profile: {},
            followers: params.followers,
            following: params.following,
            communities: params.communities,
            home: params.home,
            about: params.about,
            conversation: params.conversation,
            topics: params.topics,
            external: params.external,
            search: params.search,
            timeline: params.timeline,
            groupOptions: params.groupOptions,
            more: false,
            notificationsQuantity: null,
            date: new Date(),
            signOut: false,
        }
    }

    componentDidMount() {
        const profile = sessionStorage.getItem("PROFILE")
        if(profile === null)
            this.fetchData().catch(r => console.log(r))
        else
            this.setState({
                profile: JSON.parse(profile)
            })
    }

    async fetchData() {
        try {
            await axios({
                method: 'patch',
                url: Host() + 'api/get/user/by_id',
                headers: {"authorization": cookies.get("JWT")},
                data: {
                    user_id: parseInt((new Cookies()).get("ID"))
                }
            }).then(res => {
                sessionStorage.setItem("PROFILE", JSON.stringify(res.data))
                this.setState({
                    profile: res.data
                })
            }).catch(error => console.log(error))
        } catch (error) {
            console.log(error)
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
                                <Button style={{textTransform:"capitalize", color:(this.state.home === true ? "#39adf6":'#ededed'),fontSize:'16px', width:'14vw',marginLeft:'1vw', justifyContent:'flex-start'}} href={"/profile/"+this.state.profile.id}>
                                    <HomeRounded style={{marginRight:'10px', fontSize:'27px',color:(this.state.home === true ? "#39adf6":'#62666f')}}/>Home
                                </Button>
                            </div>
                            <div className={this.state.archive === true ? "clicked_button_style" : null} >
                                <Button disabled style={{textTransform:"capitalize",  color:(this.state.archive === true ? "#39adf6":'#ededed'),fontSize:'16px', width:'14vw',marginLeft:'1vw', justifyContent:'flex-start'}}>
                                    <StorageRoundedIcon style={{marginRight:'10px', fontSize:'27px',color:'#62666f'}}/>archive</Button>
                            </div>


                            <div className={this.state.search === true ? "clicked_button_style" : null} >
                                <Button style={{textTransform:"capitalize",  color:(this.state.search === true ? "#39adf6":'#ededed'),fontSize:'16px', width:'14vw',marginLeft:'1vw', justifyContent:'flex-start'}} href="/search_user">
                                    <SearchRoundedIcon style={{marginRight:'10px', fontSize:'27px',color:(this.state.search === true ? "#39adf6":'#62666f'),}}/>search
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