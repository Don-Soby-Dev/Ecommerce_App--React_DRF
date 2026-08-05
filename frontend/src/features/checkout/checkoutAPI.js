import api from "../../services/axiosClient";

export const apiCheckout = async ({ cartId } = {}) => {
  const response = await api.post(
    "/checkout/",
    cartId ? { cart_id: cartId } : {},
  );
  return response.data;
};

export const apiFetchOrders = async () => {
  const response = await api.get("/orders/");
  return response.data;
};

export const apiFetchOrderDetail = async (orderId) => {
  const response = await api.get(`/orders/${orderId}/`);
  return response.data;
};
