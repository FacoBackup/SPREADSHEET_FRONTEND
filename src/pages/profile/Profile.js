import React from 'react';
import Cookies from 'universal-cookie';
import "../shared/styles/PageModel.css"
import "./styles/DedicatedProfile.css"
import "../shared/styles/DedicatedPagesStyle.css"
import axios from 'axios';
import AboutComponent from './components/options/UserAboutComponent'
import AboutProfileComponent from './components/options/UserAboutComponent'
import UserGroupsComponent from './components/options/UserGroupsComponent'
import Host from '../../Host'
import ProfileBar from './components/bar/ProfileBarComponent'
import Avatar from '@material-ui/core/Avatar'
import PhoneRoundedIcon from '@material-ui/icons/PhoneRounded';
import ProfileSettingsComponent from './components/options/ProfileSettingsComponent'
import SearchBarComponent from '../shared/components/search_bar/SearchBarComponent'
import {Redirect} from "react-router-dom";

class Profile extends React.Component {
    constructor({match}) {
        super({match})
        this.state = {
            userID: match.params.userID,
            token: (new Cookies()).get("JWT"),
            profile: {},
            group: false,
            aboutOption: false,
            settings: false
        }
    }

    componentDidMount() {
        if(this.state.userID === (new Cookies()).get("ID")){
            const profile = sessionStorage.getItem("PROFILE")
            if(profile === null)
                this.fetchData().catch(r => console.log(r))
            else
                this.setState({
                    profile: JSON.parse(profile)
                })
        }
        else
            this.fetchData().catch(r => console.log(r))
    }

    async fetchData() {
        try {
            await axios({
                method: 'patch',
                url: Host() + 'api/get/user/by_id',
                data: {
                    user_id: typeof this.state.userID !== "undefined" ? parseInt(this.state.userID) : parseInt((new Cookies()).get("ID"))
                }
            }).then(res => {
                if(this.state.userID === (new Cookies()).get("ID"))
                    sessionStorage.setItem("PROFILE", JSON.stringify(res.data))
                this.setState({
                    profile: res.data
                })
            }).catch(error => {
                console.log(error)
            })
        } catch (error) {
            console.log(error)
        }
    }

    optionSelect() {
        switch (true) {

            case this.state.aboutOption: {
                return (
                    <AboutComponent profile={this.state.profile}/>
                )
            }
            case this.state.group: {
                return (
                    <UserGroupsComponent token={(new Cookies()).get('JWT')} userID={this.state.userID}/>
                )
            }
            case this.state.settings: {
                if (this.state.userID === (new Cookies()).get("ID"))
                    return (
                        <ProfileSettingsComponent profile={this.state.profile}/>
                    )
                else
                    return (
                        <AboutProfileComponent/>
                    )
            }
            default: {
                return (
                  "OK"
                )
            }
        }
    }
    render() {
        if (typeof this.state.userID !== 'undefined' || typeof (new Cookies()).get("JWT") !== 'undefined')
            return (
                <div>
                    <SearchBarComponent/>
                    <div className="profile_center_component">
                        <div className='profile_background_image_container'>
                            <img className='profile_background_image' alt="BACKGROUD"
                                 src={(this.state.profile.backgroundImageURL !== null && typeof this.state.profile.backgroundImageURL !== 'undefined') ? this.state.profile.backgroundImageURL : "https://www.beautycolorcode.com/2f2f2f-1440x900.png"}/>
                        </div>
                        <div className="dedicated_component_container">

                            <div className="profile_content_container">
                                <div className='profile_container'>
                                    <div style={{marginTop: '1vh', textAlign: 'center'}}>
                                        <Avatar
                                            style={{margin: 'auto', height: '4vw', width: '4vw', boxShadow:'0 0px 5px #23282e'}}
                                            src={this.state.profile.image}
                                            alt="user"
                                        />
                                        <p style={{
                                            fontSize: '18px',
                                            fontWeight:'400',
                                            textTransform: 'capitalize'
                                        }}>{("" + this.state.profile.name)}</p>
                                        <p style={{fontSize: '17px',fontWeight: '350', color: '#888e97'}}>{this.state.profile.userName}</p>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            color: '#aaadb1'
                                        }}>
                                            <PhoneRoundedIcon style={{marginRight: '10px'}}/>
                                            {this.state.profile.phoneNumber}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    {this.optionSelect()}
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="left_components">
                        <ProfileBar home={true}/>
                    </div>
                </div>
            )
        else
            return(
                <Redirect to="/authenticate"/>
            )

    }
}

export default Profile