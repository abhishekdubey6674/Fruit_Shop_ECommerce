export const validateEmail = (email: string): { isValid: boolean; error?: string } => {
  if (!email || !email.trim()) {
    return { isValid: false, error: 'Email is required' };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }
  
  return { isValid: true };
};

export const validateMobile = (mobile: string): { isValid: boolean; error?: string } => {
  if (!mobile || !mobile.trim()) {
    return { isValid: false, error: 'Mobile number is required' };
  }
  
  const mobileRegex = /^[6-9]\d{9}$/;
  if (!mobileRegex.test(mobile)) {
    return { isValid: false, error: 'Please enter a valid 10-digit mobile number' };
  }
  
  return { isValid: true };
};

export const validatePassword = (password: string): { isValid: boolean; error?: string } => {
  if (!password || !password.trim()) {
    return { isValid: false, error: 'Password is required' };
  }
  
  if (password.length < 6) {
    return { isValid: false, error: 'Password must be at least 6 characters long' };
  }
  
  return { isValid: true };
};

export const validateFullName = (name: string): { isValid: boolean; error?: string } => {
  if (!name || !name.trim()) {
    return { isValid: false, error: 'Full name is required' };
  }
  
  if (name.trim().length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters long' };
  }
  
  return { isValid: true };
};

export const validateAddress = (address: {
  house_no: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
}): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  
  if (!address.house_no || !address.house_no.trim()) {
    errors.house_no = 'House/Flat number is required';
  }
  
  if (!address.street || !address.street.trim()) {
    errors.street = 'Street/Area is required';
  }
  
  if (!address.city || !address.city.trim()) {
    errors.city = 'City is required';
  }
  
  if (!address.state || !address.state.trim()) {
    errors.state = 'State is required';
  }
  
  if (!address.pincode || !address.pincode.trim()) {
    errors.pincode = 'Pincode is required';
  } else if (!/^\d{6}$/.test(address.pincode)) {
    errors.pincode = 'Pincode must be 6 digits';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateQuantity = (quantity: number): { isValid: boolean; error?: string } => {
  if (!quantity || quantity < 1) {
    return { isValid: false, error: 'Quantity must be at least 1' };
  }
  
  if (quantity > 99) {
    return { isValid: false, error: 'Quantity cannot exceed 99' };
  }
  
  return { isValid: true };
};
