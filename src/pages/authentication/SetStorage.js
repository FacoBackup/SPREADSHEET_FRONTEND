import Cookies from "universal-cookie/lib";

const cookies = new Cookies()

export default function set(jwt, email, id, phone){
    cookies.set('JWT', jwt, {path: '/'});
    cookies.set('ID', id, {path: '/'});
    cookies.set('EMAIL', email, {path: '/'});
    cookies.set('PHONE', phone, {path: '/'});
}