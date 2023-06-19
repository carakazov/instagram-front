import {getToken} from "../helper/tokenHelper";

const URL = "http://localhost:8080"

export async function callRegister(registerRequest) {
    let response = await fetch(URL + "/user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(registerRequest)
    })
    if(response.ok) {
        return await response.json()
    }
    return Promise.reject((await response.json()).code)
}

export async function callGetUser(externalId) {
    let token = await getToken()
    let response = await fetch(URL + "/user/" + externalId, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token.token
        }
    })
    if(response.ok) {
        return await response.json()
    }
    return Promise.reject((await response.json()).code)
}

export async function callGetPost(externalId) {
    let token = await getToken()
    let response = await fetch(URL + "/post/" + externalId, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token.token
        }
    })
    if(response.ok) {
        return await response.json()
    }
    return Promise.reject((await response.json()).code)
}

export async function callLike(externalId) {
    let token = await getToken()
    let response = await fetch(URL + "/post/like/" + externalId, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token.token
        }
    })
    if(response.ok) {
        return Promise.resolve()
    }
    return Promise.reject((await response.json()).code)
}

export async function callPost(caption, files) {
    let token = await getToken()
    let data = new FormData()
    alert("d")
    files.forEach((file) => data.append("file", file))
    data.append("caption", caption)
    alert(4)
    let result = await fetch(URL + "/post", {
        method: 'POST',
        body: data,
        headers: {
            "Authorization": "Bearer " + token.token
        }
    })

    if(result.ok) {
        return Promise.resolve()
    }

    return Promise.reject((await result.json()).code)
}

export async function callGetFeed() {
    let token = await getToken()
    let response = await fetch(URL + "/post", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token.token
        }
    })
    if(response.ok) {
        return await response.json()
    }

    return Promise.reject((await response.json()).code)
}

export async function callGetDialog(externalId) {
    let token = await getToken()
    let response = await fetch(URL + "/message/" + externalId, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token.token
        }
    })
    if(response.ok) {
        return await response.json()
    }

    return Promise.reject((await response.json()).code)
}

export async function callSendMessage(sendMessageRequest) {
    let token = await getToken()
    let response = await fetch(URL + "/message", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token.token
        },
        body: JSON.stringify(sendMessageRequest)
    })
    if(response.ok) {
        return Promise.resolve()
    }

    return Promise.reject((await response.json()).code)
}

export async function callBlacklist(externalId) {
    let token = await getToken()
    let response = await fetch(URL + "/user/blacklist/" + externalId, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token.token
        }
    })
    if(response.ok) {
        return Promise.resolve()
    }

    return Promise.reject((await response.json()).code)
}

export async function callGetAllUsers() {
    let token = await getToken()
    let response = await fetch(URL + "/user", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token.token
        }
    })
    if(response.ok) {
        return await response.json()
    }

    return Promise.reject((await response.json()).code)
}

export async function callChangeStatus(externalId, status) {
    let token = await getToken()
    let response = await fetch(URL + '/user/status/' + externalId + "/" + status, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token.token
        }
    })

    if(response.ok) {
        return Promise.resolve()
    }

    return Promise.reject((await response.json()).code)
}