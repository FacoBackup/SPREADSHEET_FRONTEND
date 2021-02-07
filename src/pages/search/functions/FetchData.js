import axios from "axios";
import Host from "../../../Host";

export default async function fetch(group, max_id, input){
    let response = []
    await axios({
        method: 'patch',
        url: Host() + (group === true ? 'api/search/group' :  'api/search/user'),
        data: {
            max_id: max_id,
            search_input: input.toLowerCase()
        }
    }).then(res => {
        response = {
            subjects: res.data,
            max_id: (res.data.length > 0) ? res.data[res.data.length-1].id : null
        }

    }).catch(error => {
        console.log(error)
        response = {
            subjects: [],
            max_id: null
        }
    })
    return response
}