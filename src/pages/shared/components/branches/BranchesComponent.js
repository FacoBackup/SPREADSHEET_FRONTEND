import axios from 'axios';
import React from 'react'
import "../../profile/styles/SocialStyle.css"
import {createMuiTheme} from "@material-ui/core/styles";
import {ThemeProvider} from "@material-ui/styles";
import Host from '../../../../Host'

const theme = createMuiTheme({
    palette: {
        type: "dark"
    }
});

class BranchesComponent extends React.Component {
    constructor(params) {
        super(params)
        this.state = {
            token: params.token,
            branches: [],
            isGroup: params.isGroup,
            subjectID: params.sub
        }
        this.fetchData = this.fetchData.bind(this)
    }

    async fetchData() {
        try{
            await axios({
                method: 'get',
                url: Host() + 'api/moderator/in',
                headers: {"Authorization": 'Bearer ' + this.state.token}
            }).then(res => {
                const size = res.data.length
                if(typeof size !== 'undefined' && size > 0){
                    this.setState({
                        communities: res.data
                    })
                }
            }).catch(error => console.log(error))
        }catch (e) {
            console.log(e)
        }
    }


    render() {
        return (
            <ThemeProvider theme={theme}>
                <div>
                    cafe
                </div>
            </ThemeProvider>
        )
    }
}

export default BranchesComponent