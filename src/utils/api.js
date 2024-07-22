import apiClient from "./apiClient";

export async function get(url, params) {
    return await apiClient.get(url);
}

export async function post(url, data) {
    const fromData = new FormData();
    Object.keys(data).map((key) => fromData.append(key, data[key]));
    return await apiClient.post(url, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
}

export async function del(url, params) {
    return await apiClient.delete(url)
}

export async function update(url, data) {
    const fromData = new FormData();
    Object.keys(data).map((key) => fromData.append(key, data[key]));
    return await apiClient.patch(url, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
}