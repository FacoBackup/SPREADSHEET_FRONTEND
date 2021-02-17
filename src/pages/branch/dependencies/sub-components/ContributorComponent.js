import React, {Component} from 'react';
import Cookies from 'universal-cookie/lib';
import Host from '../../../../Host'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import {Button} from "@material-ui/core";
import RenderAsUser from "../../../shared/components/RenderAsUser";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import {SearchRounded} from "@material-ui/icons";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "../../../shared/functions/Alert";

export default class ContributorComponent extends Component {

    constructor(params) {
        super(params);
        this.state={
            user: {},
            email: '',
            error: null,
            errorMessage: null,
            branchID: params.branch_id
        }
        this.handleChange = this.handleChange.bind(this);
        this.searchUser = this.searchUser.bind(this)
    }

    handleChange(event){
        this.setState({
            email: event.target.value
        })
    }
    async searchUser(){
        await axios({
            method: 'get',
            url: Host() + 'api/user/by_email',
            headers: {'authorization': ((new Cookies()).get("JWT"))},
            params: {
                email: this.state.email
            }
        }).then(res => {
            console.log(res)
            this.setState({
                user: res.data
            })
        }).catch(error => {
            this.setState({
                error: true,
                errorMessage: error.message
            })
            console.log(error)
        })
    }

    async addContributor(){
        await axios({
            method: 'put',
            url: Host() + 'api/add/contributor',
            headers: {'authorization': ((new Cookies()).get("JWT"))},
            data: {
                user_id: this.state.user.id,
                branch_id: this.state.branchID
            }
        }).then(() => {

            this.setState({
                error: false,
                user: {}
            })
        }).catch(error => {
            this.setState({
                error: true,
                errorMessage: error.message
            })
            console.log(error)
        })
    }

    render() {
        return (
            <div style={{display:'grid', justifyItems:'center'}}>
                <p>Add contributor</p>
                <div style={{display:'flex', marginTop:'5vh', width:'35vw'}}>
                    <TextField
                        fullWidth={true}
                        placeholder={"User Email"}
                        variant={"outlined"}
                        onChange={this.handleChange}
                    />
                    <Button variant={"outlined"} onClick={() => this.searchUser()}><SearchRounded/></Button>
                </div>
                {typeof this.state.user.id !== 'undefined' ?
                    <div>
                        <RenderAsUser subject={this.state.user}/>
                        <div style={{width:'35vw', display:'flex', justifyContent: 'space-evenly'}}>
                            <Button
                                variant={"outlined"}
                                style={{border:'#39adf6 2px solid', textTransform: 'none'}}
                                onClick={() => this.addContributor()}
                            >Select</Button>
                            <Button
                                variant={"outlined"}
                                style={{color:'#e34f50'}}
                                onClick={() => this.setState({
                                    user: {}
                                })}><DeleteRoundedIcon/></Button>
                        </div>
                    </div>
                    :
                    null
                }
                <Snackbar open={this.state.error !== null} autoHideDuration={3000}
                          onClose={() => (this.state.error === false ? window.location.reload() : this.setState({
                              error: null,
                              errorMessage: null
                          }))}>
                    <Alert severity={this.state.error === true? "error" : "success"}>{this.state.error === true ? ( this.state.errorMessage) : "Success"}</Alert>
                </Snackbar>
            </div>
        )
    }
}

