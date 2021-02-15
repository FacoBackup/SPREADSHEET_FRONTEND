import axios from "axios";
import Host from "../../../Host";
import Cookies from "universal-cookie/lib";

export default async function fetchBackwardSearchData(user_min_id, group_min_id, branch_min_id, input){
    let users = {
        users: [],
        max_id: null
    }
    let groups = {
        groups: [],
        max_id: null
    }
    let branches = {
        branches: [],
        max_id: null
    }

    await axios({
        method: 'patch',
        url: Host() + ('api/search/user/backward'),
        data: {
            min_id: user_min_id,
            search_input: input
        }
    }).then(res => {
        users = {
            users: res.data,
            max_id: (res.data.length > 0) ? res.data[0].id : null
        }

    }).catch(error => {
        console.log(error)
    })

    await axios({
        method: 'patch',
        url: Host() + ('api/search/group/backward'),
        data: {
            min_id: group_min_id,
            search_input: input
        }
    }).then(res => {
        groups = {
            groups: res.data,
            max_id: (res.data.length > 0) ? res.data[0].id : null
        }
    }).catch(error => {
        console.log(error)
    })

    if(typeof (new Cookies().get("JWT")) !== "undefined"){
        await axios({
            method: 'patch',
            url: Host() + ('api/search/branch/backward'),
            headers: {'authorization': (new Cookies()).get("JWT")},
            data: {
                min_id: branch_min_id,
                search_input: input
            }
        }).then(res => {
            branches = {
                branches: res.data,
                max_id: (res.data.length > 0) ? res.data[0].id : null
            }
        }).catch(error => {
            console.log(error)
        })
    }

    return {
        groups: groups,
        branches: branches,
        users: users
    }
}
