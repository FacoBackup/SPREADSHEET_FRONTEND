import React, {Component} from 'react';
import Cookies from 'universal-cookie/lib';
import Host from '../../../Host'
import axios from 'axios'
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import {Button, IconButton, InputBase, Paper} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "../../shared/functions/Alert";

const cookies = new Cookies()

export default class RenderCommits extends Component {
    user_name;
    constructor(props) {
        super(props);
        this.state={
            commits: [],
            branch_id: props.branch_id
        }
    }
    componentDidMount() {
        this.fetchData().catch(error => console.log(error))
    }

    async fetchData(){
        try {
            await axios({
                method: 'patch',
                url: Host() + 'api/get/branch/commits',
                headers:{'authorization':(cookies).get("JWT")},
                data: {
                    branch_id: this.state.branch_id
                }
            }).then(res => {
                this.setState({
                    commits: res.data
                })
            }).catch(error => console.log(error))
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <div>
                {this.state.commits.map((commit)=>(
                    <div className="render_as_user_content_container" style={{width:'30vw',display:'flex', justifyContent:'space-around', alignItems:'center', textAlign:'center'}}>

                        <div>
                            <p>Changes</p>
                            <p style={{color:'#aaadb1'}}>{commit.changes}</p>
                        </div>
                        <div>
                            <p>User</p>
                            <p style={{textTransform:'capitalize', color:'#aaadb1'}}>{commit.user_name}</p>
                        </div>
                        <div>
                            <p>Committed at</p>
                            <p style={{color:'#aaadb1'}}>{(new Date(commit.commit_time)).toString().slice(0,21)}</p>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

