import {Button} from '@material-ui/core'
import React from 'react'
import Cookies from 'universal-cookie/lib'
import "../../../shared/styles/PageModel.css"
import mergeBranch from "../../functions/MergeBranch";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "../../functions/Alert";
import leaveBranch from "../../functions/LeaveBranch";

export default class RenderAsBranch extends React.Component {
    is_master;
    repository_name;

    constructor(params) {
        super(params)
        this.state = {
            branch: params.branch,
            userID: params.user_id,
            open_menu: false,
            error: null,
            errorMessage: null
        }
    }
    
    async leaveBranch(){
        const response = await leaveBranch(this.state.branch.id)
        if(!response.error)
            window.location.reload()
        this.setState({
            error: response.error,
            errorMessage: response.error_message
        })
    }

    async mergeBranch(){
        const response = await mergeBranch(this.state.branch.id)

        this.setState({
            error: response.error,
            errorMessage: response.error_message
        })

    }


    render() {
        return (
            <div className="render_as_user_content_container" style={{width:'30vw',display:'flex', justifyContent:'space-around', alignItems:'center'}}>
                <div
                    style={{display:'flex', height:'3vh', alignItems:'center', fontSize:'16px'}}>
                    <p style={{fontWeight:'600'}}>{this.state.branch.repository_name}/</p>
                    <p style={{color:'#aaadb1'}}> {this.state.branch.name}</p>    
                </div>
         
                <Button 
                    variant="outlined"
                    style={{textTransform:'capitalize'}}  
                    href={'/branch/' + this.state.branch.id}>
                        Visualize
                </Button>
                {this.state.branch.is_master !== true && parseInt(this.state.userID) === parseInt((new Cookies()).get("ID"))? <Button style={{textTransform:'none', border:'#39adf6 2px solid'}} onClick={() => this.mergeBranch()} >Merge to master</Button>: null}
                {parseInt(this.state.userID) !== parseInt((new Cookies()).get("ID")) ? null : <Button onClick={() => this.leaveBranch()} style={{textTransform:'none', border:'#e34f50 2px solid'}}>Give up as a contributor</Button>}
                <Snackbar open={this.state.error !== null} autoHideDuration={3000}
                          onClose={() => this.setState({
                              error: null, errorMessage: null
                          })}>
                    <Alert severity={this.state.error === true ? 'error': 'success'}>{this.state.error === true? ("Some error occurred "+ this.state.errorMessage) : "Success"}</Alert>
                </Snackbar>
                
            </div>
        )
    }
}
