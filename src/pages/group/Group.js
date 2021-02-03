import React from 'react'
import ProfileBar from "../profile/components/bar/ProfileBarComponent.js"
import "../shared/styles/PageModel.css"
import {Redirect} from 'react-router-dom'
import Cookies from 'universal-cookie';
import GroupComponent from './component/GroupComponent'
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        type: "dark"
    }
});

class Group extends React.Component {
    constructor({match}) {
        super()
        this.state = {
            groupID: match.params.id
        }
    }

    render() {
        if (typeof (new Cookies()).get("JWT") !== 'undefined') {
            return (
                <ThemeProvider theme={theme}>
                    <div>
                        <GroupComponent groupID={this.state.groupID} token={(new Cookies()).get("JWT")}/>
                    </div>
                    <div className="left_components">
                        <ProfileBar/>
                    </div>
                </ThemeProvider>
            );
        } else
            return (<Redirect to="/authenticate"/>);
    }
}

export default Group;
