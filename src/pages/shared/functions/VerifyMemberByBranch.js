import axios from "axios";
import Host from "../../../Host";
import Cookies from "universal-cookie/es6";

export default async function verifyMemberByBranch(branch_id){
    let response = false
    try {
        await axios({
            method: 'patch',
            url: Host() + 'api/member/by/branch',
            headers:{'authorization':(new Cookies()).get("JWT")},
            data: {
                branch_id: branch_id
            }
        }).then(res => {
            response = res.data
        })
        .catch(error => console.log(error))
    } catch (error) {
        console.log(error)
    }

    return response
}