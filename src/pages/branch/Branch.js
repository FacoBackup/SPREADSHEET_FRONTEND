import React, {Component} from 'react';
import ProfileBar from "../shared/components/navigation/LeftBarComponent.js"
import "../shared/styles/PageModel.css"
import Cookies from 'universal-cookie/lib';
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import {Redirect} from 'react-router-dom'
import TopBarComponent from "../shared/components/navigation/TopBarComponent";
import Alert from "../shared/functions/Alert";
import "./style/BranchStyles.css"
import BranchComponent from './components/BranchComponent.js';
import axios from 'axios'
import Host from "../../Host"
import Snackbar from '@material-ui/core/Snackbar'
import mergeBranch from "../shared/functions/MergeBranch";

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
            branch_id: parseInt(match.params.id),
            alert: false,
            error: null,
            errorMessage: null,
        }
        this.makeCommit = this.makeCommit.bind(this)
        this.merge = this.merge.bind(this)
    }
    
    async makeCommit(){
       
        try {
            await axios({
                method: 'post',
                url: Host() + 'api/make/commit',
                headers:{'authorization':(cookies).get("JWT")},
                data: {
                    branch_id: this.state.branch_id
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
    }

    async merge(){
        const response = await mergeBranch(this.state.branch_id)
        this.setState({
            error: response.error,
            errorMessage: response.error_message
        })
    }

    render() {
        if(typeof (new Cookies()).get("JWT") !== 'undefined')
            return (
                <ThemeProvider theme={theme} >
                    
                    <TopBarComponent input={this.state.input}/>
        
                    <div className="branch_container">

                        <BranchComponent merge={this.merge} branch_name={this.state.branch_name} branch_id={this.state.branch_id} repository_id={this.state.repository_id} make_commit={this.makeCommit}/>
                        
                    </div>
                    <div className="left_components">
                        <ProfileBar/>
                    </div>
                    <Snackbar open={this.state.error !== null} autoHideDuration={2000}
                                      onClose={() => this.setState({
                                          error: null,
                                          errorMessage: null
                                      })}>
                                <Alert severity={this.state.error === true? "error" : "success"}>{this.state.error === true ? ("Some error occurred "+ this.state.errorMessage) : "Success"}</Alert>
                     </Snackbar>
                </ThemeProvider>
            );
        else{
            return <Redirect to={"/authenticate"}/>
        }
    }
}

