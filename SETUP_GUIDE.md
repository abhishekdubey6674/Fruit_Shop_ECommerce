# 🚀 Quick Setup Guide

## Prerequisites Check

Before running the app, ensure you have:

- ✅ Node.js v20 or higher installed
- ✅ React Native development environment configured
- ✅ Android Studio (for Android development)
- ✅ Xcode (for iOS development - macOS only)

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React Navigation
- AsyncStorage
- Axios
- Linear Gradient
- Gesture Handler
- Reanimated

### 2. iOS Setup (macOS only)

```bash
cd ios
bundle install
bundle exec pod install
cd ..
```

### 3. Start the App

#### Start Metro Bundler
```bash
npm start
```

#### Run on Android
In a new terminal:
```bash
npm run android
```

#### Run on iOS
In a new terminal:
```bash
npm run ios
```

## 🎯 Testing the App

### Login Flow
1. Open the app - you'll see the landing carousel
2. Tap "Explore Now"
3. On the Auth screen, select "Login"
4. Enter any 10-digit phone number
5. Tap "Get OTP"
6. Enter OTP: **1234**
7. Tap "Verify OTP"
8. You'll be redirected to the Dashboard

### Sign Up Flow
1. From Auth screen, select "Sign Up"
2. Fill in all fields:
   - Name: Any name
   - Email: Any email
   - Password: Any password
   - Phone: Any 10-digit number
3. Tap "Create Account"
4. You'll be redirected to the Dashboard

### Dashboard Features
- Browse fruits by category
- Tap category chips to filter
- Tap "Add to Cart" on any fruit card
- Navigate using bottom tabs (Home, Cart, Profile)

## 🔧 Common Issues & Solutions

### Metro Bundler Issues
```bash
npm start -- --reset-cache
```

### Android Build Issues
```bash
cd android
./gradlew clean
cd ..
npm run android
```

### iOS Build Issues
```bash
cd ios
pod deintegrate
pod install
cd ..
npm run ios
```

### Module Not Found Errors
```bash
rm -rf node_modules
npm install
```

## 📱 Device/Emulator Setup

### Android Emulator
1. Open Android Studio
2. Go to AVD Manager
3. Create/Start a virtual device
4. Run `npm run android`

### iOS Simulator
1. Open Xcode
2. Go to Xcode > Open Developer Tool > Simulator
3. Run `npm run ios`

### Physical Device

#### Android
1. Enable Developer Options on your device
2. Enable USB Debugging
3. Connect via USB
4. Run `npm run android`

#### iOS
1. Connect your iPhone via USB
2. Trust the computer on your device
3. In Xcode, select your device
4. Run from Xcode or `npm run ios`

## 🎨 Customization Quick Start

### Change Colors
Edit `src/constants/colors.ts`:
```typescript
export const COLORS = {
  primary: '#YOUR_COLOR',
  // ... other colors
};
```

### Add More Fruits
Edit `src/constants/dummy-data.ts`:
```typescript
export const FRUITS = [
  {
    id: '7',
    name: 'Your Fruit',
    price: 9.99,
    // ... other properties
  },
];
```

### Change Carousel Images
Edit `src/constants/dummy-data.ts`:
```typescript
export const CAROUSEL_DATA = [
  {
    id: '4',
    title: 'Your Title',
    image: 'YOUR_IMAGE_URL',
    // ... other properties
  },
];
```

## 🔌 Backend Integration

When your backend is ready:

1. Open `src/services/api.ts`
2. Update `API_BASE_URL`:
```typescript
const API_BASE_URL = 'https://your-api.com/v1';
```

3. The app will automatically use real API calls instead of mock data

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review React Native documentation
3. Check the project's GitHub issues (if applicable)

## ✅ Verification Checklist

- [ ] Dependencies installed successfully
- [ ] Metro bundler starts without errors
- [ ] App runs on Android/iOS
- [ ] Can navigate through all screens
- [ ] Login/Signup works with mock data
- [ ] Can add items to cart
- [ ] Bottom navigation works
- [ ] No console errors or warnings

---

**Ready to develop!** 🎉
