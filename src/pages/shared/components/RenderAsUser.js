import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import React from "react";
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';

export default class RenderAsUser extends React.Component{
    group_name;
    birth;
    constructor(params) {
        super(params);
        this.state={
            subject: params.subject,
            more: false
        }
    }

    render() {
        return(
            <div className={"render_as_user_content_container"} key={this.state.subject.id} style={{height:(this.state.more !== true? "auto" :'22vh')}}>
                <div style={{display: 'flex', alignContent: (this.state.more !== true? "center" :'flex-start'), alignItems:'center', justifyContent:'space-around'}}>
                    <div style={{display:'flex', alignItems:'center'}}>
                        <Avatar
                            style={{height: '55px', width: '55px'}}
                            src={this.state.subject.imageURL}
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
            </div>
        )
    }
}