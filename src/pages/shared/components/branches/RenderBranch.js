import {Button, Menu, MenuItem, Paper} from '@material-ui/core'
import React from 'react'
import Cookies from 'universal-cookie/lib'
import "../../../shared/styles/PageModel.css"
class RenderBranch extends React.Component {
    is_master;
    repository_name;
    constructor(params) {
        super(params)
        this.state = {
            branch: params.branch,
            userID: params.user_id,
            open_menu: false
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
                        <li>Repository: {this.state.branch.repository_name}</li>
                    </ul>
                </ul>
                <Button style={{textTransform:'none', border:'#aaadb1 2px solid'}}>See repository</Button>
                <Paper className={"menu_container"}>
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={() => this.setState({open_menu: true})}>
                        Open Menu
                    </Button>
                    <Menu
                        id="simple-menu"
                        keepMounted
                        open={this.state.open_menu}
                        onClose={() => this.setState({open_menu: false})}
                    >
                        <MenuItem>Profile</MenuItem>
                        <MenuItem>My account</MenuItem>
                        <MenuItem>Logout</MenuItem>
                    </Menu>
                </Paper>

                {parseInt(this.state.userID) !== parseInt((new Cookies()).get("ID")) ? null : <Button style={{textTransform:'capitalize', border:'#aaadb1 2px solid'}}>Edit</Button>}
                {this.state.branch.is_master !== true && parseInt(this.state.userID) === parseInt((new Cookies()).get("ID"))? <Button style={{textTransform:'none', border:'#39adf6 2px solid'}} onClick={() => this.mergeBranch()} >Merge to master</Button>: null}
                {parseInt(this.state.userID) !== parseInt((new Cookies()).get("ID")) ? null : <Button onClick={() => this.removeBranch()} style={{textTransform:'none', border:'#e34f50 2px solid'}}>Give up as a contributer</Button>}
                
                
            </div>
        )
    }
}

export default RenderBranch