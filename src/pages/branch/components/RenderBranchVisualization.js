import React, {Component} from 'react';
import Cookies from 'universal-cookie/lib';
import Host from '../../../Host'
import axios from 'axios'
import RenderCell from './RenderCell';
import {AvatarGroup} from "@material-ui/lab";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import SaveAltRoundedIcon from "@material-ui/icons/SaveAltRounded";
import fetchBranchData from "../functions/FetchData";

const cookies = new Cookies()

export default class BranchVisualization extends Component {
    column_name;
    
    constructor(params) {
        super();
        this.state={
            branchID: params.branch_id,
            content: [],
            contributors: [],
            modal: false
        }
        this.fetchData = this.fetchData.bind(this)
    }

    componentDidMount(){
        this.fetchData().catch(r => console.log(r))
        cookies.remove("CHANGES")
    }

    async fetchData(){
        const response = await fetchBranchData(this.state.branchID)
        this.setState({
            content: response.content,
            contributors: response.contributors
        })
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
                        <SaveAltRoundedIcon style={{marginRight:'10px'}}/> Commit
                    </Button>
                    <Button>cafe</Button>
                    <Button>cafe</Button>
                    <Button>cafe</Button>
                    <Button>cafe</Button>
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
                                        <RenderCell column_id={column.column_id} cell={cell} index={index}/>
                                    </div>
                                ))}
                                <div key={"new"+column.column_id}>
                                    <RenderCell fetch={this.fetchData} column_id={column.column_id} cell={null} index={column.cells.length}/>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
            </div>   
        );
    }
}

