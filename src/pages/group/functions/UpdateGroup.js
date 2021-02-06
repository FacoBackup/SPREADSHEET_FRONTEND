import axios from "axios";
import Host from "../../../Host";
import Cookies from "universal-cookie/lib";

export default async function updateGroup(group_id, name, about, background, pic) {
    try {
        await axios({
            method: 'put',
            url: Host() + 'api/update/group',
            headers: {"Authorization": 'Bearer ' + (new Cookies()).get("JWT")},
            data: {
                group_id: group_id,
                name: name !== null ? name.toLowerCase() : name,
                about: about,
                background: background,
                pic: pic
            }
        }).then(() => {
            return true
        }).catch(error => {
            console.log(error)
            return false
        })
    } catch (error) {
        console.log(error)
        return false
    }
}
