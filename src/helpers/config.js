
export const getConfig = (token) => {
    const config = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${token}`
        }
    }
    return config;
}

