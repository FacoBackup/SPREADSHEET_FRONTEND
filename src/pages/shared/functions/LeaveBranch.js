import Host from "../../../Host";
import axios from "axios";
import Cookies from "universal-cookie/lib";

const cookies = new Cookies()

export default async function leaveBranch(branch_id){
    let error = false
    let errorMessage = null
    try {
        await axios({
            method: 'delete',
            url: Host() + 'api/remove/contributor',
            headers: {'authorization': cookies.get("JWT")},
            data: {
                branch_id: branch_id,
                user_id: parseInt(cookies.get("ID"))

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
        "error": error,
        "error_message": errorMessage
    }
}