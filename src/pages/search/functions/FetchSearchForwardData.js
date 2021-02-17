import axios from "axios";
import Host from "../../../Host";
import Cookies from "universal-cookie/lib";

export default async function fetchForwardSearchData(user_max_id, group_max_id, branch_max_id, input){
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
        method: 'get',
        url: Host() + ('api/search/user'),
        params: {
            max_id: user_max_id,
            search_input: input
        }
    }).then(res => {
        users = {
            users: res.data,
            max_id: (res.data.length > 0) ? res.data[res.data.length-1].id : null
        }

    }).catch(error => {
        console.log(error)
    })

    await axios({
        method: 'get',
        url: Host() + ('api/search/group'),
        params: {
            max_id: group_max_id,
            search_input: input
        }
    }).then(res => {
        groups = {
            groups: res.data,
            max_id: (res.data.length > 0) ? res.data[res.data.length-1].id : null
        }
    }).catch(error => {
        console.log(error)
    })

    if(typeof (new Cookies().get("JWT")) !== "undefined"){
        await axios({
            method: 'get',
            url: Host() + ('api/search/branch'),
            headers: {'authorization': (new Cookies()).get("JWT")},
            params: {
                max_id: branch_max_id,
                search_input: input
            }
        }).then(res => {
            branches = {
                branches: res.data,
                max_id: (res.data.length > 0) ? res.data[res.data.length-1].id : null
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
