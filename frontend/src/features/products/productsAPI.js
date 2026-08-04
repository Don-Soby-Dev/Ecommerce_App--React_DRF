import api from "../../services/axiosClient";

export const apiFetchProducts = async (params = {}) => {
  const queryParams = new URLSearchParams();
  if (params.category) queryParams.append("category", params.category);
  if (params.min_price) queryParams.append("min_price", params.min_price);
  if (params.max_price) queryParams.append("max_price", params.max_price);
  if (params.search) queryParams.append("search", params.search);

  const queryString = queryParams.toString();
  const url = queryString ? `/products/?${queryString}` : "/products/";
  const response = await api.get(url);
  return response.data;
};

export const apiFetchProductBySlug = async (slug) => {
  const response = await api.get(`/products/${slug}/`);
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

export const apiFetchMyProducts = async () => {
  const response = await api.get("/products/mine/");
  return response.data;
};

export const apiFetchCategories = async () => {
  const response = await api.get("/categories/");
  return response.data;
};
