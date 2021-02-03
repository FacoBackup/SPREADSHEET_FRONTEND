import axios from 'axios';
import React from 'react'
import "../../styles/SocialStyle.css"
import Avatar from '@material-ui/core/Avatar'
import Host from '../../../../Host'
import Cookies from 'universal-cookie';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import Button from '@material-ui/core/Button'

class UserGroupsComponent extends React.Component {
    constructor(params) {
        super(params)
        this.state = {
            token: params.token,
            groups: [],
            date: new Date(),
            conversations: {},
            userID: params.userID
        }
        this.fetchData = this.fetchData.bind(this)
    }

    componentDidMount() {
        this.fetchData().catch(r => console.log(r))
        this.timerID = setInterval(
            () => this.tick(),
            10000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {

        this.setState({
            date: new Date(),
        });
    }

    async fetchData() {

        await axios({
            method: 'patch',
            url: Host() + 'api/get/all/user/communities',
            headers: {"Authorization": 'Bearer ' + this.state.token},
            data: {
                userID: this.state.userID
            }
        }).then(res => {
            this.setState({
                communities: res.data
            })
        })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div>
                <p style={{fontSize: '20px', fontWeight: '500', textAlign: 'center'}}>Communities</p>
                {(this.state.communities.length === 0 && this.state.userID === (new Cookies()).get("ID")) ?
                    <p style={{textAlign: 'center'}}>Looks like you are not a member of any group, try searching by one.</p>
                    : this.state.communities.map((group) =>(
                        <div style={{
                            marginTop:'1vh',
                            width: '20vw',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            alignContent: 'center',
                            backgroundColor: '#3b424c',
                            borderRadius: '8px',
                            paddingRight: '10px',
                            paddingLeft: '10px'
                        }}>
                            <div style={{display: 'flex', alignItems: 'center', alignContent: 'center'}}>
                                <Avatar
                                    style={{height: '55px', width: '55px'}}
                                    src={group.imageURL}
                                    alt="group"

                                >{typeof group.imageURL !== 'undefined' && group.imageURL !== null ? null :
                                    <PeopleAltRoundedIcon/>}</Avatar>
                                <ul>
                                    <li style={{fontSize: '17px', fontWeight: '400'}}>
                                        {group.name}
                                    </li>
                                    <li style={{fontSize: '17px', fontWeight: '400', color: '#aaadb1'}}>
                                        {group.about}
                                    </li>
                                </ul>
                            </div>
                            <Button style={{marginLeft: '10px', textTransform:'capitalize'}} variant="outlined" disableElevation color="default"
                                    href={"/group/" + group.groupID}>See</Button>
                        </div>
                        )
                    )}
            </div>
        );
    }
}

export default UserGroupsComponent;