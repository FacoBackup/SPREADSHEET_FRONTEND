import Cookies from "universal-cookie/lib";

const cookies = new Cookies()

export default function clear(){
    cookies.remove("JWT")
    cookies.remove("ID")
    cookies.remove("EMAIL")
    cookies.remove("PHONE")
    localStorage.removeItem("PROFILE")
}