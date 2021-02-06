import React from 'react';
import Cookies from 'universal-cookie/lib';
import "../shared/styles/PageModel.css"
import "./styles/DedicatedProfile.css"
import "../shared/styles/DedicatedPagesStyle.css"
import axios from 'axios';
import AboutComponent from './components/options/UserAboutComponent'
import AboutProfileComponent from './components/options/UserAboutComponent'
import UserGroupsComponent from './components/options/UserGroupsComponent'
import Host from '../../Host'
import ProfileSettingsComponent from './components/options/ProfileSettingsComponent'
import {Redirect} from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import renderProfile from "./functions/RenderProfile";
import Alert from "../shared/functions/Alert";

const cookies = new Cookies()

class Profile extends React.Component {
    constructor({match}) {
        super({match})
        this.state = {
            userID: match.params.userID,
            token: (cookies).get("JWT"),
            profile: {},
            group: false,
            aboutOption: false,
            settings: false
        }
    }

    componentDidMount() {
        if (this.state.userID === (cookies).get("ID")) {
            const profile = localStorage.getItem("PROFILE")

            if (typeof JSON.parse(profile) === 'string' || profile === null) {
                this.fetchData().catch(r => console.log(r))

            } else {
                console.log("SETeP 1b")
                this.setState({
                    profile: JSON.parse(profile)
                })
            }
        } else
            this.fetchData().catch(r => console.log(r))
    }

    async fetchData() {
        try {
            await axios({
                method: 'patch',
                url: Host() + 'api/get/user/by_id',
                data: {
                    user_id: typeof this.state.userID !== "undefined" ? parseInt(this.state.userID) : parseInt((cookies).get("ID"))
                }
            }).then(res => {
                if (this.state.userID === (cookies).get("ID") || typeof this.state.userID === 'undefined')
                    localStorage.setItem("PROFILE", JSON.stringify(res.data))
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
                    <UserGroupsComponent token={(cookies).get('JWT')} userID={this.state.userID}/>
                )
            }
            case this.state.settings: {
                if (this.state.userID === (cookies).get("ID"))
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

        if ((typeof this.state.userID !== 'undefined' || typeof (cookies).get("JWT") !== 'undefined') && (typeof this.state.profile !== 'undefined' && this.state.profile !== null))
            return (
                renderProfile(this.state.profile.name, this.state.profile.email, this.state.profile.pic, this.state.profile.background, this.state.profile.phone)
            )
        else if (typeof this.state.userID === 'undefined' && (typeof (cookies).get("JWT") === 'undefined' || this.state.profile === null))
            return (
                <Redirect to="/authenticate"/>
            )
        else
            return (
                <div>
                    <Snackbar open={this.state.error === true} autoHideDuration={6000}
                              onClose={() => this.setState({error: false, errorMessage: null})}>
                        <Alert severity="alert">Fetching content.</Alert>
                    </Snackbar>
                </div>
            )
    }
}

export default Profile