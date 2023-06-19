import {callLogin} from "../api/authApi";

export async function getToken() {
    let login = sessionStorage.getItem("login")
    let password = sessionStorage.getItem("password")
    return await callLogin({login, password})
}

export function logout() {
    sessionStorage.clear()
}