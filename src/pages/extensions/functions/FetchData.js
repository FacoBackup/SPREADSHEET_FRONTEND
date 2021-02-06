import axios from "axios";
import Host from "../../../Host";

export default async function fetchExtensions(max_id){
    await axios({
        method: 'patch',
        url: Host() + 'api/get/users',
        data: {
            max_id: max_id
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