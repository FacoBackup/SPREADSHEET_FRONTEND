import React from 'react';
import Cookies from 'universal-cookie/lib';
import "../shared/styles/PageModel.css"
import "./styles/DedicatedProfile.css"
import "../shared/styles/DedicatedPagesStyle.css"
import {Redirect} from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "../shared/functions/Alert";
import RenderProfile from "./components/RenderProfile";

const cookies = new Cookies()

class Profile extends React.Component {
    constructor({match}) {
        super({match})
        this.state = {
            userID: (match.params.userID),
            group: false,
            aboutOption: false,
            settings: false,
        }
    }

    render() {

        if ((typeof this.state.userID !== 'undefined' || typeof (cookies).get("JWT") !== 'undefined'))
            return (
                <RenderProfile user_id={typeof this.state.userID !== 'undefined' ? parseInt(this.state.userID): parseInt(cookies.get("ID"))}/>
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