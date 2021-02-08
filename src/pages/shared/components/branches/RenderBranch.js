import { Button } from '@material-ui/core'
import React from 'react'
import Cookies from 'universal-cookie/lib'
import axios from 'axios'
import Host from '../../../../Host'
class RenderBranch extends React.Component {
    constructor(params) {
        super(params)
        this.state = {
            branch: params.branch,
            userID: params.user_id
        }
    }
    
    async removeBranch(){
        // try {
        //     await axios({
        //         method: 'patch',
        //         url: Host() + 'api/user/branches',
        //         data: {
        //             user_id: this.state.userID,
        //             max_id: this.state.max_id
        //         }
        //     }).then(res => {
        //         this.setState({
        //             branches: res.data,
        //             max_id: res.data.length > 0 ? res.data[0].id : null,
        //             hasMore: res.data.length >= 10
        //         })
        //     })
        //     .catch(error => console.log(error))
        // } catch (error) {
        //     console.log(error)
        // }
    }

    async mergeBranch(){
        // try {
        //     await axios({
        //         method: 'put',
        //         url: Host() + 'api/merge',
        //         data: {
        //             user_id: this.state.userID,
        //             branch_id: this.state.max_id
        //         }
        //     }).then(res => {
        //         this.setState({
        //             branches: res.data,
        //             max_id: res.data.length > 0 ? res.data[0].id : null,
        //             hasMore: res.data.length >= 10
        //         })
        //     })
        //     .catch(error => console.log(error))
        // } catch (error) {
        //     console.log(error)
        // }
    }

    render() {
        return (
            <div className="render_as_user_content_container" style={{width:'50vw',display:'flex', justifyContent:'space-around', alignItems:'center'}}>
          
                <ul style={{listStyle:'none'}}>
                    <li>
                    {this.state.branch.name}
                    </li>
                    <ul style={{color:'#aaadb1', lineBreak:'auto'}}>
                        <li>From group: {this.state.branch.group_name}</li>
                    </ul>
                </ul>
                <Button style={{textTransform:'none', border:'#aaadb1 2px solid'}}>See repository</Button>
                {parseInt(this.state.userID) !== parseInt((new Cookies()).get("ID")) ? null : <Button style={{textTransform:'capitalize', border:'#aaadb1 2px solid'}}>Edit</Button>}
                {this.state.branch.is_master !== true && parseInt(this.state.userID) === parseInt((new Cookies()).get("ID"))? <Button style={{textTransform:'none', border:'#39adf6 2px solid'}} onClick={() => this.mergeBranch()} >Merge to master</Button>: null}
                {parseInt(this.state.userID) !== parseInt((new Cookies()).get("ID")) ? null : <Button onClick={() => this.removeBranch()} style={{textTransform:'none', border:'#e34f50 2px solid'}}>Give up as a contributer</Button>}
                
                
            </div>
        )
    }
}

export default RenderBranch