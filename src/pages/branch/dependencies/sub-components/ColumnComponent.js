import React, {Component} from 'react';
import Cookies from 'universal-cookie/lib';
import Host from '../../../../Host'
import axios from 'axios'
import {InputBase, Paper} from "@material-ui/core";

const cookies = new Cookies()

export default class ColumnComponent extends Component {

    constructor(params) {
        super(params);
        this.state={
            column_id: params.column_id,
            column_name:params.column_name,
            name: null,
            saved: null,
            canEdit: params.canEdit
        }
        this.handleChange = this.handleChange.bind(this);
        this.saveData = this.saveData.bind(this)
    }

    handleChange(event){
        this.setState({
            name: event.target.value,
            saved: false
        })
    }
    async saveData(key){
        if (key.key === "Enter"){

            try {
                await axios({
                    method: 'put',
                    url: Host() + 'api/branch/update/column',
                    headers:{'authorization':(cookies).get("JWT")},
                    data: {
                        column_id: this.state.column_id,
                        name: this.state.name,
                    }
                }).then(()=>{
                    this.props.registerChange()
                    this.setState({
                        saved:true
                    })
                })
                    .catch(error => {
                        console.log(error)})
            } catch (error) {
                console.log(error)
            }
        }

    }

    render() {
        return (
            <Paper
                style={{
                    backgroundColor: '#272e38',
                    height:'6vh',
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom:'1vh',
                    marginTop:'1vh',
                    justifyContent:'space-between',
                    border:(this.state.cell !== null && this.state.saved !== null? (this.state.saved === true ? "#39adf6 3px solid" : "#e34f50 3px solid"): null)
                }}
                key={this.state.column_id + "-column"}

            >
                <InputBase
                    defaultValue={this.state.column_name}
                    placeholder={this.props.cell === null? "New": null}
                    onChange={this.handleChange}
                    onKeyDown={key => this.saveData(key)}
                    disabled={!this.state.canEdit}
                    variant="outlined"
                    style={{marginLeft:'10px'}}
                />
            </Paper>
        )
    }
}

