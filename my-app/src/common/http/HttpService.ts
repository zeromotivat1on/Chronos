export const serverUrl = 'http://127.0.0.1:8000/';

export const get = async (url: string) => {
    const response = await fetch(`${serverUrl}${url}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    })
    return await response.json();
}

export const destroy = async (url: string) => {
    const response = await fetch(`${serverUrl}${url}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
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
        },
        body: JSON.stringify(data)
    })
    return await response.json();
}