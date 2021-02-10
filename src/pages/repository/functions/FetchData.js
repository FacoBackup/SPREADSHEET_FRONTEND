import axios from 'axios'
import Host from '../../../Host'
import Cookies from 'universal-cookie/lib'

const cookies = new Cookies()

export default async function fetchRepositoryData(repository_id){
    let repository = {}
    let branches = []

    try {
        await axios({
            method: 'patch',
            url: Host() + 'api/get/branch/content',
            headers:{'authorization':(new Cookies()).get("JWT")},
            data: {
                branch_id: branch_id
            }
        }).then(res => {
            repository = res.data
        })
            .catch(error => console.log(error))
    } catch (error) {
        console.log(error)
    }

    if(repository !== {})
        try {
            await axios({
                method: 'patch',
                url: Host() + 'api/get/branch/content',
                headers:{'authorization':(new Cookies()).get("JWT")},
                data: {
                    repository_id: repository_id
                }
            }).then(res => {
                branches = res.data
            })
                .catch(error => console.log(error))
        } catch (error) {
            console.log(error)
        }
}