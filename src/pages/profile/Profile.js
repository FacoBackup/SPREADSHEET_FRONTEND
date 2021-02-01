import React from 'react';
import Cookies from 'universal-cookie';
import "../shared/styles/PageModel.css"
import "./styles/DedicatedProfile.css"
import "../shared/styles/DedicatedPagesStyle.css"
import axios from 'axios';
import SettingsIcon from '@material-ui/icons/Settings';
import AboutComponent from './components/options/UserAboutComponent'
import AboutProfileComponent from './components/options/UserAboutComponent'
import UserCommunitiesComponent from './components/options/UserCommunitiesComponent'
import Host from '../../Host'
import ProfileBar from './components/bar/ProfileBarComponent'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import PhoneRoundedIcon from '@material-ui/icons/PhoneRounded';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import HighlightIcon from '@material-ui/icons/Highlight';
import ProfileSettingsComponent from './components/options/ProfileSettingsComponent'

class Profile extends React.Component {
    constructor({match}) {
        super({match})
        this.state = {
            userID: match.params.userID,
            token: (new Cookies()).get("JWT"),
            profile: {},

            community: false,
            aboutOption: false,
            settings: false
        }
    }

    componentDidMount() {
        this.fetchData().catch(r => console.log(r))
    }

    async fetchData() {
        try {
            await axios({
                method: 'patch',
                url: Host() + 'api/get/profile',
                headers: {"Authorization": 'Bearer ' + this.state.token},
                data: {
                    userID: this.state.userID
                }
            }).then(res => {

                this.setState({
                    profile: res.data
                })
            }).catch(error => console.log(error))
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
            case this.state.community: {
                return (
                    <UserCommunitiesComponent token={(new Cookies()).get('JWT')} userID={this.state.userID}/>
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
        return (
            <div>
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
                                        src={this.state.profile.imageURL}
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
    }
}

export default Profile