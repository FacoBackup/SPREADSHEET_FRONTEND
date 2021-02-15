import Button from "@material-ui/core/Button";
import React from "react";

export default function renderAsGroup(group){
    return(
        <div className={"render_as_content_container"}>
            <div style={{
                display: 'flex'

            }}>
                <p style={{fontWeight:'550', textTransform: 'uppercase'}}>{group.name}/</p>
                <p style={{color:'#aaadb1', fontSize:'15px'}}>{group.about}</p>

                <Button href={"/group/" + group.id } variant="outlined" style={{textTransform:'none', marginLeft:'auto'}}>See</Button>
            </div>

        </div>
    )
}