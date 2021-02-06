import React from 'react'
import TopBarComponent from "../shared/components/navigation/TopBarComponent";
import ProfileBar from "../shared/components/navigation/LeftBarComponent";
import fetchExtensions from "./functions/FetchData";
import RenderAsUser from "../shared/components/RenderAsUser";
import RenderAsGroup from "../search/functions/RenderAsGroup";
import InfiniteScroll from "react-infinite-scroll-component";
import {Skeleton} from "@material-ui/lab";

export default class Extensions extends React.Component{
    max_id;
    subjects;
    constructor() {
        super();
        this.state={
            subjects: [],
            max_id: null,
            loading: true
        }
    }

    componentDidMount() {
        this.fetchData().catch(r => console.log(r))
    }

    async fetchData(){
        this.setState({
            loading: true
        })
        let response = await fetchExtensions(this.state.max_id)
        console.log("THIS IS THE RESPONSE")
        console.log(response)
        this.setState({
            subjects: response.subjects,
            max_id: response.max_id,
            loading:false
        })
    }

    render() {
        return(
            <div>
                <TopBarComponent/>
                <div className="profile_center_component">
                    <div className='profile_background_image_container'>

                    </div>
                    <div className="center_component">
                        {this.state.loading === true ?
                            <div style={{display:'flex', alignItems:'center', alignContent:'center', padding:'1vh'}}>
                                <Skeleton variant="circle" style={{backgroundColor:'#aaadb1', width:'50px', height: '50px'}}/>
                                <div style={{marginLeft:'1vw'}}>
                                    <Skeleton style={{backgroundColor:'#aaadb1', width:'25vw', height: '4vh'}}/>
                                    <Skeleton style={{backgroundColor:'#aaadb1', width:'20vw', height: '2vh'}}/>
                                    <Skeleton style={{backgroundColor:'#aaadb1', width:'22vw', height: '2vh'}}/>
                                </div>
                            </div>
                            :
                            <InfiniteScroll
                                dataLength={this.state.subjects.length}
                                next={() => this.fetchData()}

                                inverse={true}
                                hasMore={this.state.max_id > 1}
                                loader={console.log("LOADING")}>
                                {this.state.subjects.map((subject) =>

                                    <RenderAsUser subject={subject}/>

                                )}
                            </InfiniteScroll>
                        }
                    </div>
                </div>
                <div className="left_components">
                    <ProfileBar extensions={true}/>
                </div>
            </div>
        )
    }
}