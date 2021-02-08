import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import {createMuiTheme} from "@material-ui/core/styles";
import {ThemeProvider} from "@material-ui/styles";
import axios from 'axios';
import Cookies from 'universal-cookie/lib';
import Host from '../../../../Host'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import getFile from "../../../shared/functions/GetImage";

const theme = createMuiTheme({
    palette: {
        type: "dark"
    }
});
let cookies = new Cookies()
class ProfileSettingsComponent extends React.Component {
    constructor(params) {
        super(params)
        this.state = {
            profile: params.profile,
            about: null,
            phone: null,
            privacy: null,
            background: params.profile.background,
            pic: params.profile.pic,
            study: null
        }
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount(){
        console.log(this.state.category)
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    async updateProfile() {
        try {
            await axios({
                method: 'put',
                url: Host() + 'api/update/profile',
                data: {
                    user_id: parseInt(cookies.get("ID")),
                    about: this.state.about,
                    phone: this.state.phone,
                    background: this.state.background,
                    pic: this.state.pic,
                    study: this.state.study
                }
            }).then(res => {
                console.log(res)
                window.location.reload()
            })
                .catch(error => console.log(error))
        } catch (error) {
            console.log(error)
        }
    }

    async getFile(event, name) {
        let image = await getFile(event)

        if (image != null)
            this.setState({
                [name]: image
            })
        else
            alert("Not an image")
    }

    render() {
        return (
            <div className="profile_settings_container">
                <ThemeProvider theme={theme}>
                    <div>
                        <p style={{
                            marginLeft: '5px',
                            fontSize: '17px',
                            fontWeight: '400',
                            textTransform: 'capitalize',
                            textAlign: 'center'
                        }}>Settings</p>
                    </div>
                    <div>
                        <TextField variant="outlined" multiline defaultValue={this.state.profile.about}
                                   style={{width: '30vw'}} label="About you" name="about" onChange={this.handleChange}/>

                    </div>
                    <div>
                        <TextField variant="outlined" multiline defaultValue={this.state.profile.study}
                                   style={{width: '30vw'}} label="Your study level" name="study"
                                   onChange={this.handleChange}/>

                    </div>
                    <div>
                        <TextField variant="outlined" multiline defaultValue={this.state.profile.phone}
                                   style={{width: '30vw'}} label="Your Phone number" name="phone"
                                   onChange={this.handleChange}/>

                    </div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <input id="contained-button-file" type="file" style={{display: 'none'}}
                               onChange={event => this.getFile(event.target.files, "pic")}/>
                        <label htmlFor="contained-button-file">

                            <Button
                                component="span"
                                variant="outlined"
                                color="default"
                                disableElevation
                            >

                                Pic
                            </Button>
                        </label>
                        <input id="contained-button-file-background" type="file" style={{display: 'none'}}
                               onChange={event => this.getFile(event.target.files, "background")}/>
                        <label htmlFor="contained-button-file-background">

                            <Button
                                component="span"
                                variant="outlined"

                                disableElevation
                                style={{marginLeft: '10px', color:"white", textTransform:'capitalize'}}
                            >

                                Background
                            </Button>
                        </label>

                    </div>
                    {typeof this.state.pic !== 'undefined' && this.state.pic !== null ?
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Avatar alt="pic" src={this.state.pic} style={{width: '60px', height: '60px'}}/>
                            <p style={{marginLeft: '10px', fontSize: '15px', fontWeight: '500'}}>Selected Pic</p>
                            <Button variant="contained"
                                    style={{marginLeft: '10px', backgroundColor: 'red', color: 'white'}}
                                    disableElevation onClick={() => this.setState({
                                pic: null
                            })}><DeleteRoundedIcon/> </Button>
                        </div> : null}


                    {typeof this.state.background !== 'undefined' && this.state.background !== null ?
                        <div style={{
                            backgroundColor: '#3b424c',
                            borderRadius: '8px',
                            display: 'grid',
                            alignContent: 'space-between'
                        }}>
                            <p style={{fontSize: '15px', fontWeight: '500', textAlign: 'center'}}>Selected Background
                                Image</p>
                            <img alt="background" style={{maxWidth: '30vw', borderRadius: '8px'}}
                                 src={this.state.background}/>
                            <Button variant="contained" style={{backgroundColor: 'red', color: 'white'}}
                                    disableElevation onClick={() => this.setState({
                                background: null
                            })}> <DeleteRoundedIcon/> Remove</Button>
                        </div> : null}

                    <Button variant="outlined" style={{textTransform: 'capitalize', width: '15vw', margin: 'auto', border:'#39adf6 2px solid'}}
                            disableElevation onClick={() => this.updateProfile()}>save</Button>
                </ThemeProvider>
            </div>
        )
    }
}

export default ProfileSettingsComponent