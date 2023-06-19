export function setData(login, password, role, externalId, accessStatus) {
    sessionStorage.setItem("login", login);
    sessionStorage.setItem("password", password)
    sessionStorage.setItem("role", role)
    sessionStorage.setItem("externalId", externalId)
    sessionStorage.setItem("accessStatus", accessStatus)
}

export function getRole() {
    return sessionStorage.getItem("role")
}

export function getExternalId() {
    return sessionStorage.getItem("externalId")
}

export function getAccessStatus() {
    return sessionStorage.getItem("accessStatus")
}