import ProfileSettingsComponent from "../components/options/ProfileSettingsComponent";

export default function renderOption(settings, branches, qr, commits){
    switch(true){
        case qr:{
            return "qr"
        }
        case settings:{
            return <ProfileSettingsComponent profile={JSON.parse(localStorage.getItem("PROFILE"))}/>
        }
        case branches:{
            return "branches"
        }
        case commits:{
            return "commits"
        }
        default:{
            return "Commits"
        }
    }
}