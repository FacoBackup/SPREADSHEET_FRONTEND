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
            modal: false,
            is_group: params.is_group
        }
        this.renderModal = this.renderModal.bind(this)
    }
    
    renderModal(){
        if (this.state.modal === true){
            return(
                <Modal open={this.state.modal} onClose={() => this.setState({
                    modal:false
                })} style={{ display:'grid', justifyContent:'center', alignContent: "center"}}>
                    <div style={{width:'600px', height:'600px',margin:'auto',display:'grid', justifyContent:'center', justifyItems:'center', alignContent: "center", backgroundColor:'white'}}>
                        <QRCode value={
                                    "BEGIN:VCARD"+
                                    "VERSION:3.0"+
                                    "N:"+this.state.subject.name+
                                    "FN:"+this.state.subject.name+
                                    "ORG:AEB"+
                                    "EMAIL:"+this.state.subject.email+
                                    "TEL;TYPE=voice,work,pref:"+this.state.subject.phone+
                                    "END:VCARD"
                                }
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
            <>
                <this.renderModal/>
                <div className={"render_as_content_container"} key={this.state.subject.id} style={{height:(this.state.more !== true? "auto" :'22vh')}}>
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
                    })}  variant="outlined" style={{color:'white', textTransform:'capitalize',border:(this.state.more === true? '#39adf6 2px solid' : null)}} ><MoreVertRoundedIcon/></Button>
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
                        {this.state.is_group !== true ? <Button style={{textTransform:'capitalize', color:'white', border:'#39adf6 2px solid'}} variant={"outlined"} href={"/group/"+this.state.subject.group_id} disabled={this.state.subject.group_id === null}>see group</Button>: null}
                    </div>
                    :
                    null
                }
            </div>

            </>

        )
    }
}