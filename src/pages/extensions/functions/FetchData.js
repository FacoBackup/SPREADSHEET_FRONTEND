import axios from "axios";
import Host from "../../../Host";

export default async function fetchExtensions(max_id){
    let response = {}
    await axios({
        method: 'get',
        url: Host() + 'api/get/users',
        params: {
            max_id: max_id
        }
    }).then(res => {
        console.log({
            subjects: res.data,
            max_id: (res.data.length > 0) ? res.data[res.data.length-1].id : null
        })

        response = {
            subjects: res.data,
            max_id: (res.data.length > 0) ? res.data[res.data.length-1].id : null
        }

    }).catch(error => {
        console.log(error)
        response =  {
            subjects: [],
            max_id: null
        }
    })
    return response
}