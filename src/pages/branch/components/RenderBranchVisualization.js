import React, {Component} from 'react';
import Cookies from 'universal-cookie/lib';
import AccountTreeRoundedIcon from '@material-ui/icons/AccountTreeRounded';
import RenderCell from './RenderCell';
import {AvatarGroup} from "@material-ui/lab";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import fetchBranchData from "../functions/FetchData";
import verifyMemberByBranch from "../../shared/functions/VerifyMemberByBranch";
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import DeviceHubRoundedIcon from '@material-ui/icons/DeviceHubRounded';
import MeetingRoomRoundedIcon from '@material-ui/icons/MeetingRoomRounded';

const cookies = new Cookies()

export default class BranchVisualization extends Component {
    column_name;
    
    constructor(params) {
        super();
        this.state={
            branchID: params.branch_id,
            content: [],
            contributors: [],
            modal: false,
            visualization: false
        }
        this.fetchData = this.fetchData.bind(this)
    }

    componentDidMount(){
        this.fetchData().catch(r => console.log(r))
        this.verifyMember().catch(r => console.log(r))
        cookies.remove("CHANGES")
    }

    async fetchData(){
        const response = await fetchBranchData(this.state.branchID)
        this.setState({
            content: response.content,
            contributors: response.contributors
        })
    }

    async verifyMember(){
        const response = await verifyMemberByBranch(this.state.branchID)
        this.setState({visualization: response})
    }

    render() {    
        return (
            <div >
                <div  className={"control_bar_container"}>
                    <Button onClick={() => this.setState({
                        modal: true
                    })}>
                        <AvatarGroup max={4}>
                            {this.state.contributors.map((user) => (
                                <Avatar key={user.id} alt={user.name} src={user.pic}/>
                            ))}
                        </AvatarGroup>
                    </Button>
                    <Button
                        style={{textTransform:'none'}}
                        variant="outlined"
                        onClick={() => this.props.make_commit()}>
                        <SaveRoundedIcon style={{marginRight:'10px'}}/> Commit
                    </Button>
                    <Button ><GetAppRoundedIcon style={{marginRight:'10px'}}/>Download</Button>
                    <Button><AccountTreeRoundedIcon style={{marginRight:'10px'}}/>Make Branch</Button>
                    <Button><DeviceHubRoundedIcon style={{marginRight:'10px'}}/>Merge with master</Button>
                    <Button><MeetingRoomRoundedIcon style={{marginRight:'10px'}}/>Give up as a contributor</Button>
                </div>
                <div  className="table_container">
                    {this.state.content.map((column) => (
                        <div className="column_container" >
                            <div className="column_title_container">
                                <p>{column.column_name}</p>
                            </div>
                            <div style={{marginTop:'1vh'}}>
                                {column.cells.map((cell, index) =>(
                                    <div key={cell.id}> 
                                        <RenderCell visualization={this.state.visualization} column_id={column.column_id} cell={cell} index={index}/>
                                    </div>
                                ))}
                                {this.state.visualization === false ?
                                    <div key={"new"+column.column_id}>
                                        <RenderCell fetch={this.fetchData} column_id={column.column_id} cell={null} index={column.cells.length}/>
                                    </div>
                                    : null}

                            </div>
                        </div>
                    ))}
                </div>
                
            </div>   
        );
    }
}

