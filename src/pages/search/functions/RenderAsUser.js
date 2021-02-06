import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import React from "react";

export default function renderAsUser(subject){
    return(
        <div className={"center_component"}>
            <div style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                alignContent: 'center',

            }}>
                <Avatar
                    style={{height: '55px', width: '55px'}}
                    src={subject.imageURL}
                    alt="user"
                />
                <ul>
                    <li style={{fontSize: '17px', fontWeight: '400'}}>
                        {subject.name}
                    </li>
                    <ul>
                        <li style={{fontSize: '17px', fontWeight: '400', color: '#aaadb1'}}>
                            {subject.email}
                        </li>
                        <li style={{fontSize: '17px', fontWeight: '400', color: '#aaadb1'}}>
                            {subject.phone}
                        </li>
                    </ul>
                </ul>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                justifyItems:'space-between',
                width:'100%',
                marginBottom:'1vh'

            }}>
                <Button href={"/profile/" + subject.userID } variant="outlined" style={{color:'white'}} disableElevation>See</Button>
            </div>
        </div>
    )
}