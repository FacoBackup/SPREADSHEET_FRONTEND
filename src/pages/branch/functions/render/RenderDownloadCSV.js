import CsvDownload from "react-json-to-csv";
import React, {Component} from "react";
import axios from "axios";
import Host from "../../../../Host";
import Cookies from "universal-cookie/es6";

export default class RenderDownloadCSV extends Component {

    constructor(params) {
        super(params);
        this.state={
            package: {},
            branch_id: params.branch_id,
            branch_name: params.branch_name
        }
        this.fetchData = this.fetchData.bind(this)
    }

    componentDidMount() {
        this.fetchData().catch(r => console.log(r))
    }

    async fetchData(){
            try {
                await axios({
                    method: 'get',
                    url: Host() + 'api/export',
                    headers: {'authorization': (new Cookies()).get("JWT")},
                    params: {
                        branch_id: this.state.branch_id
                    }
                }).then(res => {
                    this.setState({
                        package: res.data
                    })
                }).catch(error => {
                        console.log(error)})
            } catch (error) {
                console.log(error)
            }
        }

    render() {
        return (
           <CsvDownload data={this.state.package} filename={this.state.branch_name + ".csv"}/>
        )
    }
}

