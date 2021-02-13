import React, {Component} from 'react';
import Cookies from 'universal-cookie/lib';
import AccountTreeRoundedIcon from '@material-ui/icons/AccountTreeRounded';
import RenderCell from '../functions/render/RenderCell';
import {AvatarGroup} from "@material-ui/lab";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import fetchBranchData from "../functions/fetch/FetchData";
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import DeviceHubRoundedIcon from '@material-ui/icons/DeviceHubRounded';
import MeetingRoomRoundedIcon from '@material-ui/icons/MeetingRoomRounded';
import RenderAsUser from '../../shared/components/RenderAsUser'
import Modal from '@material-ui/core/Modal'
import RenderColumn from "../functions/render/RenderColumn";
import RenderRepositoryBranches from '../../shared/components/RenderRepositoryBranches'
import RenderCommits from "../functions/render/RenderCommits";
import fetchBranchContent from "../functions/fetch/FetchBranchContent";
import StorageRoundedIcon from '@material-ui/icons/StorageRounded';

const cookies = new Cookies()

export default class BranchVisualization extends Component {
    column_name;
    
    constructor(params) {
        super();
        this.state={
            branch_id: params.branch_id,
            repository: {},
            branch:{},
            content: [],
            contributors: [],
            canMakeBranch: false,
            canEdit: false,
            contributorsOption: false,
            branchesOption: false,
            commitsOption: false,
            changed: false
        }
        this.registerCommit = this.registerCommit.bind(this)
        this.renderModal = this.renderModal.bind(this)
        this.fetchData = this.fetchData.bind(this)
        this.registerDeletion = this.registerDeletion.bind(this)
        this.registerChange = this.registerChange.bind(this)
        this.fetchContent = this.fetchContent.bind(this)
    }

    //FETCH
    componentDidMount(){
        this.fetchData().catch(r => console.log(r))
    }

    async fetchContent(){
        const response = await fetchBranchContent(this.state.branch_id)
        this.setState({
            content: response.content
        })
    }

    async fetchData(){
        const response = await fetchBranchData(this.state.branch_id)
        for(let i =0; i< response.contributors.length; i++){
            if (response.contributors[i].id === parseInt(cookies.get("ID")))
                this.setState({
                    canEdit: true,
                })
        }

        this.setState({
            content: response.content,
            contributors: response.contributors,
            repository: response.repository,
            branch: response.branch,
            canMakeBranch: response.canMakeBranch
        })
    }

    registerChange(){
        if(!this.state.changed)
            this.setState({
                changed: true
            })
    }

    registerDeletion(){
        this.fetchContent().catch(error => console.log(error))
        if(!this.state.changed)
            this.setState({
                changed: true
            })
    }

    registerCommit(){
        this.props.make_commit()
        this.setState({
            changed: false
        })
    }

    renderModal(){
        return(
            <Modal open={this.state.branchesOption || this.state.commitsOption || this.state.contributorsOption} onClose={() => this.setState({
                branchesOption:false,
                commitsOption: false,
                contributorsOption: false
            })} style={{ display:'grid', justifyContent:'center', alignContent: "center", textAlign:'center'}}>
                <div className={"modal_style"}>
                    {this.state.branchesOption ? <RenderRepositoryBranches repository_id={this.state.repository.id}/> : null}
                    {this.state.contributorsOption ?
                        <div>
                            <p>Contributors</p>
                            {this.state.contributors.map((user)=>(
                                <RenderAsUser subject={user}/>
                            ))}
                        </div>
                        :
                        null
                    }
                    {this.state.commitsOption ?
                        <div>
                            <p>Commits</p>
                            <RenderCommits branch_id={this.state.branch.id}/>
                        </div>
                        :
                        null
                    }
                </div>
            </Modal>
        )
    }

    render() {    
        return (
            <div >
                <this.renderModal/>
                <div  className={"control_bar_container half_control_bar_container"}>
                    <div className={"half_control_bar_container"}>
                        <div>
                            {this.state.branches ? null:
                                <Button
                                    onClick={() => this.setState({
                                        branchesOption:true
                                    })}
                                    style={{display:'flex', height:'3vh', alignItems:'center', fontSize:'17px'}}>
                                    <p style={{fontWeight:'600'}}>{this.state.repository.name}/</p>
                                    <p style={{color:'#aaadb1'}}> {this.state.branch.name}</p>
                                </Button>
                            }
                        </div>

                        <Button onClick={() => this.setState({
                            contributorsOption: true
                        })}>
                            <AvatarGroup max={4}>
                                {this.state.contributors.map((user) => (
                                    <Avatar key={user.id} alt={user.name} src={user.pic}/>
                                ))}
                            </AvatarGroup>
                        </Button>
                    </div>
                    <div className={"half_control_bar_container"}>
                        <Button
                            disabled={!this.state.canEdit}
                            style={{textTransform:'none', border: (this.state.changed ? "#39adf6 2px solid" : null)}}
                            variant="outlined"
                            onClick={() => this.registerCommit()}>
                            <SaveRoundedIcon style={{marginRight:'10px'}}/> Commit
                        </Button>
                        <Button style={{textTransform:'none'}} onClick={()=> this.setState({
                            commitsOption: true
                        })} variant={"outlined"}
                        ><StorageRoundedIcon style={{marginRight:'10px'}}/>Commits</Button>
                        <Button disabled><GetAppRoundedIcon style={{marginRight:'10px'}}/>Download</Button>
                        <Button disabled><AccountTreeRoundedIcon style={{marginRight:'10px'}}/>Branch</Button>
                        {this.state.branch.is_master ? null : <Button disabled><DeviceHubRoundedIcon style={{marginRight: '10px'}}/>Merge</Button>}
                        <Button disabled><MeetingRoomRoundedIcon style={{marginRight:'10px'}}/>Give up as a contributor</Button>
                    </div>
                </div>
                <div  className="table_container">
                    {this.state.content.map((column) => (
                        <div className="column_container" >
                            <div className="column_title_container">
                                <RenderColumn  registerChange={this.registerChange} fetch={this.fetchData} canEdit={this.state.canEdit} column_id={column.column_id} column_name={column.column_name}/>
                            </div>
                            <div style={{marginTop:'1vh'}}>
                                {column.cells.map((cell, index) =>(
                                    <div key={cell.id}> 
                                        <RenderCell registerDeletion={this.registerDeletion} registerChange={this.registerChange} deletable={index === (column.cells.length - 1)} canEdit={this.state.canEdit} canMakeBranch={this.state.canMakeBranch} column_id={column.column_id} cell={cell} index={index}/>
                                    </div>
                                ))}
                                {this.state.canEdit ?
                                    <div key={"cell/"+column.cells.length+" - column/"+column.column_id}>
                                        <RenderCell registerChange={this.registerChange} fetch={this.fetchData} canEdit={true} column_id={column.column_id} cell={null} index={column.cells.length}/>
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

