import React, {Component} from 'react';
import Cookies from 'universal-cookie/lib';
import Host from '../../../Host'
import axios from 'axios'
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import {IconButton, InputBase, Paper} from "@material-ui/core";

const cookies = new Cookies()

export default class RenderCell extends Component {
    
    constructor(props) {
        super(props);
        this.state={
            cell: props.cell,
            column_id: props.column_id,
            content: '',
            changed: false,
            index: props.index,
            canMakeBranch: props.canMakeBranch,
            canEdit: props.canEdit
        }
        this.deleteCell = this.deleteCell.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveData = this.saveData.bind(this);
    }
    
    async deleteCell(){
        try {
            await axios({
                method: 'delete',
                url: Host() + 'api/branch/delete/cell',
                headers:{'authorization':(cookies).get("JWT")},
                data: {
                    cell_id: this.state.cell.id
                }
            }).then(() => {
                window.location.reload()
            }).catch(error => {
                console.log(error)})
        } catch (error) {
            console.log(error)
        }

    }
    handleChange(event){
        this.setState({
            content: event.target.value
        })
    }

    async saveData(key){
      if (key.key === "Enter"){
        switch(this.state.cell === null){
            case true:{
                try {
                    await axios({
                        method: 'post',
                        url: Host() + 'api/branch/cell',
                        headers:{'authorization':(cookies).get("JWT")},
                        data: {
                            column_id: this.state.column_id,
                            content: this.state.content,
                            row: this.props.index
                        }
                    }).then(() => {

                        this.props.fetch()
                        if(typeof cookies.get("CHANGES") !== 'undefined'){
                            const changes = parseInt(cookies.get("CHANGES"))
                            cookies.set("CHANGES", changes + 1)
                        }
                        else
                            cookies.set("CHANGES", 1)
                        this.setState({
                            content: '',
                            changed:true
                        })
                    })
                    .catch(error => console.log(error))
                } catch (error) {
                    console.log(error)
                }
                break;
            }
            case false:{
                try {
                    await axios({
                        method: 'put',
                        url: Host() + 'api/branch/update/cell',
                        headers:{'authorization':(cookies).get("JWT")},
                        data: {
                            cell_id: this.state.cell.id,
                            content: this.state.content,
                        }
                    }).then(res => {
                        console.log(res)
                        if(typeof cookies.get("CHANGES") !== 'undefined'){
                            const changes = parseInt(cookies.get("CHANGES"))
                            cookies.set("CHANGES", changes + 1)
                        }
                        else
                            cookies.set("CHANGES", 1)
                        
                        this.setState({
                            changed:true
                        })
                    })
                    .catch(error => {
                        console.log(error)})
                } catch (error) {
                    
                    console.log(error)
                }
                break;
            }
            default:{
                console.log("BUG")
                break;
            }
            }
        }
    }

    render() {    
        return (
            <div className="cell_container">
                <p style={{marginRight:'.5vw'}}>{this.props.cell !== null ? this.props.cell.row: this.props.index}</p>
                <Paper style={{
                    backgroundColor: '#272e38',
                    height:'6vh',
                    width: '90%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent:'space-between',
                    border:(this.state.changed === true && this.state.cell !== null? "#39adf6 3px solid": null), borderRadius:(this.state.changed === true && this.state.cell !== null? "8px": null)
                }}>
                    <InputBase
                        id={this.props.cell !== null? ""+this.props.cell.id : ""+(this.state.column_id+this.state.index)}
                        value={this.props.cell !== null? (this.state.content.length > 0 ? this.state.content:this.state.cell.content): this.state.content}
                        placeholder={this.props.cell === null? "New": null}
                        onChange={this.handleChange}
                        onKeyDown={key => this.saveData(key)}
                        disabled={!this.state.canEdit}
                        variant="outlined"
                        style={{marginLeft:'10px'}}
                    />
                    {this.props.deletable === true?
                        <IconButton aria-label="search"  onClick={()=> this.deleteCell()}>
                            <DeleteRoundedIcon/>
                        </IconButton>:
                        null
                    }
                </Paper>
            </div>
        );
    }
}

