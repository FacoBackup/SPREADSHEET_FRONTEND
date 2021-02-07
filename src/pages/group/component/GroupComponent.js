import React from 'react';
import "../../shared/styles/PageModel.css"
import "../../profile/styles/DedicatedProfile.css"
import "../../shared/styles/DedicatedPagesStyle.css"
import axios from 'axios';
import ProfileBar from '../../shared/components/navigation/LeftBarComponent'
import Avatar from '@material-ui/core/Avatar'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import Host from '../../../Host'
import GroupUsersComponent from './users/GroupUsersComponent'
import SubjectRoundedIcon from '@material-ui/icons/SubjectRounded';
import Cookies from "universal-cookie/lib";

const cookies = new Cookies()

class GroupComponent extends React.Component {
    repositories;
    constructor(params) {
        super()
        this.state = {
            group: {},
            groupID: params.groupID,
            members: false,
            repositories: true,
        }
    }

    componentDidMount() {
        this.fetchData().catch(e => console.log(e))
    }


    async fetchData() {
      try{
          await axios({
              method: 'patch',
              url: Host() + 'api/get/group',
              headers: {"Authorization": cookies.get("JWT")},
              data: {
                  group_id: parseInt(this.state.groupID)
              }
          }).then(res => {
              this.setState({
                  group: res.data
              })
          })
              .catch(error => console.log(error))
      }catch (e) {
          console.log(e)
      }

    }


    optionSelect() {
        switch (true) {
            case (this.state.members): {

                return (

                    <GroupUsersComponent token={cookies} role={this.state.group.role}
                                         groupID={this.state.groupID} options={1}/>
                )
            }
            default: {
                return (
                    "OK"
                )
            }
        }
    }


    render() {
        return (
            <div>
                <div className="profile_center_component">
                    <div className='profile_background_image_container'>
                        <img className='profile_background_image' alt="BACKGROUD"
                             src={(typeof this.state.group.background !== 'undefined' && this.state.group.background !== null) ? this.state.group.background : "https://www.beautycolorcode.com/2f2f2f-1440x900.png"}/>
                    </div>
                    <div className="dedicated_component_container">

                        <div className="profile_content_container">
                            <div className='profile_container'>
                                <div style={{marginTop: '1vh', textAlign: 'center'}}>
                                    <Avatar
                                        style={{margin: 'auto', height: '4vw', width: '4vw'}}
                                        src={this.state.group.pic}
                                        alt={(""+this.state.group.name).toUpperCase()}
                                    />
                                    <p style={{fontSize: '18px', fontWeight: '400', textTransform:'capitalize'}}>{this.state.group.name}</p>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        color: '#aaadb1'
                                    }}>
                                        <SubjectRoundedIcon/>
                                        {this.state.group.about}
                                    </div>
                                </div>
                                <div>
                                    <ButtonGroup size="medium" variant="text">
                                        <Button style={{display: 'grid', lineHeight: '7px', fontSize: '15px', width:'7vw',textTransform:'capitalize',color:(this.state.repositories === true? "#39adf6": "#aaadb1")}}
                                                color={this.state.repositories === true ? "primary" : "default"}
                                                onClick={() => this.setState({
                                                    repositories: true,
                                                    members: false,
                                                    settings:false
                                                })}
                                        >Repositories <p style={{color: 'white'}}>{this.state.group.repositories}</p></Button>


                                        <Button style={{display: 'grid', lineHeight: '7px', fontSize: '15px', width:'7vw',textTransform:'capitalize',color:(this.state.members === true? "#39adf6": "#aaadb1")}}
                                                color={this.state.members === true ? "primary" : "default"}
                                                onClick={() => this.setState({
                                                    repositories: false,
                                                    members: true,
                                                    settings:false
                                                })}
                                        >Members<p style={{color: 'white'}}>{this.state.group.members}</p></Button>
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