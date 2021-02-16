import React, {Component} from 'react';
import Cookies from 'universal-cookie/lib';
import Host from '../../../../Host'
import axios from 'axios'
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Alert from "../../../shared/functions/Alert";
import Snackbar from "@material-ui/core/Snackbar";

const cookies = new Cookies()

export default class BranchCreation extends Component {

    constructor(props) {
        super(props);
        this.state={
            name: '',
            targetBranchId: props.targetBranchId,
            redirect: false,
            newId: null,
            error: null,
            errorMessage: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.saveData = this.saveData.bind(this);
    }


    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    async saveData(){
        let canCreate = false
        try {
            await axios({
                method: 'get',
                url: Host() + 'api/verify/branch/name',
                headers:{'authorization':(cookies).get("JWT")},
                params: {
                    name: this.state.name.replace(" ", '').toUpperCase()
                }
            }).then(() => {
                canCreate = true
            }).catch(error => {
                console.log(error)
                this.setState({
                    error: true,
                    errorMessage: "Name "+this.state.name+ " already in used."
                })
            })
        } catch (error) {
            this.setState({
                error: true,
                errorMessage: "Name "+this.state.name+ " already in used."
            })
            console.log(error)
        }

        if(canCreate){
            try {
                await axios({
                    method: 'post',
                    url: Host() + 'api/branch',
                    headers:{'authorization':(cookies).get("JWT")},
                    data: {
                        name: this.state.name,
                        target_branch_id: this.state.targetBranchId
                    }
                }).then(res => {
                    this.setState({
                        redirect: true,
                        newId: res.data,
                        error: false

                    })

                }).catch(error => {
                    console.log(error)
                    this.setState({
                        error: true,
                        errorMessage: error.message
                    })
                })
            } catch (error) {
                this.setState({
                    error: true,
                    errorMessage: error.message
                })
                console.log(error)
            }
        }
    }

    render() {
        return (
            <div style={{display:'grid', rowGap:'5vh', justifyItems:'center', alignItems:'center', marginTop:'175px'}}>

                {this.state.redirect ? null: <TextField style={{width:'600px'}} onChange={this.handleChange} variant={"outlined"} placeholder={"Name"} name={"name"}/>}
                {this.state.redirect ? null: <Button onClick={() => this.saveData()} style={{textTransform:'none', border:"#39adf6 2px solid", width:'200px'}}>Create</Button>}
                {this.state.redirect ? <Button href={"/branch/"+this.state.newId} variant={"outlined"} style={{textTransform:'none'}}>See new branch</Button>: null}

                <Snackbar open={this.state.error !== null} autoHideDuration={3000}
                          onClose={() => this.setState({
                              error: null,
                              errorMessage: null
                          })}>
                    <Alert severity={this.state.error === true? "error" : "success"}>{this.state.error === true ? ("Some error occurred "+ this.state.errorMessage) : "Success"}</Alert>
                </Snackbar>
            </div>
        );
    }
}

