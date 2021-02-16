import React from 'react'
import {createMuiTheme} from "@material-ui/core/styles";
import {ThemeProvider} from "@material-ui/styles";
import axios from 'axios';
import Cookies from 'universal-cookie/lib';
import Host from '../../../../Host'
import InfiniteScroll from 'react-infinite-scroll-component'
import RenderBranch from '../../../shared/components/branches/RenderBranch'

const theme = createMuiTheme({
    palette: {
        type: "dark"
    }
});

let cookies = new Cookies()

class UserBranchesComponent extends React.Component {
    constructor(params) {
        super(params)
        this.state = {
           userID: params.user_id,
           branches: [],
           max_id: null,
           hasMore: true
        }
    }
    componentDidMount(){
        this.fetchData().catch(r => console.log(r))
    }
    async fetchData() {
        try {
            await axios({
                method: 'get',
                url: Host() + 'api/user/branches',
                params: {
                    user_id: this.state.userID,
                    max_id: this.state.max_id
                }
            }).then(res => {
                this.setState({
                    branches: res.data,
                    max_id: res.data.length > 0 ? res.data[0].id : null,
                    hasMore: res.data.length >= 10
                })
            })
            .catch(error => console.log(error))
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                 <div>
                     <p style={{textAlign:'center'}}>Contributor in</p>
                    {this.state.branches.length > 0 ?
                        <InfiniteScroll
                            dataLength={this.state.branches.length}
                            next={() => this.fetchData()}

                            inverse={true}
                            hasMore={this.state.hasMore}
                            loader={console.log("LOADING")}>
                            {this.state.branches.map((branch) =>(
                                <RenderBranch user_id={this.state.userID} branch={branch} />
                            ))}
                        </InfiniteScroll>: 
                        <p style={{textAlign:'center', color:'#aaadb1'}}>{this.state.userID === parseInt(cookies.get("ID")) ? "You're n" : "N"}ot a contributor in any repository</p>
                }
                 </div>
            </ThemeProvider>
        )
    }
}

export default UserBranchesComponent