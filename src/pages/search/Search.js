import React, {Component} from 'react';
import ProfileBar from "../shared/components/navigation/LeftBarComponent.js"
import "../shared/styles/PageModel.css"
import Cookies from 'universal-cookie';
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import SearchComponent from "./components/SearchComponent";
import TopBarComponent from "../shared/components/navigation/TopBarComponent";

const theme = createMuiTheme({
    palette: {
        type: "dark"
    }
});

export default class Search extends Component {
    constructor({match}) {
        super({match});
        this.state={
            input: match.params.input,
            asUser: match.params.asUser === "true"
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        window.location.reload()
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
               
                <TopBarComponent input={this.state.input}/>
    
                <div className="center_component">
                    <SearchComponent token={(new Cookies()).get("JWT")} asUser={this.state.asUser}
                                     input={this.state.input}/>
                </div>
                <div className="left_components">
                    <ProfileBar/>
                </div>
            </ThemeProvider>
        );
    }
}

