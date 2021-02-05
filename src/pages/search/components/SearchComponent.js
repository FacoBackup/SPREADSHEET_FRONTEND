import axios from 'axios';
import {createMuiTheme} from "@material-ui/core/styles";
import {ThemeProvider} from "@material-ui/styles";
import Button from '@material-ui/core/Button'
import React from 'react'
import "../../profile/styles/SocialStyle.css"
import Avatar from '@material-ui/core/Avatar'
import "../styles/SearchComponentStyle.css"
import Host from '../../../Host'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InfiniteScroll from "react-infinite-scroll-component";

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
            subjects: [],
            maxID: null,
            input: params.input,
            asUser: params.asUser

        }
        this.fetchData = this.fetchData.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.fetchData().catch(r => console.log(r))
    }

    handleChange(event) {
        if(event.target.name === "group"){
            console.log(event)
            this.setState({
                group: event.target.value === "group",
                subjects: [],
                maxID: null
            })

            this.fetchData(event.target.value).catch(r => console.log(r));
        }
        else{
            if(event.target.value.length === 0)
                this.setState({
                    subjects: [],
                    maxID: null
                })
            this.fetchData(event.target.value).catch(r => console.log(r));
        }

    }

    async fetchData(input) {
        try{

            if (input !== '' && this.state.group === false)
                await axios({
                    method: 'patch',
                    url: Host() + 'api/search/user',
                    data: {
                        max_id: this.state.maxID,
                        search_input: this.state.input
                    }
                }).then(res => {
                    console.log(res)
                    this.setState({
                        subjects: res.data,
                        maxID: (res.data.length > 0) ? res.data[res.data.length-1].userID : null
                    })

                }).catch(error => {
                    console.log(error)
                    this.setState({
                        subjects: [],
                        maxID: null
                    })
                })
            else if(input !== '' && this.state.group === true){
                await axios({
                    method: 'patch',
                    url: Host() + 'api/search/group',
                    headers: {"Authorization": 'Bearer ' + this.state.token},
                    data: {
                        maxID: this.state.maxID,
                        subjectName: input.toLowerCase()
                    }
                }).then(res => {
                    console.log(res)
                    this.setState({
                        subjects: res.data,
                        maxID: (res.data.length > 0) ? res.data[res.data.length-1].userID : null
                    })

                }).catch(error => {
                    console.log(error)
                    this.setState({
                        subjects: [],
                        maxID: null
                    })
                })
            }


        }catch (e) {
            console.log(e)
        }

    }

    renderAsUser(subject){
       if(this.state.asUser === true){
           return(
               <div style={{
                   width:'65%',
                   margin:'1vh auto',
                   display:'grid',
                   justifyContent:'center',
                   justifyItems:'center',
                   backgroundColor: '#3b424c',
                   borderRadius: '8px',
                   paddingRight: '10px',
                   paddingLeft: '10px'}}>
                   <div style={{
                       display: 'flex',
                       justifyContent: 'flex-start',
                       alignItems: 'center',
                       alignContent: 'center',

                   }}>
                       <Avatar
                           style={{height: '55px', width: '55px'}}
                           src={subject.imageURL}
                           alt="user"
                       />
                       <ul>
                           <li style={{fontSize: '17px', fontWeight: '400'}}>
                               {subject.name}
                           </li>
                           <ul>
                               <li style={{fontSize: '17px', fontWeight: '400', color: '#aaadb1'}}>
                                   {subject.email}
                               </li>
                               <li style={{fontSize: '17px', fontWeight: '400', color: '#aaadb1'}}>
                                   {subject.phone}
                               </li>
                           </ul>
                       </ul>
                   </div>
                   <div style={{
                       display: 'flex',
                       justifyContent: 'space-between',
                       justifyItems:'space-between',
                       width:'100%',
                       marginBottom:'1vh'

                   }}>
                       <Button href={"/profile/" + subject.userID } variant="outlined" style={{color:'white'}} disableElevation>See</Button>
                   </div>
               </div>
           )
       }
    }
    renderAsGroup(subject){
        if(this.state.asUser === false){
            return(
                <div style={{width:'65%', margin:'1vh auto', display:'grid', justifyContent:'center', justifyItems:'center',backgroundColor: '#3b424c',
                    borderRadius: '8px',
                    paddingRight: '10px',
                    paddingLeft: '10px'}}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        alignContent: 'center',

                    }}>
                        <Avatar
                            style={{height: '55px', width: '55px'}}
                            src={subject.imageURL}
                            alt="group"

                        />
                        <ul>
                            <li style={{fontSize: '17px', fontWeight: '400'}}>
                                {subject.name}
                            </li>

                            <li style={{fontSize: '17px', fontWeight: '400', color: '#aaadb1'}}>
                                {typeof subject.role !== 'undefined' && subject.role !== null ? "Your role: " + subject.role : subject.about}
                            </li>
                        </ul>
                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        justifyItems:'space-between',
                        width:'100%',
                        marginBottom:'1vh'
                    }}>
                        <Button href={"/component/" + subject.groupID } variant="contained" disableElevation style={{textTransform:'capitalize'}}>See</Button>
                    </div>
                </div>
            )
        }
    }
    render() {
        return (
           <ThemeProvider theme={theme}>
            <div className="search_component">

                <div className="search_box_container">
                    <FormControl component="fieldset">
                        <RadioGroup aria-label="option" name="group" value={this.state.asUser === false?  "group":"user"} onChange={this.handleChange}>
                            <FormControlLabel value="user" control={<Radio />} label="User" />
                            <FormControlLabel value="group" control={<Radio />} label="group" />
                        </RadioGroup>
                    </FormControl>
                </div>
                <div>
                    <InfiniteScroll
                        dataLength={this.state.subjects.length}
                        next={() => this.fetchData()}

                        inverse={true}
                        hasMore={this.state.maxID > 1}
                        loader={console.log("LOADING")}>
                        {this.state.subjects.map((subject) =>
                            <>
                                {this.renderAsGroup(subject)}
                                {this.renderAsUser(subject)}
                            </>
                        )}
                    </InfiniteScroll>

                </div>
            </div>
            </ThemeProvider> 
        )
    }
}

export default SearchComponent