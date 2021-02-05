import React from 'react'
import Cookies from "universal-cookie";
import {Redirect} from "react-router-dom";
export default class ProfileRedirectComponent extends React.Component{
    constructor() {
        super();
        this.state={
            sign_in: null
        }
        this.redirect = this.redirect.bind(this)
    }
    componentDidMount() {

    }
    redirect(){
        if(typeof (new Cookies()).get("JWT") !== 'undefined'){
            alert("NOT UNDEFINED")
            this.setState({
                sign_in: false
            })
        }

        else
            this.setState({
                sign_in: true
            })

        if(this.state.sign_in === true)
            return <Redirect to={"/authenticate"}/>
        else
            return <Redirect to={"/profile/"+(new Cookies()).get("ID")}/>

    }
    render() {
        return (
            <this.redirect/>
        );
    }
}

