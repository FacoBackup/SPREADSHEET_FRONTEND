import React, {Component} from 'react';
import ProfileBar from "../shared/components/navigation/LeftBarComponent.js"
import "../shared/styles/PageModel.css"
import Cookies from 'universal-cookie/lib';
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import {Redirect} from 'react-router-dom'
import TopBarComponent from "../shared/components/navigation/TopBarComponent";
import { Button, ButtonGroup } from '@material-ui/core';
import RenderBranch from '../shared/components/branches/RenderBranch.js';

const theme = createMuiTheme({
    palette: {
        type: "dark"
    }
});

const cookies = new Cookies()

export default class Repository extends Component {
    constructor({match}) {
        super({match});
        this.state={
            repository_id: parseInt(match.params.id),
            branches: []
        }
    }

    async fetchData(){
        // const response = await fetchRepositoryData(this.state.repository_id)
    }

    render() {
        if(typeof (new Cookies()).get("JWT") !== 'undefined')
            return (
                <ThemeProvider theme={theme} >
                    
                    <TopBarComponent input={this.state.input}/>
        
                    <div className="center_component">
                        <div>
                            <ButtonGroup>
                                <Button>Teste</Button>
                                <Button>Teste</Button>
                                <Button>Teste</Button>
                            </ButtonGroup>
                        </div>
                        <div>
                            {this.state.branches.map((branch)=>(
                                <RenderBranch branch={branch} user_id={parseInt(cookies.get("ID"))}/>
                            ))}
                        </div>
                        
                    </div>
                    <div className="left_components">
                        <ProfileBar/>
                    </div>
                </ThemeProvider>
            );
        else{
            return <Redirect to={"/authenticate"}/>
        }
    }
}