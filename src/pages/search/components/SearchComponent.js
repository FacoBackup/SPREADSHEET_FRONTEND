import {createMuiTheme} from "@material-ui/core/styles";
import {ThemeProvider} from "@material-ui/styles";
import React from 'react'
import "../../profile/styles/SocialStyle.css"
import "../styles/SearchComponentStyle.css"
import fetch from "../functions/FetchData";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InfiniteScroll from "react-infinite-scroll-component";
import RenderAsUser from '../../shared/components/RenderAsUser'
import RenderAsGroup from '../functions/RenderAsGroup'

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
        this.setState({
            loading: true
        })
        if (input.length > 0) {
            let response = await fetch(!this.state.asUser, this.state.maxID, input)
            this.setState({
                subjects: response.subjects,
                maxID: response.max_id
            })
        } else
            this.setState({
                subjects: [],
                maxID: null
            })
        this.setState({
            loading: false
        })
    }

    render() {
        return (
           <ThemeProvider theme={theme}>
               <div className="search_component">

                   <div className="search_box_container">
                       <FormControl component="fieldset">
                           <RadioGroup aria-label="option" name="group"
                                       value={this.state.asUser === false ? "group" : "user"}
                                       onChange={this.handleChange}>
                               <FormControlLabel value="user" control={<Radio/>} label="User"/>
                               <FormControlLabel value="group" control={<Radio/>} label="group"/>
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
                                   {this.state.asUser === true ? <RenderAsUser subject={subject}/> : RenderAsGroup(subject)}
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