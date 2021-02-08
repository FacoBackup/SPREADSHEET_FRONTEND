import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import React from "react";
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import {Modal} from "@material-ui/core";
let QRCode = require('qrcode.react');

export default class RenderAsUser extends React.Component{
    birth;
    constructor(params) {
        super(params);
        this.state={
            subject: params.subject,
            more: false,
            modal: false
        }
        this.renderModal = this.renderModal.bind(this)
    }

    renderModal(){
        if (this.state.modal === true){
            return(
                <Modal open={this.state.modal} onClose={() => this.setState({
                    modal:false
                })} style={{width:'fit-content', height:'fit-content'}}>
                    <div style={{display:'grid', justifyContent:'center', margin:'10% auto'}}>
                        <QRCode value= {"BEGIN:VCARD" +
                                        "VERSION:4.0" +
                                        "N:" + this.state.subject.name +
                                        "TEL:" + this.state.subject.phone +
                                        "EMAIL:" + this.state.subject.email + "END:VCARD"}
                                style={{width:'500px', height:'500px'}}
                        />

                    </div>
                </Modal>
            )
        }
        else
            return null
    }

    render() {
        return(
            <div className={"render_as_user_content_container"} key={this.state.subject.id} style={{height:(this.state.more !== true? "auto" :'22vh')}}>
                <div style={{display: 'flex', alignContent: (this.state.more !== true? "center" :'flex-start'), alignItems:'center', justifyContent:'space-around'}}>
                    <div style={{display:'flex', alignItems:'center'}}>
                        <Avatar
                            style={{height: '55px', width: '55px'}}
                            src={this.state.subject.pic}
                            alt="user"
                        />
                        <div style={{lineHeight:'1vh', marginLeft:'1vw'}}>
                            <p style={{fontSize:'17px', textTransform:'capitalize'}}>
                                {this.state.subject.name}
                            </p>
                            <p style={{fontSize:'15px', color:'#aaadb1'}}>
                                {this.state.subject.phone}
                            </p>

                        </div>

                    </div>

                    <Button onClick={() => this.setState({
                        more: !this.state.more
                    })}  variant="outlined" style={{color:'white', textTransform:'capitalize',border:(this.state.more === true? '#39adf6 2px solid' : null)}} disableElevation><MoreVertRoundedIcon/></Button>
                    <Button href={"/profile/" + this.state.subject.id } variant="outlined" style={{color:'white', textTransform:'capitalize'}} disableElevation>profile</Button>
                    <Button onClick={() => this.setState({
                        modal: true
                    })} variant="outlined" style={{color:'white'}} disableElevation>QR</Button>

                </div>
                {this.state.more === true?
                    <div style={{display:'flex', marginTop:'2vh', justifyContent:'space-around', alignItems:'center'}}>
                        <div>
                            <ul style={{lineHeight:'3vh'}}>
                                <li>{this.state.subject.email}</li>
                                <li>{this.state.subject.about}</li>
                                <li>{(new Date(this.state.subject.birth)).toString().slice(3, 15)}</li>
                            </ul>
                        </div>
                        <Button style={{textTransform:'capitalize', color:'white', border:'#39adf6 2px solid'}} variant={"outlined"} href={"/group/"+this.state.subject.group_id} disabled={this.state.subject.group_id === null}>see group</Button>
                    </div>
                    :
                    null
                }

                <this.renderModal/>

            </div>
        )
    }
}