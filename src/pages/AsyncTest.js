import fetchProfileData from "./profile/functions/FetchData";
import React from "react";
import Cookies from "universal-cookie/lib";
export default class AsyncTest extends React.Component{
    constructor() {
        super();
        this.state={
            value: {},
            date: new Date()
        }
    }
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            500
        )
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.fetchData().catch(r => console.log(r))
        this.setState({
            date: new Date(),
        });
    }

    async fetchData() {
        this.setState({
            value: {}
        })
        const response = await fetchProfileData(parseInt(new Cookies().get("ID")))
        this.setState({
            value: response.profile
        })
    }


    render() {

        return(
            <div>
                <p>value: {this.state.value.name}</p>
            </div>
        )
    }
}