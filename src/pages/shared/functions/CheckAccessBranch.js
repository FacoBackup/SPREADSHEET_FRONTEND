import Host from "../../../Host";
import axios from "axios";
import Cookies from "universal-cookie/lib";

const cookies = new Cookies()

export default async function checkAccess(branch_id){
    let response = false
    try {
        await axios({
            method: 'patch',
            url: Host() + 'api/check/access/to/branch',
            headers: {'authorization': cookies.get("JWT")},
            data:{
                branch_id: branch_id
            }
        }).then(res => {
          response = res.data
        }).catch(errorResponse => {
            console.log(errorResponse)
        })
    } catch (errorResponse) {
        console.log(errorResponse)
    }

    return response
}