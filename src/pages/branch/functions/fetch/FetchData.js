import axios from "axios";
import Host from "../../../../Host";
import Cookies from "universal-cookie/lib";

export default async function fetchBranchData(branch_id){
    let content = []
    let contributors = []
    let repository = {}
    let branch = {}
    let canMakeBranch = false
    let open_commit = false
    let can_edit = false

    try {
        await axios({
            method: 'patch',
            url: Host() + 'api/get/branch',
            data: {
                branch_id: branch_id
            }
        }).then(res => {
            branch = res.data
        }).catch(error => console.log(error))
   
        if(branch !== {}){
        
                await axios({
                    method: 'patch',
                    url: Host() + 'api/get/branch/content',
                    headers:{'authorization':(new Cookies()).get("JWT")},
                    data: {
                        branch_id: branch_id
                    }
                }).then(res => {

                    content = res.data
                }).catch(error => console.log(error))
                
                
                await axios({
                    method: 'patch',
                    url: Host() + 'api/get/repository',
                    headers:{'authorization':(new Cookies()).get("JWT")},
                    data: {
                        repository_id: branch.repository_id
                    }
                }).then(res => {
                    console.log(res)
                    repository = res.data
                }).catch(error => console.log(error))
        
                await axios({
                    method: 'patch',
                    url: Host() + 'api/get/branch/contributors',
                    headers:{'authorization':(new Cookies()).get("JWT")},
                    data: {
                        branch_id: branch_id
                    }
                }).then(res => {
                    contributors = res.data
                }).catch(error => console.log(error))
        
        }
        try {
            await axios({
                method: 'patch',
                url: Host() + 'api/member/by/branch',
                headers:{'authorization':(new Cookies()).get("JWT")},
                data: {
                    branch_id: branch_id
                }
            }).then(res => {
                canMakeBranch = res.data
            })
                .catch(error => console.log(error))
        } catch (error) {
            console.log(error)
        }
        try {
            await axios({
                method: 'patch',
                url: Host() + 'api/get/open/commit',
                headers:{'authorization':(new Cookies()).get("JWT")},
                data: {
                    branch_id: branch_id
                }
            }).then(res => {
                if(res.data.open_commit === true && res.data.user_id === parseInt((new Cookies()).get("ID"))){
                    open_commit = true
                    can_edit = true
                }
                else if(res.data.open_commit === true && res.data.user_id !== parseInt((new Cookies()).get("ID"))){
                    open_commit = true
                    can_edit = false
                }
                else{
                    open_commit = false
                    can_edit = true
                }

            })
                .catch(error => console.log(error))
        } catch (error) {
            console.log(error)
        }
    } catch (error) {
        console.log(error)
    }


    return {
        canEdit: can_edit,
        contributors: contributors,
        content: content,
        repository: repository,
        branch: branch,
        canMakeBranch: canMakeBranch,
        openCommit: open_commit
    }
}