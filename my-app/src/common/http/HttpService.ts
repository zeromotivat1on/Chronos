import { getCookie } from "../utils/Cookie";

export const serverUrl = 'http://127.0.0.1:8000/';
export const geoApiKey = '2dde0251b15e4861bd97053883a5c20e';
export const jwt = getCookie('remember_token');

export const get = async (url: string) => {
    const response = await fetch(`${serverUrl}${url}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${jwt}`,
        },
    })
    return await {status: response.status, data: response.json()};
}

export const destroy = async (url: string) => {
    const response = await fetch(`${serverUrl}${url}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${jwt}`,
        },
    })
    return await {status: response.status, data: response.json()};
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
    return await {status: response.status, data: response.json()};
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
    return await {status: response.status, data: response.json()};
}

export const getLocation = async () => {
    const response = await fetch(`https://api.geoapify.com/v1/ipinfo?apiKey=${geoApiKey}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    })
    return await {status: response.status, data: response.json()};
}