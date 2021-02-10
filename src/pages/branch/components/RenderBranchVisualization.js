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
import RenderAsUser from '../../shared/components/RenderAsUser'
import Modal from '@material-ui/core/Modal'

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
            canMakeBranch: false,
            canEdit: false
        }
        this.renderModal = this.renderModal.bind(this)
        this.fetchData = this.fetchData.bind(this)
    }

    componentDidMount(){
        this.fetchData().catch(r => console.log(r))
        this.verifyMember().catch(r => console.log(r))
        cookies.remove("CHANGES")
    }

    async fetchData(){
        const response = await fetchBranchData(this.state.branchID)
        for(let i =0; i< response.contributors.length; i++){
            if (response.contributors[i].id === parseInt(cookies.get("ID")))
                this.setState({
                    canEdit: true,
                })
        }

        this.setState({
            content: response.content,
            contributors: response.contributors
        })
    }

    async verifyMember(){
        const response = await verifyMemberByBranch(this.state.branchID)

        this.setState({canMakeBranch: response})
    }
    renderModal(){
        if(this.state.modal === true)
            return(
                <Modal open={this.state.modal} onClose={() => this.setState({
                    modal:false
                })} style={{ display:'grid', justifyContent:'center', alignContent: "center"}}>
                    <div style={{width:'600px', height:'600px',margin:'auto',display:'grid', justifyContent:'center', justifyItems:'center', alignContent: "flex-start", backgroundColor:'#303741'}}>
                        <p>Contributors</p>
                        {this.state.contributors.map((user)=>(
                            <RenderAsUser subject={user}/>
                        ))}
                    </div>
                </Modal>
            )
        else
            return (null)
    }
    render() {    
        return (
            <div >
                <this.renderModal/>
                <div  className={"control_bar_container"}>
                    {/* <ButtonGro */}
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
                    <Button disabled><GetAppRoundedIcon style={{marginRight:'10px'}}/>Download</Button>
                    <Button disabled><AccountTreeRoundedIcon style={{marginRight:'10px'}}/>Make Branch</Button>
                    <Button disabled><DeviceHubRoundedIcon style={{marginRight:'10px'}}/>Merge with master</Button>
                    <Button disabled><MeetingRoomRoundedIcon style={{marginRight:'10px'}}/>Give up as a contributor</Button>
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
                                        <RenderCell canMakeBranch={this.state.canMakeBranch} column_id={column.column_id} cell={cell} index={index}/>
                                    </div>
                                ))}
                                {this.state.canEdit === true ?
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

