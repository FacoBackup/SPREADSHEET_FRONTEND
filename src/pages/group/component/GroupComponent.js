import React from 'react';
import "../../shared/styles/PageModel.css"
import "../../profile/styles/DedicatedProfile.css"
import "../../shared/styles/DedicatedPagesStyle.css"
import "../styles/GroupStyles.css"
import axios from 'axios';
import ProfileBar from '../../shared/components/navigation/LeftBarComponent'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import Host from '../../../Host'
import GroupUsersComponent from './users/GroupUsersComponent'
import SubjectRoundedIcon from '@material-ui/icons/SubjectRounded';
import Cookies from "universal-cookie/lib";
import GroupRepositories from './repository/GroupRepositoriesComponent'
const cookies = new Cookies()

class GroupComponent extends React.Component {
    repositories;
    constructor(params) {
        super()
        this.state = {
            group: {},
            group_id: params.group_id,
            membersOption: false,
            repositoriesOption: true,
        }
    }

    componentDidMount() {
        this.fetchData().catch(e => console.log(e))
    }


    async fetchData() {
      try{
          await axios({
              method: 'get',
              url: Host() + 'api/get/group',
              headers: {"Authorization": cookies.get("JWT")},
              params: {
                  group_id: parseInt(this.state.group_id)
              }
          }).then(res => {
              this.setState({
                  group: res.data.group,
                  members: res.data.members,
                  repositories: res.data.repositories
              })
          })
              .catch(error => console.log(error))
      }catch (e) {
          console.log(e)
      }

    }


    optionSelect() {
        switch (true) {
            case (this.state.membersOption): {

                return (

                    <GroupUsersComponent group_id={this.state.group_id}/>
                )
               
            }
            case (this.state.repositoriesOption):{
                return(
                    <GroupRepositories group_id={this.state.group_id}/>
                )
            }
            default: {
                return(
                    <GroupRepositories group_id={this.state.group_id}/>
                )
            }
        }
    }


    render() {
        return (
            <div>
                <div className="profile_center_component">
                    <div className="dedicated_component_container">

                        <div className="center_component" style={{top:'27vh', height:'73vh'}}>
                            <div className='group_info_container'>
                                <div style={{display:'flex', justifyContent: 'center', gridRow: '1'}}>
                                    <p style={{fontWeight: '550', textTransform:'uppercase'}}>{this.state.group.name}/</p>
                                    <p style={{color:'#aaadb1', fontSize: '15px'}}>{this.state.group.about}</p>
                                </div>
                                <div style={{gridRow: '2'}}>
                                    <ButtonGroup size="medium" variant="text" >
                                        <Button style={{width:'21.5vw',height: '7.5vh', display:'grid', lineHeight: '0', textTransform:'none',color:(this.state.repositoriesOption === true? "#39adf6": "#aaadb1")}}
                                                onClick={() => this.setState({
                                                    repositoriesOption: true,
                                                    membersOption: false,
                                                    settings:false
                                                })}
                                        >
                                            <p>Repositories</p>
                                            <p style={{color: 'white'}}>{this.state.repositories}</p>
                                        </Button>
                                        <Button style={{width:'21.5vw',height: '7.5vh',display:'grid', lineHeight: '0', textTransform:'none',color:(this.state.membersOption === true? "#39adf6": "#aaadb1")}}
                                                onClick={() => this.setState({
                                                    repositoriesOption: false,
                                                    membersOption: true,
                                                    settings:false
                                                })}
                                        >
                                            <p>Members</p>
                                            <p style={{color: 'white'}}>{this.state.members}</p>
                                        </Button>
                                    </ButtonGroup>
                                </div>
                            </div>
                            <div>
                                {this.optionSelect()}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="left_components">
                    <ProfileBar home={true}/>
                </div>
            </div>
        )

    }
}

export default GroupComponent;