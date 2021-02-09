import TopBarComponent from "../../shared/components/navigation/TopBarComponent";
import Avatar from "@material-ui/core/Avatar";
import PhoneRoundedIcon from "@material-ui/icons/PhoneRounded";
import ProfileBar from "../../shared/components/navigation/LeftBarComponent";
import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import renderOption from "../functions/RenderOption";
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import Cookies from "universal-cookie/lib";
import axios from "axios";
import Host from "../../../Host";
import fetchProfileData from "../functions/FetchData";
import {Link} from "react-router-dom";



export default class RenderProfile extends React.Component{
    branch_name;
    constructor(params) {
        super(params);
        this.state={
            userID: params.user_id,
            profile: {},
            settings: false,
            branches: true,
            qr: false,
            commits: []
        }
    }
    componentDidMount() {
        this.fetchData().catch(r => console.log(r))
    }

    async fetchData() {
        const response = await fetchProfileData(this.state.userID)
        this.setState({
            profile: response.profile,
            commits: response.commits
        })
    }

    render() {
        return (
            <div>
                <TopBarComponent/>
                <div className="profile_center_component">
                    <div className='profile_background_image_container'>
                        <img className='profile_background_image' alt="background"
                             src={(this.state.profile.background !== null && typeof this.state.profile.background !== 'undefined') ? this.state.profile.background : "https://www.beautycolorcode.com/2f2f2f-1440x900.png"}/>
                    </div>
                    <div className="dedicated_component_container">
                        <div className='profile_container'>
                            <div style={{marginTop: '1vh', textAlign: 'center'}}>
                                <Avatar
                                    style={{margin: 'auto', height: '4vw', width: '4vw', boxShadow:'0 0px 5px #23282e'}}
                                    src={this.state.profile.pic}
                                    alt={this.state.profile.name}
                                />
                                <p style={{
                                    fontSize: '17px',
                                
                                    textTransform: 'capitalize'
                                }}>{("" + this.state.profile.name)}</p>
                                <p style={{fontSize: '16px', color: '#888e97'}}>{this.state.profile.email}</p>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: '#888e97'
                                }}>
                                    <PhoneRoundedIcon style={{marginRight: '10px'}}/>
                                    {this.state.profile.phone}
                                </div>
                                <div style={{marginTop:'50px'}}>
                                    <ButtonGroup size="large" variant="text">
                                        <Button onClick={() => this.setState({branches: true, settings: false})} style={{display: 'grid', lineHeight: '7px', fontSize: '14px',width:(parseInt((new Cookies()).get("ID")) === this.state.userID? '5vw': '7.5vw'),textTransform:'capitalize',color:(this.state.branches === true ? "#39a0f6" :"#aaadb1")}} disableElevation>Branches</Button>

                                        <Button style={{display: 'grid', lineHeight: '7px', fontSize: '14px',width:(parseInt((new Cookies()).get("ID")) === this.state.userID ? '5vw': '7.5vw'),textTransform:'capitalize',color:"#aaadb1"}} disableElevation href={"/group/"+this.state.profile.group_id}>Group</Button>

                                        {parseInt((new Cookies()).get("ID") ) === this.state.userID ?
                                            <Button style={{display: 'grid', lineHeight: '7px', fontSize: '15px',width:'5vw',textTransform:'capitalize',color:(this.state.settings === true ? "#39a0f6" :"#aaadb1")}} disableElevation
                                                    onClick={()=> this.setState({
                                                        settings:true,
                                                        branches:false
                                                    })}
                                            ><SettingsRoundedIcon/></Button>
                                            :
                                            null
                                        }
                                    </ButtonGroup>
                                </div>
                            </div>
                        </div>
                        <div className="profile_content_container">
                            {renderOption(this.state.userID,this.state.settings,false,false,false)}
                        </div>
                        <div className={"profile_commit_container"}>
                            <p style={{textAlign:"center"}}> Latest Commits</p>
                            {this.state.commits.length > 0 ? this.state.commits.map((commit) => (
                                <Link style={{textDecoration:'none', color:'white'}} to={"/branch/" + commit.branch_id}>
                                    <div className={"commit_container"}>
                                        <div style={{textAlign:'center'}}>
                                            <p style={{color: '#aaadb1'}}>Changes</p>
                                            <p>{commit.changes}</p>
                                        </div>
                                        <div style={{textAlign:'center'}}>
                                            <p style={{color: '#aaadb1'}}>Branch</p>
                                            <p>{commit.branch_name}</p>
                                        </div>
                                        <div style={{textAlign:'center'}}>
                                            <p style={{color: '#aaadb1'}}>Date</p>
                                            <p>{commit.message.slice(4, 11)}</p>
                                        </div>
                                    </div>
                                </Link>
                            )):
                            <p style={{color:'#aaadb1'}}>No recent commits</p>
                            }
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