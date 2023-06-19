const URL = "http://localhost:8080/auth"

export async function callLogin(creds) {
    let response = await fetch(URL, {
        method: "POST",
        headers: {
            "Content-type": "Application/json"
        },
        body: JSON.stringify({
            login: creds.login,
            password: creds.password
        })
    })
    if(response.ok) {
        return await response.json()
    }
    return Promise.reject(response.status)
}