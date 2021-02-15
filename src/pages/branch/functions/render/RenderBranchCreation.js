import React, {Component} from 'react';
import Cookies from 'universal-cookie/lib';
import Host from '../../../../Host'
import axios from 'axios'
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const cookies = new Cookies()

export default class BranchCreation extends Component {

    constructor(props) {
        super(props);
        this.state={
            name: '',
            targetBranchId: props.targetBranchId,
            redirect: false,
            newId: null
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
                    newId: res.data
                })
            }).catch(error => console.log(error))
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <div style={{display:'grid', rowGap:'5vh', justifyItems:'center', alignItems:'center', marginTop:'175px'}}>

                {this.state.redirect ? null: <TextField style={{width:'600px'}} onChange={this.handleChange} variant={"outlined"} placeholder={"Name"} name={"name"}/>}
                {this.state.redirect ? null: <Button onClick={() => this.saveData()} style={{textTransform:'none', border:"#39adf6 2px solid", width:'200px'}}>Create</Button>}

                {this.state.redirect ? <Button href={"/branch/"+this.state.newId} variant={"outlined"} style={{textTransform:'none'}}>See new branch</Button>: null}
            </div>
        );
    }
}

