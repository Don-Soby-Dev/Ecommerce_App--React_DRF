
export const apiLoginUser = async (data) => {
    try {
        const response = await axios.post('/auth/login/', data, { withCredentials: true });
        return response.data
    } catch (error) {
        throw error;
    }
}

export const apiRegisterUser = async (data) => {
    try {
        const response = await axios.post('/auth/register/', data);
        return response.data
    } catch (error) {
        throw error;
    }
}

export const apiRefreshTokenUser = async (data) => {
    try {
        const response = await axios.post('/auth/refresh/', data);
        return response.data
    } catch (error) {
        throw error;
    }
}

export const apiLogoutUser = async (data) => {
    try {
        const response = await axios.post('/auth/logout/', data);
        return response.data
    } catch (error) {
        throw error;
    }
}

export const apiGetUser = async () => {
    try {
        const response = await axios.get('/auth/user/');
        return response.data
    } catch (error) {
        throw error;
    }
}