import Cookies from "universal-cookie/lib";
import ProfileSettingsComponent from "../components/options/ProfileSettingsComponent";
import UserBranchesComponent from "../components/options/UserBranchesComponent";

export default function renderOption(user_id,settings, branches, qr, commits){
    switch(true){
        case qr:{
            return "qr"
        }
        case settings:{
            return <ProfileSettingsComponent profile={JSON.parse(localStorage.getItem("PROFILE"))}/>
        }
        case branches:{
            return <UserBranchesComponent user_id={user_id}/>
        }
        case commits:{
            return "commits"
        }
        default:{
            return <UserBranchesComponent user_id={user_id}/>
        }
    }
}