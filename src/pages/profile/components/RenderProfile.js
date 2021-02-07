import TopBarComponent from "../../shared/components/navigation/TopBarComponent";
import Avatar from "@material-ui/core/Avatar";
import PhoneRoundedIcon from "@material-ui/icons/PhoneRounded";
import ProfileBar from "../../shared/components/navigation/LeftBarComponent";
import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import renderOption from "../functions/RenderOption";
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import axios from "axios";
import Host from "../../../Host";
import Cookies from "universal-cookie/lib";

const cookies = new Cookies()

export default class RenderProfile extends React.Component{
    constructor(params) {
        super(params);
        this.state={
            userID: params.user_id,
            profile:{},
            settings: false,
            branches: true,
            qr: false
        }
    }

    componentDidMount() {
        this.fetchData().catch(r => console.log(r))
    }

    async fetchData() {
        try {
            await axios({
                method: 'patch',
                url: Host() + 'api/get/user/by_id',
                data: {
                    user_id: typeof this.state.userID !== "undefined" ? this.state.userID : (cookies).get("ID")
                }
            }).then(res => {
                console.log(this.state.userID === parseInt((cookies).get("ID")))
                if (this.state.userID === parseInt(cookies.get("ID"))){
                    localStorage.removeItem("PROFILE")
                    localStorage.setItem("PROFILE", JSON.stringify(res.data))
                }

                this.setState({
                    profile: res.data
                })

            }).catch(error => {
                console.log(error)
            })
        } catch (error) {
            console.log(error)
        }
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
                                    alt="user"
                                />
                                <p style={{
                                    fontSize: '18px',
                                    fontWeight:'400',
                                    textTransform: 'capitalize'
                                }}>{("" + this.state.profile.name)}</p>
                                <p style={{fontSize: '17px',fontWeight: '350', color: '#888e97'}}>{this.state.profile.email}</p>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: '#888e97'
                                }}>
                                    <PhoneRoundedIcon style={{marginRight: '10px'}}/>
                                    {this.state.profile.phone}
                                </div>
                                <div style={{marginTop:'6.7vh'}}>
                                    <ButtonGroup size="large" variant="text">
                                        <Button style={{display: 'grid', lineHeight: '7px', fontSize: '15px',width:'3.9vw',textTransform:'capitalize',color:"#aaadb1"}} disableElevation>Branches</Button>

                                        <Button style={{display: 'grid', lineHeight: '7px', fontSize: '15px', width:'3.vw',textTransform:'none',color:"#aaadb1"}} disableElevation>QRCode</Button>

                                        <Button style={{display: 'grid', lineHeight: '7px', fontSize: '15px',width:'3.5vw',textTransform:'capitalize',color:"#aaadb1"}} disableElevation href={"/group/"+this.state.profile.group_id}>Group</Button>



                                        <Button style={{display: 'grid', lineHeight: '7px', fontSize: '15px',width:'2.5vw',textTransform:'capitalize',color:(this.state.settings === true ? "#39a0f6" :"#aaadb1")}} disableElevation
                                            onClick={()=> this.setState({
                                                settings:true,
                                                branches:false
                                            })}
                                        ><SettingsRoundedIcon/></Button>
                                    </ButtonGroup>
                                </div>
                            </div>
                        </div>
                        <div className="profile_content_container">
                            {renderOption(this.state.settings,false,false,false)}
                        </div>
                        <div className={"profile_commit_container"}>
                            <p style={{textAlign:"center"}}> Latest Commits</p>
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