import React, {Component} from 'react';
import ProfileBar from "../shared/components/navigation/LeftBarComponent.js"
import "../shared/styles/PageModel.css"
import Cookies from 'universal-cookie/lib';
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import {Redirect} from 'react-router-dom'
import TopBarComponent from "../shared/components/navigation/TopBarComponent";
import Alert from "../shared/functions/Alert";
import Button from '@material-ui/core/Button'
import "./style/BranchStyles.css"
import BranchVisualization from './components/RenderBranchVisualization.js';
import axios from 'axios'
import Host from "../../Host"
import SaveAltRoundedIcon from '@material-ui/icons/SaveAltRounded';
import Snackbar from '@material-ui/core/Snackbar'
import Avatar from "@material-ui/core/Avatar";
import {AvatarGroup} from "@material-ui/lab";

const theme = createMuiTheme({
    palette: {
        type: "dark"
    }
});

const cookies = new Cookies()

export default class Branch extends Component {
    constructor({match}) {
        super({match});
        this.state={
            edit: match.params.edit === 'true',
            branchID: parseInt(match.params.id),
            alert: false,
            error: null,
            errorMessage: null,
        }
        this.makeCommit = this.makeCommit.bind(this)
    }
    
    async makeCommit(){
        if(typeof cookies.get("CHANGES") !== 'undefined')
            try {
                await axios({
                    method: 'post',
                    url: Host() + 'api/make/commit',
                    headers:{'authorization':(cookies).get("JWT")},
                    data: {
                        changes: parseInt(cookies.get("CHANGES")),
                        message: (new Date((new Date()).getTime())).toString(),
                        branch_id: this.state.branchID
                    }
                }).then(() => {
                    this.setState({
                        error: false
                    })
                })
                .catch(error => {
                    this.setState({
                        error: true,
                        errorMessage: error.message
                    })
                    console.log(error)})
            } catch (error) {
                this.setState({
                    error: true,
                    errorMessage: error.message
                })
                console.log(error)
            }
        else
            this.setState({
                alert: true,
                error: false
            })
    }

    finish(){
        if (this.state.error === false && this.state.alert === false)
            window.location.reload()
        else
            this.setState({
                error: null,
                errorMessage: null,
                alert: false
            })
    }

    render() {
        if(typeof (new Cookies()).get("JWT") !== 'undefined')
            return (
                <ThemeProvider theme={theme} >
                    
                    <TopBarComponent input={this.state.input}/>
        
                    <div className="branch_container">

                        <BranchVisualization branch_id={this.state.branchID} make_commit={this.makeCommit}/>
                        
                    </div>
                    <div className="left_components">
                        <ProfileBar/>
                    </div>
                    <Snackbar open={this.state.error !== null} autoHideDuration={2000}
                                      onClose={() => this.finish()}>
                                <Alert severity={this.state.error === true? "error" : this.state.alert === true ?"warning": "success"}>{this.state.error === true ? ("Some error occurred "+ this.state.errorMessage) : (this.state.alert === true ? "No changes were made": "Commited with success")}</Alert>
                     </Snackbar>
                </ThemeProvider>
            );
        else{
            return <Redirect to={"/authenticate"}/>
        }
    }
}

