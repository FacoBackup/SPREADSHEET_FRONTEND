import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import React from "react";

export default function renderAsGroup(subject){
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
                    alt="group"

                />
                <ul>
                    <li style={{fontSize: '17px', fontWeight: '400'}}>
                        {subject.name}
                    </li>

                    <li style={{fontSize: '17px', fontWeight: '400', color: '#aaadb1'}}>
                        {typeof subject.role !== 'undefined' && subject.role !== null ? "Your role: " + subject.role : subject.about}
                    </li>
                </ul>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                justifyItems:'space-between',
                width:'100%',
                marginBottom:'1vh'
            }}>
                <Button href={"/component/" + subject.groupID } variant="contained" disableElevation style={{textTransform:'capitalize'}}>See</Button>
            </div>
        </div>
    )
}