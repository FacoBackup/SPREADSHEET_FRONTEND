import React, {Component} from 'react';
import Cookies from 'universal-cookie/lib';
import Host from '../../../../Host'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import RenderBranch from '../../../shared/components/branches/RenderBranch'
const cookies = new Cookies()

export default class GroupRepositories extends Component {

    constructor(params) {
        super(params);
        this.state={
            repository_id: params.repository_id,
            branches: []
        }
    }
    
    componentDidMount(){
        this.fetchData()
    }

    async fetchData(){
            try {
                await axios({
                    method: 'patch',
                    url: Host() + 'api/get/repository/branches',
                    headers:{'authorization':(cookies).get("JWT")},
                    data: {
                        repository_id: this.state.repository_id
                    }
                }).then(res=>{
                    this.setState({
                        branches:res.data
                    })
                }) .catch(error => {
                        console.log(error)})
            } catch (error) {
                console.log(error)
            }

    }

    render() {
        return (
            <div>
                <p style={{textAlign:'center'}}>Branches</p>
                {this.state.branches.map((branch) => (
                    <RenderBranch branch={branch} user_id={parseInt(cookies.get("ID"))}/>
                ))}
            </div>
        )
    }
}

