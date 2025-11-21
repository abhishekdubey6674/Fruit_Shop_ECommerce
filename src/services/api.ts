import axios from "axios";
import { storage, StorageKeys } from "../utils/storage";

export const BASE_URL =
  "https://cbs-inc-electronic-marine.trycloudflare.com";


// AXIOS INSTANCE
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// TOKEN INTERCEPTOR
api.interceptors.request.use(async (config) => {
  const token = await storage.getItem(StorageKeys.ACCESS_TOKEN);
  console.log("TOKEN HEADER =", token);

  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

// AUTH APIs (Registration + Login)
export const authAPI = {
  register: async (data: any) => {
    const res = await api.post(`/users/register/`, data);
    return res.data;
  },

  login: async (data: any) => {
    const res = await api.post(`/users/login/`, data);
    return res.data;
  },
};

// PRODUCTS
export const productAPI = {
  getAll: async () => {
    const res = await api.get(`/food/products/`);
    return res.data;
  },
};

// ADDRESS APIs
export const addressAPI = {
  addAddress: async (data: any) => {
    const res = await api.post(`/food/addresses/`, data);
    return res.data;
  },

  getAddresses: async () => {
    const res = await api.get(`/food/addresses/`);
    return res.data;
  },

  updateAddress: async (id: number, data: any) => {
    const res = await api.put(`/food/addresses/${id}/`, data);
    return res.data;
  },

  deleteAddress: async (id: number) => {
    const res = await api.delete(`/food/addresses/${id}/`);
    return res.data;
  },
};

// CART APIs
export const cartAPI = {

  getCart: async () => {
    const res = await api.get("/food/cart/");
    return res.data;
  },


  getItem: async (cartItemId: number) => {
    const res = await api.get(`/food/cart/${cartItemId}/`);
    return res.data;
  },


  addItem: async (data: { product_id: number; quantity: number }) => {
    const res = await api.post("/food/cart/add/", data);
    return res.data;
  },


  updateItem: async (
    cartItemId: number,
    action: "increment" | "decrement"
  ) => {
    const res = await api.put(`/food/cart/${cartItemId}/update/`, { action });
    return res.data;
  },

  
  updateQuantity: async (cartItemId: number, quantity: number) => {
    const res = await api.put(`/food/cart/${cartItemId}/`, { quantity });
    return res.data;
  },


  removeItem: async (cartItemId: number) => {
    const res = await api.delete(`/food/cart/${cartItemId}/delete/`);
    return res.data;
  },

 
  clearCart: async () => {
    const res = await api.delete("/food/cart/clear/");
    return res.data;
  },

  
  checkout: async (addressId: number) => {
    const res = await api.post(`/food/cart/checkout/`, { address_id: addressId });
    return res.data;
  },

  getSummary: async () => {
    const res = await api.get("/food/cart/summary/");
    return res.data;
  },
};



// ORDERS APIs
export const orderAPI = {
  listOrders: async () => {
    const res = await api.get(`/food/orders/`);
    return res.data;
  },

  orderDetails: async (id: number) => {
    const res = await api.get(`/food/orders/${id}/`);
    return res.data;
  },
};

// PAYMENT APIs
export const paymentAPI = {
  getPayments: async () => {
    const res = await api.get(`/food/payments/`);
    return res.data;
  },

  pay: async (data: any) => {
    const res = await api.post(`/food/payments/`, data);
    return res.data;
  },
};

export default api;
