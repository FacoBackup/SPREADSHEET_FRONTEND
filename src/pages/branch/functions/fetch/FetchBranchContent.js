import axios from "axios";
import Host from "../../../../Host";
import Cookies from "universal-cookie/lib";

export default async function fetchBranchContent(branch_id){
    let content = []
    await axios({
        method: 'patch',
        url: Host() + 'api/get/branch/content',
        headers:{'authorization':(new Cookies()).get("JWT")},
        data: {
            branch_id: branch_id
        }
    }).then(res => {
        content = res.data
    }).catch(error => console.log(error))

    return {
        "content": content
    }
}