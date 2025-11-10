import axios from 'axios';

// Placeholder for future API integration
const API_BASE_URL = 'https://api.fruitshop.com/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  config => {
    // TODO: Add auth token from AsyncStorage
    // const token = await AsyncStorage.getItem('authToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  response => response.data,
  error => {
    // Handle common errors
    if (error.response?.status === 401) {
      // TODO: Handle unauthorized - redirect to login
    }
    return Promise.reject(error);
  }
);

// API endpoints (ready for backend integration)
export const authAPI = {
  sendOTP: (phone: string) => apiClient.post('/auth/send-otp', { phone }),
  verifyOTP: (phone: string, otp: string) => apiClient.post('/auth/verify-otp', { phone, otp }),
  signup: (data: any) => apiClient.post('/auth/signup', data),
};

export const productsAPI = {
  getAll: () => apiClient.get('/products'),
  getById: (id: string) => apiClient.get(`/products/${id}`),
  getByCategory: (category: string) => apiClient.get(`/products/category/${category}`),
};

export const cartAPI = {
  getCart: () => apiClient.get('/cart'),
  addItem: (productId: string, quantity: number) => apiClient.post('/cart/add', { productId, quantity }),
  removeItem: (itemId: string) => apiClient.delete(`/cart/${itemId}`),
  updateQuantity: (itemId: string, quantity: number) => apiClient.put(`/cart/${itemId}`, { quantity }),
};

export default apiClient;
