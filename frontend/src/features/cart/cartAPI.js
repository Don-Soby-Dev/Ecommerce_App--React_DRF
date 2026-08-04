import api from "../../services/axiosClient";

export const apiFetchCart = async () => {
  const response = await api.get("/cart/");
  return response.data;
};

export const apiAddCartItem = async (productId) => {
  const response = await api.post("/cart/items/", { product_id: productId });
  return response.data;
};

export const apiRemoveCartItem = async (itemId) => {
  const response = await api.delete(`/cart/items/${itemId}/`);
  return response.data;
};

export const apiClearCart = async () => {
  const response = await api.delete("/cart/clear/");
  return response.data;
};
