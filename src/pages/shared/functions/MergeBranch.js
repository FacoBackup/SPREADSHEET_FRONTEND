import Host from "../../../Host";
import axios from "axios";
import Cookies from "universal-cookie/lib";

const cookies = new Cookies()

export default async function mergeBranch(current_branch){
    let error = false
    let errorMessage = null
    try {
        await axios({
            method: 'put',
            url: Host() + 'api/merge',
            headers: {'authorization': cookies.get("JWT")},
            data: {
                source_branch_id: current_branch
            }
        })
        .catch(errorResponse => {
            error = true
            errorMessage = errorResponse.message
            console.log(error)
        })
    } catch (errorResponse) {
        error = true
        errorMessage = errorResponse.message
        console.log(errorResponse)
    }

    return {
        error: error,
        error_message: errorMessage
    }
}