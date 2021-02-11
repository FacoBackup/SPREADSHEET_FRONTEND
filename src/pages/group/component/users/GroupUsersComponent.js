import React from 'react'
import axios from 'axios';
import Host from '../../../../Host'
import RenderAsUser from '../../../shared/components/RenderAsUser'

class GroupUsersComponent extends React.Component {
    constructor(params) {
        super(params)
        this.state = {
            group_id: params.group_id,
            members: [],
        }
    }

    componentDidMount(){
        this.fetchData().catch(error => console.log(error))
    }

    async fetchData() {
        try{
            await axios({
                method: 'patch',
                url: Host() + 'api/get/group/members',
                data: {
                    group_id: this.state.group_id
                }
            }).then(res => {
                this.setState({
                    members: res.data
                })
            }).catch(error => console.log(error))
        }
        catch(error){
            console.log(error)
        }
    }

    render() {
        return (
            <>
                <p style={{
                    textAlign: 'center'
                }}>Members</p>
                {this.state.members.length > 0 ? this.state.members.map((member) => (
                  <RenderAsUser subject={member} is_group={true}/>
                )): <p style={{color:'#aaadb1'}}>No members in this group.</p>}
            </>
        )
    }
}

export default GroupUsersComponent