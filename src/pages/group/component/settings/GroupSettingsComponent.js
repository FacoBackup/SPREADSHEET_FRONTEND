import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import {createMuiTheme} from "@material-ui/core/styles";
import {ThemeProvider} from "@material-ui/styles";
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import getFile from "../../../shared/functions/GetImage";
import updateGroup from "../../functions/UpdateGroup";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "../../../shared/functions/Alert";

const theme = createMuiTheme({
    palette: {
        type: "dark"
    }
});

class GroupSettingsComponent extends React.Component {
    constructor(params) {
        super(params)
        this.state = {
            group: params.group,
            about: params.group.about,
            name: params.group.name,
            background: params.group.background,
            pic: params.group.imageURL,
            error: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.updateGroup = this.updateGroup.bind(this)
        this.getFile = this.getFile.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    async updateGroup() {
        let response = await updateGroup(this.state.group.id, this.state.name, this.state.about, this.state.background, this.state.pic)
        if (response === true)
            window.location.reload()
        else
            this.setState({
                error: true
            })
    }

    getFile(event, name) {
        let image = getFile(event)

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
                        <TextField variant="outlined" multiline defaultValue={this.state.name}
                                   style={{width: '30vw'}} label="Name" name="name" onChange={this.handleChange}/>

                    </div>
                    <div>
                        <TextField variant="outlined" multiline defaultValue={this.state.about}
                                   style={{width: '30vw'}} label="About this group" name="about" onChange={this.handleChange}/>

                    </div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <input id="contained-button-file" type="file" style={{display: 'none'}}
                               onChange={event => this.getFile(event.target.files, "pic")}/>
                        <label htmlFor="contained-button-file">

                            <Button
                                component="span"
                                variant="contained"
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
                                variant="contained"
                                color="default"
                                disableElevation
                                style={{marginLeft: '10px'}}
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

                    <Button variant="contained" style={{textTransform: 'capitalize', width: '15vw', margin: 'auto'}}
                            color="primary" disableElevation onClick={() => this.updateGroup()}>save</Button>
                </ThemeProvider>
                <Snackbar open={this.state.error === true} autoHideDuration={6000}
                          onClose={() => this.setState({error: false})}>
                    <Alert severity="error">Some error occurred.</Alert>
                </Snackbar>
            </div>
        )
    }
}

export default GroupSettingsComponent