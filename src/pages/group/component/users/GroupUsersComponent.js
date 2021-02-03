import React from 'react'
import axios from 'axios';
import {DefaultButton} from 'office-ui-fabric-react';
import Host from '../../../../Host'
import {FontSizes, FontWeights} from '@fluentui/theme';
import Cookies from 'universal-cookie';
import Avatar from '@material-ui/core/Avatar'
import Button from "@material-ui/core/Button";

class GroupUsersComponent extends React.Component {
    groupName;
    userImageURL;
    constructor(params) {
        super(params)
        this.state = {
            options: params.options,
            groupID: params.groupID,
            token: params.token,
            members: [],
            role: params.role
        }
    }

    componentDidUpdate(lastParams) {

        console.log(JSON.stringify(lastParams.options !== this.props.options))
        if (lastParams.options !== this.props.options) {
            this.setState({
                members: [],
                options: this.props.options
            })
            this.fetchOptions(this.props.options).catch(r => console.log(r))
        }

    }

    componentDidMount() {
        this.fetchOptions().catch(r => console.log(r))
    }

    renderPageName() {
        switch (this.state.options) {
            case 0: {
                return (
                    "Followers"
                )
            }
            case 1: {
                return (
                    "Members"
                )
            }
            case 2: {
                return (
                    "Moderators"
                )
            }
            default : {
                return (
                    "All Users Related To This Group"
                )
            }
        }
    }

    async fetchOptions(options) {
        switch (options) {
            case 0: { //Followers
                this.setState({
                    members: []
                })
                await axios({
                    method: 'patch',
                    url: Host() + 'api/get/followers/group',
                    headers: {"Authorization": 'Bearer ' + this.state.token},
                    data: {
                        groupID: this.state.groupID
                    }
                }).then(res => {
                    this.setState({
                        members: res.data
                    })
                })
                    .catch(error => console.log(error))

                break
            }
            case 1: { //Members
                this.setState({
                    members: []
                })
                await axios({
                    method: 'patch',
                    url: Host() + 'api/get/all/users',
                    headers: {"Authorization": 'Bearer ' + this.state.token},
                    data: {
                        groupID: this.state.groupID
                    }
                }).then(res => {
                    this.setState({
                        members: res.data
                    })
                })
                    .catch(error => console.log(error))

                break
            }
            case 2: { //Moderators
                this.setState({
                    members: []
                })
                await axios({
                    method: 'patch',
                    url: Host() + 'api/get/mods',
                    headers: {"Authorization": 'Bearer ' + this.state.token},
                    data: {
                        groupID: this.state.groupID
                    }
                }).then(res => {
                    this.setState({
                        members: res.data
                    })
                })
                    .catch(error => console.log(error))

                break
            }
            default: { //All
                this.setState({
                    members: []
                })
                await axios({
                    method: 'patch',
                    url: Host() + 'api/get/group/related/users',
                    headers: {"Authorization": 'Bearer ' + this.state.token},
                    data: {
                        groupID: this.state.groupID
                    }
                }).then(res => {

                    this.setState({
                        members: res.data
                    })
                })
                    .catch(error => console.log(error))
                break
            }
        }
    }

    async promote(userID, groupID) {
        await axios({
            method: 'put',
            url: Host() + 'api/promote/member',
            headers: {"Authorization": 'Bearer ' + this.state.token},
            data: {
                groupID: groupID,
                memberID: userID
            }
        }).then(res => {
            alert(JSON.stringify(res))
            window.location.reload()
        })
            .catch(error => console.log(error))
    }

    async lower(userID, groupID) {
        await axios({
            method: 'put',
            url: Host() + 'api/lower/member',
            headers: {"Authorization": 'Bearer ' + this.state.token},
            data: {
                groupID: groupID,
                memberID: userID
            }
        }).then(res => {
            alert(JSON.stringify(res))
            window.location.reload()
        })
            .catch(error => console.log(error))
    }

    async removeUser(userID, groupID) {


        await axios({
            method: 'delete',
            url: Host() + 'api/remove/member',
            headers: {"Authorization": 'Bearer ' + this.state.token},
            data: {
                groupID: groupID,
                memberID: userID
            }
        }).then(res => {

            window.location.reload()
        })
            .catch(error => console.log(error))
    }

    renderButtons(userID, userRole, groupID) {
        console.log(userRole)
        if (userID !== (new Cookies()).get("ID"))
            return (
                <div style={{display: 'flex', justifyContent: 'space-between', alignContent: 'center'}}>
                    <DefaultButton text="Send Message" href={"/chat/" + userID + "/false/" + userID}/>
                    {(userRole !== "MODERATOR" && this.state.role === "MODERATOR") ?
                        <DefaultButton text="Promote User" onClick={alert("CLICKED")}/> : null}
                    {(userRole !== "FOLLOWER" && this.state.role === "MODERATOR") ?
                        <DefaultButton text="Lower User" onClick={() => this.lower(userID, groupID)}/> : null}
                    {(this.state.role === "MODERATOR") ?
                        <DefaultButton style={{backgroundColor: "red", color: "white"}} text="Remove User"
                                       onClick={() => this.removeUser(userID, groupID)}/> : null}
                </div>
            )
    }

    render() {
        return (
            <div className="">

                <p style={{
                    textAlign: 'center',
                    fontSize: FontSizes.size18,
                    fontWeight: FontWeights.regular
                }}>{this.renderPageName()}</p>
                {this.state.members.map((member) => (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        alignContent: 'center',
                        backgroundColor: '#3b424c',
                        borderRadius: '8px',
                        paddingRight: '10px',
                        paddingLeft: '10px',
                        marginTop:'1vh'
                    }}>

                        <Avatar
                            style={{height: '55px', width: '55px'}}
                            src={member.userImageURL}
                            alt="user"

                        />
                        <ul>
                            <li style={{fontSize: '17px', fontWeight: '400'}}>
                                {member.userName}
                            </li>
                            <li style={{
                                textTransform: 'capitalize',
                                fontSize: '17px',
                                fontWeight: '400',
                                color: '#aaadb1'
                            }}>
                                {member.role.toLowerCase()}
                            </li>
                            {typeof member.groupName !== 'undefined' && member.groupName !== null ?
                                <li style={{fontSize: '17px', fontWeight: '400', color: '#aaadb1'}}>
                                    {member.groupName}
                                </li> : null}
                        </ul>
                        {parseInt((new Cookies()).get("ID")) !== member.userID?
                            <Button variant={"contained"} href={"/components/" + member.userID} disableElevation
                                    style={{marginLeft: '15px'}}>SEE</Button>: null}

                    </div>
                ))}
            </div>

        )
    }
}

export default GroupUsersComponent