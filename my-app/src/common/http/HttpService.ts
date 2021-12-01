import { getCookie } from "../utils/Cookie";

export const serverUrl = 'http://127.0.0.1:8000/';
export const jwt = getCookie('remember_token');

export const get = async (url: string) => {
    const response = await fetch(`${serverUrl}${url}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${jwt}`,
        },
    })
    return await response.json();
}

export const destroy = async (url: string) => {
    const response = await fetch(`${serverUrl}${url}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${jwt}`,
        },
    })
    return await response.json();
}

export const post = async (url: string, data: Object) => {
    const response = await fetch(`${serverUrl}${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${jwt}`,
        },
        body: JSON.stringify(data)
    })
    return await response.json();
}

export const update = async (url: string, data: Object) => {
    const response = await fetch(`${serverUrl}${url}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${jwt}`,
        },
        body: JSON.stringify(data)
    })
    return await response.json();
}