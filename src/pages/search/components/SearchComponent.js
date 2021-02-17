import {createMuiTheme} from "@material-ui/core/styles";
import {ThemeProvider} from "@material-ui/styles";
import React from 'react'
import "../styles/SearchComponentStyle.css"
import fetchForwardSearchData from "../functions/FetchSearchForwardData";
import RenderAsUser from '../../shared/components/RenderAsUser'
import RenderAsGroup from '../functions/RenderAsGroup'
import Cookies from "universal-cookie/lib";
import RenderAsBranch from "../../shared/components/branches/RenderBranch";
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import Button from "@material-ui/core/Button";
import fetchBackwardSearchData from "../functions/FetchSearchBackwardData";

const theme = createMuiTheme({
    palette: {
        type: "dark"
    }
});

class SearchComponent extends React.Component {

    constructor(params) {
        super(params)
        this.state = {
            token: params.token,
            users: [],
            groups: [],
            branches:[],
            userMaxID: null,
            groupMaxID: null,
            branchMaxID: null,
            input: params.input,
            asUser: params.asUser,
            page: -1

        }
        this.fetchData = this.fetchData.bind(this)
    }

    componentDidMount() {
        this.fetchData(true).catch(r => console.log(r))
    }

    async fetchData(forward) {
        let input = this.state.input
        this.setState({
            loading: true,
        })

        if (input.length > 0 && forward) {
            let response = await fetchForwardSearchData(this.state.userMaxID, this.state.groupMaxID, this.state.branchMaxID, input)

            this.setState({
                users: response.users.users,
                userMaxID: response.users.max_id,
                groups: response.groups.groups,
                groupMaxID: response.groups.max_id,
                branches: response.branches.branches,
                branchMaxID: response.branches.max_id,
                page: this.state.page + 1
            })
        }
        else if (input.length > 0){
            const userMinID = (this.state.users.length > 0 ? this.state.users[0].id : null)
            const groupMinID = (this.state.groups.length > 0 ? this.state.groups[0].id : null)
            const branchMinID = (this.state.branches.length > 0 ? this.state.branches[0].id : null)
            let response = await fetchBackwardSearchData(userMinID, groupMinID, branchMinID, input)

            this.setState({
                users: response.users.users,
                userMaxID: response.users.max_id,
                groups: response.groups.groups,
                groupMaxID: response.groups.max_id,
                branches: response.branches.branches,
                branchMaxID: response.branches.max_id,
                page: this.state.page - 1
            })
        }
        this.setState({
            loading: false
        })
    }

    render() {
        return (
           <ThemeProvider theme={theme}>
               <div className="search_component"  style={{textAlign:'center'}}>
                   <div style={{display: 'flex', justifyContent: "space-between", marginTop:'1vh', width:'36vw'}}>
                       <Button onClick={() => this.fetchData(false)} disabled={this.state.page === 0}><ArrowBackRoundedIcon style={{fontSize:'35px'}}/></Button>
                       <p>{this.state.page}</p>
                       <Button onClick={() => this.fetchData(true)} disabled={this.state.users.length < 3 && this.state.groups.length < 3 && (typeof (new Cookies()).get("JWT") !== 'undefined' ? this.state.branches.length < 3 : true)}><ArrowForwardRoundedIcon style={{fontSize:'35px'}}/></Button>
                   </div>
                   <div style={{borderBottom:'#262d37 2px solid'}}>
                       <p>Users</p>
                       {this.state.users.length > 0 ?
                           this.state.users.map((user) =>
                               <>
                                   <RenderAsUser subject={user}/>
                               </>
                           )
                           :
                           <p style={{color:'#aaadb1'}}>Nothing found</p>
                       }
                   </div>

                   <div style={{borderBottom:'#262d37 2px solid'}}>
                       <p>Groups</p>
                       {this.state.groups.length > 0 ?
                           this.state.groups.map((group) =>
                               <>
                                   {RenderAsGroup(group)}
                               </>
                           )
                           :
                           <p style={{color:'#aaadb1'}}>Nothing found</p>
                       }
                   </div>

                   {typeof (new Cookies()).get("JWT") !== undefined ?
                       <div style={{borderBottom:'#262d37 2px solid'}}>
                           <p>Branches</p>
                           {this.state.branches.length > 0 ?
                               this.state.branches.map((branch) =>
                                    <>
                                        <RenderAsBranch branch={branch} user_id={parseInt((new Cookies()).get("ID"))}/>
                                    </>
                                )
                               :
                               <p style={{color:'#aaadb1'}}>Nothing found</p>
                           }
                       </div>
                   :
                        null
                   }
               </div>
            </ThemeProvider> 
        )
    }
}

export default SearchComponent