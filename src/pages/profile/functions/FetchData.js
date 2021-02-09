import axios from "axios";
import Host from "../../../Host";
import Cookies from "universal-cookie/lib";

const cookies = new Cookies()

export default async function fetchProfileData(user_id){
    let profile = {}
    let commits = []

    try {
        await axios({
            method: 'patch',
            url: Host() + 'api/get/user/by_id',
            data: {
                user_id: user_id
            }
        }).then(res => {
            if (user_id === parseInt(cookies.get("ID"))){
                localStorage.removeItem("PROFILE")
                localStorage.setItem("PROFILE", JSON.stringify(res.data))
            }


            profile = res.data

        }).catch(error => {
            console.log(error)
        })
    } catch (error) {
        console.log(error)
    }

    if(profile !== {})
        try {
            await axios({
                method: 'patch',
                url: Host() + 'api/get/latest/commits',
                data: {
                    user_id: user_id
                }
            }).then(res => {
                commits = res.data
            }).catch(error => {
                console.log(error)
            })
        } catch (error) {
            console.log(error)
        }


    return {
        profile: profile,
        commits: commits
    }
}