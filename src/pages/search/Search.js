import React, {Component} from 'react';
import ProfileBar from "../profile/components/bar/ProfileBarComponent.js"
import "../shared/styles/PageModel.css"
import {Redirect} from 'react-router-dom'
import Cookies from 'universal-cookie';
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import SearchComponent from "./components/SearchComponent";

const theme = createMuiTheme({
    palette: {
        type: "dark"
    }
});

class Search extends Component {
    render() {

        if (typeof (new Cookies()).get("JWT") !== 'undefined') {
            return (
                <ThemeProvider theme={theme}>
                    <div className="center_component">
                        <SearchComponent token={new Cookies().get("JWT")}/>
                    </div>
                    <div className="left_components">
                        <ProfileBar search={true}/>
                    </div>
                </ThemeProvider>
            );
        } else
            return (<Redirect to="/authenticate"/>);
    }
}

export default Search;
