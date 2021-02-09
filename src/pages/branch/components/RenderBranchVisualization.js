import React, {Component} from 'react';
// import "../shared/styles/PageModel.css"
import Cookies from 'universal-cookie';
import Host from '../../../Host'
import axios from 'axios'
import RenderCell from './RenderCell';

const cookies = new Cookies()

export default class BranchVisualization extends Component {
    
    constructor(params) {
        super(params);
        this.state={
            branchID: params.branch_id,
            content: []
        }
        this.fetchData = this.fetchData.bind(this)
    }
    componentDidMount(){
        this.fetchData()
        
        cookies.remove("CHANGES")
        
    }

    async fetchData(){
        try {
            await axios({
                method: 'patch',
                url: Host() + 'api/get/branch/content',
                headers:{'authorization':(new Cookies()).get("JWT")},
                data: {
                    branch_id: this.state.branchID
                }
            }).then(res => {
                console.log(res)
                
                this.setState({
                    content: res.data
                })
            })
            .catch(error => console.log(error))
        } catch (error) {
            
            console.log(error)
        }
    }
    
    render() {    
        return (
            <div >
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

