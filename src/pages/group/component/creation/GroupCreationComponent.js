import axios from 'axios';
import Button from '@material-ui/core/Button'
import Modal from "@material-ui/core/Modal"
import Avatar from '@material-ui/core/Avatar'
import TextField from '@material-ui/core/TextField';
import "../../styles/GroupOptionsStyle.css.css"
import React from 'react'
import GroupSearchComponent from '../../../shared/components/GroupSearchComponent'
import Host from '../../../../Host'
import Cookies from 'universal-cookie';
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

class GroupCreationComponent extends React.Component {
    constructor(params) {
        super(params)
        this.state = {
            token: (new Cookies()).get("JWT"),
            name: '',
            about: '',
            groupPic: null,
            relatedGroup: {},
            created: null,
            date: new Date(),
            groupModal: false,
            errorMessage: null
        }
        this.handleChange = this.handleChange.bind(this)
        this.createGroup = this.createGroup.bind(this)
    }

    componentDidMount() {

        this.timerID = setInterval(
            () => this.tick(),
            1000
        );

    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {

        const parsedgroup = (sessionStorage.getItem("SELECTED_group") !== null) ? JSON.parse(sessionStorage.getItem("SELECTED_group")) : null
        if (typeof this.state.relatedGroup.groupID === 'undefined')
            this.setState({
                date: new Date(),
                relatedGroup: (parsedgroup !== null) ? parsedgroup : this.state.relatedGroup,
            });

        if (typeof this.state.relatedGroup.groupID !== 'undefined') {
            sessionStorage.removeItem("SELECTED_group")
            this.setState({

                groupModal: false,

            })
        }

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    async createGroup() {
        try{
            await axios({
                method: 'post',
                url: Host() + 'api/group',
                headers: {"Authorization": 'Bearer ' + this.state.token},
                data: {
                    about: this.state.about,
                    name: this.state.name,
                    relatedGroupID: this.state.relatedGroup.groupID !== 'undefined' ? this.state.relatedGroup.groupID : null,
                    pic: this.state.groupPic
                }
            }).then(() => {
                this.setState({
                    created: true
                })
            }).catch(error => {
                this.setState({
                    created: false,
                    errorMessage: error.message
                })
                console.log(error)
            })
        }catch (e){
            this.setState({
                created: false,
                errorMessage: e.message
            })
            console.log(e)
        }

    }

    getPic(event) {

        this.setState({
            groupPic: null
        })

        let reader = new FileReader();

        if (!event[0].name.match(/.(jpg|jpeg|png|gif)$/i)) {
            alert('not an image')
            this.setState({
                groupPic: null
            })
        } else {
            reader.readAsDataURL(event[0]);
            reader.onload = () => {
                this.setState({
                    groupPic: reader.result
                })
            }
        }
    }

    imageRender() {
        if (this.state.groupPic !== null)
            return (
                <div>
                    <h5 style={{textAlign: 'center'}}>Selected Image</h5>
                    <div style={{display: 'flex', justifyContent: 'center'}}>

                        <img style={{margin: 'auto', width: '20vw', borderRadius: '8px'}} alt="topic"
                             src={this.state.groupPic}/>
                    </div>
                </div>


            )
    }
    Alert(props) {
        return (<MuiAlert elevation={4} variant="filled" {...props}/>)
    }
    renderSelectedgroup() {
        if (typeof this.state.relatedGroup.groupID !== 'undefined' && (this.state.relatedGroup.role !== null && typeof this.state.relatedGroup.role !== 'undefined') )
            return (
                <div className="personas_container">
                    <Avatar src={this.state.relatedGroup.imageURL} style={{height:'65px', width:'65px'}} alt={"group"}/>
                    <ul>
                        <li>{this.state.relatedGroup.name}</li>
                        <li>{this.state.relatedGroup.about}</li>
                    </ul>
                </div>
            )
    }

    render() {
        return (

            <div className="group_creation_component">
                <div className="group_creation_title">
                    <p>Create a
                        Group</p>
                </div>
                <div className="group_creation_fields">
                    <TextField variant="outlined" label="Name" name='name' style={{width:'35vw'}} onChange={this.handleChange}/>
                    <TextField variant="outlined" label="About This Group" name='about' onChange={this.handleChange}/>

                    {this.imageRender()}


                </div>
                <div className="group_creation_buttons">
                    {this.state.groupPic === null ?
                        <div>
                            <input id="group_pic" type="file" style={{display: 'none'}}
                                   onChange={event => this.getPic(event.target.files)}/>
                            <label htmlFor="group_pic">

                                <Button
                                    component="span"
                                    variant="outlined"  style={{ color:'white'}}
                                >

                                    Upload image
                                </Button>
                            </label>
                        </div>:
                        <Button variant="outlined"  style={{border:'#e34f50 2px solid', color:'white'}} onClick={() => this.setState({
                            groupPic: null
                        })}>Remove Image</Button>
                    }
                    <Button variant="outlined"  style={{border:'#39adf6 2px solid', color:'white'}} onClick={this.createGroup}>Create</Button>
                </div>
                <Snackbar open={this.state.created !== null} autoHideDuration={4000} onClose={() => this.setState({
                    created: null,
                    errorMessage: null
                })}>
                    <this.Alert
                        severity={this.state.created? "success":"error"}>{!this.state.created ? ("Some error occurred ("+this.state.errorMessage+")") : "Created With Success"}</this.Alert>
                </Snackbar>
            </div>
        )
    }
}

export default GroupCreationComponent