import api from "../../services/axiosClient";

export const apiFetchMyProducts = async (params = {}) => {
  const queryParams = new URLSearchParams();
  if (params.is_sold !== undefined && params.is_sold !== null && params.is_sold !== "") {
    queryParams.append("is_sold", params.is_sold);
  }
  const queryString = queryParams.toString();
  const url = queryString ? `/products/mine/?${queryString}` : "/products/mine/";
  const response = await api.get(url);
  return response.data;
};

export const apiCreateProduct = async (data) => {
  const response = await api.post("/products/", data);
  return response.data;
};

export const apiUpdateProduct = async (slug, data) => {
  const response = await api.patch(`/products/${slug}/`, data);
  return response.data;
};

export const apiDeleteProduct = async (slug) => {
  const response = await api.delete(`/products/${slug}/`);
  return response.data;
};
