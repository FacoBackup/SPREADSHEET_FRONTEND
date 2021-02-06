import TopBarComponent from "../../shared/components/navigation/TopBarComponent";
import Avatar from "@material-ui/core/Avatar";
import PhoneRoundedIcon from "@material-ui/icons/PhoneRounded";
import qr from "react-qr-code";
import ProfileBar from "../../shared/components/navigation/LeftBarComponent";
import React from "react";

export default function renderProfile(name, email, pic, background, phone){
    return (
        <div>
            <TopBarComponent/>
            <div className="profile_center_component">
                <div className='profile_background_image_container'>
                    <img className='profile_background_image' alt="BACKGROUD"
                         src={(background !== null && typeof background !== 'undefined') ? background : "https://www.beautycolorcode.com/2f2f2f-1440x900.png"}/>
                </div>
                <div className="dedicated_component_container">

                    <div className="profile_content_container">
                        <div className='profile_container'>
                            <div style={{marginTop: '1vh', textAlign: 'center'}}>
                                <Avatar
                                    style={{margin: 'auto', height: '4vw', width: '4vw', boxShadow:'0 0px 5px #23282e'}}
                                    src={pic}
                                    alt="user"
                                />
                                <p style={{
                                    fontSize: '18px',
                                    fontWeight:'400',
                                    textTransform: 'capitalize'
                                }}>{("" + name)}</p>
                                <p style={{fontSize: '17px',fontWeight: '350', color: '#888e97'}}>{email}</p>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: '#888e97'
                                }}>
                                    <PhoneRoundedIcon style={{marginRight: '10px'}}/>
                                    {phone}
                                </div>
                                <canvas>
                                    <qr value={"ok"}/>
                                </canvas>

                            </div>
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