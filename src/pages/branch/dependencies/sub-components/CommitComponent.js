import React, {Component} from 'react';
import Cookies from 'universal-cookie/lib';
import Host from '../../../../Host'
import axios from 'axios'

const cookies = new Cookies()

export default class CommitComponent extends Component {
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
                method: 'get',
                url: Host() + 'api/get/branch/commits',
                headers:{'authorization':(cookies).get("JWT")},
                params: {
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
                {this.state.commits.length > 0 ?
                    this.state.commits.map((commit)=>(
                        <div className="render_as_content_container" style={{width:'30vw',display:'flex', justifyContent:'space-around', alignItems:'center', textAlign:'center'}}>

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
                    ))
                    :
                    <p style={{color:'#aaadb1'}}>
                        No commits found
                    </p>
                }
            </div>
        );
    }
}

