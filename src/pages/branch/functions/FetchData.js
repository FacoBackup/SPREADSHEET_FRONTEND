import axios from "axios";
import Host from "../../../Host";
import Cookies from "universal-cookie/lib";

export default async function fetchBranchData(branch_id){
    let content = []
    let contributors = []
    try {
        await axios({
            method: 'patch',
            url: Host() + 'api/get/branch/content',
            headers:{'authorization':(new Cookies()).get("JWT")},
            data: {
                branch_id: branch_id
            }
        }).then(res => {
            content = res.data
        })
            .catch(error => console.log(error))
    } catch (error) {
        console.log(error)
    }

    if(content.length > 0)
        try {
            await axios({
                method: 'patch',
                url: Host() + 'api/get/branch/contributors',
                data: {
                    branch_id: branch_id
                }
            }).then(res => {
                contributors = res.data
            })
                .catch(error => console.log(error))
        } catch (error) {
            console.log(error)
        }

    return {
        contributors: contributors,
        content: content
    }
}