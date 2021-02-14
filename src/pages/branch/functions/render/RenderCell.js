import React, {Component} from 'react';
import Cookies from 'universal-cookie/lib';
import Host from '../../../../Host'
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
                this.props.registerChange()
                this.props.registerDeletion(this.props.columnIndex)
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
                    }).then(res => {
                        this.props.registerChange()
                        this.props.registerCreation(this.props.columnIndex, res.data)
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
                    }).then(() => {
                        this.props.registerChange()
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
            <div className="cell_container" key={this.props.cell !== null ? this.props.cell.id : this.props.column_id+"new cell"+this.props.index}>
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
                        value={this.props.cell !== null? (this.state.content.length > 0 ? this.state.content: this.props.cell.content): this.state.content}
                        placeholder={this.props.cell === null? "New": null}
                        onChange={this.handleChange}
                        onKeyDown={key => this.saveData(key)}
                        disabled={!this.state.canEdit}
                        variant="outlined"
                        style={{marginLeft:'10px'}}
                    />
                    {this.props.deletable === true && this.state.canEdit === true?
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

