import api from "../../services/axiosClient";

export const apiLoginUser = async (data) => {
  try {
    const response = await api.post("/auth/login/", data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const apiRegisterUser = async (data) => {
  try {
    const response = await api.post("/auth/register/", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const apiRefreshTokenUser = async () => {
  try {
    const response = await api.post("/auth/token/refresh/");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const apiLogoutUser = async (data) => {
  try {
    const response = await api.post("/auth/logout/", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const apiGetUser = async () => {
  try {
    const response = await api.get("/auth/user/");
    return response.data;
  } catch (error) {
    throw error;
  }
};
