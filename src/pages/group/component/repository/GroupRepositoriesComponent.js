import React, {Component} from 'react';
import Cookies from 'universal-cookie/lib';
import Host from '../../../../Host'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import RenderBranch from '../../../shared/components/branches/RenderBranch'
import {Button} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "../../../shared/functions/Alert";
const cookies = new Cookies()

export default class GroupRepositories extends Component {
    master_branch_id;

    constructor(params) {
        super(params);
        this.state={
            group_id: params.group_id,
            repositories: []
        }
    }
    
    componentDidMount(){
        this.fetchData().catch(error => console.log(error))
    }

    async fetchData(){
            try {
                await axios({
                    method: 'patch',
                    url: Host() + 'api/get/group/repositories',
                    headers:{'authorization':(cookies).get("JWT")},
                    data: {
                        group_id: this.state.group_id
                    }
                }).then(res=>{
                    console.log(res)
                    this.setState({
                        repositories:res.data
                    })
                }).catch(error => {
                        console.log(error)})
            } catch (error) {
                console.log(error)
            }

    }

    render() {
        return (
            <div>
                <p style={{textAlign:'center'}}>Repositories</p>
                {this.state.repositories.map((rep) => (
                    <div key={rep.master_branch_id} className="render_as_user_content_container" style={{width:'30vw',display:'flex', justifyContent:'space-around', alignItems:'center'}}>
                        <div style={{lineHeight:'8px'}}>
                            <p style={{fontWeight:'600'}}>{rep.repository.name}</p>
                            <p style={{color:'#aaadb1', fontSize:'14px'}}>About: {rep.repository.about}</p>
                            <p style={{color:'#aaadb1', fontSize:'14px'}}>Branches: {rep.branches}</p>
                        </div>

                        <Button
                            variant="outlined"
                            style={{textTransform:'capitalize'}}
                            href={'/branch/' + rep.master_branch_id}>
                            Visualize
                        </Button>
                    </div>

                ))}
            </div>
        )
    }
}

