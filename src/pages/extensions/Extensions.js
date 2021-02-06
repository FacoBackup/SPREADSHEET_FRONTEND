import React from 'react'
import TopBarComponent from "../shared/components/navigation/TopBarComponent";
import ProfileBar from "../shared/components/navigation/LeftBarComponent";
import fetchExtensions from "./functions/FetchData";

export default class Extensions extends React.Component{
    constructor() {
        super();
        this.state={
            subjects: [],
            max_id: null
        }
    }

    componentDidMount() {
        this.fetchData().catch(r => console.log(r))
    }

    async fetchData(){
        let response = fetchExtensions(this.state.max_id)
        this.setState({
            subjects: response.subjects,
            max_id: response.max_id
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
                        ok
                    </div>
                </div>
                <div className="left_components">
                    <ProfileBar extensions={true}/>
                </div>
            </div>
        )
    }
}