import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import ClearStorage from "./ClearStorage";
import "./styles/SigninStyle.css"
import Button from '@material-ui/core/Button';
import Host from '../../Host'
import TextField from '@material-ui/core/TextField'
import {createMuiTheme} from "@material-ui/core/styles";
import {ThemeProvider} from "@material-ui/styles";
import Snackbar from '@material-ui/core/Snackbar'
import SetStorage from "./SetStorage";
import Cookies from "universal-cookie/lib";
import Alert from "../shared/functions/Alert";

const theme = createMuiTheme({
    palette: {
        type: "dark"
    }
});


class SignIn extends Component {
    EMAIL;
    PHONE;
    JWT;
    constructor() {
        super()
        this.state = {
            email: null,
            password: null,
            accepted: null,
            error: false,
            errorMessage: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {
        ClearStorage();
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    async handleSubmit() {
      try{
          await axios({
              method: 'post',
              url: Host() + 'api/sign_in',
              data: {
                  email: this.state.email,
                  password:  this.state.password
              }
          })
          .then(response => {
              SetStorage(response.data.JWT, response.data.EMAIL, response.data.ID, response.data.PHONE)
              this.setState({
                  accepted: true
              })
          })
          .catch(error => {
              this.setState({
                  error: true,
                  errorMessage: error.message
              })
              console.log(error)
          })
      }catch (e){
          console.log(e)
      }
    }

    render() {
        if (this.state.accepted === true)
            return (
                <Redirect to={'/profile/' + (new Cookies()).get("ID")}/>
            );
        else {
            return (
                <div className="sign_in_container">
                    <ThemeProvider theme={theme}>
                        <div className="sign_in_component">
                            <div className="sign_in_title_container">
                                <h2>Sign In</h2>
                            </div>
                            <div className="sign_input_container">
                                <TextField
                                    variant="outlined"
                                    label="Email"
                                    name={"email"}
                                    multiline

                                    onChange={this.handleChange}/>
                                <TextField
                                    variant="outlined"
                                    type="password"

                                    autoComplete="current-password"
                                    label="Password"
                                    name={"password"}
                                    onChange={this.handleChange}/>
                            </div>

                            <div className="sign_button_container">
                                <Button
                                    disableElevation
                                    style={{border:'#39adf6 2px solid', color:'white', textTransform:'capitalize'}}
                                    variant='outlined'
                                    onClick={() => this.handleSubmit()}>Sign in</Button>
                            </div>
                            <Snackbar open={this.state.error === true} autoHideDuration={6000}
                                      onClose={() => this.setState({error: false, errorMessage: null})}>
                                <Alert severity="error">Some error occurred ({this.state.errorMessage}).</Alert>
                            </Snackbar>
                        </div>
                    </ThemeProvider>
                </div>
            );
        }
    }
}


export default (SignIn)