import { useState, useEffect, useCallback } from 'react';
import { cartAPI } from '../services/api';
import { CartItemResponse } from '../types';
import { storage, StorageKeys } from '../utils/storage';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItemResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Check if user is authenticated
      const token = await storage.getItem(StorageKeys.ACCESS_TOKEN);
      if (!token) {
        console.log('📦 Cart: No token found, skipping fetch');
        setCartItems([]); // Clear cart when not authenticated
        setLoading(false);
        return;
      }
      
      console.log('📦 Cart: Fetching cart items from backend...');
      const items = await cartAPI.getCart();
      console.log('📦 Cart: Received', items.length, 'items from backend');
      
      // Filter out items with invalid data
      // Note: item.quantity is the cart item quantity, item.product.quantity is stock
      const validItems = items.filter((item: CartItemResponse) => {
        if (!item || !item.product) {
          console.warn('⚠️ Cart: Invalid item (missing product):', item);
          return false;
        }
        if (!item.quantity || item.quantity <= 0) {
          console.warn('⚠️ Cart: Invalid cart quantity:', item);
          return false;
        }
        // Product stock can be 0, that's okay - just means out of stock
        // We only care about cart item quantity
        return true;
      });
      
      console.log('📦 Cart: Displaying', validItems.length, 'valid items');
      setCartItems(validItems);
    } catch (err: any) {
      // Don't show error for 401 (user not logged in)
      if (err.response?.status !== 401) {
        setError(err.response?.data?.message || 'Failed to fetch cart');
        console.error('❌ Cart: Fetch error:', err);
      } else {
        console.log('📦 Cart: User not authenticated (401)');
        setCartItems([]); // Clear cart on auth error
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (productId: number, quantity: number = 1) => {
    try {
      setError(null);
      await cartAPI.addItem({ product_id: productId, quantity });
      await fetchCart();
      return { success: true };
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to add to cart';
      setError(message);
      return { success: false, message };
    }
  };

  const updateQuantity = async (cartItemId: number, action: 'increment' | 'decrement') => {
    try {
      setError(null);
      await cartAPI.updateItem(cartItemId, action);
      await fetchCart();
      return { success: true };
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to update quantity';
      setError(message);
      return { success: false, message };
    }
  };

  const checkout = async (addressId: number) => {
    try {
      setError(null);
      
      // Validate cart before checkout
      if (cartItems.length === 0) {
        const message = 'Cart is empty';
        setError(message);
        return { success: false, message };
      }
      
      // Check for invalid quantities or missing data
      const invalidItems = cartItems.filter(item => 
        !item.quantity || 
        item.quantity <= 0 || 
        !item.product || 
        !item.product.id
      );
      
      if (invalidItems.length > 0) {
        console.error('Invalid cart items found:', invalidItems);
        const message = 'Some items have invalid data. Refreshing your cart...';
        setError(message);
        // Auto-refresh to clean up
        await fetchCart();
        return { success: false, message };
      }
      
      console.log('=== CHECKOUT ATTEMPT ===');
      console.log('Address ID:', addressId);
      console.log('Cart Items:', JSON.stringify(cartItems.map(item => ({
        cart_item_id: item.id,
        product_id: item.product.id,
        product_name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        total: parseFloat(item.product.price) * item.quantity,
      })), null, 2));
      console.log('Total Amount:', cartItems.reduce((sum, item) => sum + (parseFloat(item.product.price) * item.quantity), 0));
      console.log('========================');
      
      const order = await cartAPI.checkout(addressId);
      
      // Clear cart after successful checkout
      console.log('✅ Checkout successful, clearing cart...');
      setCartItems([]);
      
      // Fetch fresh cart from backend (should be empty)
      await fetchCart();
      
      return { success: true, order };
    } catch (err: any) {
      console.error('=== CHECKOUT ERROR ===');
      console.error('Status:', err.response?.status);
      console.error('Response Data Type:', typeof err.response?.data);
      
      // Log error details
      if (typeof err.response?.data === 'string' && err.response.data.includes('<!DOCTYPE html>')) {
        const errorMatch = err.response.data.match(/<title>(.*?)<\/title>/);
        console.error('HTML Error Title:', errorMatch ? errorMatch[1] : 'Unknown');
        
        // Try multiple patterns to extract the actual error message
        const exceptionPatterns = [
          /exception_value[^>]*>([^<]+)</,
          /<pre class="exception_value">([^<]+)<\/pre>/,
          /CHECK constraint failed: (\w+)/,
          /UNIQUE constraint failed: ([^<\n]+)/,
          /IntegrityError[^:]*:\s*([^<\n]+)/
        ];
        
        for (const pattern of exceptionPatterns) {
          const match = err.response.data.match(pattern);
          if (match) {
            console.error('Exception:', match[1].trim());
            break;
          }
        }
        
        // Log a snippet of the HTML for debugging
        console.error('HTML Snippet:', err.response.data.substring(0, 500));
      } else {
        console.error('Response:', err.response?.data);
      }
      console.error('======================');
      
      // Extract error message from HTML or JSON response
      let message = 'Checkout failed';
      let shouldClearCart = false;
      
      if (err.response?.data) {
        if (typeof err.response.data === 'string') {
          // Check if it's an HTML error page with IntegrityError
          if (err.response.data.includes('IntegrityError')) {
            console.error('🔴 INTEGRITY ERROR DETECTED - Backend database constraint violated');
            
            if (err.response.data.includes('CHECK constraint failed: quantity')) {
              message = 'Cart data is corrupted. Clearing cart to fix the issue...';
              shouldClearCart = true;
            } else if (err.response.data.includes('UNIQUE constraint failed')) {
              message = 'Duplicate order detected. Please try again.';
            } else {
              message = 'Database error occurred. Clearing cart to resolve...';
              shouldClearCart = true;
            }
          } else {
            message = err.response.data;
          }
        } else if (err.response.data.message) {
          message = err.response.data.message;
        } else if (err.response.data.error) {
          message = err.response.data.error;
        } else if (err.response.data.detail) {
          message = err.response.data.detail;
        }
      }
      
      // Clear cart if IntegrityError detected
      if (shouldClearCart) {
        console.warn('⚠️ Clearing cart due to backend corruption...');
        await clearCart();
      }
      
      setError(message);
      return { success: false, message, cartCleared: shouldClearCart };
    }
  };


  const removeFromCart = async (cartItemId: number) => {
    try {
      setError(null);
      await cartAPI.removeItem(cartItemId);
      await fetchCart();
      return { success: true };
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to remove item';
      setError(message);
      return { success: false, message };
    }
  };

  const clearCart = async () => {
    try {
      setError(null);
      console.log('🧹 Clearing entire cart due to corruption...');
      console.log('Items to remove:', cartItems.length);
      
      // Remove all items one by one
      let removedCount = 0;
      for (const item of cartItems) {
        try {
          console.log(`Removing item ${item.id}: ${item.product.name}`);
          await cartAPI.removeItem(item.id);
          removedCount++;
        } catch (err) {
          console.error('Failed to remove item during clear:', item.id, err);
        }
      }
      
      console.log(`✅ Successfully removed ${removedCount}/${cartItems.length} items`);
      
      await fetchCart();
      return { success: true };
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to clear cart';
      setError(message);
      return { success: false, message };
    }
  };

  const cartTotal = cartItems.reduce((total, item) => {
    return total + parseFloat(item.product.price) * item.quantity;
  }, 0);

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return {
    cartItems,
    loading,
    error,
    cartTotal,
    cartCount,
    addToCart,
    updateQuantity,
    removeFromCart,
    checkout,
    refreshCart: fetchCart,
    clearCart,
  };
};
