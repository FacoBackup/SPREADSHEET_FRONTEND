import React, {Component} from 'react';
// import "../shared/styles/PageModel.css"
import Cookies from 'universal-cookie/lib';
import Host from '../../../Host'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'

const cookies = new Cookies()

export default class RenderCell extends Component {
    
    constructor(params) {
        super(params);
        this.state={
            cell: params.cell,
            column_id: params.column_id,
            content: '',
            changed: false,
            index: params.index,
            visualization: params.visualization
        }
        this.handleChange = this.handleChange.bind(this);
        this.saveData = this.saveData.bind(this)
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
                            content: this.state.content
                        }
                    }).then(res => {
                        console.log(res)
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
                <p style={{marginRight:'.5vw'}}>{this.props.index}</p>
                
                <TextField 
                    id={this.props.cell !== null? ""+this.props.cell.id : ""+(this.state.column_id+this.state.index)}
                    value={this.props.cell !== null? (this.state.content.length > 0 ? this.state.content:this.state.cell.content): this.state.content}
                    onChange={this.handleChange} 
                    onKeyDown={key => this.saveData(key)}
                    disabled={this.state.visualization}
                    variant="outlined"
                    style={{border:(this.state.changed === true && this.state.cell !== null? "#39adf6 4px solid": null), borderRadius:(this.state.changed === true && this.state.cell !== null? "8px": null)}}
                />
            </div>
        );
    }
}

