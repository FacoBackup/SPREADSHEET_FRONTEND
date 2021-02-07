import React from 'react'
import ProfileBar from "../shared/components/navigation/LeftBarComponent.js"
import "../shared/styles/PageModel.css"
import {Redirect} from 'react-router-dom'
import Cookies from 'universal-cookie';
import GroupComponent from './component/GroupComponent'
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import TopBarComponent from "../shared/components/navigation/TopBarComponent";

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
        return (
            <ThemeProvider theme={theme}>
                <TopBarComponent/>
                <div>
                    <GroupComponent groupID={this.state.groupID}/>
                </div>
                <div className="left_components">
                    <ProfileBar/>
                </div>
            </ThemeProvider>
        );

    }
}

export default Group;
