import React, {Component} from 'react';
import Cookies from 'universal-cookie/lib';
import AccountTreeRoundedIcon from '@material-ui/icons/AccountTreeRounded';
import CellComponent from '../dependencies/sub-components/CellComponent';
import {AvatarGroup} from "@material-ui/lab";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import fetchBranchData from "../dependencies/fetch/FetchData";
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import DeviceHubRoundedIcon from '@material-ui/icons/DeviceHubRounded';
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
import RenderAsUser from '../../shared/components/RenderAsUser'
import Modal from '@material-ui/core/Modal'
import ColumnComponent from "../dependencies/sub-components/ColumnComponent";
import RenderRepositoryBranches from '../../shared/components/RenderRepositoryBranches'
import RenderCommitsComponent from "../dependencies/sub-components/CommitComponent";
import StorageRoundedIcon from '@material-ui/icons/StorageRounded';
import BranchCreationComponent from "../dependencies/sub-components/BranchCreationComponent";
import checkAccess from "../../shared/functions/CheckAccessBranch";
import RenderExportComponent from "../dependencies/sub-components/ExportComponent";
import ContributorComponent from "../dependencies/sub-components/ContributorComponent";

const cookies = new Cookies()

export default class BranchComponent extends Component {
    column_name;
    
    constructor(params) {
        super();
        this.state={
            branch_id: params.branch_id,
            repository: {},
            branch:{},
            content: [],
            contributors: [],

            openCommit: false,
            canMakeBranch: false,
            canEdit: false,
            changed: false,

            downloadOption: false,
            contributorsOption: false,
            branchesOption: false,
            commitsOption: false,
            createBranchOption: false,
            addContributorOption: false
        }

        this.renderModal = this.renderModal.bind(this)
        this.fetchData = this.fetchData.bind(this)
        this.registerCommit = this.registerCommit.bind(this)
        this.registerDeletion = this.registerDeletion.bind(this)
        this.registerChange = this.registerChange.bind(this)
        this.registerCreation = this.registerCreation.bind(this)
    }

    componentDidMount(){
        this.fetchData().catch(r => console.log(r))
    }

    async fetchData(){
        const response = await fetchBranchData(this.state.branch_id)
        const access = await checkAccess(this.state.branch_id)

        this.setState({
            content: response.content,
            contributors: response.contributors,
            repository: response.repository,
            branch: response.branch,
            canMakeBranch: response.canMakeBranch,
            canEdit: response.canEdit && access,
            openCommit: response.openCommit,
            changed: response.openCommit && response.canEdit
        })

        for(let i =0; i< response.contributors.length; i++){
            if (response.contributors[i].id === parseInt(cookies.get("ID")))
                this.setState({
                    canEdit: !!this.state.canEdit,
                })
        }
    }

    registerChange(){
        if(!this.state.changed)
            this.setState({
                changed: true
            })
    }

    registerCreation(column_index, new_cell){
        let new_array = this.state.content
        new_array[column_index].cells.push(new_cell)

        this.setState({
            content: new_array
        })
    }

    registerDeletion(column_index){

        let new_array = this.state.content
        new_array[column_index].cells.pop()
        this.setState({
            content: new_array
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
            <Modal open={this.state.addContributorOption || this.state.downloadOption || this.state.branchesOption || this.state.openCommit || this.state.commitsOption || this.state.contributorsOption || this.state.createBranchOption} onClose={() => this.setState({
                branchesOption:false,
                commitsOption: false,
                contributorsOption: false,
                createBranchOption: false,
                openCommit: false,
                downloadOption: false,
                addContributorOption: false
            })} style={{ display:'grid', justifyContent:'center', alignContent: "center", textAlign:'center'}}>
                <div className={"modal_style"} style={{width:(this.state.downloadOption ? "13vw" : null), height: (this.state.downloadOption || this.state.openCommit ? "10vh": null),alignContent:(this.state.downloadOption || this.state.openCommit ? "center" : null)}}>
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
                            <RenderCommitsComponent branch_id={this.state.branch.id}/>
                        </div>
                        :
                        null
                    }
                    {this.state.createBranchOption ?
                        <div>
                            <p>Create Branch</p>
                            <BranchCreationComponent targetBranchId={this.state.branch_id}/>
                        </div>
                        :
                        null
                    }
                    {this.state.openCommit ?
                        <div>
                            <h3>This branch has changes not yet finalized.</h3>
                        </div>
                        :
                        null
                    }
                    {this.state.downloadOption ?
                        <div>
                            <RenderExportComponent branch_id={this.state.branch_id} branch_name={this.state.branch.name}/>
                        </div>
                        :
                        null
                    }
                    {this.state.addContributorOption ?
                        <div>
                            <ContributorComponent branch_id={this.state.branch_id}/>
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
            <div>
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
                        {(this.state.canEdit) ? <Button
                            style={{textTransform:'none', border: (this.state.changed ? "#39adf6 2px solid" : null)}}
                            variant="outlined"
                            onClick={() => this.registerCommit()}>
                            <SaveRoundedIcon style={{marginRight:'10px'}}/> Commit
                        </Button> : null}
                        <Button style={{textTransform:'none'}} onClick={()=> this.setState({
                            commitsOption: true
                        })} variant={"outlined"}
                        ><StorageRoundedIcon style={{marginRight:'10px'}}/>Commits</Button>
                        <Button variant={"outlined"} style={{textTransform:'none'}} onClick={() => this.setState({
                            downloadOption: true
                        })}>
                            <GetAppRoundedIcon style={{marginRight:'10px'}}/>Download
                        </Button>
                        <Button onClick={() => this.setState({createBranchOption: true})} style={{textTransform:'none'}} variant={"outlined"}>
                            <AccountTreeRoundedIcon style={{marginRight:'10px'}}/>Branch
                        </Button>
                        {this.state.branch.is_master ? null :(this.state.canEdit) ? <Button onClick={() => this.props.merge()} style={{textTransform:'none'}} variant={"outlined"}>
                            <DeviceHubRoundedIcon style={{marginRight: '10px'}}/>
                            Merge
                        </Button> : null}
                        {(this.state.canEdit) ? <Button variant={"outlined"} onClick={() => this.setState({
                            addContributorOption: true
                        })}><PersonAddRoundedIcon/></Button> : null}
                    </div>
                </div>
                <div  className="table_container">
                    {this.state.content !== undefined ? this.state.content.map((column, column_index) => (
                        <div className="column_container" key={column.column_id}>
                            <div className="column_title_container">
                                <ColumnComponent registerChange={this.registerChange} fetch={this.fetchData} canEdit={this.state.canEdit} column_id={column.column_id} column_name={column.column_name}/>
                            </div>
                            <div style={{marginTop:'1vh'}}>
                                {column.cells.map((cell, cell_index) =>(
                                    <div key={cell.id}>
                                        <CellComponent registerDeletion={this.registerDeletion} columnIndex={column_index} registerChange={this.registerChange} deletable={cell_index === (column.cells.length - 1)} canEdit={this.state.canEdit} canMakeBranch={this.state.canMakeBranch} column_id={column.column_id} cell={cell} index={cell_index}/>
                                    </div>
                                ))}
                                {this.state.canEdit ?
                                    <div key={column.cells.length+" - column - "+column.column_id}>
                                        <CellComponent columnIndex={column_index} registerCreation={this.registerCreation} registerChange={this.registerChange} fetch={this.fetchData} canEdit={true} column_id={column.column_id} cell={null} index={column.cells.length}/>
                                    </div>
                                    : null}
                            </div>
                        </div>
                    )) : null}
                </div>
                
            </div>   
        );
    }
}

