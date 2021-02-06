import axios from "axios";
import Host from "../../../Host";
import Cookies from "universal-cookie/lib";

export default async function fetch(group, max_id, input){
    await axios({
        method: 'patch',
        url: Host() + (group === true ? 'api/search/group' :  'api/search/user'),
        headers: {"authorization": (new Cookies()).get("JWT")},
        data: {
            max_id: max_id,
            search_input: input.toLowerCase()
        }
    }).then(res => {
        return {
            subjects: res.data,
            max_id: (res.data.length > 0) ? res.data[res.data.length-1].id : null
        }

    }).catch(error => {
        console.log(error)
        return {
            subjects: [],
            max_id: null
        }
    })
}