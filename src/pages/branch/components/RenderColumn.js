import React, {Component} from 'react';
// import "../shared/styles/PageModel.css"
import Cookies from 'universal-cookie/lib';
import Host from '../../../Host'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'

const cookies = new Cookies()

export default class RenderColumn extends Component {

    constructor(params) {
        super(params);
        this.state={
            column_id: params.column_id,
            column_name:params.column_name,
            name: null,
            changed: false,
            canEdit: params.canEdit
        }
        this.handleChange = this.handleChange.bind(this);
        this.saveData = this.saveData.bind(this)
    }

    handleChange(event){
        this.setState({
            name: event.target.value
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
        }

    }

    render() {
        return (
            <TextField
                        key={this.state.column_id}
                        variant={"outlined"}
                       disabled={!this.state.canEdit}
                       style={{border:(this.state.changed === true ? "#39adf6 3px solid": null),
                           borderRadius:(this.state.changed === true? "8px": null),
                           marginBottom:'1vh',
                           marginTop:'1vh'
                       }}
                       defaultValue={this.state.column_name}
                       onChange={this.handleChange}
                       onKeyDown={key => this.saveData(key)}
            />
        )
    }
}

